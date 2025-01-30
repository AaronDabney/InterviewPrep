function isAnagram(a, b) {
    const sortLetters = word => word.toLowerCase().split('').sort().join('');
    return (sortLetters(a) === sortLetters(b))
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
]

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

// 0.0004470864309090909

// O(nlogn)
// Conclusion: Slower, but easily human readable compared to prime hash
