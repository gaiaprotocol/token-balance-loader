// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

contract MultipleOwnersAssetsBalanceLoader {
    function load(
        address[] calldata owners,
        address[] calldata erc20And721s,
        address[] calldata erc1155s,
        uint256[] calldata erc1155TokenIds
    ) external view returns (uint256[][] memory balances) {
        require(erc1155s.length == erc1155TokenIds.length, "Mismatch in ERC1155 addresses and token IDs array lengths.");
        
        balances = new uint256[][](owners.length);
        
        for(uint256 i = 0; i < owners.length; i++) {
            balances[i] = new uint256[](erc20And721s.length + erc1155s.length);
            for (uint256 j = 0; j < erc20And721s.length; j++) {
                balances[i][j] = ERC20(erc20And721s[j]).balanceOf(owners[i]);
            }

            for (uint256 k = 0; k < erc1155s.length; k++) {
                balances[i][k + erc20And721s.length] = ERC1155(erc1155s[k]).balanceOf(owners[i], erc1155TokenIds[k]);
            }
        }
    }
}
