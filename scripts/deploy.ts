import { ethers } from "hardhat";

async function main() {
  console.log("🚀 Iniciando despliegue de contratos en Monad Testnet...");

  // Obtener el deployer
  const [deployer] = await ethers.getSigners();
  if (!deployer) {
    throw new Error("No deployer found");
  }
  
  console.log("📝 Deploying contracts with account:", deployer.address);
  console.log("💰 Account balance:", (await ethers.provider.getBalance(deployer.address)).toString());

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

  // 4. Desplegar InsurancePool
  console.log("\n📦 Desplegando InsurancePool...");
  const InsurancePool = await ethers.getContractFactory("InsurancePool");
  const insurancePool = await InsurancePool.deploy();
  await insurancePool.waitForDeployment();
  console.log("✅ InsurancePool deployed to:", await insurancePool.getAddress());

  // 5. Configurar roles y permisos
  console.log("\n🔧 Configurando roles y permisos...");

  // Dar rol de ORACLE_ROLE al InsurancePool en Oracle
  const ORACLE_ROLE = await oracle.ORACLE_ROLE();
  await oracle.grantRole(ORACLE_ROLE, await insurancePool.getAddress());
  console.log("✅ ORACLE_ROLE granted to InsurancePool in Oracle");

  // Dar rol de MINTER_ROLE al InsurancePool en PolicyNFT
  const MINTER_ROLE = await policyNFT.MINTER_ROLE();
  await policyNFT.grantRole(MINTER_ROLE, await insurancePool.getAddress());
  console.log("✅ MINTER_ROLE granted to InsurancePool in PolicyNFT");

  // Dar rol de UPDATER_ROLE al InsurancePool en PolicyNFT
  const UPDATER_ROLE = await policyNFT.UPDATER_ROLE();
  await policyNFT.grantRole(UPDATER_ROLE, await insurancePool.getAddress());
  console.log("✅ UPDATER_ROLE granted to InsurancePool in PolicyNFT");

  // Dar rol de INSURANCE_ROLE al InsurancePool en ReinsuranceToken
  const INSURANCE_ROLE = await reinsuranceToken.INSURANCE_ROLE();
  await reinsuranceToken.grantRole(INSURANCE_ROLE, await insurancePool.getAddress());
  console.log("✅ INSURANCE_ROLE granted to InsurancePool in ReinsuranceToken");

  // 6. Mint tokens iniciales para el pool de reaseguro
  console.log("\n💰 Minting tokens iniciales...");
  const initialSupply = ethers.parseEther("1000000"); // 1M tokens
  await reinsuranceToken.mint(await reinsuranceToken.getAddress(), initialSupply);
  console.log("✅ Initial supply minted to ReinsuranceToken contract");

  // 7. Crear pools de reaseguro iniciales
  console.log("\n🏊 Creando pools de reaseguro iniciales...");

  // Pool de Salud
  await reinsuranceToken.createPool(
    "Micro-Health Pool",
    "Pool de reaseguro para micro-seguros de salud",
    ethers.parseEther("100000"), // 100k capacidad
    500, // 5% premium rate
    300, // Risk score bajo
    ethers.parseEther("100"), // Min investment
    ethers.parseEther("10000"), // Max investment
    90 * 24 * 60 * 60 // 90 días lock period
  );
  console.log("✅ Micro-Health Pool created");

  // Pool de Clima
  await reinsuranceToken.createPool(
    "Micro-Climate Pool",
    "Pool de reaseguro para micro-seguros de clima",
    ethers.parseEther("200000"), // 200k capacidad
    800, // 8% premium rate
    600, // Risk score medio
    ethers.parseEther("500"), // Min investment
    ethers.parseEther("20000"), // Max investment
    180 * 24 * 60 * 60 // 180 días lock period
  );
  console.log("✅ Micro-Climate Pool created");

  // Pool de Seguridad
  await reinsuranceToken.createPool(
    "Micro-Security Pool",
    "Pool de reaseguro para micro-seguros de seguridad",
    ethers.parseEther("150000"), // 150k capacidad
    600, // 6% premium rate
    400, // Risk score medio-bajo
    ethers.parseEther("200"), // Min investment
    ethers.parseEther("15000"), // Max investment
    120 * 24 * 60 * 60 // 120 días lock period
  );
  console.log("✅ Micro-Security Pool created");

  // Pool de Movilidad
  await reinsuranceToken.createPool(
    "Micro-Mobility Pool",
    "Pool de reaseguro para micro-seguros de movilidad",
    ethers.parseEther("120000"), // 120k capacidad
    700, // 7% premium rate
    500, // Risk score medio
    ethers.parseEther("150"), // Min investment
    ethers.parseEther("12000"), // Max investment
    150 * 24 * 60 * 60 // 150 días lock period
  );
  console.log("✅ Micro-Mobility Pool created");

  // 8. Configurar datos iniciales del Oracle
  console.log("\n🌤️ Configurando datos iniciales del Oracle...");

  // Datos de clima para CDMX
  await oracle.updateWeatherData(
    "CDMX",
    25, // temperatura en Celsius
    60, // humedad en %
    15, // velocidad del viento en km/h
    0, // precipitación en mm
    "soleado"
  );
  console.log("✅ Weather data for CDMX updated");

  // Datos de seguridad para CDMX
  await oracle.updateSecurityData(
    "CDMX",
    45, // crime rate (0-100)
    35, // theft index (0-100)
    65 // safety score (0-100)
  );
  console.log("✅ Security data for CDMX updated");

  console.log("\n🎉 ¡Despliegue completado exitosamente!");
  console.log("\n📋 Resumen de contratos desplegados:");
  console.log("📍 Oracle:", await oracle.getAddress());
  console.log("📍 ReinsuranceToken:", await reinsuranceToken.getAddress());
  console.log("📍 PolicyNFT:", await policyNFT.getAddress());
  console.log("📍 InsurancePool:", await insurancePool.getAddress());
  console.log("\n🔗 Explorer URLs:");
  console.log(`https://explorer.testnet.monad.xyz/address/${await oracle.getAddress()}`);
  console.log(`https://explorer.testnet.monad.xyz/address/${await reinsuranceToken.getAddress()}`);
  console.log(`https://explorer.testnet.monad.xyz/address/${await policyNFT.getAddress()}`);
  console.log(`https://explorer.testnet.monad.xyz/address/${await insurancePool.getAddress()}`);

  // Guardar las direcciones en un archivo para uso posterior
  const deploymentInfo = {
    network: "monadTestnet",
    chainId: 10143,
    deployer: deployer.address,
    contracts: {
      oracle: await oracle.getAddress(),
      reinsuranceToken: await reinsuranceToken.getAddress(),
      policyNFT: await policyNFT.getAddress(),
      insurancePool: await insurancePool.getAddress(),
    },
    deploymentTime: new Date().toISOString(),
  };

  console.log("\n💾 Información de despliegue guardada en deployment.json");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Error durante el despliegue:", error);
    process.exit(1);
  });
