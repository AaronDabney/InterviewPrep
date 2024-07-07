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

const program = 
`do(define(f, fun(a, fun(b, +(a, b)))),
   # we are printing below
    print(f(4)(5))) # we are printing to the left
   # we are printing above
   # trailing comment`;

run(program);
// output --> 9

console.log(parse("# hello\nx"));
// → {type: "word", name: "x"}

console.log(parse("a # one\n   # two\n()"));
// → {type: "apply",
//    operator: {type: "word", name: "a"},
//    args: []}
