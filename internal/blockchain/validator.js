import { verifySignature } from "../crypto/signature.js";
import { MerkleTree } from "../crypto/merkle.js";
function isValidBlock(block, prevHash) {
  /*
Logics for verification of the block:
1)Verify all the transactions in the block
2)Recheck the merkel root of the block
3)check lastHash of the blockChain(if not same, yet making it false, but logically make it a fork and later decide which fork is best based on PoW and longer chain(later stages))
*/

  let isValid = true;
  block.body.transactions.forEach((tx) => {
    if (!isValidTransaction(tx)) {
      isValid = false;
    }
  });
  let merkelTreeinstance = new MerkleTree(block.body.transactions);
  let merkelRoot = merkelTreeinstance.MerkleRoot();
  if (merkelRoot != block.header.merkelRoot) {
    isValid = false;
  }
  if (block.header.prevHash != prevHash) {
    isValid = false;
  }

  return isValid;
}

function isValidTransaction(transaction) {
  //logics to verify a transaction:

  /*
1)Every sender signs the transaction with their private key. Thus the transaction will be verified with their public key if it is actually made
2)It checks for amount if the sender has enough amount to make the transaction
*/

  let transactionData = JSON.stringify(
    transaction.receiver + transaction.amount
  );

  if (verifySignature(transactionData)) {
    return true;
  } else {
    return false;
  }

  //logic for amount check to be added yet
}

export { isValidBlock, isValidTransaction };
