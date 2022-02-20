import { v4 as uuidv4 } from "uuid";
import { createHash, createSign, createVerify } from "crypto";
import NETWORK_WALLET from "./NETWORK_WALLET";
import Wallet from "./Wallet";
import Blockchain from "./Blockchain";

class Transaction {
  id: string;
  sender: string;
  receiver: string;
  amount: number;
  hash: string;
  signature: string;
  constructor(senderPubKey: string, receiverPubKey: string, amount: number) {
    const id = uuidv4();
    const data = senderPubKey + receiverPubKey + amount + id;
    const hash = createHash("sha256").update(data).digest("hex");
    this.id = id;
    this.sender = senderPubKey;
    this.receiver = receiverPubKey;
    this.amount = amount;
    this.hash = hash;
    this.signature = "";
  }

  sign(wallet: Wallet) {
    if (wallet.publicKey === this.sender) {
      const shaSign = createSign("sha256");
      shaSign.update(this.hash).end();
      this.signature = shaSign.sign(wallet.privateKey).toString("base64");
    }
  }

  isValid(chain: Blockchain) {
    const sig = Buffer.from(this.signature, "base64");
    const verify = createVerify("sha256");
    verify.update(this.hash);
    const isVerified = verify.verify(this.sender, sig);

    const data = this.sender + this.receiver + this.amount + this.id;
    const hash = createHash("sha256").update(data).digest("hex");

    return (
      this.sender &&
      this.receiver &&
      this.amount &&
      (chain.getBalance(this.sender) >= this.amount ||
        this.sender === NETWORK_WALLET.publicKey) &&
      this.hash === hash &&
      isVerified
    );
  }
}

export default Transaction;
