import { genesisBlock } from "./genesisBlock.js";
import { Block } from "./block.js";
import { hashData } from "../crypto/hash.js";
import { applyTransaction, transactions } from "../transaction/transaction.js";
import { isValidBlock, isValidTransaction } from "./validator.js";

class BlockChain {
  constructor() {
    this.idx = 0;
    this.blocks = [];
    this.blocks.push(genesisBlock);
    this.idx++;
    this.genesis = genesisBlock;
    this.pendingTransactions = [];
    this.balances = {};
  }

  AppendNewBlock(Block) {
    // will be used for the blocks received over network by broadcast by other nodes(miner nodes when they create a new block)
    if (isValidBlock(Block, prevHash)) {
      this.blocks.push(Block);
      this.pendingTransactions = this.pendingTransactions.filter(
        (tx) =>
          !Block.body.transactions.some(
            (blockTx) => blockTx.id === tx.id // W syntax, innermost callback tells whether is there any trans in block that has same id as the given id. Returns trus if found
          )
      );
      this.applyBlock(Block);
    }
  }

  CreateNewTransaction(sender, receiver, amount) {
    let newTransaction = new transactions(sender, receiver, amount);

    if (!isValidTransaction(newTransaction)) {
      throw new Error("Invalid transaction");
    }

    this.pendingTransactions.push(newTransaction);
    return newTransaction;
  }

  applyBlock(block) {
    for (let tx of block.body.transactions) {
      this.balances = applyTransaction(tx, this.balances);
    }
  }
}

export { BlockChain };

//NOW A BANGER: THERE IS NO GLOBAL BLOCKCHAIN. THE ABOVE CLASS IS MAINTAINED BY EACH NODE IN THE NETWORK AND BROADCASTS IT WHENEVER IT GETS UPDATED WITH A BLOCK OR A TRANSACTION. SO BASICALLY THE GLOBAL STATE IS AN ILLUSION OF CONSENSUS AND THE NETWORK MODULE
