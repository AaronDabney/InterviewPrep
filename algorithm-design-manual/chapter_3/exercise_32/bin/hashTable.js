const { hashWord } = require('../../bin/util')

function generateOpenAddressingHashTable(words) {
    let table = new Array(words.length);

    for (let word of words) {
        let wordHash = hashWord(word);;
        insertWhereAble(word, wordHash % table.length);
    }

    function insertWhereAble(word, startIndex) {
        for (let i = startIndex; i < startIndex + table.length; i++) {
            let index = i % table.length
            if (table[index] === undefined) {
                table[index] = word;
                break;
            }
        }
    }

    return table;
}

function searchOpenAddressingHashTable(word, table) {
    let startIndex = hashWord(word) % table.length;

    for (let i = startIndex; i < table.length + startIndex; i++) {
        let index = i % table.length;
        if (table[index] === word) {
            return true;
        }
    }

    return false;
}


module.exports = {
    generateOpenAddressingHashTable,
    searchOpenAddressingHashTable
}