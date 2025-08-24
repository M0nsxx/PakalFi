const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MonadParaIntegration", function () {
  let mockUSDC;
  let monadParaIntegration;
  let owner;
  let user1;
  let user2;
  let recipient;

  beforeEach(async function () {
    [owner, user1, user2, recipient] = await ethers.getSigners();

    // Deploy Mock USDC
    const MockUSDC = await ethers.getContractFactory("MockUSDC");
    mockUSDC = await MockUSDC.deploy();
    await mockUSDC.waitForDeployment();

    // Deploy MonadParaIntegration
    const MonadParaIntegration = await ethers.getContractFactory("MonadParaIntegration");
    const mockUSDCAddress = await mockUSDC.getAddress();
    monadParaIntegration = await MonadParaIntegration.deploy(mockUSDCAddress);
    await monadParaIntegration.waitForDeployment();

    // Mint USDC to users
    const mintAmount = ethers.parseUnits("1000", 6);
    await mockUSDC.mint(user1.address, mintAmount);
    await mockUSDC.mint(user2.address, mintAmount);
    await mockUSDC.mint(owner.address, mintAmount);

    // Approve USDC spending
    const integrationAddress = await monadParaIntegration.getAddress();
    await mockUSDC.connect(user1).approve(integrationAddress, ethers.MaxUint256);
    await mockUSDC.connect(user2).approve(integrationAddress, ethers.MaxUint256);
    await mockUSDC.connect(owner).approve(integrationAddress, ethers.MaxUint256);
  });

  describe("Deployment", function () {
    it("Should deploy with correct USDC token address", async function () {
      const mockUSDCAddress = await mockUSDC.getAddress();
      expect(await monadParaIntegration.usdcToken()).to.equal(mockUSDCAddress);
    });

    it("Should have correct owner", async function () {
      expect(await monadParaIntegration.owner()).to.equal(owner.address);
    });
  });

  describe("Instant Payments (Bounty 1)", function () {
    it("Should process instant payment successfully", async function () {
      const paymentAmount = ethers.parseUnits("50", 6);
      const paymentId = "test_payment_1";

      const initialBalance = await mockUSDC.balanceOf(recipient.address);
      
      await monadParaIntegration.connect(user1).processInstantPayment(
        recipient.address,
        paymentAmount,
        paymentId
      );

      const finalBalance = await mockUSDC.balanceOf(recipient.address);
      expect(finalBalance - initialBalance).to.equal(paymentAmount);
      
      expect(await monadParaIntegration.isPaymentProcessed(paymentId)).to.be.true;
    });

    it("Should emit PaymentProcessed event", async function () {
      const paymentAmount = ethers.parseUnits("25", 6);
      const paymentId = "test_payment_2";

      const tx = await monadParaIntegration.connect(user1).processInstantPayment(
        recipient.address,
        paymentAmount,
        paymentId
      );
      
      await expect(tx).to.emit(monadParaIntegration, "PaymentProcessed")
        .withArgs(user1.address, recipient.address, paymentAmount, paymentId, await time());
    });

    it("Should not allow duplicate payment processing", async function () {
      const paymentAmount = ethers.parseUnits("10", 6);
      const paymentId = "duplicate_payment";

      await monadParaIntegration.connect(user1).processInstantPayment(
        recipient.address,
        paymentAmount,
        paymentId
      );

      await expect(
        monadParaIntegration.connect(user2).processInstantPayment(
          recipient.address,
          paymentAmount,
          paymentId
        )
      ).to.be.revertedWith("Payment already processed");
    });

    it("Should not allow zero amount payments", async function () {
      const paymentId = "zero_payment";

      await expect(
        monadParaIntegration.connect(user1).processInstantPayment(
          recipient.address,
          0,
          paymentId
        )
      ).to.be.revertedWith("Amount must be greater than 0");
    });

    it("Should not allow payments to zero address", async function () {
      const paymentAmount = ethers.parseUnits("10", 6);
      const paymentId = "zero_recipient";

      await expect(
        monadParaIntegration.connect(user1).processInstantPayment(
          ethers.ZeroAddress,
          paymentAmount,
          paymentId
        )
      ).to.be.revertedWith("Invalid recipient");
    });
  });

  describe("Savings Goals (Bounty 2)", function () {
    it("Should create savings goal successfully", async function () {
      const goalName = "Emergency Fund";
      const targetAmount = ethers.parseUnits("100", 6);
      const deadline = (await time()) + 86400; // 24 hours
      const initialDeposit = ethers.parseUnits("10", 6);

      await expect(
        monadParaIntegration.connect(user1).createSavingsGoal(
          goalName,
          targetAmount,
          deadline,
          initialDeposit
        )
      ).to.emit(monadParaIntegration, "SavingsGoalCreated")
        .withArgs(user1.address, 1, goalName, targetAmount, deadline);
    });

    it("Should track goal progress correctly", async function () {
      const goalName = "Vacation Fund";
      const targetAmount = ethers.parseUnits("100", 6);
      const deadline = (await time()) + 86400;
      const initialDeposit = ethers.parseUnits("20", 6);

      await monadParaIntegration.connect(user1).createSavingsGoal(
        goalName,
        targetAmount,
        deadline,
        initialDeposit
      );

      const goal = await monadParaIntegration.getSavingsGoal(1);
      expect(goal.currentAmount).to.equal(initialDeposit);
      expect(goal.isCompleted).to.be.false;

      // Add more funds
      const additionalAmount = ethers.parseUnits("80", 6);
      await monadParaIntegration.connect(user1).addToSavingsGoal(1, additionalAmount);

      const updatedGoal = await monadParaIntegration.getSavingsGoal(1);
      expect(updatedGoal.currentAmount).to.equal(targetAmount);
      expect(updatedGoal.isCompleted).to.be.true;
    });

    it("Should emit GoalCompleted when target reached", async function () {
      const goalName = "Quick Goal";
      const targetAmount = ethers.parseUnits("50", 6);
      const deadline = (await time()) + 86400;
      const initialDeposit = ethers.parseUnits("50", 6);

      const tx = await monadParaIntegration.connect(user1).createSavingsGoal(
        goalName,
        targetAmount,
        deadline,
        initialDeposit
      );
      
      await expect(tx).to.emit(monadParaIntegration, "GoalCompleted")
        .withArgs(user1.address, 1, initialDeposit, await time());
    });

    it("Should allow locking completed goals", async function () {
      const goalName = "Lockable Goal";
      const targetAmount = ethers.parseUnits("100", 6);
      const deadline = (await time()) + 86400;
      const initialDeposit = ethers.parseUnits("100", 6);

      await monadParaIntegration.connect(user1).createSavingsGoal(
        goalName,
        targetAmount,
        deadline,
        initialDeposit
      );

      const tx = await monadParaIntegration.connect(user1).lockSavingsGoal(1);
      
      await expect(tx).to.emit(monadParaIntegration, "GoalLocked")
        .withArgs(user1.address, 1, initialDeposit, await time());
    });

    it("Should not allow non-owners to lock goals", async function () {
      const goalName = "Protected Goal";
      const targetAmount = ethers.parseUnits("100", 6);
      const deadline = (await time()) + 86400;
      const initialDeposit = ethers.parseUnits("100", 6);

      await monadParaIntegration.connect(user1).createSavingsGoal(
        goalName,
        targetAmount,
        deadline,
        initialDeposit
      );

      await expect(
        monadParaIntegration.connect(user2).lockSavingsGoal(1)
      ).to.be.revertedWith("Not your goal");
    });

    it("Should not allow locking incomplete goals", async function () {
      const goalName = "Incomplete Goal";
      const targetAmount = ethers.parseUnits("100", 6);
      const deadline = (await time()) + 86400;
      const initialDeposit = ethers.parseUnits("50", 6);

      await monadParaIntegration.connect(user1).createSavingsGoal(
        goalName,
        targetAmount,
        deadline,
        initialDeposit
      );

      await expect(
        monadParaIntegration.connect(user1).lockSavingsGoal(1)
      ).to.be.revertedWith("Goal not completed");
    });

    it("Should track user goals correctly", async function () {
      const goalName1 = "Goal 1";
      const goalName2 = "Goal 2";
      const targetAmount = ethers.parseUnits("100", 6);
      const deadline = (await time()) + 86400;
      const initialDeposit = ethers.parseUnits("10", 6);

      await monadParaIntegration.connect(user1).createSavingsGoal(
        goalName1,
        targetAmount,
        deadline,
        initialDeposit
      );

      await monadParaIntegration.connect(user1).createSavingsGoal(
        goalName2,
        targetAmount,
        deadline,
        initialDeposit
      );

      const userGoals = await monadParaIntegration.getUserGoals(user1.address);
      expect(userGoals.length).to.equal(2);
      expect(userGoals[0]).to.equal(1);
      expect(userGoals[1]).to.equal(2);
    });
  });

  describe("Edge Cases", function () {
    it("Should handle deadline validation", async function () {
      const goalName = "Past Deadline";
      const targetAmount = ethers.parseUnits("100", 6);
      const deadline = (await time()) - 86400; // Past deadline
      const initialDeposit = ethers.parseUnits("10", 6);

      await expect(
        monadParaIntegration.connect(user1).createSavingsGoal(
          goalName,
          targetAmount,
          deadline,
          initialDeposit
        )
      ).to.be.revertedWith("Deadline must be in the future");
    });

    it("Should handle empty goal names", async function () {
      const targetAmount = ethers.parseUnits("100", 6);
      const deadline = (await time()) + 86400;
      const initialDeposit = ethers.parseUnits("10", 6);

      await expect(
        monadParaIntegration.connect(user1).createSavingsGoal(
          "",
          targetAmount,
          deadline,
          initialDeposit
        )
      ).to.be.revertedWith("Name cannot be empty");
    });

    it("Should handle zero target amounts", async function () {
      const goalName = "Zero Target";
      const deadline = (await time()) + 86400;
      const initialDeposit = ethers.parseUnits("10", 6);

      await expect(
        monadParaIntegration.connect(user1).createSavingsGoal(
          goalName,
          0,
          deadline,
          initialDeposit
        )
      ).to.be.revertedWith("Target amount must be greater than 0");
    });
  });

  describe("Admin Functions", function () {
    it("Should allow owner to withdraw from locked goals", async function () {
      const goalName = "Admin Goal";
      const targetAmount = ethers.parseUnits("100", 6);
      const deadline = (await time()) + 86400;
      const initialDeposit = ethers.parseUnits("100", 6);

      await monadParaIntegration.connect(user1).createSavingsGoal(
        goalName,
        targetAmount,
        deadline,
        initialDeposit
      );

      await monadParaIntegration.connect(user1).lockSavingsGoal(1);

      const withdrawAmount = ethers.parseUnits("50", 6);
      await monadParaIntegration.connect(owner).withdrawFromLockedGoal(1, withdrawAmount);

      const goal = await monadParaIntegration.getSavingsGoal(1);
      expect(goal.currentAmount).to.equal(initialDeposit - withdrawAmount);
    });

    it("Should not allow non-owners to withdraw", async function () {
      const goalName = "Protected Goal";
      const targetAmount = ethers.parseUnits("100", 6);
      const deadline = (await time()) + 86400;
      const initialDeposit = ethers.parseUnits("100", 6);

      await monadParaIntegration.connect(user1).createSavingsGoal(
        goalName,
        targetAmount,
        deadline,
        initialDeposit
      );

      await monadParaIntegration.connect(user1).lockSavingsGoal(1);

      const withdrawAmount = ethers.parseUnits("50", 6);
      await expect(
        monadParaIntegration.connect(user2).withdrawFromLockedGoal(1, withdrawAmount)
      ).to.be.revertedWithCustomError(monadParaIntegration, "OwnableUnauthorizedAccount");
    });
  });
});

// Helper function to get current timestamp
async function time() {
  const blockNum = await ethers.provider.getBlockNumber();
  const block = await ethers.provider.getBlock(blockNum);
  return block.timestamp;
}
