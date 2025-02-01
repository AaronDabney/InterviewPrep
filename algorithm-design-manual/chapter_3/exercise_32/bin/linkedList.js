function arrayToLinkedList(inputArray) {
    let list = { value: undefined, rest: undefined }

    for (let i = inputArray.length; i > 0; i--) {
        list.value = inputArray[i]
        list = { value: undefined, rest: list}
    }

    list.value = inputArray[0]

    return list;
}



function searchLinkedList(value, list) {
    let currentList = list;

    while (currentList !== undefined) {
        if (currentList.value === value) {
            return currentList;
        }
        currentList = currentList.rest
    }

    return undefined;
}


// function searchLinkedList(value, list) {
//     if (list === undefined) {
//         return undefined;
//     }

//     if (list.value === value) {
//         return list;
//     }

//     return searchLinkedList(value, list?.rest)
// }

module.exports = {
    arrayToLinkedList,
    searchLinkedList
}
