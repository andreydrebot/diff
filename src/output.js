const {
    ChangeType
} = require('./compare.js');

const getTypeSymbol = ({type}) => {
    if (type === ChangeType.Added) {
        return '+';
    }
    if (type === ChangeType.Removed) {
        return '-';
    }
    if (type === ChangeType.Modified) {
        return '*';
    }

    return ' ';
};

const output = entries => entries.map((entry, index) => `${index}    ${getTypeSymbol(entry)}    ${entry.text}`).join('\n');

module.exports = {
    output
};