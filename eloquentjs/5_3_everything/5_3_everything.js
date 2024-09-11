function everythingSome(inputArray, testFunction) {
    const antiTest = j => !testFunction(j);
    return inputArray.some(testFunction) && !inputArray.some(antiTest);
}

function everythingLoop(inputArray, testFunction) {
    for (let element of inputArray) {
        if (!testFunction(element)) {
            return false
        }
    }
    return true;
}

const greaterThanN = n => (x => x > n);
const greaterThanZero = greaterThanN(0);
const greaterThanTwo = greaterThanN(2);
const greaterThanTen = greaterThanN(10);
const greaterThanNegativeFifty = greaterThanN(-50);
const greaterThanFifty = greaterThanN(50);

const testCases = [
    [0, 1, 2, 3],
    [1, 2, 3],
    [-2, -1, 0, 1, 2],
    [-2, -1, 0],
    [-2, -1],
    [0],
    [10, 11, 12],
    [-12, -11, -10],
    [65, -766, 432, -1, 8],
];

const testFunctionDictionary = {
    greaterThanZero: greaterThanZero,
    greaterThanTwo: greaterThanTwo,
    greaterThanTen: greaterThanTen,
    greaterThanNegativeFifty: greaterThanNegativeFifty,
    greaterThanFifty: greaterThanFifty,
};
console.log('\n');
console.log("Testing Everything Some");
testEverythingFunction(everythingSome, testCases, testFunctionDictionary);
console.log("\nTest complete!\n");

console.log("Testing Everything Loop");
testEverythingFunction(everythingLoop, testCases, testFunctionDictionary);
console.log("\nTest complete!\n");

function testEverythingFunction(everythingFunc, testCases, testFunctionDictionary) {
    for (let testArray of testCases) {
        for (const [name, func] of Object.entries(testFunctionDictionary)) {
            const everythingResult = everythingFunc(testArray, func)

            if (everythingResult !== testArray.every(func)) {
                console.log(`\n Failure: ${everythingFunc.name} | ${name}(${JSON.stringify(testArray)}, ${name}) === ${everythingResult}`)
            } else {
                process.stdout.write('.'); // displays activity in console w/o trailing new line characters
            }
        }
    }
}

// The following was used to test the tester!

// function everythingWrong(inputArray, testFunction) { 
//     for (let element of inputArray) {
//         if (!testFunction(element)) {
//             return true
//         }
//     }
//     return false;
// }

// console.log("Testing Everything Wrong...\n");
// testEverythingFunction(everythingWrong, testCases, testFunctionDictionary);
