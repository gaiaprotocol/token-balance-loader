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
        require(erc1155s.length == erc1155TokenIds.length, "Mismatch in ERC1155 addresses and token IDs array lengths.");

        balances = new uint256[](erc20s.length + erc721s.length + erc1155s.length);

        for (uint256 i = 0; i < erc20s.length; i++) {
            balances[i] = ERC20(erc20s[i]).balanceOf(owner);
        }

        for (uint256 i = 0; i < erc721s.length; i++) {
            balances[i + erc20s.length] = ERC721(erc721s[i]).balanceOf(owner);
        }

        for (uint256 i = 0; i < erc1155s.length; i++) {
            ERC1155 erc1155 = ERC1155(erc1155s[i]);
            uint256 balance = 0;
            for (uint256 j = 0; j < erc1155TokenIds[i].length; j++) {
                balance += erc1155.balanceOf(owner, erc1155TokenIds[i][j]);
            }
            balances[i + erc20s.length + erc721s.length] = balance;
        }
    }
}
