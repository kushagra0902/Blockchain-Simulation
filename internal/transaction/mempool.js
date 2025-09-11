import fs from "fs";
import { mempoolLocation } from "../utils/config.js";

class Mempool {
  constructor() {
    if (fs.existsSync(mempoolLocation)) {
      this.fileLocation = mempoolLocation;
    } else {
      fs.writeFileSync(mempoolLocation, JSON.stringify([]));
      this.fileLocation = mempoolLocation;
    }

    // this.transactionData;..............better to return the json in func calls so that if we require different data types in different files, it will be better.
  }

  readMem() {
    let data = fs.readFileSync(this.fileLocation);
    data = JSON.parse(data); // here the data is of type nonsharednuffer file type, ie the memeory given to this buffer is not shared wth any other buffer and is exclusive to this instace of buffer only.
    return data;
  }

  writeMem(data) {
    fs.writeFileSync(this.fileLocation, JSON.stringify(data));
  } // this is made so that any data is enterd in the fil ein format of a valid json only. If not it will not be enetered to this file. This ensures the safety and validity of the file

  addTrans(tx) {
    let data = this.readMem();
    if (!data.some((t) => t.id === tx.id)) {
      //soem functin can be used on a nonshared buffeer file type or in any array to check if the callback function gives true for any element of the array
      data.push(tx);
      this.writeMem(data);
    }
  }

  getTransactions(limit = 5) {
    const transactions = this.readMem();
    return transactions.slice(0, limit);
  }
  removeTransactions(txIds) {
    let data = this.readMem();
    data = data.filter((tx) => !txIds.includes(tx.id));
    this.writeMem(data);
  }
}

export { Mempool };
