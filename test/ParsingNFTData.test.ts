import { ethers } from "hardhat";
import { expect } from "chai";

describe("Test", function () {
    const user1 = "0x0000000000000000000000000000000000000001";
    const user2 = "0x0000000000000000000000000000000000000002";
    const user3 = "0x0000000000000000000000000000000000000003";
    const user4 = "0x0000000000000000000000000000000000000004";

    it("getERC721HolderList", async function () {
        const token721 = await (await ethers.getContractFactory("MockERC721")).deploy();
        const p = await (await ethers.getContractFactory("ParsingNFTData")).deploy();

        await token721.mint(user1, 1);
        await token721.mint(user2, 2);
        await token721.mint(user3, 3);
        await token721.mint(user4, 4);

        const res = await p.getERC721HolderList(token721.address, [2, 3, 1, 4]);
        // console.log(res);
        expect(res[0]).to.be.equal(user2);
        expect(res[1]).to.be.equal(user3);
        expect(res[2]).to.be.equal(user1);
        expect(res[3]).to.be.equal(user4);
    });
    it("getERC721BalanceList", async function () {
        const token721 = await (await ethers.getContractFactory("MockERC721")).deploy();
        const p = await (await ethers.getContractFactory("ParsingNFTData")).deploy();

        await token721.mint(user1, 1);
        await token721.mint(user1, 2);
        await token721.mint(user1, 3);
        await token721.mint(user2, 4);

        const res = await p.getERC721BalanceList(token721.address, [user1, user2]);
        // console.log(res);
        expect(res[0]).to.be.equal(3);
        expect(res[1]).to.be.equal(1);
    });
    it("getERC1155BalanceList", async function () {
        const token1155 = await (await ethers.getContractFactory("MockERC1155")).deploy();
        const p = await (await ethers.getContractFactory("ParsingNFTData")).deploy();

        await token1155.mintBatch(user1, [1, 3, 5, 7, 9], [11, 13, 15, 17, 19]);

        const res = await p.getERC1155BalanceList(
            token1155.address,
            [
                [user1, user1, user1],
                [user2, user2, user2],
            ],
            [
                ["1", "2", "3"],
                ["2", "4", "5"],
            ]
        );
        // console.log(res);
        expect(res[0][0]).to.be.equal(11);
        expect(res[0][1]).to.be.equal(0);
        expect(res[0][2]).to.be.equal(13);
        expect(res[1][0]).to.be.equal(0);
        expect(res[1][1]).to.be.equal(0);
        expect(res[1][2]).to.be.equal(0);
    });
});
