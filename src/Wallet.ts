import { generateKeyPairSync } from "crypto";
import Blockchain from "./Blockchain";
import Transaction from "./Transaction";

class Wallet {
  privateKey: string;
  publicKey: string;
  constructor() {
    const keys = generateKeyPairSync("rsa", {
      modulusLength: 2048,
      publicKeyEncoding: { type: "spki", format: "pem" },
      privateKeyEncoding: { type: "pkcs8", format: "pem" },
    });
    this.privateKey = keys.privateKey;
    this.publicKey = keys.publicKey;
  }

  send(amount: number, receiver: string, blockchain: Blockchain) {
    const transaction = new Transaction(this.publicKey, receiver, amount);
    transaction.sign(this);
    blockchain.addTransaction(transaction);
  }
}

export default Wallet;
