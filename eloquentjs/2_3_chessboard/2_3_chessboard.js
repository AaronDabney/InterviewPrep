/**
 * Draws a console chessboard of specifed width and height
 * @param {*} width 
 * @param {*} height 
 */
function drawChessboard(width, height) {
    if (height === undefined) {
        height = width;
    }
    if (isNaN(width) || isNaN(height)) {
        throw "Chessboard dimensions cannot be NaN";
    }
    if ((width <= 0) || (height <= 0)) {
        throw "Chessboard dimensions cannot be zero or less";
    }

    for (let i = 0; i < height; i++) {
        let output = '';
        for (let j = 0; j < width; j++) {
            let reverseRowPattern = (j%2 !== i%2);
            output += reverseRowPattern ? '⬛' : '⬜';
        }
        console.log(output);
    }
}

drawChessboard(32);
