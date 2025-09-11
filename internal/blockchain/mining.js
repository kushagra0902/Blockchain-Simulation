import { Block } from "./block.js";
import { Mempool } from "../transaction/mempool.js";
import { hashData } from "../crypto/hash.js";
import { isValidBlock, isValidTransaction } from "./validator.js";
import { signData } from "../crypto/signature.js";
import { localBCinstance } from "../index.js";

class Miner {
  constructor(difficulty = 3) {
    this.difficulty = difficulty;
    this.blockchain = localBCinstance;
  }

  createNewBlock() {
    let nonce = 0;
    let transactions = Mempool.getTransactions();
    let index = this.blockchain.idx;
    let prevHash = this.blockchain[index];
    let block = new Block(transactions, index, prevHash);
    this.blockchain.idx += 1;

    // announce the block in network later

    do {
      nonce++;
      block.footer.nonce = nonce;
      hash = hashData(block.header);
    } while (!hash.startsWith("0".repeat(this.difficulty)));

    if (isValidBlock(block, prevHash)) {
      this.blockchain.AppendNewBlock(block);
      this.transactions.removeTransactions(
        block.body.transactions.map((tx) => tx.id)
      ); //converts tranasactions obj of each block to the ids of transactions.
      console.log(`Block mined: ${hash}`);
    } else {
      console.log("Block failed validation.");
    }

    return block;
  }
}

export { Miner };
