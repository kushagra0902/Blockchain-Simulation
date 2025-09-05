import { genesisBlock } from "./genesisBlock";
import { Block } from "./block";
import { hashData } from "../crypto/hash";
import { transactions } from "../transaction/transaction";
import { isValidBlock, isValidTransaction } from "./validator";

class BlockChain {
  constructor() {
    this.idx = 0;
    this.blocks = [];
    this.blocks.push(genesisBlock)
    this.idx++;
    this.genesis = genesisBlock;
    this.pendingTransactions = [];
}

CreateNewBlock() {
  const prevBlock = this.blocks[this.idx] || this.genesis;
  const prevHash = hashData(prevBlock);

  const validTxs = this.pendingTransactions.filter(tx => this.isValidTransaction(tx));

  this.idx++;
  const newBlock = new Block(validTxs, this.idx, prevHash);

  if (!this.isValidBlock(newBlock, prevBlock)) {
    throw new Error("Block validation failed");
  }

  this.blocks.push(newBlock);

  this.pendingTransactions = [];
  return newBlock;
}

CreateNewTransaction(sender, receiver, amount){
  let newTransaction = new transactions(sender, receiver, amount)

  if (!this.isValidTransaction(newTransaction)) {
    throw new Error("Invalid transaction");
  }

  this.pendingTransactions.push(newTransaction);
  return newTransaction;
}

}


//NOW A BANGER: THERE IS NO GLOBAL BLOCKCHAIN. THE ABOVE CLASS IS MAINTAINED BY EACH NODE IN THE NETWORK AND BROADCASTS IT WHENEVER IT GETS UPDATED WITH A BLOCK OR A TRANSACTION. SO BASICALLY THE GLOBAL STATE IS AN ILLUSION OF CONSENSUS AND THE NETWORK MODULE