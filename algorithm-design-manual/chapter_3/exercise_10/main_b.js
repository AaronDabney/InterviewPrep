// First 26 primes
const primes = [2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97,101];

function isAnagram(wordA, wordB) {
    if (wordA.length !== wordB.length) {
        return false;
    }

    // Words with the same letters map to the same composite number
    const hashFunc = word => word.split('').reduce((acc, val) => acc * primes[val.charCodeAt(0) - 97], 1)

    return hashFunc(wordA) === hashFunc(wordB)
}


const testPairs = [
    // True anagrams
    ['silent','listen'],
    ['abc','cba'],
    ['parliament','partialmen'],
    ['rats','star'],
    ['',''],
    ['azzzzzzzzzzzzzzzzzzzzaz', 'zazzzzzzzzzzzzzzzzzzzza'],

    // False anagrams
    ['timber','wolf'],
    ['golf','fog'],
    ['cart','mart'],
    ['melon','felon'],
    ['tincture','fracture'],

];

// Accuracy Test
for (let pair of testPairs) {
    console.log(isAnagram(...pair))
}

// Performance test
const startTime = performance.now()
const iterations = 100000;
for (let i = 0; i < iterations; i++) {
    for (let pair of testPairs) {
        isAnagram(...pair);
    }
}

const endTime = performance.now()
const averageDelta = (endTime - startTime) / iterations / testPairs.length;

console.log(averageDelta)

// Output --> 

// true
// true
// true
// true
// true
// true

// false
// false
// false
// false
// false

// 0.00007709094545454547

// O(n)

/**
 * Conclusion: 
 * - Fastest of the variants, but requires more effort for humans to parse.
 * - Words are pretty small on the scale of modern compute.
 * - No chance for the time benefit to scale unless we're evaluating larger sequences.
 * - On larger sequences, false positives can begin to occur when both inputs exceed ~152 characters.
 * 
 * - primes['z'.charCodeAt(0) - 97] ** 153 = Infinity  
 */
