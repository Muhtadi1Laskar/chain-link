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

class Chain {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    isEmpty() {
        return !this.head;
    }

    append(value) {
        if(value.length === 0) {
            return 'Value cannot be empty';
        }
        const newNode = new Node(value);

        if(this.isEmpty()) {
            this.head = newNode;
            this.tail = this.head;
            this.length += 1;
            return;
        }
        let prevHash = this.tail.hash;

        this.tail.next = newNode;
        this.tail = newNode;
        newNode.previousHash = prevHash;
        this.length++;

        return;
    }
}
