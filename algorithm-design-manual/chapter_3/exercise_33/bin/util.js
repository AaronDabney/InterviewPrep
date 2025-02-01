const { insertTree } = require('../../bin/binary_tree_util')
const { clamp } = require('../../bin/util')

/** Profiling revealed this function is the largest bottleneck */
function scoreDecryption(text, dictionaryTree, key) {
    let totalWords = 0;
    let successCount = 0;
    let word = []

    for (let i = 0; i < text.length; i++) {
        if (!isLetter(text[i]) && word.length > 0) {
            totalWords++;
            if (searchTree(applyKey(word.join('').toLowerCase(), key), dictionaryTree) !== undefined) {
                successCount++;
            }
            word = [];
        } else if (isLetter(text[i])) {
            word.push(text[i])
        }
    }

    return successCount / totalWords;
}

function isLetter(letter) {
    if (letter.length !== 1) {
        return false;
    }

    const code = letter.charCodeAt(0);

    return (code < 123 && code > 96) || (code < 91 && code > 64);
}

function applyKey(string, key) {
    const output = new Array(string.length);

    for (let i = 0; i < string.length; i++) {
        let code = string[i].charCodeAt(0);
        const isUppercase = (code < 91 && code > 64);
        const isLowerCase = (code < 123 && code > 96);
    
        if (!isUppercase && !isLowerCase) {
            output[i] = string[i];
        } else {
            output[i] = isLowerCase ? key[code - 97] : key[code - 65].toUpperCase();
        }        
    }

    return output.join('');
}

function randomStringSlice(text, sliceSize = 1000) {
    sliceSize = Math.min(text.length, sliceSize);
    let start = Math.min(Math.floor((Math.random() * text.length)), text.length - sliceSize);
    let slice = text.slice(start, start + sliceSize)
    return slice;
}

function mutateKey(key, mutations = 5) {
    const output = key.split('')

    for (let i = 0; i < mutations; i++) {
        let randomIndexA = Math.floor(Math.random() * 26)
        let randomIndexB = Math.floor(Math.random() * 26)
        let aBuffer = output[randomIndexA]
        output[randomIndexA] = output[randomIndexB];
        output[randomIndexB] = aBuffer;
    }

    return output.join('')
}

function spliceKeys(keyA, keyB, aChance = 0.5) {
    const outputSet = new Set();
    const output = new Array(26)

    const emptyIndices = []
    for (let i = 0; i < 26; i++) {
        if (Math.random() < aChance && !outputSet.has(keyA[i])) {
            output[i] = keyA[i]
            outputSet.add(keyA[i])
        } else if (!outputSet.has(keyB[i])) {
            output[i] = keyB[i]
            outputSet.add(keyB[i])
        } else {
            emptyIndices.push(i)
        }
    }

    while (emptyIndices.length > 0) {
        const randomLetter = String.fromCharCode(Math.floor(Math.random() * 26) + 97);
        if (!outputSet.has(randomLetter)) {
            output[emptyIndices.pop()] = randomLetter;
            outputSet.add(randomLetter)
        }
    }

    return output.join('');
}

function randomKey() {
    let outputSet = new Set();
    let output = [];

    while (outputSet.size < 26) {
        let randomLetter = String.fromCharCode(Math.floor(Math.random() * 26) + 97);
        if (!outputSet.has(randomLetter)) {
            output.push(randomLetter);
            outputSet.add(randomLetter);
        }
    }
    
    return output.join('');
}

function generateCaeserShift() {
    const randomLetterIndex = () => Math.floor(Math.random() * 26);

    const letters = [];
    for (let i = 0; i < 26; i++) {
        letters.push(String.fromCharCode(97 + i));
    }

    let letterBuff, indexA, indexB;
    for (let i = 0; i < 1000; i++) {
        indexA = randomLetterIndex();
        indexB = randomLetterIndex();

        // Swap
        letterBuff = letters[indexA];
        letters[indexA] = letters[indexB];
        letters[indexB] = letterBuff;
    }

    const caeserCypher = new Map();
    const caeserKey = new Map();

    for (let i = 0; i < 26; i++) {
        caeserCypher.set(String.fromCharCode(97 + i), letters[i])
        caeserKey.set(letters[i], String.fromCharCode(97 + i))
    }

    return [caeserCypher, caeserKey];
}

