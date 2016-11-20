const fs = require('fs');

const {
    compare
} = require('./compare');

const {
    output
} = require('./output');

const diff = (path1, path2) => {
    return Promise.all([
        new Promise((resolve, reject) => fs.readFile(path1, 'utf-8', (err, content) => err ? reject(err) : resolve(content))),
        new Promise((resolve, reject) => fs.readFile(path2, 'utf-8', (err, content) => err ? reject(err) : resolve(content)))
    ]).then(values => {
        const [file1, file2] = values;
        const compareResult = compare(file1, file2);
        const outputResult = output(compareResult);

        return outputResult;
    });
};

module.exports = {
    diff
};