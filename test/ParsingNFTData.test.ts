import { ethers } from "hardhat";
import { expect } from "chai";

describe("Test", function () {
    const user1 = "0x0000000000000000000000000000000000000001";
    const user2 = "0x0000000000000000000000000000000000000002";
    const user3 = "0x0000000000000000000000000000000000000003";
    const user4 = "0x0000000000000000000000000000000000000004";

    it("getERC721HolderList", async function () {
        const token721 = await (await ethers.getContractFactory("MockERC721"))
            .deploy();
        const p = await (await ethers.getContractFactory("ParsingNFTData"))
            .deploy();

        await token721.mint(user1, 1);
        await token721.mint(user2, 2);
        await token721.mint(user3, 3);
        await token721.mint(user4, 4);

        const res = await p.getERC721HolderList(token721.target, [2, 3, 1, 4]);
        // console.log(res);
        expect(res[0]).to.be.equal(user2);
        expect(res[1]).to.be.equal(user3);
        expect(res[2]).to.be.equal(user1);
        expect(res[3]).to.be.equal(user4);
    });
    context("OneToken", () => {
        it("getERC20BalanceList_OneToken", async function () {
            const token20 = await (await ethers.getContractFactory("MockERC20"))
                .deploy();
            const p = await (await ethers.getContractFactory("ParsingNFTData"))
                .deploy();

            await token20.mint(user1, 10);
            await token20.mint(user1, 20);
            await token20.mint(user2, 30);
            await token20.mint(user3, 40);

            const res = await p.getERC20BalanceList_OneToken(token20.target, [
                user1,
                user2,
                user3,
                user4,
            ]);
            // console.log(res);
            expect(res[0]).to.be.equal(30);
            expect(res[1]).to.be.equal(30);
            expect(res[2]).to.be.equal(40);
            expect(res[3]).to.be.equal(0);
        });
        it("getERC721BalanceList_OneToken", async function () {
            const token721 =
                await (await ethers.getContractFactory("MockERC721")).deploy();
            const p = await (await ethers.getContractFactory("ParsingNFTData"))
                .deploy();

            await token721.mint(user1, 1);
            await token721.mint(user1, 2);
            await token721.mint(user1, 3);
            await token721.mint(user2, 4);

            const res = await p.getERC721BalanceList_OneToken(token721.target, [
                user1,
                user2,
                user3,
            ]);
            // console.log(res);
            expect(res[0]).to.be.equal(3);
            expect(res[1]).to.be.equal(1);
            expect(res[2]).to.be.equal(0);
        });
        it("getERC1155BalanceList_OneToken", async function () {
            const token1155 =
                await (await ethers.getContractFactory("MockERC1155")).deploy();
            const p = await (await ethers.getContractFactory("ParsingNFTData"))
                .deploy();

            await token1155.mintBatch(user1, [1, 3, 5, 7, 9], [
                11,
                13,
                15,
                17,
                19,
            ]);

            const res = await p.getERC1155BalanceList_OneToken(
                token1155.target,
                [user1, user2],
                [
                    ["1", "2", "3"],
                    ["2", "4", "5"],
                ],
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
    context("OneHolder", () => {
        it("getERC20BalanceList_OneHolder", async function () {
            const token20_0 =
                await (await ethers.getContractFactory("MockERC20")).deploy();
            const token20_1 =
                await (await ethers.getContractFactory("MockERC20")).deploy();
            const token20_2 =
                await (await ethers.getContractFactory("MockERC20")).deploy();
            const p = await (await ethers.getContractFactory("ParsingNFTData"))
                .deploy();

            await token20_0.mint(user1, 10);
            await token20_1.mint(user1, 40);

            const res = await p.getERC20BalanceList_OneHolder(user1, [
                token20_0.target,
                token20_1.target,
                token20_2.target,
            ]);
            // console.log(res);
            expect(res[0]).to.be.equal(10);
            expect(res[1]).to.be.equal(40);
            expect(res[2]).to.be.equal(0);
        });
        it("getERC721BalanceList_OneHolder", async function () {
            const token721_0 =
                await (await ethers.getContractFactory("MockERC721")).deploy();
            const token721_1 =
                await (await ethers.getContractFactory("MockERC721")).deploy();
            const token721_2 =
                await (await ethers.getContractFactory("MockERC721")).deploy();
            const p = await (await ethers.getContractFactory("ParsingNFTData"))
                .deploy();

            await token721_0.mint(user1, 1);
            await token721_0.mint(user1, 2);
            await token721_1.mint(user1, 3);

            const res = await p.getERC721BalanceList_OneHolder(user1, [
                token721_0.target,
                token721_1.target,
                token721_2.target,
            ]);
            // console.log(res);
            expect(res[0]).to.be.equal(2);
            expect(res[1]).to.be.equal(1);
            expect(res[2]).to.be.equal(0);
        });
        it("getERC1155BalanceList_OneHolder", async function () {
            const token1155_0 =
                await (await ethers.getContractFactory("MockERC1155")).deploy();
            const token1155_1 =
                await (await ethers.getContractFactory("MockERC1155")).deploy();
            const token1155_2 =
                await (await ethers.getContractFactory("MockERC1155")).deploy();
            const p = await (await ethers.getContractFactory("ParsingNFTData"))
                .deploy();

            await token1155_0.mintBatch(user1, [1, 3], [11, 13]);
            await token1155_1.mintBatch(user1, [5], [15]);

            const res = await p.getERC1155BalanceList_OneHolder(
                user1,
                [token1155_0.target, token1155_1.target, token1155_2.target],
                [
                    ["1", "2", "3"],
                    ["2", "5"],
                    ["2", "4", "5"],
                ],
            );
            // console.log(res);
            expect(res[0][0]).to.be.equal(11);
            expect(res[0][1]).to.be.equal(0);
            expect(res[0][2]).to.be.equal(13);
            expect(res[1][0]).to.be.equal(0);
            expect(res[1][1]).to.be.equal(15);
            expect(res[2][0]).to.be.equal(0);
            expect(res[2][1]).to.be.equal(0);
            expect(res[2][2]).to.be.equal(0);
        });
    });
});
