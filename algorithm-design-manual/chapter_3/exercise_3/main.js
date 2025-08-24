function arrayToList(inputArray, list = { value: null, rest: null }, currentIndex = 0) {
    if (currentIndex >= inputArray.length) {
        return list;
    }

    const restValue = currentIndex === 0 ? null : list;
    list = { value: inputArray[inputArray.length - currentIndex - 1], rest: restValue }

    return arrayToList(inputArray, list, currentIndex + 1);
}

function arrayToListIterative(inputArray) {
    let list = { value: null, rest: null };

    for (let i = inputArray.length - 1; i > 0; i--) {
        list.value = inputArray[i];
        list = { value: null, rest: list};
    }

    list.value = inputArray[0];

    return list;
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



let testList = arrayToList(['a', 'b', 'c', 1, 2, 3])
console.log(JSON.stringify(testList))

let reversedList = reverseList(testList)
console.log(JSON.stringify(reversedList))

// Test list after the reverse operation still points to 'a' (the new end of the linked list)
console.log(JSON.stringify(testList))

// Output -> 

// {"value":"a","rest":{"value":"b","rest":{"value":"c","rest":{"value":1,"rest":{"value":2,"rest":{"value":3,"rest":null}}}}}}

// {"value":3,"rest":{"value":2,"rest":{"value":1,"rest":{"value":"c","rest":{"value":"b","rest":{"value":"a","rest":null}}}}}}

// {"value":"a","rest":null}
