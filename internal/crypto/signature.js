import { PersonalKeys } from "./key.js";
import { hashData } from "./hash.js";
import crypto from "crypto";

function signData(data, privateKey) {
  const hash = hashData(data);
  const sign = crypto.createSign("SHA256"); // this creates a signature object using the crypto module of node
  sign.update(hash); // we feed in the data we want to sign first. Generally we do not sigbn the whole data but its hash as the hash is of fixed length
  sign.end();
  signature = sign.sign(privateKey, "hex"); // we sign the fucntion using the personal keys which can thus later be verified using the verify function
  return signature;
}

function verifySignature(data, signature, publicKey) {
  const hash = hashData(data); // we create the hash of same data
  const verify = crypto.createVerify("SHA256"); // we make a verification object. Has information about the algorithm to be used already
  verify.update(hash); // feed in the hash like one in signing
  verify.end();
  return verify.verify(publicKey, signature, "hex"); // we verify the signature using the public key, returns a bool
}

export { verifySignature, signData };
