import { ethers } from "hardhat";

async function main() {
  console.log("🔍 Verificando contratos desplegados...");

  // Obtener el deployer
  const [deployer] = await ethers.getSigners();
  if (!deployer) {
    throw new Error("No deployer found");
  }
  
  console.log("📝 Verificando con cuenta:", deployer.address);

  // Verificar que los contratos están desplegados
  try {
    // Verificar ReinsuranceToken
    const reinsuranceTokenAddress = "0x..."; // Reemplazar con la dirección real
    const reinsuranceToken = await ethers.getContractAt("ReinsuranceToken", reinsuranceTokenAddress);
    const tokenName = await reinsuranceToken.name();
    const tokenSymbol = await reinsuranceToken.symbol();
    console.log("✅ ReinsuranceToken verificado:", tokenName, `(${tokenSymbol})`);

    // Verificar PolicyNFT
    const policyNFTAddress = "0x..."; // Reemplazar con la dirección real
    const policyNFT = await ethers.getContractAt("PolicyNFT", policyNFTAddress);
    const nftName = await policyNFT.name();
    const nftSymbol = await policyNFT.symbol();
    console.log("✅ PolicyNFT verificado:", nftName, `(${nftSymbol})`);

    // Verificar InsurancePool
    const insurancePoolAddress = "0x..."; // Reemplazar con la dirección real
    const insurancePool = await ethers.getContractAt("InsurancePool", insurancePoolAddress);
    console.log("✅ InsurancePool verificado");

    // Verificar roles
    const MINTER_ROLE = await policyNFT.MINTER_ROLE();
    const hasMinterRole = await policyNFT.hasRole(MINTER_ROLE, insurancePoolAddress);
    console.log("🔐 InsurancePool tiene MINTER_ROLE en PolicyNFT:", hasMinterRole);

    const UPDATER_ROLE = await policyNFT.UPDATER_ROLE();
    const hasUpdaterRole = await policyNFT.hasRole(UPDATER_ROLE, insurancePoolAddress);
    console.log("🔐 InsurancePool tiene UPDATER_ROLE en PolicyNFT:", hasUpdaterRole);

    const INSURANCE_ROLE = await reinsuranceToken.INSURANCE_ROLE();
    const hasInsuranceRole = await reinsuranceToken.hasRole(INSURANCE_ROLE, insurancePoolAddress);
    console.log("🔐 InsurancePool tiene INSURANCE_ROLE en ReinsuranceToken:", hasInsuranceRole);

    // Verificar pools de reaseguro
    const pool0 = await reinsuranceToken.pools(0);
    console.log("🏊 Pool 0 creado:", pool0.name);

    const pool1 = await reinsuranceToken.pools(1);
    console.log("🏊 Pool 1 creado:", pool1.name);

    const pool2 = await reinsuranceToken.pools(2);
    console.log("🏊 Pool 2 creado:", pool2.name);

    const pool3 = await reinsuranceToken.pools(3);
    console.log("🏊 Pool 3 creado:", pool3.name);

    console.log("\n🎉 ¡Todos los contratos verificados correctamente!");

  } catch (error) {
    console.error("❌ Error durante la verificación:", error);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Error:", error);
    process.exit(1);
  });
