function clamp(value, start, end) {
    return Math.min(end, Math.max(start, value))
}

function smallestBetween(array, start, end) {
    if (start > end) {
        return smallestBetween(array, end, start);
    }

    if (start === end) {
        return array[start]
    }

    return Math.min(...array.slice(start, end + 1))
}

function initializeGrid(x, y) {
    const grid = [];
    for (let i = 0; i < x; i++) {
        const row = [];
        for (let j = 0; j < y; j++) {
            row.push(undefined);
        }
        grid.push(row)
    }
    return grid;
}

function populateSmallestBetweenGrid(numbers) {
    const grid = initializeGrid(numbers.length, numbers.length);

    for (let x = 0; x < numbers.length; x++) {
        for (let y = 0; y < numbers.length; y++) {
            grid[x][y] = smallestBetween(numbers, x, y)
        }
    }

    return grid;
}


const testArray = [5, 7, 10, 2, 4, 3]
const grid = populateSmallestBetweenGrid(testArray);

// O(1) access time
// O(n^2) space 
// TODO : Could be reduced to 0.5*n^2 space by exploiting diagonal symmetry

// Output -> 
// [       
//         5   7  10   2   4   3
//          
//    5 [  5,  5,  5,  5,  2,  2 ],
//    7 [  5,  7,  7,  7,  2,  2 ],
//   10 [  5,  7, 10, 10,  2,  2 ],
//    2 [  5,  7, 10,  2,  2,  2 ],
//    4 [  2,  2,  2,  2,  4,  4 ],
//    3 [  2,  2,  2,  2,  4,  3 ]
// ]


module.exports = {
    populateSmallestBetweenGrid
}
