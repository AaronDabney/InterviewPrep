import { arrayFromElementChildren, 
         positiveModulo, 
         forEachCellInGrid,
         isTwoOrThree,
         setCellAlive,
         setCellDead,
        } from "./helper_utils"

export type Grid = HTMLDivElement;
export type Cell = HTMLInputElement;


function buildGridDom(gridContainer : HTMLDivElement, gridSize: number): Grid {
    for (let y = 0; y < gridSize; y++) {
        const rowElement = document.createElement('div');
        rowElement.setAttribute("class", "gridRow");

        for (let x = 0; x < gridSize; x++) {
           const cell = document.createElement("input");
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

    const cellNeighbours: Array<Cell> = [];
    
    const centerCellPositionX: number = parseInt(centerCell.getAttribute('x'));
    const centerCellPositionY: number = parseInt(centerCell.getAttribute('y'));

    const rows = arrayFromElementChildren(grid);
    const gridSize = rows.length

    for (let offset of addressOffsets) {
        // Positive modulo allows wrapping to opposite edge of grid
        const neighbourPositionY = positiveModulo(offset.y + centerCellPositionY, gridSize);
        const neighbourPositionX = positiveModulo(offset.x + centerCellPositionX, gridSize);

        const row = rows[neighbourPositionY];
        const neighbourCell = arrayFromElementChildren(row)[neighbourPositionX];

        cellNeighbours.push(<Cell>neighbourCell);
    }

    return cellNeighbours
}

function nextGridFrame(grid : HTMLDivElement) {
    forEachCellInGrid(grid, (cell: Cell) => {
        const neighbours = getCellNeighbours(grid, cell);
        const livingNeighboursCount = tallyLivingCells(neighbours);

        const cellAlive = cell.checked;

        // Core simulation rules
        if (!cellAlive && livingNeighboursCount === 3) {
            setCellAlive(cell);
        } else if (cellAlive && isTwoOrThree(livingNeighboursCount)) {
            setCellAlive(cell);
        } else {
            setCellDead(cell);
        }
    });

    forEachCellInGrid(grid, (cell: Cell) => {
        (cell as Cell).checked = (cell as Cell).getAttribute("live") !== null;
    });
}


export { buildGridDom, randomizeGrid, nextGridFrame }
