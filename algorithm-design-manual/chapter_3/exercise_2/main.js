function correctParenNum(inputString) {
    let stack = []
    let failedPops = 0;

    for (let i = 0; i < inputString.length; i++) {
        if (inputString[i] === '(') {
            stack.push('(')
        } else {
            if (!stack.pop()) {
                failedPops++
            }
        }
    }
    
    return (inputString.length - (stack.length + failedPops))
}

let tests = [                   // correct / total
    '',                         // 0 / 0
    '()',                       // 2 / 2
    '))))',                     // 0 / 4
    '(()()())',                 // 8 / 8
    '(()((()(',                 // 4 / 8
    '()(((())))))()',           // 12 / 14
    ')()()()()(',               // 8 / 10
    '() ) () () () )(',         // 8 / 16
    '((((((((((',               // 0 / 10
    '()(())()()))())))(',       // 12 / 18
];

for (let test of tests) {
    console.log(`${correctParenNum(test)} / ${test.length}`)
}

// Output -> 
// 0 / 0
// 2 / 2
// 0 / 4
// 8 / 8
// 4 / 8
// 12 / 14
// 8 / 10
// 8 / 16
// 0 / 10
// 12 / 18
