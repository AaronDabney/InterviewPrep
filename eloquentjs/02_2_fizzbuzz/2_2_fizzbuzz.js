/**
 * Performs the FizzBuzz operation from 1 to iter(inclusive)
 * @param {*} iter 
 */
function fizzBuzz(iter) {
    if (isNaN(iter)) {
        throw "FizzBuzz input cannot be NaN";
    }
    if (iter < 1) {
        throw "FizzBuzz input cannot be less than one";
    }

    for (let i = 1; i <= iter; i++) {
        let divisByThree = i%3 === 0;
        let divisByFive = i%5 === 0;
    
        if (divisByThree && divisByFive) {
            console.log("FizzBuzz");
        }
        else if (divisByThree) {
            console.log("Fizz");
        }
        else if (divisByFive) {
            console.log("Buzz");
        }
        else {
            console.log(i);
        }
    }
}

fizzBuzz(100);
