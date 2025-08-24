function globalTreeValid(tree) {
    const noDuplicates = !hasTreeDuplicates(tree);
    const oneAbsentParent = countAbsentParents(tree) === 1;
    const passingValues = validLocalValues(tree);
    const allValidFamilies = countInvalidLocalDescendants(tree) === 0;
    return noDuplicates && oneAbsentParent && passingValues && allValidFamilies;
}

function hasTreeDuplicates(tree) {
    const found = new Set();

    function inner(tree) {
        if (!tree) {
            return false;
        }

        if (found.has(tree.item)) {
            return true;
        }

        found.add(tree.item)
        
        inner(tree.left)
        inner(tree.right)
    }
    
    inner();

    return false;
} 

function countAbsentParents(tree) {
    let count = 0;

    function inner(tree) {
        if (!tree) {
            return
        }
        if (!tree.parent) {
            count++
        }
        inner(tree.left)
        inner(tree.right)
    }

    inner(tree);

    return count;
}


function validLocalValues(tree) {
    let isValid = true;

    function inner(tree) {
        if (!tree) {
            return;
        }

        if (tree.left?.item >= tree.right?.item) {
            isValid = false;
        }

        if (tree.left?.item >= tree.item) {
            isValid = false;
        }

        if (tree.item >= tree.right?.item) {
            isValid = false;
        }

        inner(tree.left)
        inner(tree.right)
    }
    
    inner();

    return isValid;
}


function countInvalidLocalDescendants() {
    let count = 0;

    function inner(tree) {
        if (!tree) {
            return;
        }

        let notChildOfParents = tree.parent?.left !== tree && tree.parent?.right !== tree;
        let ownSibling = tree.parent?.left === tree.parent?.right

        // Am I a child of my parent?
        if (notChildOfParents || ownSibling) {
            count++;
        }



        inner(tree.left)
        inner(tree.right)
    }

    return count;
}


module.exports = {
    countInvalidLocalDescendants,
    validLocalValues,
    countAbsentParents,
    hasTreeDuplicates,
    globalTreeValid
}
