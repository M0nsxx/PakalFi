import hre, { ethers } from "hardhat";

async function main() {
  console.log("🚀 Starting deployment of MicroInsurance contracts to Monad Testnet...");

  // Use the specified owner wallet
  const ownerAddress = "0x703b1eAdE96B27867327Ad5AC2fE788342C6117A";
  const ownerPrivateKey = "9ddfdc054d4b07b7afc45b1f5e95878a04eacbc2a23b1c95d3d9a0f3ad493ebc";
  
  // Create wallet instance
  const ownerWallet = new ethers.Wallet(ownerPrivateKey, ethers.provider);
  
  console.log("📝 Deploying contracts with owner account:", ownerWallet.address);
  console.log("💰 Account balance:", (await ethers.provider.getBalance(ownerWallet.address)).toString());

  // 1. Deploy Oracle first
  console.log("\n📦 Deploying Oracle...");
  const Oracle = await ethers.getContractFactory("Oracle");
  const oracle = await Oracle.connect(ownerWallet).deploy();
  await oracle.waitForDeployment();
  console.log("✅ Oracle deployed to:", await oracle.getAddress());

  // 2. Deploy ReinsuranceToken
  console.log("\n📦 Deploying ReinsuranceToken...");
  const ReinsuranceToken = await ethers.getContractFactory("ReinsuranceToken");
  const reinsuranceToken = await ReinsuranceToken.connect(ownerWallet).deploy();
  await reinsuranceToken.waitForDeployment();
  console.log("✅ ReinsuranceToken deployed to:", await reinsuranceToken.getAddress());

  // 3. Deploy PolicyNFT
  console.log("\n📦 Deploying PolicyNFT...");
  const PolicyNFT = await ethers.getContractFactory("PolicyNFT");
  const policyNFT = await PolicyNFT.connect(ownerWallet).deploy();
  await policyNFT.waitForDeployment();
  console.log("✅ PolicyNFT deployed to:", await policyNFT.getAddress());

  // 4. Deploy InsurancePool
  console.log("\n📦 Deploying InsurancePool...");
  const InsurancePool = await ethers.getContractFactory("InsurancePool");
  const insurancePool = await InsurancePool.connect(ownerWallet).deploy();
  await insurancePool.waitForDeployment();
  console.log("✅ InsurancePool deployed to:", await insurancePool.getAddress());

  // 5. Deploy GaslessPaymentHandler (NEW)
  console.log("\n📦 Deploying GaslessPaymentHandler...");
  const GaslessPaymentHandler = await ethers.getContractFactory("GaslessPaymentHandler");
  const gaslessPaymentHandler = await GaslessPaymentHandler.connect(ownerWallet).deploy();
  await gaslessPaymentHandler.waitForDeployment();
  console.log("✅ GaslessPaymentHandler deployed to:", await gaslessPaymentHandler.getAddress());

  // 6. Deploy SavingsGoalHandler (NEW)
  console.log("\n📦 Deploying SavingsGoalHandler...");
  const SavingsGoalHandler = await ethers.getContractFactory("SavingsGoalHandler");
  const savingsGoalHandler = await SavingsGoalHandler.connect(ownerWallet).deploy();
  await savingsGoalHandler.waitForDeployment();
  console.log("✅ SavingsGoalHandler deployed to:", await savingsGoalHandler.getAddress());

  // 7. Configure roles and permissions
  console.log("\n🔧 Configuring roles and permissions...");

  // Oracle roles
  const ORACLE_ROLE = await oracle.ORACLE_ROLE();
  await oracle.connect(ownerWallet).grantRole(ORACLE_ROLE, await insurancePool.getAddress());
  await oracle.connect(ownerWallet).grantRole(ORACLE_ROLE, await gaslessPaymentHandler.getAddress());
  console.log("✅ ORACLE_ROLE granted to InsurancePool and GaslessPaymentHandler in Oracle");

  // PolicyNFT roles
  const MINTER_ROLE = await policyNFT.MINTER_ROLE();
  const UPDATER_ROLE = await policyNFT.UPDATER_ROLE();
  await policyNFT.connect(ownerWallet).grantRole(MINTER_ROLE, await insurancePool.getAddress());
  await policyNFT.connect(ownerWallet).grantRole(UPDATER_ROLE, await insurancePool.getAddress());
  console.log("✅ Roles granted to InsurancePool in PolicyNFT");

  // ReinsuranceToken roles
  const INSURANCE_ROLE = await reinsuranceToken.INSURANCE_ROLE();
  await reinsuranceToken.connect(ownerWallet).grantRole(INSURANCE_ROLE, await insurancePool.getAddress());
  console.log("✅ Roles granted to InsurancePool in ReinsuranceToken");

  // 8. Mint tokens iniciales para el pool de reaseguro
  console.log("\n💰 Minting initial tokens...");
  const initialSupply = ethers.parseEther("1000000"); // 1M tokens
  await reinsuranceToken.connect(ownerWallet).mint(await reinsuranceToken.getAddress(), initialSupply);
  console.log("✅ Initial supply minted to ReinsuranceToken contract");

  // 9. Crear pools de reaseguro iniciales con soporte multi-región y multi-moneda
  console.log("\n🏊 Creating initial reinsurance pools...");

  // Pool de Salud
  await reinsuranceToken.connect(ownerWallet).createPool(
    "Micro-Health Pool",
    "Reinsurance pool for micro-health insurance",
    ethers.parseEther("100000"), // 100k capacity
    500, // 5% premium rate
    300, // Risk score bajo
    ethers.parseEther("100"), // Min investment
    ethers.parseEther("10000"), // Max investment
    90 * 24 * 60 * 60, // 90 días lock period
    0, // Region.LATAM
    0, // PoolType.HEALTH
    "USD", // currency
    10143 // chainId (Monad testnet)
  );
  console.log("✅ Micro-Health Pool created");

  // Pool de Clima
  await reinsuranceToken.connect(ownerWallet).createPool(
    "Micro-Climate Pool",
    "Reinsurance pool for micro-climate insurance",
    ethers.parseEther("200000"), // 200k capacity
    800, // 8% premium rate
    600, // Risk score medio
    ethers.parseEther("500"), // Min investment
    ethers.parseEther("20000"), // Max investment
    180 * 24 * 60 * 60, // 180 días lock period
    0, // Region.LATAM
    1, // PoolType.CLIMATE
    "USD", // currency
    10143 // chainId (Monad testnet)
  );
  console.log("✅ Micro-Climate Pool created");

  // Pool de Seguridad
  await reinsuranceToken.connect(ownerWallet).createPool(
    "Micro-Security Pool",
    "Reinsurance pool for micro-security insurance",
    ethers.parseEther("150000"), // 150k capacity
    600, // 6% premium rate
    400, // Risk score medio-bajo
    ethers.parseEther("200"), // Min investment
    ethers.parseEther("15000"), // Max investment
    120 * 24 * 60 * 60, // 120 días lock period
    0, // Region.LATAM
    2, // PoolType.SECURITY
    "USD", // currency
    10143 // chainId (Monad testnet)
  );
  console.log("✅ Micro-Security Pool created");

  // Pool de Movilidad
  await reinsuranceToken.connect(ownerWallet).createPool(
    "Micro-Mobility Pool",
    "Reinsurance pool for micro-mobility insurance",
    ethers.parseEther("120000"), // 120k capacity
    700, // 7% premium rate
    500, // Risk score medio
    ethers.parseEther("150"), // Min investment
    ethers.parseEther("12000"), // Max investment
    150 * 24 * 60 * 60, // 150 días lock period
    0, // Region.LATAM
    3, // PoolType.MOBILITY
    "USD", // currency
    10143 // chainId (Monad testnet)
  );
  console.log("✅ Micro-Mobility Pool created");

  // 10. Configurar datos iniciales del Oracle
  console.log("\n🌤️ Configuring initial Oracle data...");

  // Datos de clima para CDMX
  await oracle.connect(ownerWallet).updateWeatherData(
    "CDMX",
    25, // temperatura en Celsius
    60, // humedad en %
    15, // velocidad del viento en km/h
    0, // precipitación en mm
    "soleado"
  );
  console.log("✅ Weather data for CDMX updated");

  // Datos de seguridad para CDMX
  await oracle.connect(ownerWallet).updateSecurityData(
    "CDMX",
    45, // crime rate (0-100)
    35, // theft index (0-100)
    65 // safety score (0-100)
  );
  console.log("✅ Security data for CDMX updated");

  // Datos para otras regiones
  await oracle.connect(ownerWallet).updateWeatherData(
    "Lagos",
    30, // temperatura en Celsius
    75, // humedad en %
    20, // velocidad del viento en km/h
    5, // precipitación en mm
    "lluvioso"
  );
  console.log("✅ Weather data for Lagos updated");

  await oracle.connect(ownerWallet).updateWeatherData(
    "Jakarta",
    28, // temperatura en Celsius
    80, // humedad en %
    12, // velocidad del viento en km/h
    10, // precipitación en mm
    "nublado"
  );
  console.log("✅ Weather data for Jakarta updated");

  // 11. Note: Savings goals will be created through the frontend interface
  console.log("\n💰 Savings goals will be created through the frontend interface");

  console.log("\n🎉 Deployment completed successfully!");
  console.log("\n📋 Summary of deployed contracts:");
  console.log("📍 Oracle:", await oracle.getAddress());
  console.log("📍 ReinsuranceToken:", await reinsuranceToken.getAddress());
  console.log("📍 PolicyNFT:", await policyNFT.getAddress());
  console.log("📍 InsurancePool:", await insurancePool.getAddress());
  console.log("📍 GaslessPaymentHandler:", await gaslessPaymentHandler.getAddress());
  console.log("📍 SavingsGoalHandler:", await savingsGoalHandler.getAddress());
  console.log("\n🔗 Explorer URLs:");
  console.log(`https://explorer.testnet.monad.xyz/address/${await oracle.getAddress()}`);
  console.log(`https://explorer.testnet.monad.xyz/address/${await reinsuranceToken.getAddress()}`);
  console.log(`https://explorer.testnet.monad.xyz/address/${await policyNFT.getAddress()}`);
  console.log(`https://explorer.testnet.monad.xyz/address/${await insurancePool.getAddress()}`);
  console.log(`https://explorer.testnet.monad.xyz/address/${await gaslessPaymentHandler.getAddress()}`);
  console.log(`https://explorer.testnet.monad.xyz/address/${await savingsGoalHandler.getAddress()}`);

  // Guardar las direcciones en un archivo para uso posterior
  const deploymentInfo = {
    network: "monadTestnet",
    chainId: 10143,
    deployer: ownerWallet.address,
    contracts: {
      oracle: await oracle.getAddress(),
      reinsuranceToken: await reinsuranceToken.getAddress(),
      policyNFT: await policyNFT.getAddress(),
      insurancePool: await insurancePool.getAddress(),
      gaslessPaymentHandler: await gaslessPaymentHandler.getAddress(),
      savingsGoalHandler: await savingsGoalHandler.getAddress(),
    },
    deploymentTime: new Date().toISOString(),
    features: {
      multiChain: true,
      multiCurrency: true,
      regionalPools: true,
      gaslessPayments: true,
      savingsGoals: true,
      crossChainMessaging: true,
      sdgTracking: true,
      parametricTriggers: true
    }
  };

  // Write deployment info to file
  const fs = require('fs');
  fs.writeFileSync('deployment.json', JSON.stringify(deploymentInfo, null, 2));
  console.log("\n💾 Deployment information saved to deployment.json");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Error during deployment:", error);
    process.exit(1);
  });
