const { insertTree, 
        searchTree, 
        minTree, 
        maxTree, 
        deleteNode, 
        displayTreeChildren, 
        displayTreeParentage } = require('./binary_tree_util')


function bulkTest(iterations, numNodes, range) {
    let tree;
    for (let i = 0; i < iterations; i++) {
        tree = generateTree(numNodes, range);
        if (!globalTreeValid(tree)) {
            return false;
        }

        for (let i = 0; i < 10000; i++) {
            tree = deleteNode(Math.floor((Math.random() - 0.5) * range), tree)
            tree = insertTree(Math.floor((Math.random() - 0.5) * range), tree)
        }

        if (!globalTreeValid(tree)) {
            return false;
        }

        tree = deleteNode(tree.val, tree)

        if (!globalTreeValid(tree)) {
            return false;
        }

    }

    return true;
}

function generateTree(numNodes, range) {
    let tree = undefined;
    let testSet = new Set();

    for (let i = 0; i < numNodes; i++) {
        testSet.add(Math.floor((Math.random() - 0.5) * range))
    }
    
    testSet = [...testSet];

    for (let el of testSet) {
        tree = insertTree(el, tree)
    }

    return tree;
}


console.log(bulkTest(1000, 10000, 1000))
