// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

contract MultipleAssetsBalanceLoader {
    function load(
        address owner,
        address[] calldata erc20s,
        address[] calldata erc721s,
        address[] calldata erc1155s,
        uint256[][] calldata erc1155TokenIds
    ) external view returns (uint256[] memory balances) {
        uint256 erc20Length = erc20s.length;
        uint256 erc721Length = erc721s.length;
        uint256 erc1155Length = erc1155s.length;
        require(erc1155Length == erc1155TokenIds.length, "Mismatch in ERC1155 addresses and token IDs array lengths.");

        balances = new uint256[](erc20Length + erc721Length + erc1155Length);
        uint256 k = 0;
        for (uint256 i = 0; i < erc20Length; i += 1) {
            balances[k] = ERC20(erc20s[i]).balanceOf(owner);
            k += 1;
        }
        for (uint256 i = 0; i < erc721Length; i += 1) {
            balances[k] = ERC721(erc721s[i]).balanceOf(owner);
            k += 1;
        }
        for (uint256 i = 0; i < erc1155Length; i += 1) {
            ERC1155 erc1155 = ERC1155(erc1155s[i]);
            uint256[] memory tokenIds = erc1155TokenIds[i];
            uint256 tokenIdLength = tokenIds.length;
            for (uint256 j = 0; j < tokenIdLength; j += 1) {
                balances[k] += erc1155.balanceOf(owner, tokenIds[j]);
            }
            k += 1;
        }
    }
}
