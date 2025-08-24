// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";
contract ReinsuranceToken is ERC20, ERC20Burnable, AccessControl, ReentrancyGuard, Pausable {
    bytes32 public constant ORACLE_ROLE = keccak256("ORACLE_ROLE");
    bytes32 public constant GOVERNANCE_ROLE = keccak256("GOVERNANCE_ROLE");
    bytes32 public constant INSURANCE_ROLE = keccak256("INSURANCE_ROLE");

    struct ReinsurancePool {
        uint256 poolId;
        string name;
        string description;
        uint256 totalCapacity;
        uint256 usedCapacity;
        uint256 premiumRate; // Basis points (100 = 1%)
        uint256 riskScore; // 0-1000
        uint256 minInvestment;
        uint256 maxInvestment;
        uint256 lockPeriod;
        bool active;
        uint256 totalClaims;
        uint256 totalPremiums;
        uint256 createdAt;
        uint256 expiresAt;
    }

    struct Investment {
        uint256 investmentId;
        address investor;
        uint256 poolId;
        uint256 amount;
        uint256 shares;
        uint256 startDate;
        uint256 endDate;
        bool active;
        uint256 earnedYield;
        uint256 claimedAmount;
    }

    struct Claim {
        uint256 claimId;
        uint256 poolId;
        uint256 amount;
        string reason;
        uint256 timestamp;
        bool approved;
        bool paid;
        address claimant;
    }

    uint256 private _poolIds;
    uint256 private _investmentIds;
    uint256 private _claimIds;

    mapping(uint256 => ReinsurancePool) public pools;
    mapping(uint256 => Investment) public investments;
    mapping(uint256 => Claim) public claims;
    mapping(address => uint256[]) public investorPools;
    mapping(uint256 => uint256[]) public poolInvestments;
    mapping(uint256 => uint256[]) public poolClaims;

    uint256 public constant BASIS_POINTS = 10000;
    uint256 public constant MIN_LOCK_PERIOD = 30 days;
    uint256 public constant MAX_LOCK_PERIOD = 365 days;
    uint256 public constant GOVERNANCE_FEE = 50; // 0.5%
    uint256 public constant ORACLE_FEE = 25; // 0.25%

    event PoolCreated(uint256 indexed poolId, string name, uint256 capacity, uint256 premiumRate);
    event InvestmentMade(uint256 indexed investmentId, address indexed investor, uint256 poolId, uint256 amount, uint256 shares);
    event ClaimFiled(uint256 indexed claimId, uint256 poolId, uint256 amount, string reason);
    event ClaimApproved(uint256 indexed claimId, uint256 amount);
    event ClaimPaid(uint256 indexed claimId, uint256 amount);
    event YieldDistributed(uint256 poolId, uint256 totalYield, uint256 totalShares);
    event PoolClosed(uint256 indexed poolId, uint256 totalReturn);

    constructor() ERC20("MicroSeguro Reinsurance", "MSR") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(GOVERNANCE_ROLE, msg.sender);
        _grantRole(ORACLE_ROLE, msg.sender);
        _grantRole(INSURANCE_ROLE, msg.sender);
    }

    function createPool(
        string memory _name,
        string memory _description,
        uint256 _capacity,
        uint256 _premiumRate,
        uint256 _riskScore,
        uint256 _minInvestment,
        uint256 _maxInvestment,
        uint256 _lockPeriod
    ) external onlyRole(GOVERNANCE_ROLE) returns (uint256) {
        require(_capacity > 0, "Capacity must be greater than 0");
        require(_premiumRate <= 1000, "Premium rate too high"); // Max 10%
        require(_riskScore <= 1000, "Risk score out of range");
        require(_lockPeriod >= MIN_LOCK_PERIOD && _lockPeriod <= MAX_LOCK_PERIOD, "Invalid lock period");
        require(_minInvestment <= _maxInvestment, "Invalid investment range");

        uint256 poolId = _poolIds;
        _poolIds++;

        pools[poolId] = ReinsurancePool({
            poolId: poolId,
            name: _name,
            description: _description,
            totalCapacity: _capacity,
            usedCapacity: 0,
            premiumRate: _premiumRate,
            riskScore: _riskScore,
            minInvestment: _minInvestment,
            maxInvestment: _maxInvestment,
            lockPeriod: _lockPeriod,
            active: true,
            totalClaims: 0,
            totalPremiums: 0,
            createdAt: block.timestamp,
            expiresAt: block.timestamp + _lockPeriod
        });

        emit PoolCreated(poolId, _name, _capacity, _premiumRate);
        return poolId;
    }

    function invest(uint256 _poolId, uint256 _amount) external nonReentrant whenNotPaused {
        ReinsurancePool storage pool = pools[_poolId];
        require(pool.active, "Pool is not active");
        require(_amount >= pool.minInvestment, "Investment too small");
        require(_amount <= pool.maxInvestment, "Investment too large");
        require(pool.usedCapacity + _amount <= pool.totalCapacity, "Pool capacity exceeded");
        require(block.timestamp < pool.expiresAt, "Pool has expired");

        // Calculate shares based on pool capacity and investment amount
        uint256 shares = (_amount * pool.totalCapacity) / pool.totalCapacity;
        
        // Transfer tokens from investor
        _transfer(msg.sender, address(this), _amount);

        uint256 investmentId = _investmentIds;
        _investmentIds++;

        investments[investmentId] = Investment({
            investmentId: investmentId,
            investor: msg.sender,
            poolId: _poolId,
            amount: _amount,
            shares: shares,
            startDate: block.timestamp,
            endDate: block.timestamp + pool.lockPeriod,
            active: true,
            earnedYield: 0,
            claimedAmount: 0
        });

        // Update pool
        pool.usedCapacity += _amount;
        pool.totalPremiums += _amount;

        // Update mappings
        investorPools[msg.sender].push(_poolId);
        poolInvestments[_poolId].push(investmentId);

        emit InvestmentMade(investmentId, msg.sender, _poolId, _amount, shares);
    }

    function fileClaim(
        uint256 _poolId,
        uint256 _amount,
        string memory _reason
    ) external onlyRole(INSURANCE_ROLE) returns (uint256) {
        ReinsurancePool storage pool = pools[_poolId];
        require(pool.active, "Pool is not active");
        require(_amount <= pool.usedCapacity, "Claim amount exceeds pool capacity");

        uint256 claimId = _claimIds;
        _claimIds++;

        claims[claimId] = Claim({
            claimId: claimId,
            poolId: _poolId,
            amount: _amount,
            reason: _reason,
            timestamp: block.timestamp,
            approved: false,
            paid: false,
            claimant: msg.sender
        });

        pool.totalClaims += _amount;
        poolClaims[_poolId].push(claimId);

        emit ClaimFiled(claimId, _poolId, _amount, _reason);
        return claimId;
    }

    function approveClaim(uint256 _claimId) external onlyRole(ORACLE_ROLE) {
        Claim storage claim = claims[_claimId];
        require(!claim.approved, "Claim already approved");
        require(!claim.paid, "Claim already paid");

        claim.approved = true;
        emit ClaimApproved(_claimId, claim.amount);
    }

    function payClaim(uint256 _claimId) external onlyRole(GOVERNANCE_ROLE) nonReentrant {
        Claim storage claim = claims[_claimId];
        require(claim.approved, "Claim not approved");
        require(!claim.paid, "Claim already paid");

        ReinsurancePool storage pool = pools[claim.poolId];
        require(pool.usedCapacity >= claim.amount, "Insufficient pool funds");

        // Calculate how much each investor loses proportionally
        uint256[] memory poolInvestmentIds = poolInvestments[claim.poolId];
        uint256 totalShares = 0;

        for (uint256 i = 0; i < poolInvestmentIds.length; i++) {
            Investment storage investment = investments[poolInvestmentIds[i]];
            if (investment.active) {
                totalShares += investment.shares;
            }
        }

        // Distribute losses proportionally
        for (uint256 i = 0; i < poolInvestmentIds.length; i++) {
            Investment storage investment = investments[poolInvestmentIds[i]];
            if (investment.active) {
                uint256 lossShare = (claim.amount * investment.shares) / totalShares;
                investment.earnedYield = investment.earnedYield > lossShare ? 
                    investment.earnedYield - lossShare : 0;
            }
        }

        pool.usedCapacity -= claim.amount;
        claim.paid = true;

        // Transfer claim amount to claimant
        _transfer(address(this), claim.claimant, claim.amount);

        emit ClaimPaid(_claimId, claim.amount);
    }

    function distributeYield(uint256 _poolId) external onlyRole(GOVERNANCE_ROLE) {
        ReinsurancePool storage pool = pools[_poolId];
        require(pool.active, "Pool is not active");

        uint256 totalYield = calculatePoolYield(_poolId);
        uint256 totalShares = 0;

        uint256[] memory poolInvestmentIds = poolInvestments[_poolId];
        
        for (uint256 i = 0; i < poolInvestmentIds.length; i++) {
            Investment storage investment = investments[poolInvestmentIds[i]];
            if (investment.active) {
                totalShares += investment.shares;
            }
        }

        if (totalShares > 0) {
            for (uint256 i = 0; i < poolInvestmentIds.length; i++) {
                Investment storage investment = investments[poolInvestmentIds[i]];
                if (investment.active) {
                    uint256 yieldShare = (totalYield * investment.shares) / totalShares;
                    investment.earnedYield += yieldShare;
                }
            }
        }

        emit YieldDistributed(_poolId, totalYield, totalShares);
    }

    function withdrawInvestment(uint256 _investmentId) external nonReentrant {
        Investment storage investment = investments[_investmentId];
        require(investment.investor == msg.sender, "Not your investment");
        require(investment.active, "Investment not active");
        require(block.timestamp >= investment.endDate, "Lock period not ended");

        uint256 totalAmount = investment.amount + investment.earnedYield - investment.claimedAmount;
        require(totalAmount > 0, "Nothing to withdraw");

        investment.active = false;
        investment.claimedAmount = investment.amount + investment.earnedYield;

        // Transfer tokens back to investor
        _transfer(address(this), msg.sender, totalAmount);
    }

    function closePool(uint256 _poolId) external onlyRole(GOVERNANCE_ROLE) {
        ReinsurancePool storage pool = pools[_poolId];
        require(pool.active, "Pool already closed");
        require(block.timestamp >= pool.expiresAt, "Pool not expired");

        pool.active = false;

        // Calculate total return for the pool
        uint256 totalReturn = pool.totalPremiums - pool.totalClaims;
        
        emit PoolClosed(_poolId, totalReturn);
    }

    function calculatePoolYield(uint256 _poolId) public view returns (uint256) {
        ReinsurancePool storage pool = pools[_poolId];
        if (pool.totalPremiums == 0) return 0;

        uint256 timeElapsed = block.timestamp - pool.createdAt;
        uint256 annualYield = (pool.totalPremiums * pool.premiumRate) / BASIS_POINTS;
        uint256 yield = (annualYield * timeElapsed) / 365 days;

        return yield > pool.totalClaims ? yield - pool.totalClaims : 0;
    }

    function getPoolInvestments(uint256 _poolId) external view returns (uint256[] memory) {
        return poolInvestments[_poolId];
    }

    function getInvestorPools(address _investor) external view returns (uint256[] memory) {
        return investorPools[_investor];
    }

    function getPoolClaims(uint256 _poolId) external view returns (uint256[] memory) {
        return poolClaims[_poolId];
    }

    function getPoolStats(uint256 _poolId) external view returns (
        uint256 totalInvestments,
        uint256 totalInvestors,
        uint256 utilizationRate,
        uint256 currentYield
    ) {
        ReinsurancePool storage pool = pools[_poolId];
        uint256[] memory poolInvestmentIds = poolInvestments[_poolId];
        
        totalInvestments = poolInvestmentIds.length;
        totalInvestors = 0;
        
        // Use a simple array to track unique investors
        address[] memory uniqueInvestorAddresses = new address[](poolInvestmentIds.length);
        uint256 uniqueCount = 0;

        for (uint256 i = 0; i < poolInvestmentIds.length; i++) {
            Investment storage investment = investments[poolInvestmentIds[i]];
            if (investment.active) {
                bool isUnique = true;
                for (uint256 j = 0; j < uniqueCount; j++) {
                    if (uniqueInvestorAddresses[j] == investment.investor) {
                        isUnique = false;
                        break;
                    }
                }
                if (isUnique) {
                    uniqueInvestorAddresses[uniqueCount] = investment.investor;
                    uniqueCount++;
                }
            }
        }

        totalInvestors = uniqueCount;
        utilizationRate = pool.totalCapacity > 0 ? (pool.usedCapacity * 100) / pool.totalCapacity : 0;
        currentYield = calculatePoolYield(_poolId);

        return (totalInvestments, totalInvestors, utilizationRate, currentYield);
    }

    function pause() external onlyRole(GOVERNANCE_ROLE) {
        _pause();
    }

    function unpause() external onlyRole(GOVERNANCE_ROLE) {
        _unpause();
    }

    function mint(address to, uint256 amount) external onlyRole(GOVERNANCE_ROLE) {
        _mint(to, amount);
    }

    function burn(uint256 amount) public override onlyRole(GOVERNANCE_ROLE) {
        super.burn(amount);
    }

    // Override required functions
    function _update(address from, address to, uint256 value) internal override(ERC20) {
        super._update(from, to, value);
    }
}
