// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract MockERC721 is ERC721("", "") {
    function mint(address to, uint256 id) external {
        _mint(to, id);
    }

    function mintBatch(address to, uint256[] calldata ids) external {
        for (uint256 i; i < ids.length; ++i) {
            _mint(to, ids[i]);
        }
    }
}
