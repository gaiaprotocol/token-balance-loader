// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/interfaces/IERC721.sol";
import "@openzeppelin/contracts/interfaces/IERC1155.sol";

interface IParsingNFTData {
    function getERC721HolderList(
        IERC721 nft,
        uint256[] calldata tokenIds
    ) external view returns (address[] memory holders);

    function getERC721BalanceList(
        IERC721 nft,
        address[] calldata holders
    ) external view returns (uint256[] memory balances);

    function getERC1155BalanceList(
        IERC1155 erc1155,
        address[][] calldata holders,
        uint256[][] calldata tokenIds
    ) external view returns (uint256[][] memory balances);
}
