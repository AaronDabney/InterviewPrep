const { parse } = require('./parsing');
const { evaluate } = require('./evaluation');

/**
 * Builds topScope environment before parsing/evaluating program
 * @param {*} program 
 * @returns 
 */
function run(program) {
    const topScope = Object.create(null);

    topScope.true = true;
    topScope.false = false;

    topScope.print = value => {
        console.log(value);
        return value;
    };

    topScope.array = (...values) => {
        return values;
    };

    topScope.length = (array) => {
        return array.length;
    };

    topScope.element = (array, n) => {
        return array[n];
    }

    for (let op of ["+", "-", "*", "/", "==", "<", ">"]) {
        topScope[op] = Function("a, b", `return a ${op} b;`);
    }

    return evaluate(parse(program), topScope);
}

run(`
    do(define(x, 4),
       define(setx, fun(val, set(x, val))),
       setx(50),
       print(x))
`);
// → 50

run(`
    do(define(x, 4),
       define(addToX, fun(val,  do(set(x, +(x, val))                          
       ))),
       addToX(30),
       print(x))
`);
// → 34

run(`
    do(define(x, 0),
        while(<(x, 10),   
            do(set(x, +(x, 1)), 
               print(x))))
`)
// prints 1 to 10

run(`set(quux, true)`);
// → Some kind of ReferenceError
