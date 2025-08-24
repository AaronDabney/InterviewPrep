const { getRandomUnvisitedIndex,  generateRandomIntegerSet } = require('./random')


function insertTree(item, tree, parent) {
    if (!tree) {
        return {
            item: item,
            left: undefined,
            right: undefined,
            parent: parent
        }
    }

    if (item < tree.item) {
        tree.left = insertTree(item, tree.left, tree)
    } else if (item > tree.item) {
        tree.right = insertTree(item, tree.right, tree)
    }

    return tree;
}

/** References to nodes of a or b do not extend to new tree */
function mergeTrees(a, b) {
    if (a === undefined || b === undefined)  {
        return a || b;
    }
    
    const aItems = treeToSortedNodeList(a).map(el => el.item);
    const bItems = treeToSortedNodeList(b).map(el => el.item);
   
    const items = [...new Set([...aItems, ...bItems])];
    const visitedIndices = new Set();

    const randomizedItems = []
    while (visitedIndices.size < items.length) {
        const novelIndex = getRandomUnvisitedIndex(items.length, visitedIndices);
        randomizedItems.push(items[novelIndex])
        visitedIndices.add(novelIndex)
    }

    let tree;
    for (let item of randomizedItems) {
        tree = insertTree(item, tree)
    }

    return tree;
}


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

function searchTree(item, tree) {
    if (!tree) {
        return null
    }

    if (item < tree.item) {
        return searchTree(item, tree.left);
    } else if (item > tree.item) {
        return searchTree(item, tree.right);
    } else {
        return tree;
    }
}

function minTree(tree) {
    if (tree?.left) {
        return minTree(tree.left)
    }
    return tree;
}

function maxTree(tree) {
    if (tree?.right) {
        return maxTree(tree.right)
    }
    return tree;
}

function replaceDirectChild(oldNode, newNode, tree) {
    if (tree.left === oldNode) {
        tree.left = newNode;
    } else if (tree.right === oldNode) {
        tree.right = newNode;
    }

    return tree;
}

/* Warning: Do not look directly at this function. */
function deleteNode(item, tree) {
    const node = searchTree(item, tree);
    const numChildren = !!node?.left + !!node?.right;

    // Item is not in tree
    if (!node) {
        return tree;
    }

    // Root conditions
    if (!node.parent) {
        if (numChildren === 0) {
            return undefined
        } else if (numChildren === 1) {
            const newRoot = node.left || node.right;
            newRoot.parent = undefined;
            return newRoot;
        } else {
            const immediateSuccessor = minTree(node.right)
            immediateSuccessor.left = node.left;
            node.right.parent = undefined;
            return repairParentReferences(node.right);
        }
    }

    if (numChildren === 0) {
        node.parent = replaceDirectChild(node, undefined, node.parent)
        return tree;
    } else if (numChildren === 1) {
        const child = node.left || node.right;
        node.parent = replaceDirectChild(node, child, node.parent)
        child.parent = node.parent;
        return tree;
    } else {
        const immediateSuccessor = minTree(node.right)

        node.parent = replaceDirectChild(node, immediateSuccessor, node.parent)
        immediateSuccessor.parent = replaceDirectChild(immediateSuccessor, undefined, immediateSuccessor.parent)
        immediateSuccessor.parent = node.parent;
        maxTree(immediateSuccessor).right = node.right;
        immediateSuccessor.left = node.left;

        node.parent = repairParentReferences(node.parent)
        return tree;
    }
}

function nextGreatest(node) { 
    if (node?.parent === undefined) {
        return minTree(node.right);
    }

    const parent = node.parent; 

    if (node.right) { 
        return minTree(node.right);
    } else if (parent.item > node.item) {
        return parent;
    } else {
        let currentParent = parent;
        while (currentParent !== undefined && currentParent.item < node.item) {
            currentParent = currentParent.parent;
        }
        return currentParent;
    }
}

function treeToSortedNodeList(tree) {
    let currentNode = minTree(tree);
    const list = [];
    while (currentNode) {
        list.push(currentNode);
        currentNode = nextGreatest(currentNode);
    }
    return list;
}

function repairParentReferences(tree) {
    if (tree?.left) {
        tree.left.parent = tree;
        repairParentReferences(tree.left)
    }
    if (tree?.right) {
        tree.right.parent = tree;
        repairParentReferences(tree.right)
    }

    return tree;
}

function generateRandomTree(size) {
    const items = [...generateRandomIntegerSet(0, size)];

    let tree = undefined;
    for (let item of items) {
        tree = insertTree(item, tree);
    }

    return tree;
}

function generateRandomTreeRange(min, max) {
    const items = [...generateRandomIntegerSet(min, max)];

    let tree = undefined;
    for (let item of items) {
        tree = insertTree(item, tree);
    }

    return tree;
}

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

function retrieveSorted(tree) {
    let currentNode = minTree(tree);
    const sortedItems = [];

    while (currentNode) {
        sortedItems.push(currentNode.item)
        currentNode = nextGreatest(currentNode);
    }

    return sortedItems;
}

function displayTreeChildren(tree) {
    if (!tree?.left && !tree?.right) {
        return;
    }

    console.log(`${tree.left?.item} <---- [${tree.item}]----> ${tree.right?.item}`)

    displayTreeChildren(tree?.left)
    displayTreeChildren(tree?.right)
}

function displayTreeParentage(tree) {
    if (!tree) {
        return;
    }

    console.log(`${tree?.item} ---> ${tree.parent?.item}`)

    displayTreeParentage(tree?.left)
    displayTreeParentage(tree?.right)
}


module.exports = {
    insertTree,
    searchTree,
    minTree,
    maxTree,
    retrieveSorted,
    nextGreatest,
    generateRandomTree,
    generateRandomTreeRange,
    getBinaryTreeMaxDepth,
    deleteNode,
    treeToSortedNodeList,
    treeToDoublyLinkedList,
    mergeTrees,
    displayTreeChildren,
    displayTreeParentage,
}
