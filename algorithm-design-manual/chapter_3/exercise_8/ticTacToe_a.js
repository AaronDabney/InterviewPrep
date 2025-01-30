function updateGame(game, move) {
    if (game.gameOver) {
        return game;
    }

    const winDict = [[0, 3, 7],
                     [0, 4],
                     [0, 5, 6],
                     [1, 3],
                     [1, 4, 6, 7],
                     [1, 5],
                     [2, 3, 6],
                     [2, 4],
                     [2, 5, 7]];

    let updatedGame = {
        tally: game.tally,
        moves: game.moves,
        gameOver: game.gameOver
    }

    updatedGame.moves.push(move);

    for (let winEvent of winDict[move]) {
        updatedGame.tally[winEvent] += updatedGame.moves.length % 2 * 2 - 1;
        
        if (Math.abs(updatedGame.tally[winEvent]) >= 3) {
            updatedGame.gameOver = true;
            return updatedGame;
        }
    }

    return updatedGame;
}


/** Move positions
 *   |0|1|2|
 *   |3|4|5|
 *   |6|7|8|
*/

let testGame = {
    tally: new Array(9).fill(0),
    moves: [],
    gameOver: false
}

for (let i = 0; i < 9; i++){
    testGame = updateGame(testGame, i)
    console.log(testGame.gameOver)
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
