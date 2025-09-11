import { app } from "./app";

import { BlockChain } from "./blockchain/blockchain.js";

let localBCinstance = new BlockChain();

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
export { localBCinstance };
