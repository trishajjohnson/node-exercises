const fs = require('fs');
const process = require('process');
const axios = require('axios');

function cat(path) {
    fs.readFile(path, 'utf8', (error, data) => {
        if (error) {
            console.error(`Error reading ${path}: ${error}`);
            process.exit(1);
        }
        console.log(data);
    })
}



async function webCat(url) {
    try {
        const res = await axios.get(url);
        console.log('DATA:', res.data);
    }
    catch (err) {
        console.error(`Error fetching ${url}: ${err}`);
        process.exit(1);
    }
}

if(process.argv[2].includes('http://')) {
    webCat(process.argv[2]);
}
else {
    cat(process.argv[2]);
}