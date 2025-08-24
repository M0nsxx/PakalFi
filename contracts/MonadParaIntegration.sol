// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title MonadParaIntegration
 * @dev Smart contracts for Para x Monad Mobile3 Hackathon
 * - Instant USDC payments via App Clips
 * - Goal-based savings with automatic locking
 */
contract MonadParaIntegration is ReentrancyGuard, Ownable {
    
    // USDC token interface
    IERC20 public usdcToken;
    
    // Events
    event PaymentProcessed(
        address indexed sender,
        address indexed recipient,
        uint256 amount,
        string paymentId,
        uint256 timestamp
    );
    
    event SavingsGoalCreated(
        address indexed user,
        uint256 indexed goalId,
        string name,
        uint256 targetAmount,
        uint256 deadline
    );
    
    event SavingsDeposited(
        address indexed user,
        uint256 indexed goalId,
        uint256 amount,
        uint256 newBalance
    );
    
    event GoalCompleted(
        address indexed user,
        uint256 indexed goalId,
        uint256 totalAmount,
        uint256 timestamp
    );
    
    event GoalLocked(
        address indexed user,
        uint256 indexed goalId,
        uint256 lockedAmount,
        uint256 timestamp
    );
    
    // Structs
    struct SavingsGoal {
        uint256 id;
        address user;
        string name;
        uint256 targetAmount;
        uint256 currentAmount;
        uint256 deadline;
        bool isLocked;
        bool isCompleted;
        uint256 createdAt;
    }
    
    // State variables
    uint256 public nextGoalId = 1;
    mapping(uint256 => SavingsGoal) public savingsGoals;
    mapping(address => uint256[]) public userGoals;
    mapping(string => bool) public processedPayments;
    
    // Constructor
    constructor(address _usdcToken) Ownable(msg.sender) {
        usdcToken = IERC20(_usdcToken);
    }
    
    /**
     * @dev Process instant USDC payment (Bounty 1: App Clips)
     * @param recipient Address to receive the payment
     * @param amount Amount in USDC (6 decimals)
     * @param paymentId Unique payment identifier
     */
    function processInstantPayment(
        address recipient,
        uint256 amount,
        string calldata paymentId
    ) external nonReentrant {
        require(recipient != address(0), "Invalid recipient");
        require(amount > 0, "Amount must be greater than 0");
        require(!processedPayments[paymentId], "Payment already processed");
        require(
            usdcToken.transferFrom(msg.sender, recipient, amount),
            "USDC transfer failed"
        );
        
        processedPayments[paymentId] = true;
        
        emit PaymentProcessed(
            msg.sender,
            recipient,
            amount,
            paymentId,
            block.timestamp
        );
    }
    
    /**
     * @dev Create a new savings goal (Bounty 2: Goal-based savings)
     * @param name Goal name
     * @param targetAmount Target amount in USDC (6 decimals)
     * @param deadline Goal deadline timestamp
     * @param initialDeposit Initial deposit amount
     */
    function createSavingsGoal(
        string calldata name,
        uint256 targetAmount,
        uint256 deadline,
        uint256 initialDeposit
    ) external nonReentrant {
        require(bytes(name).length > 0, "Name cannot be empty");
        require(targetAmount > 0, "Target amount must be greater than 0");
        require(deadline > block.timestamp, "Deadline must be in the future");
        
        uint256 goalId = nextGoalId++;
        
        SavingsGoal storage goal = savingsGoals[goalId];
        goal.id = goalId;
        goal.user = msg.sender;
        goal.name = name;
        goal.targetAmount = targetAmount;
        goal.currentAmount = initialDeposit;
        goal.deadline = deadline;
        goal.isLocked = false;
        goal.isCompleted = false;
        goal.createdAt = block.timestamp;
        
        userGoals[msg.sender].push(goalId);
        
        // Transfer initial deposit if provided
        if (initialDeposit > 0) {
            require(
                usdcToken.transferFrom(msg.sender, address(this), initialDeposit),
                "Initial deposit transfer failed"
            );
            
            // Check if goal is already completed
            if (initialDeposit >= targetAmount) {
                goal.isCompleted = true;
                emit GoalCompleted(msg.sender, goalId, initialDeposit, block.timestamp);
            }
        }
        
        emit SavingsGoalCreated(
            msg.sender,
            goalId,
            name,
            targetAmount,
            deadline
        );
        
        if (initialDeposit > 0) {
            emit SavingsDeposited(
                msg.sender,
                goalId,
                initialDeposit,
                initialDeposit
            );
        }
    }
    
    /**
     * @dev Add funds to an existing savings goal
     * @param goalId ID of the savings goal
     * @param amount Amount to add in USDC (6 decimals)
     */
    function addToSavingsGoal(uint256 goalId, uint256 amount) external nonReentrant {
        SavingsGoal storage goal = savingsGoals[goalId];
        require(goal.user == msg.sender, "Not your goal");
        require(!goal.isLocked, "Goal is locked");
        require(!goal.isCompleted, "Goal already completed");
        require(amount > 0, "Amount must be greater than 0");
        
        require(
            usdcToken.transferFrom(msg.sender, address(this), amount),
            "USDC transfer failed"
        );
        
        goal.currentAmount += amount;
        
        // Check if goal is completed
        if (goal.currentAmount >= goal.targetAmount && !goal.isCompleted) {
            goal.isCompleted = true;
            emit GoalCompleted(msg.sender, goalId, goal.currentAmount, block.timestamp);
        }
        
        emit SavingsDeposited(
            msg.sender,
            goalId,
            amount,
            goal.currentAmount
        );
    }
    
    /**
     * @dev Lock a completed savings goal
     * @param goalId ID of the savings goal
     */
    function lockSavingsGoal(uint256 goalId) external {
        SavingsGoal storage goal = savingsGoals[goalId];
        require(goal.user == msg.sender, "Not your goal");
        require(goal.isCompleted, "Goal not completed");
        require(!goal.isLocked, "Goal already locked");
        
        goal.isLocked = true;
        
        emit GoalLocked(
            msg.sender,
            goalId,
            goal.currentAmount,
            block.timestamp
        );
    }
    
    /**
     * @dev Withdraw funds from a locked goal (only owner for demo purposes)
     * In production, this would have more sophisticated logic
     * @param goalId ID of the savings goal
     * @param amount Amount to withdraw
     */
    function withdrawFromLockedGoal(uint256 goalId, uint256 amount) external onlyOwner {
        SavingsGoal storage goal = savingsGoals[goalId];
        require(goal.isLocked, "Goal not locked");
        require(amount <= goal.currentAmount, "Insufficient balance");
        
        goal.currentAmount -= amount;
        
        require(
            usdcToken.transfer(goal.user, amount),
            "USDC transfer failed"
        );
    }
    
    /**
     * @dev Get user's savings goals
     * @param user User address
     * @return Array of goal IDs
     */
    function getUserGoals(address user) external view returns (uint256[] memory) {
        return userGoals[user];
    }
    
    /**
     * @dev Get savings goal details
     * @param goalId Goal ID
     * @return Goal details
     */
    function getSavingsGoal(uint256 goalId) external view returns (SavingsGoal memory) {
        return savingsGoals[goalId];
    }
    
    /**
     * @dev Check if payment was processed
     * @param paymentId Payment ID
     * @return True if processed
     */
    function isPaymentProcessed(string calldata paymentId) external view returns (bool) {
        return processedPayments[paymentId];
    }
    
    /**
     * @dev Emergency withdraw (only owner)
     * @param token Token address
     * @param amount Amount to withdraw
     */
    function emergencyWithdraw(address token, uint256 amount) external onlyOwner {
        IERC20(token).transfer(owner(), amount);
    }
}

