import { getTreeData } from "./merkleTree.js";

const inputs = document.querySelectorAll('.input');

const rootValues = document.getElementById('root-value');
const rootContent = document.getElementById('root-content');
const childOneValue = document.getElementById('child-one-value');
const childOneContent = document.getElementById('child-one-content');
const childTwoValue = document.getElementById('child-two-value');
const childTwoContent = document.getElementById('child-two-content');


const extractTreeData = (values) => {
    const extractedData = [values[0], values[1], values[4]];
    console.log(values);
    injectHTML(extractedData);
}

const getAllInputValue = () => {
    return [...inputs].map((input) => input.value);
}

const injectHTML = (data) => {
    rootValues.innerHTML = `Value: ${data[0].value}`;
    rootContent.innerText = `Content: ${data[0].content}`;
    childOneValue.innerText = `Value: ${data[1].value}`;
    childOneContent.innerText = `Content: ${data[1].content}`;
    childTwoValue.innerText = `Value: ${data[2].value}`;
    childTwoContent.innerText = `Content: ${data[2].content}`;
}

inputs.forEach((input) => {
    input.addEventListener('keyup', () => {
        const allValues = getAllInputValue();
        const tree = getTreeData(allValues);
        extractTreeData(tree);
    });
});

