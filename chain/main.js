import { Chain } from "./chain.js";
import { getTreeData } from "./merkleTree.js";

const textArea = document.getElementById('floatingTextarea2');
const btn = document.getElementById('btn');
const clearBtn = document.getElementById('clear-btn');
const treeBtn = document.getElementById('print-tree');
const cardsContainer = document.getElementById('cards-container');

const clearTextArea = () => {
  textArea.value = '';
};

const handleUserInput = (chain) => {
  const value = textArea.value.trim();

  cardsContainer.style.gridTemplateColumns = "repeat(6, 0fr)";
  btn.innerText = "Submit";

  if (value === '') {
    cardsContainer.innerHTML = '<h1>Enter Something JACKASS</h1>'
  }

  clearTextArea();
  chain.append(value);

  const chainData = chain.print(); 
  injectHTML(chainData);
};

const clearUI = (chain) => {
    chain.clearChain();
    cardsContainer.innerHTML = '';
}

const generateHTML = (data) => {
  return data.map((item) => `
    <div class="card">
      <h3>Transaction Details</h3>
      <p><strong>Timestamp:</strong> ${item.timeStamp}</p>
      <p><strong>Value:</strong> ${item.value}</p>
      <p><strong>Hash:</strong> ${item.hash}</p>
      <p><strong>Previous Hash:</strong> ${item.previousHash}</p>
      <p><strong>Merkle Root:</strong> ${item.merkleRoot}</p>
    </div>
  `);
};

const generateTreeHTML = (data) => {
    return data.map((item) => `
        <div class="card">
            <h3>Merkle Data</h3>
            <p><strong>Value:</strong> ${item.value}</p>
            <p><strong>Content:</strong> ${item.content}</p>
        </div>
  `);
}

const printTreeData = (chain) => {
    const data = chain.getValues();
    const treeData = getTreeData(data);
    const treeHTML = generateTreeHTML(treeData);
    
    btn.innerText = 'Show Transaction';
    cardsContainer.innerHTML = '';
    cardsContainer.style.gridTemplateColumns = "repeat(1, 0fr)";

    treeHTML.forEach(element => {
        cardsContainer.innerHTML += element;
    });
}



const injectHTML = (data) => {
  const htmlBody = generateHTML(data);
  cardsContainer.innerHTML = htmlBody;
};


const chain = new Chain(); 

const main = () => {
  btn.addEventListener('click', () => handleUserInput(chain));
  clearBtn.addEventListener('click', () => clearUI(chain));
  treeBtn.addEventListener('click', () => printTreeData(chain));
};

main();