function measureRelativeLetterFrequency(text) {
    const letterMap = new Map()
    let letterCount = 0;

    for (let i = 0; i < 26; i++) {
        letterMap.set(String.fromCharCode(97 + i), 0);
    }

    for (let char of text) {
        if (isLetter(char)) {
            const key = char.toLowerCase();
            const currentValue = letterMap.get(key);
            letterMap.set(key, currentValue + 1);
            letterCount++;
        }
    }

    return Array.from(letterMap).sort((a, b) => {
        if (a[1] < b[1]) {
            return 1;
        } else if (a[1] > b[1]) {
            return -1;
        } else {
            return 0;
        }
    }).map(([key, value]) => [key, 100 * value / letterCount]);
}

function weightedKeyScorePairSelect(keyScoreArray) {
    const total = keyScoreArray.reduce((acc, currentValue) => acc += currentValue[1], 0);
    const rando = Math.random() * total;

    let sum = 0;
    for (let i = 0; i < keyScoreArray.length; i++) {
        let [map, score] = keyScoreArray[i];
        sum += score;
        if (sum >= rando) {
            return keyScoreArray[i][0];
        }
    }

    return keyScoreArray[keyScoreArray.length - 1];
}

const sortedEnglishLetterFrequency = [
    [ 'e', 12.7 ],  [ 't', 9.1 ],
    [ 'a', 8.2 ],   [ 'o', 7.5 ],
    [ 'i', 7 ],     [ 'n', 6.7 ],
    [ 's', 6.3 ],   [ 'h', 6.1 ],
    [ 'r', 6 ],     [ 'd', 4.3 ],
    [ 'l', 4 ],     [ 'c', 2.8 ],
    [ 'u', 2.8 ],   [ 'm', 2.4 ],
    [ 'w', 2.4 ],   [ 'f', 2.2 ],
    [ 'g', 2 ],     [ 'y', 2 ],
    [ 'p', 1.9 ],   [ 'b', 1.5 ],
    [ 'v', 0.98 ],  [ 'k', 0.77 ],
    [ 'j', 0.15 ],  [ 'x', 0.15 ],
    [ 'q', 0.095 ], [ 'z', 0.074 ]
];

function createBalancedTree(sortedArray) {
    function getSortedArrayMiddleIndex(indexA, indexB) {
        const index = Math.round(0.5 * (indexA + indexB));
        return clamp(index, 0, sortedArray.length - 1);
    }

    const visitedIndices = new Set()
    let balancedTree = undefined;

    function branchArrayInsert(position, currentSize) {
        if (visitedIndices.has(position)) {
            return;
        }

        visitedIndices.add(position);

        balancedTree = insertTree(sortedArray[position], balancedTree);

        if (Math.floor(currentSize) === 0) {
            return;
        }

        const subPivotA = getSortedArrayMiddleIndex(position, position - currentSize / 2);
        const subPivotB = getSortedArrayMiddleIndex(position, position + currentSize / 2);

        branchArrayInsert(subPivotA, currentSize / 2);
        branchArrayInsert(subPivotB, currentSize / 2);
    }

    const pivot = getSortedArrayMiddleIndex(0, sortedArray.length - 1)
    branchArrayInsert(pivot, sortedArray.length)

    return balancedTree;
}

function searchTree(item, tree) {
    if (!tree) {
        return undefined;
    }

    if (item < tree.item) {
        return searchTree(item, tree.left);
    } else if (item > tree.item) {
        return searchTree(item, tree.right);
    } else {
        return tree;
    }
}


module.exports = {
    sortedEnglishLetterFrequency,
    applyKey,
    generateCaeserShift,
    measureRelativeLetterFrequency,
    createBalancedTree,
    spliceKeys,
    searchTree,
    mutateKey,
    randomKey,
    weightedKeyScorePairSelect,
    scoreDecryption,
    isLetter,
    randomStringSlice
}
