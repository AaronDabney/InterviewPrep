function createIntegerDictionary(maxInteger, maxNumberOfIntegers) {
    return {
        k: 0,
        a: new Array(maxInteger).fill('😊'),
        b: new Array(maxNumberOfIntegers).fill('😊')
    }    
}

function insertIntegerDictionary(integer, dict) {
    dict.k =  dict.k + 1;
    dict.a[integer] = dict.k;
    dict.b[dict.k] = integer;
    return dict;
}

function searchIntegerDictionary(integer, dict) {
    return (dict.a[integer] <= dict.k) && (dict.b[dict.a[integer]] === integer);
}

function deleteIntegerDictionary(integer, dict) {
    if (!searchIntegerDictionary(integer, dict)) {
        return;
    }
    dict.a[dict.b[dict.k]] = dict.a[integer];
    dict.b[dict.a[integer]] = dict.b[dict.k];
    dict.k =  dict.k - 1;
    return dict;
}


let maxInteger = 100;
let maxNumberOfIntegers = 50;

let dict = createIntegerDictionary(100, 50)

let testArrayA = [1, 45, 8, 9];
let testArrayB = [12, 38, 4, 6];

console.log("Insert: " + testArrayA);
for (let integer of testArrayA) {
    dict = insertIntegerDictionary(integer, dict)
}

console.log("Search: " + testArrayA);
for (let integer of testArrayA) {
    console.log(searchIntegerDictionary(integer, dict))
}

console.log("Search: " + testArrayB);
for (let integer of testArrayB) {
    console.log(searchIntegerDictionary(integer, dict))
}

console.log("Delete: " + testArrayA);
for (let integer of testArrayA) {
    dict = deleteIntegerDictionary(integer, dict)
}

console.log("Search: " + testArrayA);
for (let integer of testArrayA) {
    console.log(searchIntegerDictionary(integer, dict))
}

console.log("Insert: " + testArrayB);
for (let integer of testArrayB) {
    dict = insertIntegerDictionary(integer, dict)
}

console.log("Search: " + testArrayB);
for (let integer of testArrayB) {
    console.log(searchIntegerDictionary(integer, dict))
}

// Output --> 
// Insert: 1,45,8,9
// Search: 1,45,8,9
// true
// true
// true
// true
// Search: 12,38,4,6
// false
// false
// false
// false
// Delete: 1,45,8,9
// Search: 1,45,8,9
// false
// false
// false
// false
// Insert: 12,38,4,6
// Search: 12,38,4,6
// true
// true
// true
// true
