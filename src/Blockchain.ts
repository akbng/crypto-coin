import Block from "./Block";
import NETWORK_WALLET from "./NETWORK_WALLET";
import Transaction from "./Transaction";
import { calculateHash } from "./utils";

class Blockchain {
  chain: Array<Block>;
  difficulty: number;
  blockTime: number;
  transactions: Array<Transaction>;
  reward: number;
  constructor(chain: Array<Block>, difficulty: number) {
    this.chain = chain;
    this.difficulty = difficulty;
    this.blockTime = 10000;
    this.transactions = [];
    this.reward = 678;
  }

  static create(firstUserAddress: string) {
    const firstTransaction = new Transaction(
      NETWORK_WALLET.publicKey,
      firstUserAddress,
      10000
    );
    firstTransaction.sign(NETWORK_WALLET);
    const genesisBlock = new Block([firstTransaction], null);
    genesisBlock.mine(3);
    return new Blockchain([genesisBlock], 3);
  }

  addBlock(transactions: Array<Transaction>) {
    const lastBlock = this.chain.at(-1);
    const newBlock = new Block(transactions, lastBlock ? lastBlock.hash : null);
    newBlock.mine(this.difficulty);
    this.chain.push(newBlock);
    this.difficulty +=
      Date.now() - newBlock.timestamp.getTime() > this.blockTime ? -1 : 1;
  }

  isValid() {
    if (
      this.chain[0].hash !== calculateHash(this.chain[0]) ||
      !this.chain[0].hasValidTransactions(this)
    )
      return false;

    for (let index = 1; index < this.chain.length; index++) {
      const currentBlock = this.chain[index];
      const previousBlock = this.chain[index - 1];
      if (
        currentBlock.hash !== calculateHash(currentBlock) ||
        previousBlock.hash !== currentBlock.previousHash ||
        !currentBlock.hasValidTransactions(this)
      )
        return false;
    }
    return true;
  }

  addTransaction(transaction: Transaction) {
    const isDuplicate = this.transactions.some(
      ({ hash }) => hash === transaction.hash
    );
    if (!isDuplicate && transaction.isValid(this)) {
      this.transactions.push(transaction);
    }
  }

  getBalance(pubKey: string) {
    let balance = 0;
    this.chain.forEach((block) => {
      block.data.forEach((transaction: Transaction) => {
        if (transaction.sender === pubKey) {
          balance -= transaction.amount;
        }

        if (transaction.receiver === pubKey) {
          balance += transaction.amount;
        }
      });
    });
    return balance;
  }

  mineTransactions(rewardAddress: string) {
    const rewardTransaction = new Transaction(
      NETWORK_WALLET.publicKey,
      rewardAddress,
      this.reward
    );
    rewardTransaction.sign(NETWORK_WALLET);
    this.addBlock([rewardTransaction, ...this.transactions]);
    this.transactions = [];
  }
}

export default Blockchain;
