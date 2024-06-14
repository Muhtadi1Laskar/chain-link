const selectTag = document.getElementById('select');
const textAreaTag = document.getElementById('floatingTextarea2');
const btn = document.getElementById('hash-submit-btn');
const outputTag = document.getElementById('output');


const renderSelectOption = () => {
    const options = ['md4', 'md5', 'sha1', 'sha256'];

    options.forEach((elem, index) => {
        const optionTag = document.createElement('option');

        optionTag.id = `${elem}-${index}`;
        optionTag.value = elem;
        optionTag.innerText = elem;

        selectTag.appendChild(optionTag);
    });
}

const convertData = () => {
    const optionTag = document.getElementsByTagName('option');
    const userData = textAreaTag.value;
    const optionValue = selectTag.value;

    fetchData(userData, optionValue).then(res => {
        console.log(res);
        renderHTML(res.Digest);
    });

    textAreaTag.value = '';
}

const renderHTML = (value) => {
    outputTag.className = "hash-output";
    outputTag.innerText = value;
}

const fetchData = async (value, hashType) => {
    const URL = `https://api.hashify.net/hash/${hashType}/hex?value=${value}`;
    try {
        const response = await fetch(URL);
        if(response.ok) {
            const data = await response.json();
            return data;
        } 
        else {
            throw new Error(`API request failed with status: ${response.status}`);
        }
    } catch (error) {
        console.error("Error fetching data: ", error);
    }
}

fetchData('hello world', 'sha256').then(res => console.log(res));

const main = () => {
    renderSelectOption();
    btn.addEventListener("click", () => convertData());
}

main();