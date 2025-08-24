const { ethers } = require("hardhat");

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
  console.log("🔧 Configuring roles and permissions sequentially...");

  // Use the specified owner wallet
  const ownerAddress = "0x703b1eAdE96B27867327Ad5AC2fE788342C6117A";
  const ownerPrivateKey = "9ddfdc054d4b07b7afc45b1f5e95878a04eacbc2a23b1c95d3d9a0f3ad493ebc";
  
  // Create wallet instance
  const ownerWallet = new ethers.Wallet(ownerPrivateKey, ethers.provider);
  
  console.log("📝 Configuring with owner account:", ownerWallet.address);

  // Contract addresses from deployment
  const contractAddresses = {
    oracle: "0xaF9bAD18233d180BB7F763A0be4A252bDf16c776",
    reinsuranceToken: "0x47EdA49ea71f20738085f8774Be3f881A02354Af",
    policyNFT: "0xdaAb335F3B2dAc3e963809EE7dD8102A890870a3",
    insurancePool: "0x5b33069977773557D07023A73468fD16F83ebaea",
    gaslessPaymentHandler: "0xd5de766cdAAA47c9dB756c0f0c01d0F0494571D0",
    savingsGoalHandler: "0xE01592cE50FeFF1e9FB65888c66Dd5c6c4C85637"
  };

  try {
    // Get contract instances
    const Oracle = await ethers.getContractFactory("Oracle");
    const ReinsuranceToken = await ethers.getContractFactory("ReinsuranceToken");
    const PolicyNFT = await ethers.getContractFactory("PolicyNFT");
    const InsurancePool = await ethers.getContractFactory("InsurancePool");
    const GaslessPaymentHandler = await ethers.getContractFactory("GaslessPaymentHandler");
    const SavingsGoalHandler = await ethers.getContractFactory("SavingsGoalHandler");

    const oracle = Oracle.attach(contractAddresses.oracle).connect(ownerWallet);
    const reinsuranceToken = ReinsuranceToken.attach(contractAddresses.reinsuranceToken).connect(ownerWallet);
    const policyNFT = PolicyNFT.attach(contractAddresses.policyNFT).connect(ownerWallet);
    const insurancePool = InsurancePool.attach(contractAddresses.insurancePool).connect(ownerWallet);
    const gaslessPaymentHandler = GaslessPaymentHandler.attach(contractAddresses.gaslessPaymentHandler).connect(ownerWallet);
    const savingsGoalHandler = SavingsGoalHandler.attach(contractAddresses.savingsGoalHandler).connect(ownerWallet);

    console.log("\n🔧 Configuring roles and permissions sequentially...");

    // 1. Oracle roles
    console.log("📋 Configuring Oracle roles...");
    const ORACLE_ROLE = await oracle.ORACLE_ROLE();
    
    console.log("Granting ORACLE_ROLE to InsurancePool...");
    await oracle.grantRole(ORACLE_ROLE, contractAddresses.insurancePool);
    console.log("✅ ORACLE_ROLE granted to InsurancePool in Oracle");
    await sleep(3000); // Wait 3 seconds
    
    console.log("Granting ORACLE_ROLE to GaslessPaymentHandler...");
    await oracle.grantRole(ORACLE_ROLE, contractAddresses.gaslessPaymentHandler);
    console.log("✅ ORACLE_ROLE granted to GaslessPaymentHandler in Oracle");
    await sleep(3000); // Wait 3 seconds

    // 2. PolicyNFT roles
    console.log("📋 Configuring PolicyNFT roles...");
    const MINTER_ROLE = await policyNFT.MINTER_ROLE();
    const UPDATER_ROLE = await policyNFT.UPDATER_ROLE();
    
    console.log("Granting MINTER_ROLE to InsurancePool...");
    await policyNFT.grantRole(MINTER_ROLE, contractAddresses.insurancePool);
    console.log("✅ MINTER_ROLE granted to InsurancePool in PolicyNFT");
    await sleep(3000); // Wait 3 seconds
    
    console.log("Granting UPDATER_ROLE to InsurancePool...");
    await policyNFT.grantRole(UPDATER_ROLE, contractAddresses.insurancePool);
    console.log("✅ UPDATER_ROLE granted to InsurancePool in PolicyNFT");
    await sleep(3000); // Wait 3 seconds

    // 3. ReinsuranceToken roles
    console.log("📋 Configuring ReinsuranceToken roles...");
    const INSURANCE_ROLE = await reinsuranceToken.INSURANCE_ROLE();
    
    console.log("Granting INSURANCE_ROLE to InsurancePool...");
    await reinsuranceToken.grantRole(INSURANCE_ROLE, contractAddresses.insurancePool);
    console.log("✅ INSURANCE_ROLE granted to InsurancePool in ReinsuranceToken");
    await sleep(3000); // Wait 3 seconds

    // 4. Mint initial tokens
    console.log("\n💰 Minting initial tokens...");
    const initialSupply = ethers.parseEther("1000000"); // 1M tokens
    await reinsuranceToken.mint(contractAddresses.reinsuranceToken, initialSupply);
    console.log("✅ Initial supply minted to ReinsuranceToken contract");
    await sleep(3000); // Wait 3 seconds

    // 5. Configure initial Oracle data
    console.log("\n🌤️ Configuring initial Oracle data...");

    // Weather data for CDMX
    console.log("Updating weather data for CDMX...");
    await oracle.updateWeatherData(
      "CDMX",
      25, // temperatura en Celsius
      60, // humedad en %
      15, // velocidad del viento en km/h
      0, // precipitación en mm
      "soleado"
    );
    console.log("✅ Weather data for CDMX updated");
    await sleep(2000); // Wait 2 seconds

    // Security data for CDMX
    console.log("Updating security data for CDMX...");
    await oracle.updateSecurityData(
      "CDMX",
      45, // crime rate (0-100)
      35, // theft index (0-100)
      65 // safety score (0-100)
    );
    console.log("✅ Security data for CDMX updated");
    await sleep(2000); // Wait 2 seconds

    // Weather data for other regions
    console.log("Updating weather data for Lagos...");
    await oracle.updateWeatherData(
      "Lagos",
      30, // temperatura en Celsius
      75, // humedad en %
      20, // velocidad del viento en km/h
      5, // precipitación en mm
      "lluvioso"
    );
    console.log("✅ Weather data for Lagos updated");
    await sleep(2000); // Wait 2 seconds

    console.log("Updating weather data for Jakarta...");
    await oracle.updateWeatherData(
      "Jakarta",
      28, // temperatura en Celsius
      80, // humedad en %
      12, // velocidad del viento en km/h
      10, // precipitación en mm
      "nublado"
    );
    console.log("✅ Weather data for Jakarta updated");

    console.log("\n🎉 Roles and permissions configured successfully!");
    console.log("\n📋 Summary of deployed contracts:");
    console.log("📍 Oracle:", contractAddresses.oracle);
    console.log("📍 ReinsuranceToken:", contractAddresses.reinsuranceToken);
    console.log("📍 PolicyNFT:", contractAddresses.policyNFT);
    console.log("📍 InsurancePool:", contractAddresses.insurancePool);
    console.log("📍 GaslessPaymentHandler:", contractAddresses.gaslessPaymentHandler);
    console.log("📍 SavingsGoalHandler:", contractAddresses.savingsGoalHandler);

    // Save deployment info
    const deploymentInfo = {
      network: "monadTestnet",
      chainId: 10143,
      deployer: ownerWallet.address,
      contracts: contractAddresses,
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

    const fs = require('fs');
    fs.writeFileSync('deployment.json', JSON.stringify(deploymentInfo, null, 2));
    console.log("\n💾 Deployment information saved to deployment.json");

  } catch (error) {
    console.error("❌ Error during configuration:", error);
    throw error;
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Error during configuration:", error);
    process.exit(1);
  });
