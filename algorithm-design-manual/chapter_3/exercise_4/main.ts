interface Stack {
    list: Array<number>;
    minimums: Array<number>;
}

function pop(inputStack) {
    inputStack.minimums.pop()
    return inputStack.list.pop(); 
}

function push(inputStack, value) {
    inputStack.list.push(value)
    const currentMinimum = inputStack.minimums[inputStack.minimums.length - 1]

    if (currentMinimum === undefined) {
        inputStack.minimums.push(value)
        return inputStack.list.length;
    }

    if (value < currentMinimum) {
        inputStack.minimums.push(value)
    } else {
        inputStack.minimums.push(currentMinimum)
    }
    
    return inputStack.list.length;
}

function findMin(inputStack) {
    return inputStack.minimums[inputStack.minimums.length - 1]; 
}


let myStack: Stack = {
    list: [],
    minimums: []
}

for (let i = 0; i < 5; i++) {
    push(myStack, Math.floor(Math.random() * 10))
    console.log(myStack)
}

for (let i = 0; i < 5; i++) {
    pop(myStack)
    console.log(myStack)
}

// Output - > 
// { list: [ 4 ], minimums: [ 4 ] }
// { list: [ 4, 6 ], minimums: [ 4, 4 ] }
// { list: [ 4, 6, 3 ], minimums: [ 4, 4, 3 ] }
// { list: [ 4, 6, 3, 5 ], minimums: [ 4, 4, 3, 3 ] }
// { list: [ 4, 6, 3, 5, 8 ], minimums: [ 4, 4, 3, 3, 3 ] }
// { list: [ 4, 6, 3, 5 ], minimums: [ 4, 4, 3, 3 ] }
// { list: [ 4, 6, 3 ], minimums: [ 4, 4, 3 ] }
// { list: [ 4, 6 ], minimums: [ 4, 4 ] }
// { list: [ 4 ], minimums: [ 4 ] }
// { list: [], minimums: [] }
