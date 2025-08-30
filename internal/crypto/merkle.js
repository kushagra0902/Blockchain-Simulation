import { hashData } from "./hash";

class MerkleTree {
    constructor(transactions){
        this.transactions = transactions
    }

    MerkleRoot() {
        // You can access this.transactions here, no need to pass it as a arguement

        let hashArray = [];
        this.transactions.forEach(function(element, idx){
            const hashed = hashData(element);
            hashArray.push(hashed);
        });

        while (hashArray.length > 1) {
            let tempArray = [];
            for (let i = 0; i < hashArray.length; i += 2) {
            if (i + 1 < hashArray.length) {
                // Hash the pair
                tempArray.push(hashData(hashArray[i] + hashArray[i + 1]));
            } else {
                // Odd number, hash with itself
                tempArray.push(hashData(hashArray[i] + hashArray[i]));
            }
            }
            hashArray = tempArray;
        }

        return hashArray[0]
    }


}

//Here we are only getting upto the root hash of transactions and not complete tree. Complete tree is an additional feature and can be worked upon later

export {MerkleTree}