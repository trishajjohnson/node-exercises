const fs = require('fs');
const process = require('process');
const axios = require('axios');

function handleOut(text, out) {
    if(out) {
        fs.writeFile(out, text, 'utf8', err => {
            if (err) {
                console.log(`Couldn't write ${out}: ${err}`);
                process.exit(1);
            }
            else {
                console.log('It worked!', text);
            }
        });
    }
}


function cat(path, out) {
    fs.readFile(path, 'utf8', (error, data) => {
        if (error) {
            console.error(`Error reading ${path}: ${error}`);
            process.exit(1);
        }
        else {
            handleOut(data, out);
        }
    });
}


async function webCat(url, out) {
    try {
        const res = await axios.get(url);
        handleOut(res.data, out);
    }
    catch (err) {
        console.error(`Error fetching ${url}: ${err}`);
        process.exit(1);
    }
}

let path;
let out;

if(process.argv[2] === '--out') {
    out = process.argv[3];
    path = process.argv[4];
}
else {
    path = process.argv[2]
}

if(path.includes('http://')) {
    webCat(path, out);
}
else {
    cat(path, out);
}