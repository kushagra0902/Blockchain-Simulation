import { sha256 } from "crypto";

export function hashData(data) {
  return sha256(data).digest("hex"); // return it as a hex string of fixed size
}


