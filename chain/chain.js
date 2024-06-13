import { sha256 } from "../Hash/sha256.js";
import { getTreeRoot } from "./merkleTree.js";

class Node {
    constructor(value) {
        this.timeStamp = `${new Date()}`;
        this.value = value;
        this.hash = sha256(this.timeStamp + this.value);
        this.previousHash = '';
        this.next = null;
    }
}

