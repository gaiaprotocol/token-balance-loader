// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "./IParsingNFTData.sol";

contract ParsingNFTData is IParsingNFTData {
    function getERC721HolderList(
        IERC721 nft,
        uint256[] calldata tokenIds
    ) external view returns (address[] memory holders) {
        uint256 length = tokenIds.length;
        holders = new address[](length);

        for (uint256 i; i < length; ) {
            try nft.ownerOf(tokenIds[i]) returns (address owner) {
                holders[i] = owner;
            } catch {
                holders[i] = address(0);
            }
            unchecked {
                i++;
            }
        }
    }

    function getERC1155BalanceList(
        IERC1155 erc1155,
        address[] calldata holders,
        uint256[] calldata tokenIds
    ) external view returns (uint256[] memory balances) {
        uint256 length = holders.length;
        balances = new uint256[](length);
        balances = erc1155.balanceOfBatch(holders, tokenIds);
    }
}
