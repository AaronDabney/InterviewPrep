/**
 * Performs deep comparison of two inputs and determines equality
 * @param {*} itemA 
 * @param {*} itemB 
 * @returns 
 */
function deepEqual(itemA, itemB) {
    if (itemA === itemB) {
        return true;
    }
    if (typeof itemA !== typeof itemB) {
        return false;
    }
    if (itemA === null || itemB === null) {
        return false;
    }
    if (typeof itemA !== 'object') {
        return false;
    }

    let entriesA = Object.entries(itemA);
    let entriesB = Object.entries(itemB);

    if (entriesA.length !== entriesB.length) {
        return false;
    }

    entriesA.sort();
    entriesB.sort();

    for (let i = 0; i < entriesA.length; i++) {
        const keyValuePairA = entriesA[i];
        const keyValuePairB = entriesB[i];

        const keysEqual = deepEqual(keyValuePairA[0], keyValuePairB[0]);
        const valuesEqual = deepEqual(keyValuePairA[1], keyValuePairB[1])

        if (!keysEqual || !valuesEqual) {
            return false;
        }
    }

    return true;
}

// Test Variables
const jimFavorites    = {favoriteNumber: 3, favoriteFruit: 'apple', favoriteDog: {name: 'simon', breed: 'border collie'}, favoriteColors: ['red', 'blue']};
const janeFavorites   = {favoriteNumber: 3, favoriteFruit: 'apple', favoriteDog: {name: 'simon', breed: 'border collie'}, favoriteColors: ['red', 'blue']};
const bobbyFavorites  = {favoriteFruit: 'apple', favoriteNumber: 3, favoriteDog: {name: 'simon', breed: 'border collie'}, favoriteColors: ['red', 'blue']};
const isaacFavorites  = {favoriteNumber: 3, favoriteFruit: 'apple', favoriteDog: {name: 'simon', breed: 'border collie'}, favoriteColors: ['red', 'orange']};
const markFavorites   = {favoriteNumber: 3, favoriteFruit: 'apple', favoriteDog: {name: 'simon', breed: 'chihuahua'},     favoriteColors: ['red', 'blue']};
const zachFavorites   = {favoriteNumber: 3, favoriteFruit: 'apple', favoriteDog: {name: 'simon', breed: 'border cyanyelklcollie'}, favoriteColors: ['blue', 'red']};

const emptyObjectOne = {};
const emptyObjectTwo = {};

// Testing
console.log('\n');
console.log("Comparing equality of single object..");
console.log("   deepEqual(jimFavorites, jimFavorites)         true | " + deepEqual(jimFavorites, jimFavorites));      // True - Same object
console.log('\n');
console.log("Comparing equality of different object w/ same values..");
console.log("   deepEqual(jimFavorites, janeFavorites)        true | " + deepEqual(jimFavorites, janeFavorites));     // True - Same values
console.log('\n');
console.log("Comparing equality of different objects w/ same values w/ different property insertion order..");
console.log("   deepEqual(jimFavorites, bobbyFavorites)       true | " + deepEqual(jimFavorites, bobbyFavorites));    // True - Same values, different order
console.log('\n');
console.log("Comparing equality of different objects w/ different values of internal object property");
console.log("   deepEqual(jimFavorites, markFavorites)       false | " + deepEqual(jimFavorites, markFavorites));     // False - Different sub object values
console.log('\n');
console.log("Comparing equality of different objects w/ different values of internal array property");
console.log("   deepEqual(jimFavorites, isaacFavorites)      false | " + deepEqual(jimFavorites, isaacFavorites));    // False - Different sub array values
console.log('\n');
console.log("Comparing equality of different objects w/ different order of internal array property");
console.log("   deepEqual(jimFavorites, zachFavorites)       false | " + deepEqual(jimFavorites, zachFavorites));     // False - Different sub array order
console.log('\n');

console.log("Simple variable equality test");
console.log("   deepEqual('☕', '☕')                        true  | "  + deepEqual('☕', '☕')); // True - Same values
console.log("   deepEqual('☕', '⭐️')                        false | "  + deepEqual('☕', '⭐️')); // False - Different values
console.log("   deepEqual(3, '☕')                           false | "  + deepEqual(3, '☕'));     // False - Different values
console.log("   deepEqual(3, '3')                            false | "  + deepEqual(3, '3'));       // False - Different types
console.log('\n');

console.log("Falsy edge case testing");
console.log("   deepEqual(null, {})                          false | " + deepEqual(null, {}));                         // False - Null guard clause test
console.log("   deepEqual({}, null)                          false | " + deepEqual({}, null));                         // False - Null guard clause test
console.log("   deepEqual(undefined, jimFavorites)           false | " + deepEqual(undefined, {}));                    // False - Undefined test
console.log("   deepEqual({}, {})                             true | " + deepEqual({}, {}));                           // True - Same stuff
console.log("   deepEqual(emptyOne, emptyTwo)                 true | " + deepEqual(emptyObjectOne, emptyObjectTwo));   // True - Same stuff
console.log('\n');

console.log("Array testing");
console.log("   deepEqual(['a', 'b', 'c'], ['a', 'b', 'c'])   true | " + deepEqual(['a', 'b', 'c'], ['a', 'b', 'c']) );   // True - Same values
console.log("   deepEqual(['a', 'b', 'c'], ['a', 'c', 'b'])  false | " + deepEqual(['a', 'b', 'c'], ['a', 'c', 'b']) );   // False - Same values different order
console.log("   deepEqual(['a', 'b', 'c'], ['a', '5', 'c'])  false | " + deepEqual(['a', 'b', 'c'], ['a', '5', 'c']));    // False - Different values
console.log('\n');
