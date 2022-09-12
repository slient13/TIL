const fs = require('fs');

/**
 * @param {string} path 
 * @param {string} encoding
 * @param {(Error, Binary)->} action
 */
fs.readFile('./fileRead/source.txt', 'utf8', (err, data) => {
    if (err) throw err;
    console.log(data);
})