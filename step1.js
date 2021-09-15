const fs = require('fs');
const process = require('process');

function cat(path) {
    fs.readFile(path, 'utf8', (error, data) => {
        if (error) {
            console.log('Error', error);
            process.exit(1);
        }
        console.log('DATA:', data);
    })
}

cat(process.argv[2]);