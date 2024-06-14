const selectTag = document.getElementById('select');
const textAreaTag = document.getElementById('floatingTextarea2');
const btn = document.getElementById('hash-submit-btn');
const outputTag = document.getElementById('output');


const renderSelectOption = () => {
    const options = [
        'blake2b', 
        'sha224', 
        'sha512', 
        'md5', 
        'sha384', 
        'sha3_224', 
        'sha3_256', 
        'blake2s', 
        'sha3_384', 
        'sha3_256',
        'sha256',
        'sha1',
        'shake_256',
        'shake_128',
        'sha3_512'
    ];

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
        renderHTML(res.hash_type);
    });

    textAreaTag.value = '';
}

const renderHTML = (value) => {
    outputTag.className = "hash-output";
    outputTag.innerText = value;
}

const fetchData = async (value, hashType = 'sha256') => {
    const URL = `https://cottony-amusing-cyclamen.glitch.me/hash/${hashType}/${value}`;
    const requestOptions = {
        method: "GET",
        redirect: "follow",
    };

    try {
        const response = await fetch(URL, requestOptions);
        if (response.ok) {
            const result = await response.json();
            return result;
        } else {
            console.error(`Error fetching data: ${response.status}`);
        }
    } catch (error) {
        console.error(error);
    }
};

fetchData('hello world', 'sha256').then(res => console.log(res));

const main = () => {
    renderSelectOption();
    btn.addEventListener("click", () => convertData());
}

main();