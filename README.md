# ParsingNFTData

## Mainnet
- ParsingNFTData: [0x06f98E2E91E64103d612243a151750d14e5EDacC](https://etherscan.io/address/0x06f98E2E91E64103d612243a151750d14e5EDacC)
- MultipleAssetsBalanceLoader: [0xc83dDe19D64B81CAb741A61ef8Ddd9DAF647Fdd9](https://etherscan.io/address/0xc83dDe19D64B81CAb741A61ef8Ddd9DAF647Fdd9)

## Polygon
- ParsingNFTData: 0x3DAA7E5a22C8e11F2FE31575bE028F452Fe01C8e
- MultipleAssetsBalanceLoader: 0x35Cf33e067aa514D7c24945e17Bb0De6849fAf76

## BNB
- ParsingNFTData: 0xECFFc91149b8B702dEa6905Ae304A9D36527060F
- MultipleAssetsBalanceLoader: 0x30A87277204c9C56DDc7Df998829B27aC1DdF623

## Bifrost
- ParsingNFTData: 0xdC5323d27c611D978E33B65ef9E1eA49fd9a0199
- MultipleAssetsBalanceLoader: 0x10e082761dA7C275FE05567D3C1475244C2BfB0e

## Klaytn
- ParsingNFTData: 0x8A98A038dcA75091225EE0a1A11fC20Aa23832A0
- MultipleAssetsBalanceLoader: 0x671e1c7fF40FC8ed3Ae5a1F68C3205EA3ab04428

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

This contract is a collection of functions that parse ERC721 and ERC1155 holder and balance data.  
  
`getERC721HolderList` and `getERC721BalanceList` is written by assembly to get data as much as possible in one call.
`getERC1155BalanceList` takes nested arrays as arguments and returns a rested array called 'balances'.

## Contact

- [TheGreatHB](https://twitter.com/TheGreatHB_/)
