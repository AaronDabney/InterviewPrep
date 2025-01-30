function generateRandomIntegerSet(min, max) {
    const length = Math.abs(max - min) + 1;
    const randomSet = new Set();

    while (randomSet.size < length) {
        randomSet.add((Math.floor(Math.random() * length) + min));
    }
    
    return randomSet;
}

function randomIntegerArray(length) {
    const output = new Array(length).fill(0).map((el) => Math.floor(Math.random() * length));
    return [...new Set(output)]
}

function getRandomUnvisitedIndex(listLength, visitedIndices) {
    let randomIndex = Math.floor(Math.random() * listLength);
    while(visitedIndices.has(randomIndex)) {
        randomIndex = (randomIndex + 1) % listLength;
    }
    return randomIndex;
}

// Cheaper pseudorandomness. Prime quantity.
const first101RandomlySelectedNaturalNumbers = [4, 55, 88, 10, 45, 71, 67, 44, 80, 60, 8, 81, 96, 35, 62, 12, 26, 90, 21, 53, 1, 65, 83, 30, 13, 36, 95, 86, 33, 63, 39, 18, 93, 32, 52, 75, 46, 73, 58, 24, 85, 28, 34, 22, 6, 97, 38, 51, 27, 76, 14, 61, 78, 2, 94, 100, 5, 70, 31, 19, 43, 87, 17, 23, 25, 7, 9, 98, 41, 84, 99, 3, 66, 20, 16, 101, 77, 92, 56, 42, 15, 50, 82, 89, 40, 79, 48, 59, 72, 69, 91, 37, 54, 68, 29, 64, 11, 74, 47, 49, 57];


module.exports = {
    generateRandomIntegerSet,
    randomIntegerArray,
    getRandomUnvisitedIndex,
    first101RandomlySelectedNaturalNumbers
}
