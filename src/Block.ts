import Blockchain from "./Blockchain";
import MerkleTree from "./MerkleTree";
import Transaction from "./Transaction";
import { calculateHash } from "./utils";

class Block {
  data: Array<Transaction>;
  hash: string;
  previousHash: string | null;
  rootHash: string;
  timestamp: Date;
  pow: number;
  constructor(data: Array<Transaction>, previousHash: string | null) {
    this.data = data;
    this.hash = "";
    this.previousHash = previousHash;
    this.rootHash = MerkleTree.create(data).root.value;
    this.timestamp = new Date();
    this.pow = 0;
  }

  mine(difficulty: number) {
    const regex = new RegExp(`^(0){${difficulty}}.*`);
    while (!this.hash.match(regex)) {
      this.pow++;
      this.hash = calculateHash(this);
    }
  }

  hasValidTransactions(chain: Blockchain) {
    return this.data.every((transaction: Transaction) =>
      transaction.isValid(chain)
    );
  }
}

export default Block;
