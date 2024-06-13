import { sha256 } from "../Hash/sha256.js";

class Node {
    constructor(left, right, value, content, isCopied=false) {
        this.left = left;
        this.right = right;
        this.value = value;
        this.content = content;
        this.isCopied = isCopied;
    }

    static hash(value) {
        return sha256(value);
    }

    copy() {
        return new Node(this.left, this.right, this.value, this.content, true);
    }
}

class MerkleTree {
    constructor(values) {
        this.__buildTree(values);
    }

    __buildTree(values) {
        const leaves = values.map(e => new Node(null, null, Node.hash(e), e));

        if(leaves.length % 2 !== 0) {
            leaves.push(leaves[leaves.length-1].copy());
        }

        this.root = this.__buildTreeRec(leaves);
    }

    __buildTreeRec(nodes) {
        if(nodes.length % 2 !== 0) {
            nodes.push(nodes[nodes.length-1].copy());
        }
        let half = Math.floor(nodes.length / 2);

        if(nodes.length === 2) {
            const value = Node.hash(nodes[0].value + nodes[1].value);
            const content = `${nodes[0].content} + ${nodes[1].content}`;
            return new Node(nodes[0], nodes[1], value, content);
        }
        let left = this.__buildTreeRec(nodes.slice(0, half));
        let right = this.__buildTreeRec(nodes.slice(half));
        let value = Node.hash(left.value + right.value);
        let content = `${left.content} + ${right.content}`;

        return new Node(left, right, value, content);
    }

    getRootValue() {
        return this.root.value;
    }

    print() {
        let nodes = [];
        this.__collectNodes(this.root, nodes);
        return nodes;
    }

    __collectNodes(node, nodes) {
        if(node) {
            nodes.push({
                value: node.value,
                content: node.content
            });
            this.__collectNodes(node.left, nodes);
            this.__collectNodes(node.right, nodes);
        }
    }
}

const values = ['C', 'JavaScript', 'Python', 'Go', 'Haskell', 'Odin'];
const tree = new MerkleTree(values);

export const getTreeRoot = (values) => {
    const tree = new MerkleTree(values);
    const root = tree.getRootValue();
    return root;
}

export const getTreeData = (values) => {
    const tree = new MerkleTree(values);
    const data = tree.print();
    return data;
}
