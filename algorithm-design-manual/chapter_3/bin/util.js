function clamp(value, minimum, maximum) {
    return Math.max(minimum, Math.min(maximum, value));
}

function randomRange(min, max) {
    return Math.random() * (max - min) + min;
}

let first26Primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101];

function hashWordPrime(word) {
    word = word.toLowerCase()
    let product = 1;
    for (let letter of word.split('')) {
        product *= first26Primes[letter.charCodeAt(0) - 97];
    }
    return product;
}

function hashWord(word) {
    let bigNumber = 26 ** word.length;
    let sum = 0;
    for (let i = 0; i < word.length; i++) {
        sum = 26 ** (word.length - i + 1) * (word[i].charCodeAt(0) - 97)
    }
    return bigNumber + sum
}

module.exports = {
    clamp,
    randomRange,
    hashWord,
    hashWordPrime
}
