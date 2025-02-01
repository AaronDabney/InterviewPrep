const fs = require('fs')


function isValidCharacter(char) {
    return char.charCodeAt(0) < 123 && char.charCodeAt(0) > 96;
}


let mobyDick = fs.readFileSync('moby.txt', {encoding: 'utf-8'})

const wordsArray = mobyDick.split('')
                           .map(char => char.toLowerCase())
                           .map(char => {return isValidCharacter(char) ? char : ' '})
                           .join('')
                           .split(' ')
                           .filter(word => word.length > 1)


let mobySet = new Set(wordsArray)

fs.writeFileSync("moby_words.json", JSON.stringify([...mobySet], null, 4));
