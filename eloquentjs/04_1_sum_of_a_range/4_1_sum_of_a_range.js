/**
 * Returns the range of numbers from start to end by incrementing the value of step
 * If the step process skips over end, end is not included
 * If only two parameters are provided the function defaults to a step size of positive 1
 * @param {*} start
 * @param {*} end
 * @param {*} step 
 * @returns 
 */
function range(start, end, step = 1) {
    if (end === undefined) {
        throw "invalid input";
    }
    if (isNaN(start) || isNaN(end) || isNaN(step)) {
        throw "invalid input";
    }
    if ((Math.abs(start) === Infinity) || (Math.abs(end) === Infinity) || (Math.abs(step) === Infinity)) {
        throw "invalid input";
    }
    if (step === 0) {
        throw "step cannot be zero";
    }

    const stepSign = Math.sign(step)

    output = [];
    for (let i = start; i*stepSign <= end*stepSign; i += step) {
        output.push(i);
    }

    return output;
}

/**
 * Returns the sum of an array of input numbers
 * @param {*} input 
 * @returns 
 */
function sum(input) {
    if (!Array.isArray(input)) {
        throw "invalid input";
    }

    let total = 0;
    for (let i = 0; i < input.length; i++) {
        total += input[i];
    }

    if (isNaN(total)) {
        throw "invalid input";
    }

    return total;
}

console.log("\n");

console.log("Range Functon Testing w/ default step");
console.log("Lesser Start  | Greater End | No Step       " + JSON.stringify(range(1, 5)));     // [1,2,3,4,5]
console.log("Greater Start | Lesser End  | No Step       " + JSON.stringify(range(5, 1)));     // []
console.log("\n");

console.log("Range Functon Testing w/ specified step");
console.log("Lesser Start  | Greater End | Positive Step " + JSON.stringify(range(1, 5, 1)));   // [1,2,3,4,5]
console.log("Lesser Start  | Greater End | Negative Step " + JSON.stringify(range(1, 5, -1)));  // []
console.log("Greater Start | Lesser End  | Positive Step " + JSON.stringify(range(5, 1, 1)));   // []
console.log("Greater Start | Lesser End  | Negative Step " + JSON.stringify(range(5, 1, -1)));  // [5,4,3,2,1]
console.log("\n");

let testStep = 0.75;
console.log("Range Function Inclusivity Testing Utilizing testStep: " + testStep);
console.log("Lesser Start  | Greater End | Positive Step " + JSON.stringify(range(1, 5, testStep)));   // [1,2,3,4,5]
console.log("Lesser Start  | Greater End | Negative Step " + JSON.stringify(range(1, 5, -testStep)));  // []
console.log("Greater Start | Lesser End  | Positive Step " + JSON.stringify(range(5, 1, testStep)));   // []
console.log("Greater Start | Lesser End  | Negative Step " + JSON.stringify(range(5, 1, -testStep)));  // [5,4,3,2,1]
console.log("\n");

console.log("Sum Functon Testing");
console.log(sum(range(1, 10))); //55

// console.log("Range Functon Error Conditions");
// console.log("NaN parameter" + range('a',5));                 // Error
// console.log("Infinity parameter" + range(1,Infinity));       // Error
// console.log("Zero Step parameter" + range(1,5,0));           // Error
// console.log("\n");

// console.log("Sum Functon Error Conditions");
// console.log(sum('orange'));                                  // Error
// console.log(sum(['a',2,3,4,5]));                             // Error
// console.log("\n");
