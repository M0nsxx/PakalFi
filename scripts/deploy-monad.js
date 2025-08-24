const { ethers } = require("hardhat");

async function main() {
  console.log("🚀 Deploying Para x Monad Integration contracts...");

  // Get deployer account
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);

  // Deploy Mock USDC first
  console.log("\n📦 Deploying Mock USDC...");
  const MockUSDC = await ethers.getContractFactory("MockUSDC");
  const mockUSDC = await MockUSDC.deploy();
  await mockUSDC.deployed();
  console.log("Mock USDC deployed to:", mockUSDC.address);

  // Mint some USDC to deployer for testing
  const mintAmount = ethers.utils.parseUnits("10000", 6); // 10,000 USDC
  await mockUSDC.mint(deployer.address, mintAmount);
  console.log("Minted", ethers.utils.formatUnits(mintAmount, 6), "USDC to deployer");

  // Deploy MonadParaIntegration
  console.log("\n🏗️ Deploying MonadParaIntegration...");
  const MonadParaIntegration = await ethers.getContractFactory("MonadParaIntegration");
  const monadParaIntegration = await MonadParaIntegration.deploy(mockUSDC.address);
  await monadParaIntegration.deployed();
  console.log("MonadParaIntegration deployed to:", monadParaIntegration.address);

  // Approve USDC spending for the integration contract
  console.log("\n✅ Approving USDC spending...");
  await mockUSDC.approve(monadParaIntegration.address, ethers.constants.MaxUint256);
  console.log("USDC approval completed");

  // Verify deployment
  console.log("\n🔍 Verifying deployment...");
  const usdcAddress = await monadParaIntegration.usdcToken();
  console.log("USDC token address in contract:", usdcAddress);
  console.log("Expected USDC address:", mockUSDC.address);
  console.log("Addresses match:", usdcAddress === mockUSDC.address);

  // Test basic functionality
  console.log("\n🧪 Testing basic functionality...");
  
  // Test creating a savings goal
  const goalName = "Test Goal";
  const targetAmount = ethers.utils.parseUnits("100", 6); // 100 USDC
  const deadline = Math.floor(Date.now() / 1000) + 86400; // 24 hours from now
  const initialDeposit = ethers.utils.parseUnits("10", 6); // 10 USDC

  console.log("Creating test savings goal...");
  const createGoalTx = await monadParaIntegration.createSavingsGoal(
    goalName,
    targetAmount,
    deadline,
    initialDeposit
  );
  await createGoalTx.wait();
  console.log("✅ Savings goal created successfully");

  // Get the created goal
  const goal = await monadParaIntegration.getSavingsGoal(1);
  console.log("Goal details:", {
    id: goal.id.toString(),
    name: goal.name,
    targetAmount: ethers.utils.formatUnits(goal.targetAmount, 6),
    currentAmount: ethers.utils.formatUnits(goal.currentAmount, 6),
    isCompleted: goal.isCompleted,
    isLocked: goal.isLocked
  });

  // Test payment processing
  console.log("\n💳 Testing payment processing...");
  const recipient = "0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6";
  const paymentAmount = ethers.utils.parseUnits("50", 6); // 50 USDC
  const paymentId = "test_payment_" + Date.now();

  console.log("Processing test payment...");
  const paymentTx = await monadParaIntegration.processInstantPayment(
    recipient,
    paymentAmount,
    paymentId
  );
  await paymentTx.wait();
  console.log("✅ Payment processed successfully");

  // Verify payment was processed
  const isProcessed = await monadParaIntegration.isPaymentProcessed(paymentId);
  console.log("Payment processed:", isProcessed);

  console.log("\n🎉 Deployment and testing completed successfully!");
  console.log("\n📋 Contract Addresses:");
  console.log("Mock USDC:", mockUSDC.address);
  console.log("MonadParaIntegration:", monadParaIntegration.address);
  
  console.log("\n🔧 Environment Variables to add:");
  console.log(`NEXT_PUBLIC_USDC_TOKEN_ADDRESS=${mockUSDC.address}`);
  console.log(`NEXT_PUBLIC_PARAD_INTEGRATION_ADDRESS=${monadParaIntegration.address}`);
  
  console.log("\n📱 Demo URL:");
  console.log("http://localhost:3000/demo/para-monad");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Deployment failed:", error);
    process.exit(1);
  });
