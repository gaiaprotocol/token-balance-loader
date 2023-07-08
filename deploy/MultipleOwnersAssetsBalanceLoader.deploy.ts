import { ethers } from "hardhat";

async function main() {
    const balanceLoader = await (await ethers.getContractFactory("MultipleOwnersAssetsBalanceLoader")).deploy();
    await balanceLoader.deployed();
    console.log(`MultipleOwnersAssetsBalanceLoader address: ${balanceLoader.address}`);
}

main();
