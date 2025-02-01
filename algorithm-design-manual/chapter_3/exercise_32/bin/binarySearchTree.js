const { insertTree } = require('../../bin/binary_tree_util')
const { clamp } = require('../../bin/util')

function createNewBalancedTree(sortedArray) {
    function getSortedArrayMiddleIndex(indexA, indexB) {
        const index = Math.round(0.5 * (indexA + indexB));
        return clamp(index, 0, sortedArray.length - 1);
    }

    const visitedIndices = new Set()
    let balancedTree = undefined;

    function branchArrayInsert(position, currentSize) {
        if (visitedIndices.has(position)) {
            return;
        }

        visitedIndices.add(position);

        balancedTree = insertTree(sortedArray[position], balancedTree);

        if (Math.floor(currentSize) === 0) {
            return;
        }

        const subPivotA = getSortedArrayMiddleIndex(position, position - currentSize / 2);
        const subPivotB = getSortedArrayMiddleIndex(position, position + currentSize / 2);

        branchArrayInsert(subPivotA, currentSize / 2);
        branchArrayInsert(subPivotB, currentSize / 2);
    }

    const pivot = getSortedArrayMiddleIndex(0, sortedArray.length - 1)
    branchArrayInsert(pivot, sortedArray.length)

    return balancedTree;
}


module.exports = {
    createNewBalancedTree
}
