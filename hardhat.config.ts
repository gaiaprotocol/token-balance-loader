import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-viem";
import "@openzeppelin/hardhat-upgrades";
import "dotenv/config";

const config: HardhatUserConfig = {
  solidity: {
    compilers: [{
      version: "0.8.28",
      settings: {
        viaIR: true,
        optimizer: {
          enabled: true,
        },
      },
    }],
  },
};

export default config;
