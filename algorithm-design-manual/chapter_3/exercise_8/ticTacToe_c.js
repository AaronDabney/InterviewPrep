function updateGame(game, move, moveNumber) {   
    // Each win condition is assosciated with a unique prime (2, 3, 5, 7, 11, 13, 17, 19)
    // Every square on the board is assigned the composite of their assosciated win condition primes
    const composites = [627, 95, 266, 51, 1870, 119, 78, 65, 1001];

    let updatedGame = {
        x: game.x,
        y: game.y,
        moveNumber: game.moveNumber
    }

    if (moveNumber % 2 === 0) {
        updatedGame.x *= composites[move];
    } else {
        updatedGame.y *= composites[move];
    }

    return updatedGame;
}

function gameEvaluator(game) {
    // Cubes of first 9 primes
    const winConditions = [8, 27, 125, 49, 1331, 2197, 9913, 6859]

    // When either player x or player y have a game number that is divisible by the cube of the first 9 primes
    // this signifies a win

    for (let condition of winConditions) {
        // It is possible to determine the identity of the winner
        if (game.x % condition === 0 || game.y % condition === 0) {
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

/** Test game
 * 
 *   |X|O|X|
 *   |O|X|O|
 *   |X| | |
 * 
*/

let game = {x: 1, y: 1};

for (let i = 0; i < 9; i++){
    game = updateGame(game, i, i)
    console.log(gameEvaluator(game))
}

// Output -> 

// false
// false
// false
// false
// false
// false
// true
// true
// true
