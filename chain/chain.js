import { sha256 } from "../Hash/sha256.js";
import { getTreeRoot } from "./merkleTree.js";

class Node {
    constructor(value) {
        this.timeStamp = `${new Date()}`;
        this.value = value;
        this.previousHash = '';
        this.hash = sha256(this.timeStamp + this.value + this.previousHash);
        this.next = null;
    }
}

export class Chain {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    isEmpty() {
        return !this.head;
    }

    append(value) {
        if (value.length === 0) {
            return 'Value cannot be empty';
        }
        const newNode = new Node(value);

        if (this.isEmpty()) {
            this.head = newNode;
            this.tail = this.head;
            this.length += 1;
            this.setMerkleRoot();
            return;
        }
        let prevHash = this.tail.hash;

        this.tail.next = newNode;
        this.tail = newNode;
        newNode.previousHash = prevHash;
        this.setMerkleRoot();
        this.length++;

        return;
    }

    update(index, newValue) {
        let nodeToUpdate = this.getNodeByIndex(index);
        nodeToUpdate.value = newValue;

        let currentNode = nodeToUpdate;
        let prevHash = currentNode.previousHash;

        while(currentNode) {
            currentNode.timeStamp = `${new Date()}`;
            currentNode.hash = sha256(currentNode.timeStamp + currentNode.value + currentNode.previousHash);
            currentNode.previousHash = prevHash;
            prevHash = currentNode.hash;
            currentNode = currentNode.next;
        }
        return;
    }

    getNodeByIndex(index) {
        if(this.isEmpty()) {
            return "The list is empty";
        }
        let currentNode = this.head;

        for(let i=1;i<index;i++) {
            currentNode = currentNode.next;
        }
        return currentNode;
    }

    getLenght() {
        return this.length;
    }

    print() {
        if (this.isEmpty()) {
            return 'The list is empty';
        }
        let array = [];
        let currentNode = this.head;

        while (currentNode) {
            array.push({
                timeStamp: currentNode.timeStamp,
                value: currentNode.value,
                hash: currentNode.hash,
                previousHash: currentNode.previousHash,
                merkleRoot: currentNode.merkleRoot
            });
            currentNode = currentNode.next;
        }
        return array;
    }

    getValues() {
        if (this.isEmpty()) {
            return 'The list is empty';
        }
        let array = [];
        let currentNode = this.head;

        while (currentNode) {
            array.push(currentNode.value);
            currentNode = currentNode.next;
        }
        return array;
    }

    setMerkleRoot() {
        const root = this.getMerkleRoot();
        this.tail.merkleRoot = root;
    }

    getMerkleRoot() {
        const data = this.getValues();
        const root = getTreeRoot(data);
        return root;
    }

    clearChain() {
        this.head = null;
        this.tail = this.head;
        this.length = 0;
        return;
    }
}

const chain = new Chain();

chain.append('C');
chain.append('JavaScript');
chain.append('Python');
chain.append('Go');
chain.append('Haskell');
chain.append('Odin');

// console.log(chain.print());
// console.log(chain.getMerkleRoot());

// console.log(chain.getLenght());
// console.log(chain.update(3, 'Assemblt'));

// console.log(chain.print());