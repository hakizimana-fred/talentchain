import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "dotenv/config";

console.log("INFURA_PROJECT_ID", process.env.INFURA_PROJECT_ID);

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.28",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    base_sepolia: {
      url: `https://api.developer.coinbase.com/rpc/v1/base-sepolia/${process.env.INFURA_PROJECT_ID}`,
      accounts: [process.env.PRIVATE_KEY || ""],
    },
    sepolia: {
      url: `https://api.developer.coinbase.com/rpc/v1/base-sepolia/${process.env.INFURA_PROJECT_ID}`,
      //url: `https://api.developer.coinbase.com/rpc/v1/base-sepolia/Gi0G8WIs9hXo69AZ7hBLabbRcObpPqib`,
      accounts: [process.env.PRIVATE_KEY || ""],
    },
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
};

export default config;
