import { sha256 } from "crypto";
import fs from "fs";
import path from "path";

//This file generate keys for a device, stores them in a config file and exports an object containing keys to be used in signing

class KeyPair {
  constructor(privateKey, publicKey) {
    // takes arguments and updates the class properties of THAT object. THIS is used to point to that particulart object jisse change kar rhe h at the moment.
    this.privateKey = privateKey;
    this.publicKey = publicKey;
  }
}

function generateKeyPair() {
  const privateKey = crypto.randomBytes(32);
  const publicKey = sha256(privateKey);

  const configPath = path.resolve(__dirname, "../../config.json");
  let config = {};

  //used sync method here as we dont want to proceed until we open this file system.  Better method is to add a timeout so if 5 seconds or so me bhi nhi hua then it fails simply.
  if (fs.existsSync(configPath)) {
    //existSync chekcs if teh file exists or not and if it does, we parse the json in it ans stores it in config
    config = JSON.parse(fs.readFileSync(configPath, "utf8"));
  }

  if (!config.privateKey || !config.publicKey) {
    config.privateKey = privateKey.toString("hex");
    config.publicKey = publicKey.toString("hex");
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2), "utf8"); // write the updated config back to the file, here JSON.stringify is used to convert the config object back to a JSON string
  }

  return new KeyPair(config.privateKey, config.publicKey);
}

PersonalKeys = new KeyPair(null, null); // Initialize with null values, new used so that a new instance of that class is made.
PersonalKeys = generateKeyPair();

export { PersonalKeys };
