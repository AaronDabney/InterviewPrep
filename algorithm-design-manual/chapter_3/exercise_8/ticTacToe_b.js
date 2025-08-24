function isGameWon(gameNumber) {
    const primeComposites = [30, 238, 506, 627, 935, 1001, 1495, 7429, 33263, 63017, 76067, 78647, 82861, 84323, 106079, 190747];

    for (let primeComposite of primeComposites) {
        if (gameNumber % primeComposite === 0) {
            return true;
        }
    }

    return false;
}


/** Move positions
 *   |0|1|2|
 *   |3|4|5|
 *   |6|7|8|
*/

// If the game number contains any of the composite numbers
// it means that either X or O must have a winning combo.
// The product of the rows and diagonals map to win conditions
// Tables are produced using the first 18 prime numbers

/**      X Table
 *   | 2 | 3 | 5  | = 30
 *   | 7 | 11| 13 | = 1001
 *   | 17| 19| 23 | = 7429
*   /  ||  ||  ||  \ 
*  /  238,627,1495, \ 
* 935                 506
*
*/


/**      O Table
*       | 29 | 31 | 37 | = 33263
*       | 41 | 43 | 47 | = 82861
*       | 53 | 59 | 61 | = 190747
*      /  ||    ||   ||  \ 
*     /63017,78647,106079,\ 
* 84323                    76067
*
*/

// Note: This method is fun, but a bit absurd. The % operator isn't free.
// A more refined version of this idea that uses much smaller primes and no array nesting is in version c

/** Test game   
 * 
 *   |O|X|O|
 *   |X|X|O|
 *   |X|X|O|
 * 
*/

const gameOver = isGameWon(11 * 29 * 17 * 37 * 7 * 47 * 3 * 61 * 19);
console.log(gameOver)

// Output -> true
