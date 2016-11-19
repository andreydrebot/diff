const {
    ChangeType
} = require('./ChangeType');

function compare(leftFile, rightFile) {
    if (typeof leftFile === 'undefined') {
        throw new Error('Content of first file is not defined.');
    }

    if (typeof rightFile === 'undefined') {
        throw new Error('Content of second file is not defined.');
    }

    const leftCollection = leftFile.split('\n').map(val => val.trim());
    const rightCollection = rightFile.split('\n').map(val => val.trim());

    const result = [];

    let leftCollectionIndex = 0,
        rightCollectionIndex = 0;

    for (; leftCollectionIndex < leftCollection.length; leftCollectionIndex++) {

        let matchIndex = -1;
        for (let i = rightCollectionIndex; i < rightCollection.length; i++) {
            if (rightCollection[i] === leftCollection[leftCollectionIndex]) {
                matchIndex = i;
                break;
            }
        }


        if (matchIndex !== -1) {
            while (rightCollectionIndex !== matchIndex) {
                result.push({
                    type: ChangeType.Added,
                    text: rightCollection[rightCollectionIndex]
                });
                rightCollectionIndex++;
            }

            result.push({
                type: ChangeType.Unmodified,
                text: leftCollection[leftCollectionIndex]
            });

            rightCollectionIndex++;
        } else {
            result.push({
                type: ChangeType.Removed,
                text: leftCollection[leftCollectionIndex]
            });
        }

    }

    while (rightCollectionIndex < rightCollection.length) {
        result.push({
            type: ChangeType.Added,
            text: rightCollection[rightCollectionIndex]
        });
        rightCollectionIndex++;
    }


    let index = 0;
    let entry = null;
    do {
        const currentEntry = result[index];

        if (currentEntry.type === ChangeType.Removed && !entry) {
            entry = currentEntry;
        }

        if (currentEntry.type === ChangeType.Added && entry) {
            entry.type = ChangeType.Modified;
            entry.text += ` | ${currentEntry.text}`;

            result.splice(index, 1);

            entry = null;
            index = 0;

        }

        if (currentEntry.type === ChangeType.Unmodified) {
            entry = null;
        }

        index++;
    } while (index < result.length);

    return result;
}

module.exports = {
    compare,
    ChangeType
};