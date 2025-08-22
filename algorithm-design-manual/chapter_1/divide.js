class DivideByZeroError extends RangeError {}

/** 'Normal' integer division */
function referenceIntegerDivide(dividend, divisor) {
    if (divisor === 0) {
        throw new DivideByZeroError(`-> ${dividend} / ${divisor} <-`);
    }

    return Math.trunc(dividend / divisor);
}

/** No use of '/' or '*' operators */
function integerDivide(dividend, divisor) {
    if (divisor === 0) {
        throw new DivideByZeroError(`-> ${dividend} / ${divisor} <-`);
    }

    const sign = Math.sign(dividend) * Math.sign(divisor);

    let a = Math.abs(dividend);
    const b = Math.abs(divisor);
    
    let tally = 0;

    while (a >= b) {
        a -= b;
        tally++;
    }

    return sign > 0 ? tally : -tally;
}

/** Testing */

const minTestRange = -10;
const maxTestRange =  10;

for (let dividend = minTestRange; dividend < maxTestRange; dividend++) {
    for (let divisor = minTestRange; divisor < maxTestRange; divisor++) { 
        try {    
            if (integerDivide(dividend, divisor) !== referenceIntegerDivide(dividend, divisor)) {
                console.log('Incorrect result');
                continue;
            } 

            process.stdout.write('.')
        } catch(error) {
            if (!(error instanceof DivideByZeroError)) {
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

// ->  ........\nComplete
