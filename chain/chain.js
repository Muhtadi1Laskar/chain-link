// import { hash } from "./hash.js";
// import { getMerkleRoot } from "./merkleTree.js";

// class Node {
//     constructor(value) {
//         this.timeStamp = `${new Date()}`;
//         this.value = value;
//         this.hashData(this.timeStamp, this.value);
//         this.hash = '';
//         this.prevHash = '';
//         this.next = null;
//     }

//     async hashData(value, time) {
//         const finalValue = value + time;
//         const hashedData = await hash(finalValue);
//         this.hash = hashedData;
//     }
// }

// class Chain {
//     constructor() {
//         this.head = null;
//         this.tail = this.head;
//         this.length = 0;
//     }

//     __isEmpty() {
//         return !this.head;
//     }

//     append(value) {
//         if(value === '') {
//             return 'Empty List';
//         }
//         const newNode = new Node(value);

//         if(this.__isEmpty()) {
//             this.head = newNode;
//             this.tail = this.head;
//             this.length += 1;
//             return;
//         }
//         let previousHash = this.tail.hash;

//         this.tail.next = newNode;
//         this.tail = newNode;
//         newNode.prevHash = previousHash;
//         this.length++;

//         return;
//     }

//     getData() {
//         let array = [];

//         if(this.__isEmpty()) {
//             return 'The list is empty';
//         }

//         let currentNode = this.head;

//         while(currentNode) {
//             array.push(currentNode.value);
//             currentNode = currentNode.next;
//         }
//         return array;
//     }

//     async calculateMerkleRoot() {
//         const data = this.getData();
//         console.log(data)
//         const root = await getMerkleRoot(data);
//         console.log(root)
//         return root;
//     }
// }

// const chain = new Chain();

// chain.append('C');
// chain.append('JavaScript');
// chain.append('Python');
// chain.append('Go');
// chain.append('Haskell');

// console.log(chain.getData());

// chain.calculateMerkleRoot(res => res);