const oneOverThirtyTwo = 1 / 32;

function initIntegerDictionary(integerArray, maxSize) {
    const output = new Uint32Array(Math.ceil(maxSize * oneOverThirtyTwo));

    for (let integer of integerArray) {
        const blockIndex = Math.floor(integer * oneOverThirtyTwo)
        const byteIndex = integer - (blockIndex * 32);
        const mask = 1 << byteIndex;

        output[blockIndex] = output[blockIndex] | mask;
    }

    return output
}

function searchIntegerDictionary(bitDictionary, integer) {
    const blockIndex = Math.floor(integer * oneOverThirtyTwo)
    const byteIndex = integer - (blockIndex * 32);
    const mask = 1 << byteIndex;
    
    return !!(bitDictionary[blockIndex] & mask)
}

function setIntegerDictionary(bitDictionary, integer, value) {
    const blockIndex = Math.floor(integer * oneOverThirtyTwo)
    const byteIndex = integer - (blockIndex * 32);
    const mask = 1 << byteIndex;

    bitDictionary[blockIndex] = value ? bitDictionary[blockIndex] | mask : bitDictionary[blockIndex] & ~mask;
}

function bitString(integer, byteSize = 32) {
    return integer.toString(2).padStart(byteSize, '0');
}

let iterations = 10000;

let maxNum = 200;
let testArraySize = 50;

let start = performance.now()
for (let i = 0; i < iterations; i++) {
    let testArr = new Array(testArraySize).map(el => el = Math.floor(Math.random() * maxNum))
    
    // declare dict
    let classicDict = new Array(maxNum).fill(undefined)
    
    // fill dict
    for (let num of testArr) {
        classicDict[num] = true;
    }
    
    // search dict 
    for (let num of testArr) {
        let dummy = !!classicDict[num]
    }
    
    // delete dict
    for (let num of testArr) {
        classicDict[num] = undefined;
    }
}
let end = performance.now()
let delta = end - start;

console.log("Average dictionary performance");
console.log(delta / iterations)


// Bit dictionary

start = performance.now()
for (let i = 0; i < iterations; i++) {
    let testArr = new Array(testArraySize).map(el => el = Math.floor(Math.random() * maxNum))
    
    // declare dict
    let bitDict = initIntegerDictionary([], maxNum)
    
    // fill dict
    for (let num of testArr) {
        setIntegerDictionary(bitDict, num, true)
    }
    
    // search dict 
    for (let num of testArr) {
        let dummy = searchIntegerDictionary(bitDict, num)
    }
    
    // delete dict
    for (let num of testArr) {
        setIntegerDictionary(bitDict, num, false)
    }

}
end = performance.now()
delta = end - start;


console.log("Average integer bit dictionary performance");
console.log(delta / iterations)

// Output -> 

// Average dictionary performance
// 0.0015562527999999998

// Average integer bit dictionary performance
// 0.0052803293

// Conclusion: Our approach is 5x slower but uses less memory than a vanilla JS dictionary.
