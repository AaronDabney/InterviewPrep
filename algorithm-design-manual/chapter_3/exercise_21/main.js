const { minTree, generateRandomTreeRange, displayTreeParentage } = require('../bin/binary_tree_util')
const { globalTreeValid } = require('../bin/binary_tree_test_util')


/**
 * Assumes the highest value of tree A is smaller than the lowest element of tree B
 * treeA is mutated into a subtree node of treeB
 * @param {*} treeA 
 * @param {*} treeB 
 * @returns 
 */
function concatenateBinaryTrees(treeA, treeB) {
    if (treeA === undefined || treeB === undefined) {
        return treeA || treeB;
    }

    let minB = minTree(treeB);

    minB.left = treeA;
    treeA.parent = minB;

    return treeB;
}

let iterations = 100000;
for (let i = 0; i < iterations; i++) {
    let treeA = generateRandomTreeRange(-50, 0);
    let treeB = generateRandomTreeRange(1, 50);
    let treeC = concatenateBinaryTrees(treeA, treeB);

    if (!globalTreeValid(treeC)) {
        console.log("Invalid tree")
        displayTreeParentage(treeC)
    }
}

console.log("Complete")

