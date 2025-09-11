import { hashData } from "../crypto/hash.js";

class transactions {
  constructor(sender, receiver, amount) {
    this.sender = sender;
    this.receiver = receiver;
    this.amount = amount;
    this.ts = Date.now();
    let transactionData = JSON.stringify(
      this.sender + this.amount + this.ts + this.receiver
    );
    this.id = hashData(transactionData);
  }
}

function applyTransaction(tx, balances) {
  // changes the balances field of each block and as the whole block chain agrees on to same blocks, each should have the same balance sheet only
  // Initialize balances if not already set
  if (!balances[tx.sender]) balances[tx.sender] = 0;
  if (!balances[tx.receiver]) balances[tx.receiver] = 0;

  // Check if sender has enough balance
  if (balances[tx.sender] >= tx.amount) {
    balances[tx.sender] -= tx.amount;
    balances[tx.receiver] += tx.amount;
  } else {
    throw new Error(`Invalid transaction: ${tx.sender} has insufficient funds`);
  }

  return balances;
}

export { transactions, applyTransaction };
