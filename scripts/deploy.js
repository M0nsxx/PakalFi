const { ethers } = require("hardhat");

async function main() {
  console.log("🚀 Iniciando despliegue de contratos en Monad Testnet...");

  // Obtener el deployer
  const [deployer] = await ethers.getSigners();
  console.log("📝 Deploying contracts with account:", deployer.address);
  const balance = await ethers.provider.getBalance(deployer.address);
  console.log("💰 Account balance:", ethers.formatEther(balance));

  // 1. Desplegar Oracle primero
  console.log("\n📦 Desplegando Oracle...");
  const Oracle = await ethers.getContractFactory("Oracle");
  const oracle = await Oracle.deploy();
  await oracle.waitForDeployment();
  console.log("✅ Oracle deployed to:", await oracle.getAddress());

  // 2. Desplegar ReinsuranceToken
  console.log("\n📦 Desplegando ReinsuranceToken...");
  const ReinsuranceToken = await ethers.getContractFactory("ReinsuranceToken");
  const reinsuranceToken = await ReinsuranceToken.deploy();
  await reinsuranceToken.waitForDeployment();
  console.log("✅ ReinsuranceToken deployed to:", await reinsuranceToken.getAddress());

  // 3. Desplegar PolicyNFT
  console.log("\n📦 Desplegando PolicyNFT...");
  const PolicyNFT = await ethers.getContractFactory("PolicyNFT");
  const policyNFT = await PolicyNFT.deploy();
  await policyNFT.waitForDeployment();
  console.log("✅ PolicyNFT deployed to:", await policyNFT.getAddress());

  // 4. Desplegar InsurancePool (contrato principal)
  console.log("\n📦 Desplegando InsurancePool...");
  const InsurancePool = await ethers.getContractFactory("InsurancePool");
  const insurancePool = await InsurancePool.deploy();
  await insurancePool.waitForDeployment();
  console.log("✅ InsurancePool deployed to:", await insurancePool.getAddress());

  // 5. Configurar permisos
  console.log("\n🔑 Configurando permisos...");
  
  // Grant Oracle role al InsurancePool
  const ORACLE_ROLE = await oracle.ORACLE_ROLE();
  await oracle.grantRole(ORACLE_ROLE, await insurancePool.getAddress());
  console.log("✅ Oracle role granted to InsurancePool");

  // Grant Minter role al InsurancePool para PolicyNFT
  const MINTER_ROLE = await policyNFT.MINTER_ROLE();
  await policyNFT.grantRole(MINTER_ROLE, await insurancePool.getAddress());
  console.log("✅ Minter role granted to InsurancePool");

  // Grant Updater role al InsurancePool para PolicyNFT
  const UPDATER_ROLE = await policyNFT.UPDATER_ROLE();
  await policyNFT.grantRole(UPDATER_ROLE, await insurancePool.getAddress());
  console.log("✅ Updater role granted to InsurancePool");

  // Grant Insurance role al InsurancePool para ReinsuranceToken
  const INSURANCE_ROLE = await reinsuranceToken.INSURANCE_ROLE();
  await reinsuranceToken.grantRole(INSURANCE_ROLE, await insurancePool.getAddress());
  console.log("✅ Insurance role granted to InsurancePool");

  // 6. Configurar datos iniciales
  console.log("\n📊 Configurando datos iniciales...");

  // Mint inicial de tokens de reaseguro
  const initialSupply = ethers.parseEther("1000000"); // 1M tokens
  await reinsuranceToken.mint(await reinsuranceToken.getAddress(), initialSupply);
  console.log("✅ Initial ReinsuranceToken supply minted");

  // Crear pools de reaseguro
  await reinsuranceToken.createPool(
    "Micro-Health Pool",
    "Pool de reaseguro para micro-seguros de salud",
    ethers.parseEther("100000"), // 100k capacidad
    500, // 5% premium rate
    150, // risk score
    ethers.parseEther("100"), // Min investment
    ethers.parseEther("10000"), // Max investment
    365 * 24 * 60 * 60 // 1 year lock period
  );
  console.log("✅ Micro-Health reinsurance pool created");

  await reinsuranceToken.createPool(
    "Micro-Climate Pool",
    "Pool de reaseguro para micro-seguros de clima",
    ethers.parseEther("200000"), // 200k capacidad
    750, // 7.5% premium rate
    200, // risk score
    ethers.parseEther("500"), // Min investment
    ethers.parseEther("20000"), // Max investment
    365 * 24 * 60 * 60 // 1 year lock period
  );
  console.log("✅ Micro-Climate reinsurance pool created");

  await reinsuranceToken.createPool(
    "Micro-Security Pool",
    "Pool de reaseguro para micro-seguros de seguridad",
    ethers.parseEther("150000"), // 150k capacidad
    600, // 6% premium rate
    175, // risk score
    ethers.parseEther("200"), // Min investment
    ethers.parseEther("15000"), // Max investment
    365 * 24 * 60 * 60 // 1 year lock period
  );
  console.log("✅ Micro-Security reinsurance pool created");

  await reinsuranceToken.createPool(
    "Micro-Mobility Pool",
    "Pool de reaseguro para micro-seguros de movilidad",
    ethers.parseEther("120000"), // 120k capacidad
    650, // 6.5% premium rate
    190, // risk score
    ethers.parseEther("150"), // Min investment
    ethers.parseEther("12000"), // Max investment
    365 * 24 * 60 * 60 // 1 year lock period
  );
  console.log("✅ Micro-Mobility reinsurance pool created");

  // 7. Configurar datos del Oracle
  console.log("\n🌤️ Configurando Oracle con datos iniciales...");
  
  // Datos de clima para CDMX
  await oracle.updateWeatherData(
    "CDMX",
    25, // temperatura en Celsius
    65, // humedad %
    15, // velocidad del viento km/h
    0,  // precipitación mm
    "Clear"
  );
  console.log("✅ Weather data for CDMX configured");

  // Datos de seguridad para CDMX
  await oracle.updateSecurityData(
    "CDMX",
    45, // crime rate (0-100)
    3,  // theft incidents
    1,  // fraud incidents
    2   // assault incidents
  );
  console.log("✅ Security data for CDMX configured");

  // 8. Mostrar resumen del despliegue
  console.log("\n🎉 ¡Despliegue completado exitosamente!");
  console.log("📋 Resumen de contratos desplegados:");
  const oracleAddress = await oracle.getAddress();
  const reinsuranceTokenAddress = await reinsuranceToken.getAddress();
  const policyNFTAddress = await policyNFT.getAddress();
  const insurancePoolAddress = await insurancePool.getAddress();
  
  console.log("📍 Oracle:", oracleAddress);
  console.log("📍 ReinsuranceToken:", reinsuranceTokenAddress);
  console.log("📍 PolicyNFT:", policyNFTAddress);
  console.log("📍 InsurancePool:", insurancePoolAddress);
  
  console.log("\n🔗 Enlaces del explorer:");
  console.log(`https://explorer.testnet.monad.xyz/address/${oracleAddress}`);
  console.log(`https://explorer.testnet.monad.xyz/address/${reinsuranceTokenAddress}`);
  console.log(`https://explorer.testnet.monad.xyz/address/${policyNFTAddress}`);
  console.log(`https://explorer.testnet.monad.xyz/address/${insurancePoolAddress}`);

  // 9. Guardar información de despliegue
  const deploymentInfo = {
    network: 'monad-testnet',
    timestamp: new Date().toISOString(),
    deployer: deployer.address,
    contracts: {
      oracle: oracleAddress,
      reinsuranceToken: reinsuranceTokenAddress,
      policyNFT: policyNFTAddress,
      insurancePool: insurancePoolAddress,
    },
    gasUsed: {
      // Se actualizará automáticamente por Hardhat
    }
  };

  console.log("\n📄 Deployment info:");
  console.log(JSON.stringify(deploymentInfo, null, 2));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Error durante el despliegue:", error);
    process.exit(1);
  });
