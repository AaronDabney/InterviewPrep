const fs = require('fs')


function sequenceToWords(sequence, sequenceDictionary) {
    const words = sequenceDictionary[sequence];
    return words ? words : [];
}


const rawFileString = fs.readFileSync('sequenceDictionary.json', 'utf-8')
const sequenceDictionary = JSON.parse(rawFileString)

console.log(sequenceToWords('5623',      sequenceDictionary));
console.log(sequenceToWords('269',       sequenceDictionary));
console.log(sequenceToWords('7489',      sequenceDictionary));
console.log(sequenceToWords('2767',      sequenceDictionary));
console.log(sequenceToWords('6677',      sequenceDictionary));
console.log(sequenceToWords('444444444', sequenceDictionary));
console.log(sequenceToWords('27753',     sequenceDictionary));

// Output -> 
// [ 'load', 'loaf', 'lobe' ]
// [ 'any', 'bow', 'box', 'boy', 'cow', 'coy' ]
// [ 'pity' ]
// [ 'arms', 'crop' ]
// [ 'mors', 'moss' ]
// []
// [ 'apple' ]
