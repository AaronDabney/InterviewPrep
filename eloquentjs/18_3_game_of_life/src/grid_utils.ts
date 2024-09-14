import { arrayFromElementChildren, 
         positiveModulo, 
         forEachCellInGrid,
         isTwoOrThree,
         setCellAlive,
         setCellDead,
        } from "./helper_utils";

import { SimulationState } from "./sim_utils";


export type Grid = HTMLDivElement;
export type Cell = HTMLInputElement;

function buildGrid(containerElement: HTMLElement, gridSize: number): Grid {
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

        containerElement.appendChild(rowElement);
    }

    return <Grid>containerElement;
}

function randomizeGrid(sim: SimulationState) {
    forEachCellInGrid(sim.grid, (cell: Cell) => {
        cell.checked = Math.random() > 0.5;
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

function getCellNeighbours(sim: SimulationState, centerCell: Cell): Array<Cell> {
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
        
    const rows = arrayFromElementChildren(sim.grid);

    for (let offset of addressOffsets) {
        // Positive modulo allows wrapping to opposite edge of grid
        const neighbourPositionY = positiveModulo(offset.y + centerCellPositionY, sim.runTimeSettings.gridSize);
        const neighbourPositionX = positiveModulo(offset.x + centerCellPositionX, sim.runTimeSettings.gridSize);

        const row = rows[neighbourPositionY];
        const neighbourCell = arrayFromElementChildren(row)[neighbourPositionX];

        cellNeighbours.push(<Cell>neighbourCell);
    }

    return cellNeighbours
}

function nextGridFrame(sim: SimulationState) {
    forEachCellInGrid(sim.grid, (cell: Cell) => {
        const neighbours = getCellNeighbours(sim, cell);
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

    forEachCellInGrid(sim.grid, (cell: Cell) => {
        cell.checked = cell.getAttribute("live") !== null;
    });
}


export { buildGrid, randomizeGrid, nextGridFrame }
