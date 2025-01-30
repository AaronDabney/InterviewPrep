function arrayToList(inputArray, list = { value: null, rest: null }, currentIndex = 0) {
    if (currentIndex >= inputArray.length) {
        return list;
    }

    const restValue = currentIndex === 0 ? null : list;
    list = { value: inputArray[inputArray.length - currentIndex - 1], rest: restValue }

    return arrayToList(inputArray, list, currentIndex + 1);
}

function nth(inputList, targetIndex) {
    listBuffer = inputList;
    for (let i = 0; i < targetIndex; i++) {
        listBuffer = listBuffer.rest;

        if (listBuffer === null) {
            throw "invalid target index";
        }
    }

    return listBuffer;
}

function reverseList(inputList) {
    let itemBuff = null;
    let restBuff;

    // Assumes list has no circular references ^_^
    while (inputList.rest) {
        restBuff = inputList.rest;
        inputList.rest = itemBuff;
        itemBuff = inputList;
        inputList = restBuff;
    }

    restBuff.rest = itemBuff;

    return restBuff;
}

function deleteFromList(list, element) {
    const child = element.rest;
    const grandChild = element.rest.rest;

    element.value = child.value;
    element.rest = grandChild;

    return list;
}

function insertIntoList(list, value) {
    return {value: value, rest: list}
}

function searchList(list, targetValue) {
    let listBuffer = list;

    while(listBuffer.rest) {
        if (listBuffer.value === targetValue) {
            return listBuffer;
        }
        
        listBuffer = listBuffer.rest;
    }

    return null;
}


let testList = arrayToList(['a', 'b', 'c', 1, 2, 3])

let testElement = nth(testList, 2)

console.log("Test List")
console.log(JSON.stringify(testList))

deleteFromList(testList, testElement);

console.log("\nList after deletion")
console.log(JSON.stringify(testList))

testList = insertIntoList(testList, 'g')

console.log("\nList after insertion")
console.log(JSON.stringify(testList))

console.log("\nSearch for value. Return reference")
console.log(JSON.stringify(searchList(testList, 1)))


// Output -> 
// Test List
// {"value":"a","rest":{"value":"b","rest":{"value":"c","rest":{"value":1,"rest":{"value":2,"rest":{"value":3,"rest":null}}}}}}

// List after deletion
// {"value":"a","rest":{"value":"b","rest":{"value":1,"rest":{"value":2,"rest":{"value":3,"rest":null}}}}}

// List after insertion
// {"value":"g","rest":{"value":"a","rest":{"value":"b","rest":{"value":1,"rest":{"value":2,"rest":{"value":3,"rest":null}}}}}}

// Search for value. Return reference
// {"value":1,"rest":{"value":2,"rest":{"value":3,"rest":null}}}