/**
 * @title USDC Mock for testing
 * @dev Mock USDC token for testing purposes
 */
contract MockUSDC is IERC20 {
    string public name = "Mock USDC";
    string public symbol = "USDC";
    uint8 public decimals = 6;
    uint256 public totalSupply;
    
    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;
    
    function mint(address to, uint256 amount) external {
        balanceOf[to] += amount;
        totalSupply += amount;
        emit Transfer(address(0), to, amount);
    }
    
    function transfer(address to, uint256 amount) external override returns (bool) {
        require(balanceOf[msg.sender] >= amount, "Insufficient balance");
        balanceOf[msg.sender] -= amount;
        balanceOf[to] += amount;
        emit Transfer(msg.sender, to, amount);
        return true;
    }
    
    function approve(address spender, uint256 amount) external override returns (bool) {
        allowance[msg.sender][spender] = amount;
        emit Approval(msg.sender, spender, amount);
        return true;
    }
    
    function transferFrom(address from, address to, uint256 amount) external override returns (bool) {
        require(balanceOf[from] >= amount, "Insufficient balance");
        require(allowance[from][msg.sender] >= amount, "Insufficient allowance");
        balanceOf[from] -= amount;
        balanceOf[to] += amount;
        allowance[from][msg.sender] -= amount;
        emit Transfer(from, to, amount);
        return true;
    }
}
