import { Chain } from "./chain.js";

// const chain = new Chain();

// const textArea = document.getElementById('floatingTextarea2');
// const btn = document.getElementById('btn');
// const cardsContainer = document.getElementById('cards-container');

// const clearTextArea = () => textArea.value = '';

// const userValue = () => {
//     const value = textArea.value.trim();
//     if(value === '') {
//         return null;
//     }
//     clearTextArea();
//     return value;
// }

// const generateHTML = (data) => {
//     return data.map(data => {
//         return `
//             <div class="card">
//             <h3>Transaction Details</h3>
//                 <p><strong>Timestamp:</strong> ${data.timeStamp}</p>
//                 <p><strong>Value: ${data.value}</strong></p>
//                 <p><strong>Hash:</strong> ${data.hash}</p>
//                 <p><strong>Previous Hash:</strong> ${data.previousHash}</p>
//                 <p><strong>Merkle Root:</strong> ${data.merkleRoot}</p>
//             </div>
//         `
//     });
// }

// const injectHTML = (data) => {
//     const htmlBody = generateHTML(data);
//     cardsContainer.innerHTML = htmlBody;
// } 


// const initiateChain = (value) => {
//     chain.append(value);
//     const data = chain.print();
//     return data;
// }

// const main = () => {
//     const userData = userValue();
//     const chainData = initiateChain(userData);
    
//     injectHTML(chainData);
//     console.log(chainData);
// }

// btn.addEventListener("click", main);

const textArea = document.getElementById('floatingTextarea2');
const btn = document.getElementById('btn');
const clearBtn = document.getElementById('clear-btn');
const cardsContainer = document.getElementById('cards-container');

const clearTextArea = () => {
  textArea.value = '';
};

const handleUserInput = (chain) => {
  const value = textArea.value.trim();

  if (value === '') {
    // Handle empty input error (e.g., display an error message)
    return;
  }

  clearTextArea();
  chain.append(value);

  const chainData = chain.print(); // Assuming `chain.print` returns an array
  injectHTML(chainData);
  console.log(chainData);
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

const injectHTML = (data) => {
  const htmlBody = generateHTML(data);
  cardsContainer.innerHTML = htmlBody;
};

// Dependency injection (example with a concrete implementation)
const chain = new Chain(); // Replace with your chain logic

const main = () => {
  btn.addEventListener('click', () => handleUserInput(chain));
  clearBtn.addEventListener('click', () => clearUI(chain));
};

main();