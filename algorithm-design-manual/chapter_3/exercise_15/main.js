const { insertTree, 
        nextGreatest, 
        displayTreeParentage, 
        displayTreeChildren, 
        minTree, 
        retrieveSorted, 
        getBinaryTreeMaxDepth,
        generateRandomTree } = require('../bin/binary_tree_util');
const { clamp, randomRange } = require('../bin/util')


function createNewBalancedTree(tree) {
    const sortedItems = retrieveSorted(tree);
    
    function getSortedArrayMiddleIndex(indexA, indexB) {
        const index = Math.round(0.5 * (indexA + indexB));
        return clamp(index, 0, sortedItems.length - 1);
    }

    const visitedIndices = new Set()
    let balancedTree = undefined;

    function branchArrayInsert(position, currentSize) {
        if (visitedIndices.has(position)) {
            return;
        }

        visitedIndices.add(position);

        balancedTree = insertTree(sortedItems[position], balancedTree);

        if (Math.floor(currentSize) === 0) {
            return;
        }

        const subPivotA = getSortedArrayMiddleIndex(position, position - currentSize / 2);
        const subPivotB = getSortedArrayMiddleIndex(position, position + currentSize / 2);

        branchArrayInsert(subPivotA, currentSize / 2);
        branchArrayInsert(subPivotB, currentSize / 2);
    }

    const pivot = getSortedArrayMiddleIndex(0, sortedItems.length - 1)
    branchArrayInsert(pivot, sortedItems.length)

    return balancedTree;
}


let iterations = 10000;

const denominator = Math.log(2)

for (let i = 0; i < iterations; i++) {
    const randomTreeSize = randomRange(10, 1000);
    const randomTree = generateRandomTree(randomTreeSize);

    const maximumDepth = getBinaryTreeMaxDepth(randomTree);
    const idealDepth = Math.ceil(Math.log(randomTreeSize + 1) / denominator)

    const balancedTree = createNewBalancedTree(randomTree);
    const balancedTreeDepth = getBinaryTreeMaxDepth(balancedTree)

    if (idealDepth !== balancedTreeDepth) {
        process.stdout.write('.')
    }
}

console.log("Complete")
