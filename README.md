# ParsingNFTData

## Mainnet
- [0x06f98E2E91E64103d612243a151750d14e5EDacC](https://etherscan.io/address/0x06f98E2E91E64103d612243a151750d14e5EDacC)

## Klaytn
- 0x8A98A038dcA75091225EE0a1A11fC20Aa23832A0

## BNB
- 0xECFFc91149b8B702dEa6905Ae304A9D36527060F

## Bifrost
- 0xdC5323d27c611D978E33B65ef9E1eA49fd9a0199

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

This contract is a collection of functions that parse ERC721 and ERC1155 holder and balance data.  
  
`getERC721HolderList` and `getERC721BalanceList` is written by assembly to get data as much as possible in one call.
`getERC1155BalanceList` takes nested arrays as arguments and returns a rested array called 'balances'.

## Contact

- [TheGreatHB](https://twitter.com/TheGreatHB_/)
