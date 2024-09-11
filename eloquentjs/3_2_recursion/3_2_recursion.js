/**
 * Tests if input digit is even and returns boolean
 * @param {*} input 
 * @returns 
 */
function isEven(input) {
    if (isNaN(input)) {
        throw "isEven input cannot be NaN";
    }
    if (!Number.isInteger(input)) {
        throw "isEven input must be an integer";
    }

    if (input < 0) {
        input *= -1;
    }

    if (input === 1) {
        return false;
    }
    else if (input === 0) {
        return true;
    }
    else {
        return isEven(input-2);
    }
}

let testSpan = 10;

for (let i = -testSpan; i <= testSpan; i++) {
    console.log(i + ': ' + isEven(i));
}
