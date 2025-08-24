// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract SavingsGoalHandler is AccessControl, ReentrancyGuard, Pausable {
    bytes32 public constant ORACLE_ROLE = keccak256("ORACLE_ROLE");
    bytes32 public constant GOVERNANCE_ROLE = keccak256("GOVERNANCE_ROLE");
    bytes32 public constant SAVINGS_ROLE = keccak256("SAVINGS_ROLE");
    
    enum GoalStatus {
        ACTIVE,
        COMPLETED,
        CANCELLED,
        CONVERTED_TO_POLICY
    }
    
    enum GoalType {
        HEALTH_INSURANCE,
        CLIMATE_INSURANCE,
        SECURITY_INSURANCE,
        MOBILITY_INSURANCE,
        GENERAL_SAVINGS
    }
    
    struct SavingsGoal {
        uint256 goalId;
        address owner;
        string name;
        string description;
        uint256 targetAmount;
        uint256 currentAmount;
        uint256 deadline;
        GoalStatus status;
        GoalType goalType;
        string currency;
        uint256 chainId;
        uint256 createdAt;
        uint256 lastContribution;
        bool autoConvertToPolicy;
        uint256 policyId; // If converted to policy
        string paraWalletId; // Para Wallet integration
    }
    
    struct Contribution {
        uint256 contributionId;
        uint256 goalId;
        address contributor;
        uint256 amount;
        uint256 timestamp;
        string currency;
        bool recurring;
        uint256 frequency; // Days between recurring contributions
    }
    
    struct PolicyConversion {
        uint256 conversionId;
        uint256 goalId;
        uint256 policyId;
        address owner;
        uint256 convertedAmount;
        uint256 timestamp;
        string insuranceType;
        uint256 coverageAmount;
    }
    
    mapping(uint256 => SavingsGoal) public savingsGoals;
    mapping(uint256 => Contribution) public contributions;
    mapping(uint256 => PolicyConversion) public policyConversions;
    mapping(address => uint256[]) public userGoals;
    mapping(string => uint256[]) public currencyGoals;
    mapping(GoalType => uint256[]) public typeGoals;
    mapping(string => uint256) public paraWalletGoals; // paraWalletId => goalId
    
    uint256 private _goalIdCounter;
    uint256 private _contributionIdCounter;
    uint256 private _conversionIdCounter;
    
    uint256 public constant MIN_GOAL_AMOUNT = 10 * 10**18; // 10 USD equivalent
    uint256 public constant MAX_GOAL_AMOUNT = 100000 * 10**18; // 100k USD equivalent
    uint256 public constant MIN_CONTRIBUTION = 1 * 10**18; // 1 USD equivalent
    uint256 public constant MAX_DEADLINE = 365 days;
    
    event SavingsGoalCreated(uint256 indexed goalId, address indexed owner, string name, uint256 targetAmount, GoalType goalType);
    event ContributionMade(uint256 indexed goalId, address indexed contributor, uint256 amount, string currency);
    event GoalCompleted(uint256 indexed goalId, address indexed owner, uint256 finalAmount);
    event GoalCancelled(uint256 indexed goalId, address indexed owner, uint256 refundAmount);
    event PolicyConverted(uint256 indexed goalId, uint256 indexed policyId, address indexed owner, uint256 convertedAmount);
    event ParaWalletLinked(uint256 indexed goalId, string paraWalletId);
    event RecurringContributionSet(uint256 indexed goalId, address indexed contributor, uint256 frequency);
    
    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(GOVERNANCE_ROLE, msg.sender);
        _grantRole(ORACLE_ROLE, msg.sender);
        _grantRole(SAVINGS_ROLE, msg.sender);
    }
    
    function createSavingsGoal(
        string memory _name,
        string memory _description,
        uint256 _targetAmount,
        uint256 _deadline,
        GoalType _goalType,
        string memory _currency,
        bool _autoConvertToPolicy
    ) external whenNotPaused returns (uint256) {
        require(_targetAmount >= MIN_GOAL_AMOUNT, "Target amount too low");
        require(_targetAmount <= MAX_GOAL_AMOUNT, "Target amount too high");
        require(_deadline <= block.timestamp + MAX_DEADLINE, "Deadline too far");
        require(_deadline > block.timestamp, "Deadline must be in the future");
        
        uint256 goalId = _goalIdCounter;
        _goalIdCounter++;
        
        savingsGoals[goalId] = SavingsGoal({
            goalId: goalId,
            owner: msg.sender,
            name: _name,
            description: _description,
            targetAmount: _targetAmount,
            currentAmount: 0,
            deadline: _deadline,
            status: GoalStatus.ACTIVE,
            goalType: _goalType,
            currency: _currency,
            chainId: block.chainid,
            createdAt: block.timestamp,
            lastContribution: 0,
            autoConvertToPolicy: _autoConvertToPolicy,
            policyId: 0,
            paraWalletId: ""
        });
        
        userGoals[msg.sender].push(goalId);
        currencyGoals[_currency].push(goalId);
        typeGoals[_goalType].push(goalId);
        
        emit SavingsGoalCreated(goalId, msg.sender, _name, _targetAmount, _goalType);
        return goalId;
    }
    
    function contributeToGoal(
        uint256 _goalId,
        uint256 _amount,
        string memory _currency
    ) external payable nonReentrant whenNotPaused {
        SavingsGoal storage goal = savingsGoals[_goalId];
        require(goal.status == GoalStatus.ACTIVE, "Goal not active");
        require(goal.deadline > block.timestamp, "Goal deadline passed");
        require(_amount >= MIN_CONTRIBUTION, "Contribution too small");
        require(keccak256(bytes(goal.currency)) == keccak256(bytes(_currency)), "Currency mismatch");
        
        // Handle ETH contributions
        if (msg.value > 0) {
            require(msg.value == _amount, "Amount mismatch");
            require(keccak256(bytes(_currency)) == keccak256(bytes("ETH")), "Currency mismatch for ETH");
        }
        
        goal.currentAmount += _amount;
        goal.lastContribution = block.timestamp;
        
        uint256 contributionId = _contributionIdCounter;
        _contributionIdCounter++;
        
        contributions[contributionId] = Contribution({
            contributionId: contributionId,
            goalId: _goalId,
            contributor: msg.sender,
            amount: _amount,
            timestamp: block.timestamp,
            currency: _currency,
            recurring: false,
            frequency: 0
        });
        
        emit ContributionMade(_goalId, msg.sender, _amount, _currency);
        
        // Check if goal is completed
        if (goal.currentAmount >= goal.targetAmount) {
            completeGoal(_goalId);
        }
    }
    
    function setRecurringContribution(
        uint256 _goalId,
        uint256 _amount,
        uint256 _frequency
    ) external whenNotPaused {
        SavingsGoal storage goal = savingsGoals[_goalId];
        require(goal.status == GoalStatus.ACTIVE, "Goal not active");
        require(goal.owner == msg.sender, "Not goal owner");
        require(_amount >= MIN_CONTRIBUTION, "Contribution too small");
        require(_frequency >= 1 days && _frequency <= 30 days, "Invalid frequency");
        
        uint256 contributionId = _contributionIdCounter;
        _contributionIdCounter++;
        
        contributions[contributionId] = Contribution({
            contributionId: contributionId,
            goalId: _goalId,
            contributor: msg.sender,
            amount: _amount,
            timestamp: block.timestamp,
            currency: goal.currency,
            recurring: true,
            frequency: _frequency
        });
        
        emit RecurringContributionSet(_goalId, msg.sender, _frequency);
    }
    
    function executeRecurringContributions(uint256 _goalId) external onlyRole(SAVINGS_ROLE) {
        SavingsGoal storage goal = savingsGoals[_goalId];
        require(goal.status == GoalStatus.ACTIVE, "Goal not active");
        
        uint256[] memory userGoalIds = userGoals[goal.owner];
        
        for (uint256 i = 0; i < userGoalIds.length; i++) {
            if (userGoalIds[i] == _goalId) {
                // Find recurring contributions for this goal
                for (uint256 j = 0; j < _contributionIdCounter; j++) {
                    Contribution storage contribution = contributions[j];
                    if (contribution.goalId == _goalId && 
                        contribution.recurring && 
                        block.timestamp >= contribution.timestamp + contribution.frequency) {
                        
                        // Execute recurring contribution
                        goal.currentAmount += contribution.amount;
                        contribution.timestamp = block.timestamp;
                        
                        emit ContributionMade(_goalId, contribution.contributor, contribution.amount, goal.currency);
                        
                        // Check if goal is completed
                        if (goal.currentAmount >= goal.targetAmount) {
                            completeGoal(_goalId);
                            break;
                        }
                    }
                }
                break;
            }
        }
    }
    
    function linkParaWallet(uint256 _goalId, string memory _paraWalletId) external {
        SavingsGoal storage goal = savingsGoals[_goalId];
        require(goal.owner == msg.sender, "Not goal owner");
        require(goal.status == GoalStatus.ACTIVE, "Goal not active");
        require(bytes(_paraWalletId).length > 0, "Invalid Para Wallet ID");
        
        goal.paraWalletId = _paraWalletId;
        paraWalletGoals[_paraWalletId] = _goalId;
        
        emit ParaWalletLinked(_goalId, _paraWalletId);
    }
    
    function convertToPolicy(uint256 _goalId, uint256 _policyId, string memory _insuranceType) external onlyRole(ORACLE_ROLE) {
        SavingsGoal storage goal = savingsGoals[_goalId];
        require(goal.status == GoalStatus.ACTIVE, "Goal not active");
        require(goal.autoConvertToPolicy, "Auto-convert not enabled");
        require(goal.currentAmount >= goal.targetAmount, "Goal not completed");
        
        goal.status = GoalStatus.CONVERTED_TO_POLICY;
        goal.policyId = _policyId;
        
        uint256 conversionId = _conversionIdCounter;
        _conversionIdCounter++;
        
        policyConversions[conversionId] = PolicyConversion({
            conversionId: conversionId,
            goalId: _goalId,
            policyId: _policyId,
            owner: goal.owner,
            convertedAmount: goal.currentAmount,
            timestamp: block.timestamp,
            insuranceType: _insuranceType,
            coverageAmount: goal.currentAmount * 50 // 50x coverage for completed goals
        });
        
        emit PolicyConverted(_goalId, _policyId, goal.owner, goal.currentAmount);
    }
    
    function completeGoal(uint256 _goalId) internal {
        SavingsGoal storage goal = savingsGoals[_goalId];
        goal.status = GoalStatus.COMPLETED;
        
        emit GoalCompleted(_goalId, goal.owner, goal.currentAmount);
        
        // Auto-convert to policy if enabled
        if (goal.autoConvertToPolicy) {
            // This would trigger policy creation
            // Implementation depends on integration with insurance contracts
        }
    }
    
    function cancelGoal(uint256 _goalId) external nonReentrant {
        SavingsGoal storage goal = savingsGoals[_goalId];
        require(goal.owner == msg.sender, "Not goal owner");
        require(goal.status == GoalStatus.ACTIVE, "Goal not active");
        
        goal.status = GoalStatus.CANCELLED;
        
        // Refund contributions
        if (goal.currentAmount > 0) {
            payable(msg.sender).transfer(goal.currentAmount);
        }
        
        emit GoalCancelled(_goalId, msg.sender, goal.currentAmount);
    }
    
    function getSavingsGoal(uint256 _goalId) external view returns (SavingsGoal memory) {
        return savingsGoals[_goalId];
    }
    
    function getUserGoals(address _user) external view returns (uint256[] memory) {
        return userGoals[_user];
    }
    
    function getCurrencyGoals(string memory _currency) external view returns (uint256[] memory) {
        return currencyGoals[_currency];
    }
    
    function getTypeGoals(GoalType _type) external view returns (uint256[] memory) {
        return typeGoals[_type];
    }
    
    function getGoalContributions(uint256 _goalId) external view returns (uint256[] memory) {
        uint256[] memory contributionIds = new uint256[](_contributionIdCounter);
        uint256 count = 0;
        
        for (uint256 i = 0; i < _contributionIdCounter; i++) {
            if (contributions[i].goalId == _goalId) {
                contributionIds[count] = i;
                count++;
            }
        }
        
        // Resize array
        uint256[] memory result = new uint256[](count);
        for (uint256 i = 0; i < count; i++) {
            result[i] = contributionIds[i];
        }
        
        return result;
    }
    
    function getGoalProgress(uint256 _goalId) external view returns (
        uint256 currentAmount,
        uint256 targetAmount,
        uint256 progressPercentage,
        uint256 daysRemaining,
        bool isCompleted
    ) {
        SavingsGoal storage goal = savingsGoals[_goalId];
        currentAmount = goal.currentAmount;
        targetAmount = goal.targetAmount;
        progressPercentage = targetAmount > 0 ? (currentAmount * 100) / targetAmount : 0;
        daysRemaining = goal.deadline > block.timestamp ? (goal.deadline - block.timestamp) / 1 days : 0;
        isCompleted = goal.currentAmount >= goal.targetAmount;
    }
    
    function getSavingsStats() external view returns (
        uint256 totalGoals,
        uint256 activeGoals,
        uint256 completedGoals,
        uint256 totalContributions,
        uint256 totalAmount,
        uint256[] memory typeCounts,
        uint256[] memory currencyCounts
    ) {
        typeCounts = new uint256[](5); // 5 goal types
        currencyCounts = new uint256[](10); // Support for 10 currencies
        
        for (uint256 i = 0; i < 5; i++) {
            typeCounts[i] = typeGoals[GoalType(i)].length;
        }
        
        // Count by currency (simplified)
        string[] memory currencies = new string[](10);
        currencies[0] = "USD";
        currencies[1] = "MXN";
        currencies[2] = "NGN";
        currencies[3] = "IDR";
        currencies[4] = "INR";
        currencies[5] = "BRL";
        currencies[6] = "ARS";
        currencies[7] = "COP";
        currencies[8] = "PEN";
        currencies[9] = "CLP";
        
        for (uint256 i = 0; i < 10; i++) {
            currencyCounts[i] = currencyGoals[currencies[i]].length;
        }
        
        // Calculate totals
        for (uint256 i = 0; i < _goalIdCounter; i++) {
            SavingsGoal storage goal = savingsGoals[i];
            totalGoals++;
            totalAmount += goal.currentAmount;
            
            if (goal.status == GoalStatus.ACTIVE) {
                activeGoals++;
            } else if (goal.status == GoalStatus.COMPLETED || goal.status == GoalStatus.CONVERTED_TO_POLICY) {
                completedGoals++;
            }
        }
        
        totalContributions = _contributionIdCounter;
    }
    
    function pause() external onlyRole(GOVERNANCE_ROLE) {
        _pause();
    }
    
    function unpause() external onlyRole(GOVERNANCE_ROLE) {
        _unpause();
    }
    
    function emergencyWithdraw() external onlyRole(DEFAULT_ADMIN_ROLE) {
        payable(msg.sender).transfer(address(this).balance);
    }
    
    receive() external payable {}
}
