# Crypto-Witties

This is a simple implementation of a cryptocurrency using TypeScript. This doesn't include any network implementation, just the blockchain instance on the local machine.

![preview](https://i.imgur.com/GNr4qWB.jpg)

## File Structure

```
.
├── index.ts
├── jest.config.js
├── LICENSE
├── package.json
├── package-lock.json
├── README.md
├── src
│   ├── Blockchain.ts
│   ├── Block.ts
│   ├── MerkleNode.ts
│   ├── MerkleTree.ts
│   ├── NETWORK_WALLET.ts
│   ├── Transaction.ts
│   ├── utils.ts
│   └── Wallet.ts
├── tests
│   └── Merkle.test.ts
└── tsconfig.json
```

- `src/Blockchain.ts` contains the Blockchain class implementation.
- `src/Block.ts` contains the Block class implementation.
- `src/MerkleNode.ts` contains the MerkleNode for the node definition of the MerkleTree.
- `src/MerkleTree.ts` contains the full MerkleTree implementation.
- `src/NETWORK_WALLET` contains the wallet address the Blockchain instance.
- `src/Transaction.ts` contains the Transaction class implementation.
- `src/Wallet.ts` contains the wallet class implementation.
- `src/utils.ts` contains the needed functions for the other files.
- `tests` directory contains the automated tests.
- `index.ts` initialises the blockchain instance and tests a demo transfer of coins between two demo users.

Full step by step expanation is available in [this Medium article](https://levelup.gitconnected.com/lets-create-a-cryptocurrency-for-fun-42894b50e44c).
