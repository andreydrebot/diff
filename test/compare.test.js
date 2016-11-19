const expect = require('chai').expect;

const {
    compare
} = require('./../src/compare');

describe('compare:', () => {

    describe('when content of first file is not defined', () => {

        it('should throw an error', () => {
            const f = () => compare();
            expect(f).to.throw(Error, 'Content of first file is not defined.');
        });

    });

    describe('when content of second file is not defined', () => {

        it('should throw an error', () => {
            const f = () => compare('line');
            expect(f).to.throw(Error, 'Content of second file is not defined.');
        });

    });

    describe('when contents of files are exactly the same', () => {

        const file1 = ['some', 'simple', 'text', 'file'].join('\n');
        const file2 = ['some', 'simple', 'text', 'file'].join('\n');

        it('should return a collection of unmodified entries', () => {
            const result = compare(file1, file2);

            expect(result).to.eql([{
                type: 'U',
                text: 'some'
            }, {
                type: 'U',
                text: 'simple'
            }, {
                type: 'U',
                text: 'text'
            }, {
                type: 'U',
                text: 'file'
            }, ]);
        });

    });

    describe('when two files are completely different', () => {
        const file1 = ['1', '2', '3', '4'].join('\n');
        const file2 = ['5', '6', '7', '8'].join('\n');

        it('should return a collection of changed entries', () => {
            const result = compare(file1, file2);

            expect(result).to.eql([{
                type: 'M',
                text: '1 | 5'
            }, {
                type: 'M',
                text: '2 | 6'
            }, {
                type: 'M',
                text: '3 | 7'
            }, {
                type: 'M',
                text: '4 | 8'
            }]);
        });
    });

    describe('when second file has extra line in the end', () => {

        const file1 = ['some', 'info', 'another', 'line'].join('\n');
        const file2 = ['some', 'info', 'another', 'line', 'added'].join('\n');

        it('should return a collection of entries from the first file + added entry from the second', () => {
            const result = compare(file1, file2);

            expect(result).to.eql([{
                type: 'U',
                text: 'some'
            }, {
                type: 'U',
                text: 'info'
            }, {
                type: 'U',
                text: 'another'
            }, {
                type: 'U',
                text: 'line'
            }, {
                type: 'A',
                text: 'added'
            }]);
        });

    });

    describe('when second file has extra line in the beginning', () => {
        const file1 = ['some', 'info', 'another', 'line'].join('\n');
        const file2 = ['added', 'some', 'info', 'another', 'line'].join('\n');

        it('should return a collection of entries from the first file + added entry from the second', () => {
            const result = compare(file1, file2);

            expect(result).to.eql([{
                type: 'A',
                text: 'added'
            }, {
                type: 'U',
                text: 'some'
            }, {
                type: 'U',
                text: 'info'
            }, {
                type: 'U',
                text: 'another'
            }, {
                type: 'U',
                text: 'line'
            }]);
        });
    });

    describe('when second file has a missing line in the end', () => {
        const file1 = ['some', 'info', 'another', 'line'].join('\n');
        const file2 = ['some', 'info', 'another'].join('\n');

        it('should return a collection of entries from the first file + removed entry from the second', () => {
            const result = compare(file1, file2);

            expect(result).to.eql([{
                type: 'U',
                text: 'some'
            }, {
                type: 'U',
                text: 'info'
            }, {
                type: 'U',
                text: 'another'
            }, {
                type: 'R',
                text: 'line'
            }]);
        });
    });

    describe('when second file has a missing line in the middle', () => {
        const file1 = ['some', 'info', 'another', 'line'].join('\n');
        const file2 = ['some', 'info', 'line'].join('\n');

        it('should return a collection of entries from the first file + removed entry from the second', () => {
            const result = compare(file1, file2);

            expect(result).to.eql([{
                type: 'U',
                text: 'some'
            }, {
                type: 'U',
                text: 'info'
            }, {
                type: 'R',
                text: 'another'
            }, {
                type: 'U',
                text: 'line'
            }]);
        });
    });

    describe('when second file has 2 missing lines in the row in the middle of the file', () => {
        const file1 = ['some', 'info', 'another', 'line'].join('\n');
        const file2 = ['some', 'line'].join('\n');

        it('should return a collection of entries from the first file + 2 removed entries from the second', () => {
            const result = compare(file1, file2);

            expect(result).to.eql([{
                type: 'U',
                text: 'some'
            }, {
                type: 'R',
                text: 'info'
            }, {
                type: 'R',
                text: 'another'
            }, {
                type: 'U',
                text: 'line'
            }]);
        });
    });

    describe('when second file has first modified line and one missing line', () => {
        const file1 = ['some', 'simple', 'text', 'file'].join('\n');
        const file2 = ['another', 'text', 'file'].join('\n');

        it('should return a collection of entries where first line is modified, second removed, all other - not modified', () => {
            const result = compare(file1, file2);

            expect(result).to.eql([{
                type: 'M',
                text: 'some | another'
            }, {
                type: 'R',
                text: 'simple'
            }, {
                type: 'U',
                text: 'text'
            }, {
                type: 'U',
                text: 'file'
            }]);
        });
    });

    describe('when second file has different beginning and end', () => {
        const file1 = ['some', 'simple', 'text', 'file'].join('\n');
        const file2 = ['another', 'text', 'file', 'with', 'additional', 'lines'].join('\n');

        it('should return a collection of entries starting with change, then removal, unmodified entries and additions in the end', () => {
            const result = compare(file1, file2);

            expect(result).to.eql([{
                type: 'M',
                text: 'some | another'
            }, {
                type: 'R',
                text: 'simple'
            }, {
                type: 'U',
                text: 'text'
            }, {
                type: 'U',
                text: 'file'
            }, {
                type: 'A',
                text: 'with'
            }, {
                type: 'A',
                text: 'additional'
            }, {
                type: 'A',
                text: 'lines'
            }]);
        });
    });


});