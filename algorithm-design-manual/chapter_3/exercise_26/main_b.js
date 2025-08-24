const { populateSmallestBetweenGrid } = require('./main_a')
const { randomIntegerArray } = require('../bin/random')


function clamp(value, start, end) {
    return Math.min(end, Math.max(start, value))
}

function smallestBetween(array, start, end) {
    if (start > end) {
        return smallestBetween(array, end, start);
    }

    if (start === end) {
        return array[start]
    }

    return Math.min(...array.slice(start, end + 1))
}

/**
 * Unique integer given unordered pair
 * @param {*} a 
 * @param {*} b 
 * @returns 
 */
function hash(a, b) {
    return (a > b) ?  hash(b, a) : (a + b) * (a + b + 1) / 2 + a;
}

function populateSmallestBetweenMap(numbers) {
    const map = new Map();
    for (let i = 0; i < numbers.length; i++) {
        for (let j = i; j < numbers.length; j++) {
            let key = hash(i, j);
            let smallest = smallestBetween(numbers, i, j)
            map.set(key, smallest)
        }
    }

    return map;
}

let iterations = 10000;
for (let i = 0; i < iterations; i++) {
    let randomSize = Math.floor(Math.random() * 100)
    let testArray = randomIntegerArray(randomSize);

    let grid = populateSmallestBetweenGrid(testArray)
    let map = populateSmallestBetweenMap(testArray);

    for (let i = 0; i < testArray.length; i++) {
        for (let j = 0; j < testArray.length; j++) {
            if (grid[i][j] !== map.get(hash(i, j))) {
                console.log("Failure")

                console.log("Test Array")
                console.log(testArray)

                console.log("Smallest Normal")
                console.log(map.smallestSoFarOfNormal)

                console.log("Smallest Reverse")
                console.log(map.smallestSoFarOfReverse)

                console.log("Grid address")
                console.log(`X: ${i} Y: ${j}`);

                console.log("Values")
                console.log(`A: ${testArray[i]} B: ${testArray[j]}`);// = ${grid[i][j]}`)

                console.log(grid)
                throw ""
            }
        }
    }
}

// Conclusion: 
// TODO: Improve space complexity. Currently O(n^2)
// It should be possible to get space to O(n) and time to O(logn)
