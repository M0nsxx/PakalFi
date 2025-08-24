import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";
import "ts-node/register";

dotenv.config();

const PRIVATE_KEY = "2003f926c578fea4a77ffdd98a288a3297ee12b8893505562422dd258e4a5765";

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
      viaIR: true,
    },
  },
  networks: {
    monadTestnet: {
      url: "https://testnet-rpc.monad.xyz/",
      chainId: 10143,
      accounts: [PRIVATE_KEY],
      gas: 8000000,
      timeout: 60000,
    },
    hardhat: {
      chainId: 31337,
    },
  },
  etherscan: {
    apiKey: {
      monadTestnet: "not-needed", // Monad doesn't have Etherscan yet
    },
    customChains: [
      {
        network: "monadTestnet",
        chainId: 10143,
        urls: {
          apiURL: "https://explorer.testnet.monad.xyz/api",
          browserURL: "https://explorer.testnet.monad.xyz",
        },
      },
    ],
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
};

export default config;
