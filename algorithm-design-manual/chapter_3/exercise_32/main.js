const fs = require('fs')
const { arrayToLinkedList, searchLinkedList } = require('./bin/linkedList')
const { insertTree, searchTree } = require('../bin/binary_tree_util')
const { measurePerformance } = require('./bin/util')
const { createNewBalancedTree } = require('./bin/binarySearchTree')
const { generateOpenAddressingHashTable, searchOpenAddressingHashTable } = require('./bin/hashTable')

let mobyWordsSorted = JSON.parse(fs.readFileSync('./bin/data/moby_words_sorted.json'))
let mobyWords = JSON.parse(fs.readFileSync('./bin/data/moby_words.json'))


let iterations = 10;


/* Creation Speed Testing */
let linkedList_create = measurePerformance(() => {
    let list = arrayToLinkedList(mobyWords)
}, iterations);

let binarySearchTree_create = measurePerformance(() => {
    let tree = undefined;
    for (let word of mobyWords) {
        tree = insertTree(word, tree)
    }
}, iterations);

let balancedBinarySearchTree_create = measurePerformance(() => {
    let tree = createNewBalancedTree(mobyWordsSorted)
}, iterations);

let veryUnbalancedBinarySearchTree_create = measurePerformance(() => {
    let tree = undefined;
    for (let word of mobyWordsSorted) {
        tree = insertTree(word, tree)
    }
}, iterations);

let openAddressingHashTable_create = measurePerformance(() => {
    let table = generateOpenAddressingHashTable(mobyWords)
}, iterations);

let literallyJustAnArray_create = measurePerformance(() => {
    let table = new Array(mobyWords);
    for (let i = 0; i < table.length; i++) {
        table[i] = mobyWords[i];
    }
}, iterations)

let set_create = measurePerformance(() => {
    let wordSet = new Set()

    for (let word of mobyWords) {
        wordSet.add(word)
    }
}, iterations)


/* Creation/Search Speed Testing */
let linkedList_create_search = measurePerformance(() => {
    let list = arrayToLinkedList(mobyWords)
    for (let word of mobyWords) {
        let result = searchLinkedList(word, list);
        if (result === undefined) {
            console.log("Error: lost word")
        }
    }
}, iterations);

let binarySearchTree_create_search = measurePerformance(() => {
    let tree = undefined;
    for (let word of mobyWords) {
        tree = insertTree(word, tree)
    }

    for (let word of mobyWords) {
        let result = searchTree(word, tree)
        if (result === undefined) {
            console.log("Error: lost word")
        }
    }
}, iterations);

let balancedBinarySearchTree_create_search = measurePerformance(() => {
    let tree = createNewBalancedTree(mobyWordsSorted)

    for (let word of mobyWords) {
        let result = searchTree(word, tree)
        if (result === undefined) {
            console.log("Error: lost word")
        }
    }
}, iterations);

let veryUnbalancedBinarySearchTree_create_search = measurePerformance(() => {
    let tree = undefined;
    for (let word of mobyWordsSorted) {
        tree = insertTree(word, tree)
    }

    for (let word of mobyWords) {
        let result = searchTree(word, tree)
        if (result === undefined) {
            console.log("Error: lost word")
        }
    }
}, iterations);

let openAddressingHashTable_create_search = measurePerformance(() => {
    let table = generateOpenAddressingHashTable(mobyWords)
    
    for (let word of mobyWords) {
        let result = searchOpenAddressingHashTable(word, table)
        if (result === false) {
            console.log("Error: lost word")
        }
    }
}, iterations);

let literallyJustAnArray_create_search = measurePerformance(() => {
    let table = new Array(mobyWords.length);

    for (let i = 0; i < table.length; i++) {
        table[i] = mobyWords[i];
    }

    for (let word of mobyWords) {
        let result = table.some(el => el === word);
        if (result === false) {
            console.log("Error: lost word")
        }
    }
}, iterations)

let set_create_search = measurePerformance(() => {
    let wordSet = new Set()

    for (let word of mobyWords) {
        wordSet.add(word)
    }

    for (let word of mobyWords) {
        let result = wordSet.has(word)
        if (result === false) {
            console.log("Error: lost word")
        }
    }
}, iterations)


console.log("Results: ")
console.log(`Linked List ------------------------- creation: ${linkedList_create} search: ${linkedList_create_search - linkedList_create}`)
console.log(`Binary Search Tree ------------------ creation: ${binarySearchTree_create} search: ${binarySearchTree_create_search - binarySearchTree_create}`)
console.log(`Balanced Binary Search Tree --------- creation: ${balancedBinarySearchTree_create} search: ${balancedBinarySearchTree_create_search - balancedBinarySearchTree_create}`)
console.log(`Very Unbalanced Binary Search Tree -- creation: ${veryUnbalancedBinarySearchTree_create} search: ${veryUnbalancedBinarySearchTree_create_search - veryUnbalancedBinarySearchTree_create}`)
console.log(`Open Addressing --------------------- creation: ${openAddressingHashTable_create} search: ${openAddressingHashTable_create_search - openAddressingHashTable_create}`)
console.log(`Literally Just an Array ------------- creation: ${literallyJustAnArray_create} search: ${literallyJustAnArray_create_search - literallyJustAnArray_create}`)
console.log(`JS Set ------------------------------ creation: ${set_create} search: ${set_create_search - set_create}`)

// Results
// Linked List ------------------------- creation: 0.37422 search: 312.45462
// Binary Search Tree ------------------ creation: 4.43172 search: 4.1121611
// Balanced Binary Search Tree --------- creation: 3.58460 search: 3.5595161
// Very Unbalanced Binary Search Tree -- creation: 1631.40 search: 1693.4208
// Open Addressing --------------------- creation: 108.568 search: 160.99235
// Literally Just an Array ------------- creation: 0.00735 search: 285.21542
// JS Set ------------------------------ creation: 0.96639 search: 0.1173134



// Conclusions: 

// Linked List
//      Linked lists for obvious reasons are the worst data structure for search operations.
//
// Binary Search Trees
// The binary search tree is quite good and the balanaced is even better.
// The worst possible balance scenario for a binary tree is signifigantly and mysteriously slower than even a linked list. (possibly recursion related)
//
// Open Addressing
//      Open addressing performed well. It could probably perform better with a better hash function or better clump avoidance strategies.
//
// JS Set
// The JavaScript set is extremely quick. Probably ideal for simple situations where the only thing you need to know/record is whether something is present.

