import { Chain } from "./chain.js";

const chain = new Chain();

const textArea = document.getElementById('floatingTextarea2');
const btn = document.getElementById('btn');
const cardsContainer = document.getElementById('cards-container');

const clearTextArea = () => textArea.value = '';

const userValue = () => {
    const value = textArea.value.trim();
    if(value === '') {
        return null;
    }
    clearTextArea();
    return value;
}

const generateHTML = (data) => {
    return data.map(data => {
        return `
            <div class="card">
            <h3>Transaction Details</h3>
                <p><strong>Timestamp:</strong> ${data.timeStamp}</p>
                <p><strong>Value: ${data.value}</strong></p>
                <p><strong>Hash:</strong> ${data.hash}</p>
                <p><strong>Previous Hash:</strong> ${data.previousHash}</p>
                <p><strong>Merkle Root:</strong> ${data.merkleRoot}</p>
            </div>
        `
    });
}

const injectHTML = (data) => {
    const htmlBody = generateHTML(data);
    cardsContainer.innerHTML = htmlBody;
} 


const initiateChain = (value) => {
    chain.append(value);
    const data = chain.print();
    return data;
}

const main = () => {
    const userData = userValue();
    const chainData = initiateChain(userData);
    
    injectHTML(chainData);
    console.log(chainData);
}

btn.addEventListener("click", main);