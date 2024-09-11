const SCRIPTS = require('./bin/scripts.js');

/**
 * Returns a string indicating the dominant writing direction present in an input string. 
 * If there is a tie between dominant writing directions its resolved by alphabetic ordering of direction strings(ltr < rtl < ttb).
 * @param {*} inputString 
 * @returns 
 */
function dominantWritingDirection(input) {
    // filters out invalid characters
    input = (input.split('').filter(b => scriptFromCharacter(b) !== null)).join(''); 

    let directionGroups = countBy(input, j => scriptFromCharacter(j).direction);

    directionGroups.sort((a, b) => {
        if (a.count < b.count) {
            return 1;
        } else if (a.count > b.count) {
            return -1;
        } else {
            return a.name[0] > b.name[0] ? 1 : -1;
        }
    });

    return directionGroups[0].name;
}

/**
 * Returns the script that corresponds to an input character.
 * (Modifed helper function pulled from eloquent JS chapter 5)
 * @param {*} input 
 * @returns 
 */
function scriptFromCharacter(input) {
    const code = input.codePointAt(0);
    const scriptContainsCode = (code, script) => script.ranges.some(([from, to]) => code >= from && code < to);

    for (let script of SCRIPTS) {
        if (scriptContainsCode(code, script)) {
            return script;
        }
    }

    return null;
}

/**
 * Moves through an iterable input and creates array of objects that name and count input items by groupName.
 * (Helper function pulled from eloquent JS chapter 5)
 * @param {*} items 
 * @param {*} groupName 
 * @returns 
 */
function countBy(items, groupName) {
    let counts = [];

    for (let item of items) {
        let name = groupName(item);
        let known = counts.findIndex(c => c.name === name);
        if (known === -1) {
            counts.push({name, count: 1});
        } else {
            counts[known].count++;
        }
    }

    return counts;
}

function testDominantWritingDirectionFunction(dominantWritingDirection) {    
    console.log("\nTest commencing");

    let invalidCharacter = String.fromCharCode(198234710982890432980430982897123489).repeat(124);

    // all length 4
    let latin = "meow";
    let arabic = "مياو";
    let mongolian = "᠓ᢄ᠐ᡁ";

    let tests = [
        [latin, 'ltr'],
        [arabic, 'rtl'],
        [mongolian, 'ttb'],
        [latin + latin + arabic, 'ltr'],
        [latin + arabic + arabic, 'rtl'],
        [arabic + mongolian + mongolian, 'ttb'],
        [latin + invalidCharacter, 'ltr'],
        [arabic + invalidCharacter, 'rtl'],
        [mongolian + invalidCharacter, 'ttb'],
        [latin + latin + arabic + invalidCharacter, 'ltr'],
        [latin + arabic + arabic + invalidCharacter, 'rtl'],
        [arabic + mongolian + mongolian + invalidCharacter, 'ttb'],
        [arabic + arabic + mongolian + mongolian, 'rtl'],
        [mongolian + mongolian + arabic + arabic, 'rtl'],
        [latin + latin + mongolian + mongolian, 'ltr'],
        [mongolian + mongolian + latin + latin, 'ltr'],
        [arabic + arabic + mongolian + mongolian + invalidCharacter, 'rtl'],
        [mongolian + mongolian + arabic + arabic + invalidCharacter, 'rtl'],
        [latin + latin + mongolian + mongolian + invalidCharacter, 'ltr'],
        [mongolian + mongolian + latin + latin + invalidCharacter, 'ltr'],
        // [mongolian + mongolian + latin + latin + invalidCharacter, 'rtl'], // failure
    ];

    for (test of tests) {
        if (dominantWritingDirection(test[0]) !== test[1]) {
            console.log(`\nFailure: ${test[0]} | (${dominantWritingDirection(test[0])} !== ${test[1]})`);
        } else {
            process.stdout.write('.');
        }
    }

    console.log("\nTest complete!");
}

testDominantWritingDirectionFunction(dominantWritingDirection);
