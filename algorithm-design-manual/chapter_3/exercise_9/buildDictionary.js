const fs = require('fs')

function wordToSequence(word) {
    return (word.split('').map(letter => digitMap[letter])).join('')
}


// letter -> keypad placement
const digitMap = {
    a: 2, b: 2, c: 2, d: 3, e: 3, f: 3,
    g: 4, h: 4, i: 4, j: 5, k: 5, l: 5, m: 6, n: 6, o: 6,
    p: 7, q: 7, r: 7, s: 7, t: 8, u: 8, v: 8, w: 9, x: 9, y: 9, z: 9,
}

/**
 * Input dictionary is a text file containing all words seperated by \n character.
 * Test dictionary is not included in this repository.
 */

const forbiddenCharacters = ['-', '\n', '\\', ' ', '(', ')']

const rawFileData = fs.readFileSync('wordlist.txt', 'utf-8');

const wordsArray = rawFileData.split(',')
    .filter(el => {
        for (let char of forbiddenCharacters) {
            if (el.includes(char)) {
                return false
            }
        }
        return true;
    });


const sequenceDictionary = {}

for (let word of wordsArray) {
    const wordSequence = wordToSequence(word)

    if (!sequenceDictionary[wordSequence]) {
        sequenceDictionary[wordSequence] = [word];
    } else {
        sequenceDictionary[wordSequence].push(word);
    }
}


const dictionaryFileString = JSON.stringify(sequenceDictionary, null, 4);

fs.writeFileSync('sequenceDictionary.json', dictionaryFileString);
