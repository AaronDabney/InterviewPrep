const fs = require('fs')
const { applyKey,
    sortedEnglishLetterFrequency,
    measureRelativeLetterFrequency,
    createBalancedTree,
    spliceKeys,
    randomKey,
    randomStringSlice,
    scoreDecryption,
    mutateKey,
    weightedKeyScorePairSelect } = require('./bin/util')


function decryptText(text, startKey, dictionaryTree, targetScore = 0.98, maxIterations = Infinity, sliceSize = 512, groupSize = 12) {
    const scoreKey = key => scoreDecryption(randomStringSlice(text, sliceSize), dictionaryTree, key);

    const activeGuesses = new Set([startKey])
    const guessScorePairs = [[startKey, scoreKey(startKey)]]

    for (let i = 0; i < groupSize - 1; i++) {
        const key = randomKey();

        if (activeGuesses.has(key)) {
            i--;
            continue;
        }

        guessScorePairs.push([key, scoreKey(key)]);
        activeGuesses.add(key);
    }

    for (let i = 0; i < maxIterations; i++) {
        guessScorePairs.sort((a, b) => {
            if (a[1] < b[1]) {
                return 1;
            } else if (a[1] > b[1]) {
                return -1;
            } else {
                return 0;
            }
        });

        if (guessScorePairs[0][1] >= targetScore) {
            console.log(`Iterations: ${i}`)
            return guessScorePairs[0][0];
        }

        if (i > maxIterations) {
            return guessScorePairs[0][0];
        }

        // Occasionally mutate a random key 
        if (Math.random() < 0.05) {
            // Preserve top performers
            let randomIndex = 2 + Math.floor(Math.random() * (groupSize - 2));
            let [randomlySelectedKey, _score] = guessScorePairs[randomIndex];
            let mutatedKey = mutateKey(randomlySelectedKey, 1);

            if (!activeGuesses.has(mutatedKey)) {
                activeGuesses.delete(randomlySelectedKey)
                guessScorePairs[randomIndex] = [mutatedKey, scoreKey(mutatedKey)];
                activeGuesses.add(mutatedKey);
                continue;
            }
        }

        let keyA = weightedKeyScorePairSelect(guessScorePairs);
        let keyB = weightedKeyScorePairSelect(guessScorePairs);

        while (keyA === keyB) {
            keyB = weightedKeyScorePairSelect(guessScorePairs);
        }

        const splicedKey = spliceKeys(keyA, keyB);
        const score = scoreKey(splicedKey)

        if (score > guessScorePairs[guessScorePairs.length - 1][1] && !activeGuesses.has(splicedKey)) {
            activeGuesses.delete(guessScorePairs.pop()[0])
            activeGuesses.add(splicedKey)
            guessScorePairs.push([splicedKey, score])
        }
    }
}


const encryptedBook = fs.readFileSync('./data/encryptedBook.txt', { encoding: 'utf-8' })
const dictionary = JSON.parse(fs.readFileSync('./data/englishDictionary.json', { encoding: 'utf-8' }));

// Slower than a set for this purpose but more in the spirit of chapter 3
const balancedDictionaryTree = createBalancedTree(dictionary);

const sortedCypherLetterFrequency = measureRelativeLetterFrequency(encryptedBook);

let initialGuess = new Array(26);
for (let i = 0; i < 26; i++) {
    let [cypherLetter, _cypherRanking] = sortedCypherLetterFrequency[i];
    let [baselineLetter, _baselineRanking] = sortedEnglishLetterFrequency[i];
    initialGuess[cypherLetter.charCodeAt(0) - 97] = baselineLetter;
}

initialGuess = initialGuess.join('')

const key = decryptText(encryptedBook, initialGuess, balancedDictionaryTree, 0.996);

console.log(applyKey(encryptedBook, key))
console.log(key)

// Output --> 
// Iterations: 58979
// [Entire text of Moby Dick]
// bfsrnopyvmwqdijchlgetxuzka

// Conclusion: 
// Genetic algorithms are incredibly tricky to set up. Very small changes to a half dozen hyperparamaters create drastic changes.