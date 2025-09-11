import { hashData } from "../crypto/hash.js";
import { MerkleTree } from "../crypto/merkle.js";

class BlockHeader {
  cosntructor() {
    // exec when the obj of that class is formed automatcially like constructors in any other lang
    this.timestamp = Date.now();
    this.merkelRoot;
    this.idx;
    this.id;
  }
  //when we want to make a method of this class and want to use the variables defined in the constructor, we can directly use them without passing them as the parameter

  setMerkelRoot(transactions) {
    const merkelTree = new MerkleTree(transactions);
    this.merkelRoot = merkelTree.MerkleRoot();
  }
}

class BlockBody {
  constructor(transactions) {
    this.transactions = transactions;
  }
}

class BlockFooter {
  constructor(prevHash) {
    this.prevHash = prevHash;
    this.nonce;
  }
}

class Block {
  cosntructor(transactions, idx = null, prevHash = null) {
    this.idx = idx;
    this.header;
    this.footer;
    this.body;
    this.setFooter(prevHash);
    this.setBody(transactions);
  }

  SetHeader() {
    this.header.setMerkelTree(this.body.transactions); // set the merkelRoot in the header

    const blockData = JSON.stringify({
      header: {
        timestamp: this.header.timestamp,
        merkelRoot: this.header.merkelRoot,
        idx: this.idx, // will be inserted in the block chain itself
      },
      footer: this.footer,
      body: this.body,
    });
    //idx logic yet to be formed

    this.header.id = hashData(blockData);
  }

  setBody(transactions) {
    this.body = new BlockBody(transactions);
    this.SetHeader(); // refresh header with new Merkle root + id ...............this is imp to be done to maintain the authencity of the block
  }

  setFooter(prevHash) {
    this.footer = new BlockFooter(prevHash);
    this.SetHeader(); // refresh block id after footer update
  }
}

export { Block };
