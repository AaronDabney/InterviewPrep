const { insertTree,
        mergeTrees,
        treeToSortedNodeList } = require('../bin/binary_tree_util');
const { randomIntegerArray } = require("../bin/random")


function treeToDoublyLinkedList(tree) {
    const nodes = treeToSortedNodeList(tree);
    let lastNode = undefined;

    for (let i = 0; i < nodes.length; i++) {
        delete nodes[i].parent;
        nodes[i].left = lastNode;
        nodes[i].right = nodes[i + 1];
        lastNode = nodes[i];
    }

    return nodes[0]
}

function doublyLinkedListValid(list, expectedLength) {
    let currentNode = list;
    let count = 0;

    while (currentNode) {
        count++;
        // Enforcing the inputs left to be undefined.
        if (currentNode.left === undefined && count === 1) {
            currentNode = currentNode.right;
            continue;
        }

        // End of list is as expected
        if (currentNode.right === undefined) {
            return count === expectedLength;
        }

        // Somethings wrong
        if (count > expectedLength) {
            console.log("Invalid length")
            return false;
        }

        // My right neighbours left neighbour is me
        if (currentNode.right?.left !== currentNode) {
            console.log("Invalid Neighbour relationship")
            return false
        }

        currentNode = currentNode.right;
    }
}


const iterations = 10000;

for (let i = 0; i < iterations; i++) {
    if (i % (iterations / 100) == 0) {
        console.log(100 * i / iterations + '%')
    }
    
    let testArrA = randomIntegerArray(1000);
    let testArrB = randomIntegerArray(1000);
    
    let treeA = undefined;
    let treeB = undefined;
    
    let uniqueItems = new Set([...testArrA, ...testArrB]);

    for (let item of testArrA) {
        treeA = insertTree(item, treeA);
    }
    
    for (let item of testArrB) {
        treeB = insertTree(item, treeB);
    }
    
    let mergedTree = mergeTrees(treeA, treeB);
    
    let doublyLinkedList = treeToDoublyLinkedList(mergedTree);

    if (!doublyLinkedListValid(doublyLinkedList, uniqueItems.size)) {
        let currentNode = doublyLinkedList;

        while(currentNode) {
            console.log(`[${currentNode?.left?.item} <--${currentNode?.item} --> ${currentNode?.right?.item}]`)
            currentNode = currentNode.right;
        }

        throw "Invalid linked list"
    }
}


console.log("Undefined Inputs Test")
let treeA = undefined;
let treeB = undefined;

let mergedTree = mergeTrees(treeA, treeB);
let doublyLinkedList = treeToDoublyLinkedList(mergedTree);

if (mergedTree !== undefined || doublyLinkedList !== undefined) {
    console.log('Failure')
} else {
    console.log('Pass')
}

console.log("Complete")


// The methodology here is to merge the trees and then 'flatten' the merged tree into a doubly linked list

