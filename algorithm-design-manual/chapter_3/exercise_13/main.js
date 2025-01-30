const { insertTree, displayTreeParentage, displayTreeChildren } = require('../bin/binary_tree_util');
const { randomIntegerArray } = require("../bin/random");


function fixTreeChildrenPositions(tree) {
    function swap(tree) {
        if (!tree) {
            return;
        }

        if (tree.left?.item > tree.right?.item) { // !TODO: generalize to include swaps with undefined
            let buffer = tree.left;
            tree.left = tree.right;
            tree.right = buffer;
        }

        swap(tree.left)
        swap(tree.right)
    }

    swap(tree);

    return tree;
}

function swapRandomChildren(tree) {
    let parentsOfTwo = [];

    function collectParentsOfTwo(tree) {
        if (!tree) {
            return;
        }

        if (!!tree.left + !!tree.right === 2) {
            parentsOfTwo.push(tree);
        }

        collectParentsOfTwo(tree.left)
        collectParentsOfTwo(tree.right)
    }

    collectParentsOfTwo(tree)
    
    let randomParent = parentsOfTwo[Math.floor(Math.random() * parentsOfTwo.length)]

    let buffer = randomParent?.left;
    randomParent.left = randomParent?.right;
    randomParent.right = buffer;

    return tree;
}


let testArr = randomIntegerArray(10);
let tree = undefined;

for (let item of testArr) {
    tree = insertTree(item, tree);
}


console.log("Original")
displayTreeChildren(tree)

console.log("Swapped Children")
tree = swapRandomChildren(tree)
displayTreeChildren(tree)

console.log("Repaired Children")
tree = fixTreeChildrenPositions(tree)
displayTreeChildren(tree)

// Original
// 2 <---- 4 ----> 6
// undefined <---- 6 ----> 9
// 8 <---- 9 ----> undefined

// Swapped Children
// 6 <---- 4 ----> 2
// undefined <---- 6 ----> 9
// 8 <---- 9 ----> undefined

// Repaired Children
// 2 <---- 4 ----> 6
// undefined <---- 6 ----> 9
// 8 <---- 9 ----> undefined
