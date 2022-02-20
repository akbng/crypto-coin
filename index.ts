import Blockchain from "./src/Blockchain";
import Wallet from "./src/Wallet";

const Alice = new Wallet();
const Bob = new Wallet();

function init() {
  const blockchain = Blockchain.create(Alice.publicKey);
  Alice.send(1299, Bob.publicKey, blockchain);
  Alice.send(345, Bob.publicKey, blockchain);
  blockchain.mineTransactions(Bob.publicKey);
  console.log("Alice has " + blockchain.getBalance(Alice.publicKey));
  console.log("Bob has " + blockchain.getBalance(Bob.publicKey));
  console.log(`Blockchain is${blockchain.isValid() ? "" : " not"} valid`);
}

init();
