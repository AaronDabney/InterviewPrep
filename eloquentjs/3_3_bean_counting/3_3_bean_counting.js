/**
 * Counts the 'B's in a given string and returns the tally
 * @param {*} input 
 * @returns 
 */
function countBs(input) {
    if (typeof input !== 'string') {
        throw "Cannot process datatypes other than String";
    }

    let count = 0;
    for (let i = 0; i < input.length; i++) {
        if (input[i] === 'B') {
            count++;
        }
    }
    return count;
}

/**
 * Counts the occurance of the char parameter in a given string and returns the tally
 * @param {*} input 
 * @param {*} char 
 * @returns 
 */
function countChars(input, char) {
    if (typeof input !== 'string' || typeof char !== 'string') {
        throw "Cannot process datatypes other than String";
    }
    if (char.length !== 1) {
        throw "Cannot count occurences of multi-character strings";
    }

    let count = 0;
    for (let i = 0; i < input.length; i++) {
        if (input[i] === char) {
            count++;
        }
    }
    return count;
}

/* Test cases */
console.log(countBs('BoooBoooBaaaaBaaaa'));                     //4
console.log(countBs('Boh No! My Beans are Bad!'));              //3
// console.log(countBs(6.28));                                  //Error

console.log(countChars('BoooBoooBaaaaBaaaa','o'));              //6
console.log(countChars('Boh No! My Beans are Bad!','o'));       //2
// console.log(countChars(6.28));                               //Error
// console.log(countChars('Boh No! My Beans are Bad!','Boh'));  //Error
