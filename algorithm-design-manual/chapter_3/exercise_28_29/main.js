const { addTree, insertTree, deleteNode, partialSumToKeyPosition, displayTreeChildren} = require('./key_value_tree_util')
const { randomIntegerArray } = require('../bin/random')


function mintKey(usedKeys, maxKey = 10000000000000) {
    const key = Math.floor(Math.random() * maxKey)
    if (usedKeys.has(key)) {
        return createNewKey(usedKeys);
    } else {
        usedKeys.add(key)
        return key
    }
}

function randomValue(rangeSize = 100) {
    return Math.floor(Math.random()*rangeSize) - rangeSize / 2;
}

function randomItemFromSet(set) {
    return [...set][Math.floor(Math.random() * set.size)]
}


let tree = undefined;
let usedKeys = new Set();

console.log("Inserting")

tree = insertTree(mintKey(usedKeys), randomValue(), tree);
tree = insertTree(mintKey(usedKeys), randomValue(), tree);
tree = insertTree(mintKey(usedKeys), randomValue(), tree);

displayTreeChildren(tree)

console.log("Adding")

tree = addTree(randomItemFromSet(usedKeys), randomValue(), tree);
tree = addTree(randomItemFromSet(usedKeys), randomValue(), tree);
tree = addTree(randomItemFromSet(usedKeys), randomValue(), tree);

displayTreeChildren(tree)

console.log("Sum to k")
console.log(partialSumToKeyPosition(2, tree))

console.log("Deleting")

tree = deleteNode([...usedKeys][usedKeys.size - 1], tree, usedKeys);
tree = deleteNode([...usedKeys][usedKeys.size - 1], tree, usedKeys);
tree = deleteNode([...usedKeys][usedKeys.size - 1], tree, usedKeys);

displayTreeChildren(tree)

console.log("Remaining keys")
console.log(usedKeys)
