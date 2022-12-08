# ParsingNFTData

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

This contract is a collection of functions that parse ERC721 and ERC1155 holder and balance data.  
  
`getERC721HolderList` and `getERC721BalanceList` is written by assembly to get data as much as possible in one call.
`getERC1155BalanceList` takes nested arrays as arguments and returns a rested array called 'balances'.

## Contact

- [TheGreatHB](https://twitter.com/TheGreatHB_/)
