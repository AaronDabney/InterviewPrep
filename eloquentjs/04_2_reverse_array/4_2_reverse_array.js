/**
 * Performs non-mutating array reversal operation
 * @param {*} input 
 * @returns 
 */
function reverseArray(input) {
    if (!Array.isArray(input)) {
        throw "input must be array";
    }

    output = [];
    for (let i = input.length-1; i >= 0; i--) {
        output.push(input[i]);
    }
    return output;
}

/**
 * Performs mutating array reversal operation
 * @param {*} input 
 * @returns 
 */
function reverseArrayInPlace(input) {
    if (!Array.isArray(input)) {
        throw "input must be array";
    }

    let maxIndex = input.length-1;
    let swap;
    for (let i = 0; i < input.length/2; i++) {
        swap = input[i];
        input[i] = input[maxIndex-i]
        input[maxIndex-i]=swap;
    }
}

console.log('\n');

console.log("Odd Array Length Test");
let oddTestArray = [4,5,6,7,8];
console.log("Original array: " + JSON.stringify(oddTestArray));
console.log("Reversed Array: " + JSON.stringify(reverseArray(oddTestArray)));
console.log("Original array is unmutated: "+ JSON.stringify(oddTestArray));
console.log("Performing in place array reversal...");
reverseArrayInPlace(oddTestArray);
console.log("Original array has mutated: " + JSON.stringify(oddTestArray));
console.log('\n');

console.log("Even Array Length Test");
let evenTestArray = [4,5,6,7];
console.log("Original array: " + JSON.stringify(evenTestArray));
console.log("Reversed Array: " + JSON.stringify(reverseArray(evenTestArray)));
console.log("Original array is unmutated: "+ JSON.stringify(evenTestArray));
console.log("Performing in place array reversal...");
reverseArrayInPlace(evenTestArray);
console.log("Original array has mutated: " + JSON.stringify(evenTestArray));
console.log('\n');

console.log("Empty Array Test");
let emptyTestArray = [];
console.log("Original array: " + JSON.stringify(emptyTestArray));
console.log("Reversed Array: " + JSON.stringify(reverseArray(emptyTestArray)));
console.log("Original array is unmutated: "+ JSON.stringify(emptyTestArray));
console.log("Performing in place array reversal...");
reverseArrayInPlace(emptyTestArray);
console.log("Original array has mutated: " + JSON.stringify(emptyTestArray));
console.log('\n');

console.log("Single Value Array Test");
let singularTestArray = [1];
console.log("Original array: " + JSON.stringify(singularTestArray));
console.log("Reversed Array: " + JSON.stringify(reverseArray(singularTestArray)));
console.log("Original array is unmutated: "+ JSON.stringify(singularTestArray));
console.log("Performing in place array reversal...");
reverseArrayInPlace(singularTestArray);
console.log("Original array has mutated: " + JSON.stringify(singularTestArray));
console.log('\n');

console.log("Two Value Array Test");
let doubleTestArray = [1,2];
console.log("Original array: " + JSON.stringify(doubleTestArray));
console.log("Reversed Array: " + JSON.stringify(reverseArray(doubleTestArray)));
console.log("Original array is unmutated: "+ JSON.stringify(doubleTestArray));
console.log("Performing in place array reversal...");
reverseArrayInPlace(doubleTestArray);
console.log("Original array has mutated: " + JSON.stringify(doubleTestArray));
console.log('\n');

console.log("Three Value Array Test");
let tripleTestArray = [1,2,3];
console.log("Original array: " + JSON.stringify(tripleTestArray))
console.log("Reversed Array: " + JSON.stringify(reverseArray(tripleTestArray)));
console.log("Original array is unmutated: "+ JSON.stringify(tripleTestArray));
console.log("Performing in place array reversal...");
reverseArrayInPlace(tripleTestArray);
console.log("Original array has mutated: " + JSON.stringify(tripleTestArray));
console.log('\n');

// console.log("Guard clause test 1: ");
// console.log(reverseArray(true));
// console.log("Guard clause test 2: ");
// console.log(reverseArray([]));
// console.log("Guard clause test 3: ");
// console.log(reverseArrayInPlace(true));
// console.log("Guard clause test 4: ");
// console.log(reverseArrayInPlace([]));
