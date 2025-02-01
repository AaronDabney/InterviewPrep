const fs = require('fs')


let mobyWords = JSON.parse(fs.readFileSync('moby_words.json', {encoding: 'utf-8'}))

mobyWords.sort()

fs.writeFileSync("moby_words_sorted.json", JSON.stringify(mobyWords, null, 4));
