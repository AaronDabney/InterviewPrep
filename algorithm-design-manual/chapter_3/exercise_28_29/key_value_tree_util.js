function searchTree(key, tree) {
    if (!tree) {
        return null
    }

    if (key < tree.key) {
        return searchTree(key, tree.left);
    } else if (key > tree.key) {
        return searchTree(key, tree.right);
    } else {
        return tree;
    }
}

function insertTree(key, value, tree, parent) {
    if (!tree) {
        return {
            key: key,
            value: value,
            left: undefined,
            right: undefined,
            parent: parent
        }
    }

    if (key < tree.key) {
        tree.left = insertTree(key, value, tree.left, tree)
    } else if (key > tree.key) {
        tree.right = insertTree(key, value, tree.right, tree)
    }

    return tree;
}

function addTree(key, value, tree) {
    if (!tree) {
        return tree;
    }

    if (key < tree.key) {
        tree.left = addTree(key, value, tree.left)
    } else if (key > tree.key) {
        tree.right = addTree(key, value, tree.right)
    } else {
        tree.value += value;
    }

    return tree;
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

function displayTreeChildren(tree) {
    if (!tree) {
        return;
    }

    console.log(`${tree?.left?.key} <---- [${tree.key}, ${tree.value}]----> ${tree?.right?.key}`)

    displayTreeChildren(tree?.left)
    displayTreeChildren(tree?.right)
}

function replaceDirectChild(oldNode, newNode, tree) {
    if (tree.left === oldNode) {
        tree.left = newNode;
    } else if (tree.right === oldNode) {
        tree.right = newNode;
    }

    return tree;
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

function deleteNode(key, tree, usedKeys) {
    const node = searchTree(key, tree);
    const numChildren = !!node?.left + !!node?.right;

    // Key is not in tree
    if (!node) {
        return tree;
    }

    // Root conditions
    if (!node.parent) {
        if (numChildren === 0) {
            usedKeys.delete(key)
            return undefined
        } else if (numChildren === 1) {
            const newRoot = node.left || node.right;
            newRoot.parent = undefined;
            usedKeys.delete(key)
            return newRoot;
        } else {
            const immediateSuccessor = minTree(node.right)
            immediateSuccessor.left = node.left;
            node.right.parent = undefined;
            usedKeys.delete(key)
            return repairParentReferences(node.right);
        }
    }

    if (numChildren === 0) {
        node.parent = replaceDirectChild(node, undefined, node.parent)
    } else if (numChildren === 1) {
        const child = node.left || node.right;
        node.parent = replaceDirectChild(node, child, node.parent)
        child.parent = node.parent;
    } else {
        const immediateSuccessor = minTree(node.right)

        node.parent = replaceDirectChild(node, immediateSuccessor, node.parent)

        immediateSuccessor.parent = replaceDirectChild(immediateSuccessor, undefined, immediateSuccessor.parent)
        immediateSuccessor.parent = node.parent;
        maxTree(immediateSuccessor).right = node.right;
        immediateSuccessor.left = node.left;

        node.parent = repairParentReferences(node.parent)
    }

    usedKeys.delete(key)

    return tree;
}

function nextGreatest(node) { 
    if (node?.parent === undefined) {
        return minTree(node.right);
    }

    const parent = node.parent; 

    if (node.right) { 
        return minTree(node.right);
    } else if (parent.key > node.key) {
        return parent;
    } else {
        let currentParent = parent;
        while (currentParent !== undefined && currentParent.key < node.key) {
            currentParent = currentParent.parent;
        }
        return currentParent;
    }
}

function partialSumToKeyPosition(keyPosition, tree) {
    let current = minTree(tree);
    // Returns an undefined sum if the tree is undefined
    let sum = current?.value;

    for (let i = 0; i < keyPosition; i++) {
        current = nextGreatest(current)
        // Return early with sum if we cannot get to keyPosition
        if (current === undefined) {
            return sum;
        }
        sum += current.value;
    }
    
    return sum;
}


module.exports = {
    searchTree,
    insertTree,
    partialSumToKeyPosition,
    addTree,
    deleteNode,
    displayTreeChildren
}
