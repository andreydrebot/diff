const path = require('path');

const {
    diff
} = require('./..');

diff(
        path.join(__dirname, 'file1.txt'),
        path.join(__dirname, 'file2.txt')
    )
    .then(result => console.log(result)) // eslint-disable-line no-console
    .catch(reason => console.error(reason)); // eslint-disable-line no-console