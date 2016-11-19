const fs = require('fs');

const {
    compare
} = require('./compare');

const {
    output
} = require('./output');

const diff = (path1, path2) => {
    const file1 = fs.readFileSync(path1, 'utf-8');
    const file2 = fs.readFileSync(path2, 'utf-8');

    const compareResult = compare(file1, file2);
    const outputResult = output(compareResult);

    return outputResult;
};

module.exports = {
    diff
};