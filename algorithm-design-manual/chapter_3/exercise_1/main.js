function evaluateParen(inputString) {
    let stack = []

    for (let i = 0; i < inputString.length; i++) {
        if (inputString[i] === '(') {
            stack.push('(')
        } else {
            if (!stack.pop()) {
                console.log(`Bad character index: ${i}`)
                return false;
            }
        }
    }
    
    if (stack.length !== 0) {
        console.log(`Bad character index: 0`)
        return false
    } else {
        return true;
    }
}


let tests = [
    '',
    '()',
    '))))',
    '(()()())',
    '(()((()(',
    '()(((())))))()',
    ')()()()()(',
    '())()()())(',
    '((((((((((',
    '()(())()()))())))(',
];

for (let test of tests) {
    console.log(`\nTest: ${test}`)
    console.log(`Result: ${evaluateParen(test)}`)
}

// Note: Spacing in output changed to make validity more visible

// Output --> 
// Test: 
// Result: true

// Test: ()
// Result: true

// Test: ))))
// Bad character index: 0
// Result: false

// Test: ( ()()() )
// Result: true

// Test: ( () (( () (
// Bad character index: 0
// Result: false

// Test: () (((()))) )) ()
// Bad character index: 10
// Result: false

// Test: ) ()()()() (
// Bad character index: 0
// Result: false

// Test: () ) ()()() )(
// Bad character index: 2
// Result: false

// Test: ((((((((((
// Bad character index: 0
// Result: false

// Test: () (()) ()() )) () )))(
// Bad character index: 10
// Result: false
