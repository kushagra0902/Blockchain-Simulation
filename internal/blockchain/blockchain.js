import { genesisBlock } from "./genesisBlock";
import { Block } from "./block";
import { hashData } from "../crypto/hash";
import { applyTransaction, transactions } from "../transaction/transaction";
import { isValidBlock, isValidTransaction } from "./validator";

class BlockChain {
  constructor() {
    this.idx = 0;
    this.blocks = [];
    this.blocks.push(genesisBlock);
    this.idx++;
    this.genesis = genesisBlock;
    this.pendingTransactions = [];
    this.balances = {}
  }

  CreateNewBlock() {
    // will be used by nodes acting as the miners

    const prevBlock = this.blocks[this.idx] || this.genesis;
    const prevHash = hashData(prevBlock);

    const validTxs = this.pendingTransactions.filter((tx) =>
      this.isValidTransaction(tx)
    );

    this.idx++;
    const newBlock = new Block(validTxs, this.idx, prevHash);

    this.blocks.push(newBlock);

    this.pendingTransactions = [];
    return newBlock;
  }

  AppendNewBlock(Block) {
    // will be used for the blocks received over network by broadcast by other nodes(miner nodes when they create a new block)
    const prevBlock = this.blocks[this.idx] || this.genesis;
    const prevHash = hashData(prevBlock);

    if (isValidBlock(Block, prevHash)) {
      Block.header.idx = this.idx;
      this.idx++;
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

    if (!this.isValidTransaction(newTransaction)) {
      throw new Error("Invalid transaction");
    }

    this.pendingTransactions.push(newTransaction);
    return newTransaction;
  }

  applyBlock(block) {
    for (let tx of block.body.transactions) {
      this.balances = applyTransaction(tx, this.balances)
    }
  }

 
}

//NOW A BANGER: THERE IS NO GLOBAL BLOCKCHAIN. THE ABOVE CLASS IS MAINTAINED BY EACH NODE IN THE NETWORK AND BROADCASTS IT WHENEVER IT GETS UPDATED WITH A BLOCK OR A TRANSACTION. SO BASICALLY THE GLOBAL STATE IS AN ILLUSION OF CONSENSUS AND THE NETWORK MODULE
