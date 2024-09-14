import { arrayFromElementChildren, 
         positiveModulo, 
         forEachCellInGrid,
         isTwoOrThree,
         setCellAlive,
         setCellDead,
        } from "./helper_utils"

export type Grid = HTMLDivElement;
export type Cell = HTMLInputElement;


function generateGrid(gridContainer : HTMLDivElement, gridSize: number): Grid {
    for (let y = 0; y < gridSize; y++) {
        let rowElement = document.createElement('div');
        rowElement.setAttribute("class", "gridRow");

        for (let x = 0; x < gridSize; x++) {
           let cell = document.createElement("input");
           cell.type = "checkbox";

           cell.setAttribute("x", x.toString());
           cell.setAttribute("y", y.toString());

           rowElement.appendChild(cell);
        }

        gridContainer.appendChild(rowElement);
    }

    return <Grid>gridContainer;
}

function randomizeGrid(grid: Grid) {
    forEachCellInGrid(grid, (cell: Cell) => {
        (<Cell>cell).checked = Math.random() > 0.5;
    });
}

function tallyLivingCells(cells: Array<Cell>): number {
    let output = 0;
    for (let cell of cells) {
        if (cell.checked) {
            output++;
        }
    }

    return output;
}

function getCellNeighbours(grid: Grid, centerCell: Cell) {
    let addressOffsets = [
            {x: 1 ,y: 0 },
            {x: 1 ,y:-1 },
            {x: 0 ,y:-1 },
            {x:-1, y:-1 },
            {x:-1, y: 0 },
            {x:-1, y: 1 },
            {x: 0, y: 1 },
            {x: 1, y: 1 }];

    let cellNeighbours: Array<Cell> = [];
    let centerCellPositionX: number = parseInt(centerCell.getAttribute('x'));
    let centerCellPositionY: number = parseInt(centerCell.getAttribute('y'));

    let rows = arrayFromElementChildren(grid);
    let gridSize = rows.length

    for (let offset of addressOffsets) {
        // Neighbour queries wrap to opposite edge of grid
        let neighbourPositionY = positiveModulo(offset.y + centerCellPositionX, gridSize);
        let neighbourPositionX = positiveModulo(offset.x + centerCellPositionY, gridSize);

        let row = rows[neighbourPositionY];
        let neighbourCell = arrayFromElementChildren(row)[neighbourPositionX];

        cellNeighbours.push(<Cell>neighbourCell);
    }

    return cellNeighbours
}

function nextGridFrame(grid : Grid) {
    console.log("nextGridFrame");
    forEachCellInGrid(grid, (cell: HTMLInputElement) => {
        let neighbours = getCellNeighbours(grid, cell);
        let livingNeighboursCount = tallyLivingCells(neighbours);

        let cellAlive = cell.checked;

        if (!cellAlive && livingNeighboursCount === 3) {
            setCellAlive(cell);
        } else if (cellAlive && isTwoOrThree(livingNeighboursCount)) {
            setCellAlive(cell);
        } else {
            setCellDead(cell);
        }
    });

    forEachCellInGrid(grid, (cell: HTMLInputElement) => {
        cell.checked = cell.hasAttribute('live');
    });
}

export { generateGrid, randomizeGrid, nextGridFrame }
