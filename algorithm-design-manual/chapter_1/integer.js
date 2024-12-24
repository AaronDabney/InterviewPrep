// Make a custom error type here for divide by zero in place of range error+

function referenceIntegerDivide(dividend, divisor) {
    if (divisor === 0) {
        throw RangeError("Cannot divide by zero.");
    }

    return Math.trunc(dividend / divisor);
}


/** No use of '/' or '*' operators */
function integerDivide(dividend, divisor) {
    if (divisor === 0) {
        throw RangeError("Cannot divide by zero.");
    }

    if (dividend === 0) {
        return 0;
    }

    const sign = Math.sign(dividend) * Math.sign(divisor);

    let a = Math.abs(dividend);
    const b = Math.abs(divisor);
    let tally = 0;

    while (a >= b) {
        a -= b;
        tally++;
    }

    return tally * sign;
}


const min = -10;
const max =  10;

for (let dividend = min; dividend < max; dividend++) {
    for (let divisor = min; divisor < max; divisor++) { 
        try {    
            if (integerDivide(dividend, divisor) !== referenceIntegerDivide(dividend, divisor)) {
                console.log('Incorrect result');
                continue;
            } 

            process.stdout.write('.')
        } catch(error) {
            const isRangeError = error instanceof RangeError;

            if (!isRangeError) {
                console.log('Unexpected error');
                continue;
            }

            if (divisor !== 0) {
                console.log('Incorrect throw');
                continue;
            }

            process.stdout.write('.')
        }
    }
}

console.log("\nComplete")
