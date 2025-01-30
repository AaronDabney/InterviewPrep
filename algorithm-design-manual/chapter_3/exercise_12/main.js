const { insertTree, displayTreeParentage } = require('../bin/binary_tree_util');
const { randomIntegerArray } = require("../bin/random");


function getBinaryTreeMaxDepth(tree) {
    let record = 0;

    function recordComparison(tree, index = 1) {
        if (!tree) {
            return;
        }

        if (index > record) {
            record = index;
        }

        recordComparison(tree.left, index + 1)
        recordComparison(tree.right, index + 1)
    }

    recordComparison(tree);

    return record;
}



let testArr = randomIntegerArray(10);
let tree = undefined;

for (let item of testArr) {
    tree = insertTree(item, tree);
}

displayTreeParentage(tree)
console.log(getBinaryTreeMaxDepth(tree))

// Output -- > 
// 3 ---> undefined
// 0 ---> 3
// 2 ---> 0
// 8 ---> 3
// 7 ---> 8
// 4 ---> 7

// 4
