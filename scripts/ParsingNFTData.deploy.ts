import { ethers } from "hardhat";

async function main() {
    const pnd = await (await ethers.getContractFactory("ParsingNFTData")).deploy();
    await pnd.deployed();
    console.log(`ParsingNFTData address: ${pnd.address}`);
}

main();
