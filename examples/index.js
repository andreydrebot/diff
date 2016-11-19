const path = require('path');

const {
    diff
} = require('./..');

const result = diff(
    path.join(__dirname, 'file1.txt'),
    path.join(__dirname, 'file2.txt')
);


console.log(result); // eslint-disable-line no-console