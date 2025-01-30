function isAnagram(wordA, wordB) {
    if (wordA.length !== wordB.length) {
        return false;
    }

    const tallys = new Array(26).fill(0);
    
    for (let i = 0; i < wordA.length; i++) {
        tallys[wordA[i].toLowerCase().charCodeAt(0) - 97]++;
    }

    for (let i = 0; i < wordB.length; i++) {
        tallys[wordB[i].toLowerCase().charCodeAt(0) - 97]--;
    }

    return tallys.every(letterCount => letterCount === 0);
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

// 0.00010278416545454545

// O(n)
/**
 * Conclusion: 
 * - Faster than letter sorting, slower than prime multiplying.
 * - Pretty human parseable, resistant to input scaling issues.
 * - Utilizes simple math operators
 * - No primes utilized. stylePoints--;
 */
