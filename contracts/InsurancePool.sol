// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";
contract InsurancePool is ReentrancyGuard, AccessControl, Pausable {
    bytes32 public constant ORACLE_ROLE = keccak256("ORACLE_ROLE");
    bytes32 public constant GOVERNANCE_ROLE = keccak256("GOVERNANCE_ROLE");
    bytes32 public constant AGENT_ROLE = keccak256("AGENT_ROLE");
    
    struct Policy {
        uint256 policyId;
        address holder;
        uint256 premium;
        uint256 coverage;
        uint256 startDate;
        uint256 endDate;
        InsuranceType insuranceType;
        bool active;
        uint256 claimsCount;
        uint256 totalClaimed;
        string metadata;
    }
    
    enum InsuranceType {
        HEALTH,
        WEATHER,
        SECURITY,
        MOBILITY
    }
    
    struct RiskPool {
        uint256 totalPremiums;
        uint256 totalClaims;
        uint256 reserves;
        uint256 investmentYield;
        uint256 minReserveRatio; // 20% minimum
        uint256 maxCoverageRatio;
    }
    
    struct ParametricTrigger {
        uint256 policyId;
        uint256 threshold;
        uint256 payoutAmount;
        bool triggered;
        uint256 triggerDate;
        string triggerReason;
    }
    
    mapping(uint256 => Policy) public policies;
    mapping(address => uint256[]) public userPolicies;
    mapping(InsuranceType => RiskPool) public riskPools;
    mapping(uint256 => ParametricTrigger) public parametricTriggers;
    mapping(address => uint256) public userTotalPremiums;
    mapping(address => uint256) public userTotalClaims;
    
    uint256 private _policyIdCounter;
    
    uint256 public constant MIN_PREMIUM = 10 * 10**18; // 10 MXN in wei
    uint256 public constant MAX_COVERAGE_RATIO = 100; // 100x premium
    uint256 public constant ORACLE_FEE = 2; // 2% of claim amount
    uint256 public constant AGENT_COMMISSION = 5; // 5% of premium
    
    event PolicyCreated(uint256 indexed policyId, address indexed holder, InsuranceType insuranceType, uint256 premium, uint256 coverage);
    event ClaimTriggered(uint256 indexed policyId, uint256 amount, string reason, address indexed holder);
    event PremiumPaid(uint256 indexed policyId, uint256 amount, address indexed payer);
    event YieldGenerated(InsuranceType indexed pool, uint256 amount);
    event ParametricTriggerSet(uint256 indexed policyId, uint256 threshold, uint256 payoutAmount);
    event PolicyRenewed(uint256 indexed policyId, uint256 newEndDate);
    event AgentCommissionPaid(address indexed agent, uint256 amount);
    
    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(GOVERNANCE_ROLE, msg.sender);
        _grantRole(ORACLE_ROLE, msg.sender);
        
        // Initialize risk pools
        riskPools[InsuranceType.HEALTH] = RiskPool({
            totalPremiums: 0,
            totalClaims: 0,
            reserves: 0,
            investmentYield: 0,
            minReserveRatio: 20,
            maxCoverageRatio: 50
        });
        
        riskPools[InsuranceType.WEATHER] = RiskPool({
            totalPremiums: 0,
            totalClaims: 0,
            reserves: 0,
            investmentYield: 0,
            minReserveRatio: 30,
            maxCoverageRatio: 100
        });
        
        riskPools[InsuranceType.SECURITY] = RiskPool({
            totalPremiums: 0,
            totalClaims: 0,
            reserves: 0,
            investmentYield: 0,
            minReserveRatio: 25,
            maxCoverageRatio: 75
        });
        
        riskPools[InsuranceType.MOBILITY] = RiskPool({
            totalPremiums: 0,
            totalClaims: 0,
            reserves: 0,
            investmentYield: 0,
            minReserveRatio: 20,
            maxCoverageRatio: 60
        });
    }
    
    function createPolicy(
        InsuranceType _type,
        uint256 _premium,
        uint256 _duration,
        string memory _metadata
    ) external payable nonReentrant whenNotPaused returns (uint256) {
        require(msg.value >= MIN_PREMIUM, "Premium too low");
        require(_duration >= 30 days, "Minimum duration 30 days");
        require(_duration <= 365 days, "Maximum duration 1 year");
        
        uint256 policyId = _policyIdCounter;
        _policyIdCounter++;
        
        uint256 coverage = calculateCoverage(_type, _premium);
        
        policies[policyId] = Policy({
            policyId: policyId,
            holder: msg.sender,
            premium: _premium,
            coverage: coverage,
            startDate: block.timestamp,
            endDate: block.timestamp + _duration,
            insuranceType: _type,
            active: true,
            claimsCount: 0,
            totalClaimed: 0,
            metadata: _metadata
        });
        
        userPolicies[msg.sender].push(policyId);
        userTotalPremiums[msg.sender] += _premium;
        
        // Update risk pool
        RiskPool storage pool = riskPools[_type];
        pool.totalPremiums += _premium;
        pool.reserves += _premium;
        
        // Pay agent commission if applicable
        if (hasRole(AGENT_ROLE, msg.sender)) {
            uint256 commission = (_premium * AGENT_COMMISSION) / 100;
            payable(msg.sender).transfer(commission);
            emit AgentCommissionPaid(msg.sender, commission);
        }
        
        emit PolicyCreated(policyId, msg.sender, _type, _premium, coverage);
        return policyId;
    }
    
    function triggerParametricClaim(
        uint256 _policyId,
        uint256 _amount,
        string memory _reason
    ) external onlyRole(ORACLE_ROLE) nonReentrant {
        Policy storage policy = policies[_policyId];
        require(policy.active, "Policy not active");
        require(block.timestamp < policy.endDate, "Policy expired");
        require(_amount <= policy.coverage - policy.totalClaimed, "Amount exceeds remaining coverage");
        require(_amount > 0, "Amount must be greater than 0");
        
        // Calculate oracle fee
        uint256 oracleFee = (_amount * ORACLE_FEE) / 100;
        uint256 payoutAmount = _amount - oracleFee;
        
        // Update policy
        policy.claimsCount++;
        policy.totalClaimed += _amount;
        
        // Update risk pool
        RiskPool storage pool = riskPools[policy.insuranceType];
        pool.totalClaims += _amount;
        pool.reserves -= _amount;
        
        // Automatic payout
        payable(policy.holder).transfer(payoutAmount);
        payable(msg.sender).transfer(oracleFee); // Oracle fee
        
        // Update user stats
        userTotalClaims[policy.holder] += _amount;
        
        emit ClaimTriggered(_policyId, _amount, _reason, policy.holder);
    }
    
    function setParametricTrigger(
        uint256 _policyId,
        uint256 _threshold,
        uint256 _payoutAmount
    ) external onlyRole(ORACLE_ROLE) {
        require(policies[_policyId].active, "Policy not active");
        
        parametricTriggers[_policyId] = ParametricTrigger({
            policyId: _policyId,
            threshold: _threshold,
            payoutAmount: _payoutAmount,
            triggered: false,
            triggerDate: 0,
            triggerReason: ""
        });
        
        emit ParametricTriggerSet(_policyId, _threshold, _payoutAmount);
    }
    
    function executeParametricTrigger(
        uint256 _policyId,
        string memory _reason
    ) external onlyRole(ORACLE_ROLE) {
        ParametricTrigger storage trigger = parametricTriggers[_policyId];
        require(!trigger.triggered, "Trigger already executed");
        require(policies[_policyId].active, "Policy not active");
        
        trigger.triggered = true;
        trigger.triggerDate = block.timestamp;
        trigger.triggerReason = _reason;
        
        // Call triggerParametricClaim directly
        Policy storage policy = policies[_policyId];
        require(policy.active, "Policy not active");
        require(block.timestamp < policy.endDate, "Policy expired");
        require(trigger.payoutAmount <= policy.coverage - policy.totalClaimed, "Amount exceeds remaining coverage");
        require(trigger.payoutAmount > 0, "Amount must be greater than 0");
        
        // Calculate oracle fee
        uint256 oracleFee = (trigger.payoutAmount * ORACLE_FEE) / 100;
        uint256 payoutAmount = trigger.payoutAmount - oracleFee;
        
        // Update policy
        policy.claimsCount++;
        policy.totalClaimed += trigger.payoutAmount;
        
        // Update risk pool
        RiskPool storage pool = riskPools[policy.insuranceType];
        pool.totalClaims += trigger.payoutAmount;
        pool.reserves -= trigger.payoutAmount;
        
        // Automatic payout
        payable(policy.holder).transfer(payoutAmount);
        payable(msg.sender).transfer(oracleFee); // Oracle fee
        
        // Update user stats
        userTotalClaims[policy.holder] += trigger.payoutAmount;
        
        emit ClaimTriggered(_policyId, trigger.payoutAmount, _reason, policy.holder);
    }
    
    function renewPolicy(uint256 _policyId, uint256 _duration) external payable nonReentrant {
        Policy storage policy = policies[_policyId];
        require(policy.holder == msg.sender, "Not policy holder");
        require(policy.active, "Policy not active");
        require(msg.value >= policy.premium, "Insufficient premium");
        
        policy.endDate = block.timestamp + _duration;
        policy.premium = msg.value;
        policy.coverage = calculateCoverage(policy.insuranceType, msg.value);
        
        // Update risk pool
        RiskPool storage pool = riskPools[policy.insuranceType];
        pool.totalPremiums += msg.value;
        pool.reserves += msg.value;
        
        emit PolicyRenewed(_policyId, policy.endDate);
    }
    
    function calculateCoverage(
        InsuranceType _type,
        uint256 _premium
    ) public view returns (uint256) {
        RiskPool storage pool = riskPools[_type];
        uint256 maxCoverage = (_premium * pool.maxCoverageRatio);
        
        // Apply risk-based adjustments
        if (_type == InsuranceType.HEALTH) {
            return maxCoverage; // 50x for health
        } else if (_type == InsuranceType.WEATHER) {
            return maxCoverage; // 100x for weather
        } else if (_type == InsuranceType.SECURITY) {
            return (maxCoverage * 75) / 100; // 75x for security
        } else {
            return (maxCoverage * 60) / 100; // 60x for mobility
        }
    }
    
    function getUserPolicies(address _user) external view returns (uint256[] memory) {
        return userPolicies[_user];
    }
    
    function getPolicyDetails(uint256 _policyId) external view returns (Policy memory) {
        return policies[_policyId];
    }
    
    function getRiskPoolStats(InsuranceType _type) external view returns (RiskPool memory) {
        return riskPools[_type];
    }
    
    function calculateUserStats(address _user) external view returns (
        uint256 totalPremiums,
        uint256 totalClaims,
        uint256 activePolicies,
        uint256 totalCoverage
    ) {
        totalPremiums = userTotalPremiums[_user];
        totalClaims = userTotalClaims[_user];
        
        uint256[] memory userPolicyIds = userPolicies[_user];
        for (uint256 i = 0; i < userPolicyIds.length; i++) {
            Policy memory policy = policies[userPolicyIds[i]];
            if (policy.active && block.timestamp < policy.endDate) {
                activePolicies++;
                totalCoverage += policy.coverage - policy.totalClaimed;
            }
        }
    }
    
    // Investment and yield functions
    function investReserves(InsuranceType _type, uint256 _amount) external onlyRole(GOVERNANCE_ROLE) {
        RiskPool storage pool = riskPools[_type];
        require(_amount <= pool.reserves, "Insufficient reserves");
        require(_amount > 0, "Amount must be greater than 0");
        
        // Simulate DeFi investment (in real implementation, this would interact with DeFi protocols)
        pool.reserves -= _amount;
        pool.investmentYield += _amount; // Simplified yield calculation
        
        emit YieldGenerated(_type, _amount);
    }
    
    function withdrawYield(InsuranceType _type, uint256 _amount) external onlyRole(GOVERNANCE_ROLE) {
        RiskPool storage pool = riskPools[_type];
        require(_amount <= pool.investmentYield, "Insufficient yield");
        
        pool.investmentYield -= _amount;
        payable(msg.sender).transfer(_amount);
    }
    
    // Emergency functions
    function pause() external onlyRole(DEFAULT_ADMIN_ROLE) {
        _pause();
    }
    
    function unpause() external onlyRole(DEFAULT_ADMIN_ROLE) {
        _unpause();
    }
    
    function emergencyWithdraw() external onlyRole(DEFAULT_ADMIN_ROLE) {
        payable(msg.sender).transfer(address(this).balance);
    }
    
    // Receive function for ETH deposits
    receive() external payable {}
}
