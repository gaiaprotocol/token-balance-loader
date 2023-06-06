import { ethers } from "hardhat";

async function main() {
    const balanceLoader = await (await ethers.getContractFactory("MultipleAssetsBalanceLoader")).deploy();
    await balanceLoader.deployed();
    console.log(`MultipleAssetsBalanceLoader address: ${balanceLoader.address}`);
}

main();
