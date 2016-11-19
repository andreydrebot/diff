# diff

Output a difference of 2 files to the console.

##

## Running tests or linting
1. Run `npm install` in project root.
2. Run `npm test` or `npm run test:watch` for tests. Run `npm run lint` for linting.

## Examples
Run `node examples\index.js`

First file:
```
Some
Simple
Text
File
```

Second file:
```
Another
Text
File
With
Additional
Lines
```

Output:
```
1    *    Some | Another
2    -    Simple
3         Text
4         File
5    +    With
6    +    Additional
7    +    Lines

```
