// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "./IParsingNFTData.sol";

contract ParsingNFTData is IParsingNFTData {
    function getERC721HolderList(IERC721 nft, uint256[] calldata) external view returns (address[] memory holders) {
        bytes4 selector = IERC721.ownerOf.selector;
        /// @solidity memory-safe-assembly
        assembly {
            let len := calldataload(68)
            holders := mload(0x40)
            mstore(holders, len)
            let totalbytes := mul(len, 0x20)
            mstore(0x40, add(add(holders, 0x20), totalbytes))
            let end := add(totalbytes, 0x20)

            // prettier-ignore
            for { let i := 0x20 } lt(i, end) { i := add(i, 0x20) } {
                mstore(0, selector)
                calldatacopy(4, add(0x44, i), 0x20)

                if staticcall(gas(), nft, 0, 0x24, 0, 0x20) {
                    mstore(add(holders, i), mload(0))
                }
            }
        }
    }

    function getERC721BalanceList(IERC721 nft, address[] calldata) external view returns (uint256[] memory balances) {
        bytes4 selector = IERC721.balanceOf.selector;
        /// @solidity memory-safe-assembly
        assembly {
            let len := calldataload(68)
            balances := mload(0x40)
            mstore(balances, len)
            let totalbytes := mul(len, 0x20)
            mstore(0x40, add(add(balances, 0x20), totalbytes))
            let end := add(totalbytes, 0x20)

            // prettier-ignore
            for { let i := 0x20 } lt(i, end) { i := add(i, 0x20) } {
                mstore(0, selector)
                calldatacopy(4, add(0x44, i), 0x20)

                if staticcall(gas(), nft, 0, 0x24, 0, 0x20) {
                    mstore(add(balances, i), mload(0))
                }
            }
        }
    }

    function getERC1155BalanceList(
        IERC1155 erc1155,
        address[][] calldata holders,
        uint256[][] calldata tokenIds
    ) external view returns (uint256[][] memory balances) {
        uint256 length = holders.length;
        require(tokenIds.length == length, "LENGTH_NOT_EQUAL");
        balances = new uint256[][](length);
        for (uint256 i; i < length; ) {
            balances[i] = erc1155.balanceOfBatch(holders[i], tokenIds[i]);
            unchecked {
                i++;
            }
        }
    }
}
