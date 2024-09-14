export type Grid = Array<Array<HTMLInputElement>>;


const arrayFromElementChildren = (element: HTMLElement) => Array.from(element.children);

/**
 * Builds the grid within gridContainer and returns a 2D reference array to the cells.
 * The reference arrays indices match 1-1 with grid coordinates.
 * @param gridContainer 
 * @param gridSize 
 * @returns 
 */
function generateGrid(gridContainer : HTMLDivElement, gridSize: number) {
    let gridReference: Grid = [];

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

    return gridContainer;
}

function randomizeGrid(grid: HTMLDivElement) {
    for (let row of arrayFromElementChildren(grid as any)) {
        for (let cell of  arrayFromElementChildren(row as any)) {
            (cell as HTMLInputElement).checked = Math.random() > 0.5;
        }
    }
}

function tallyLivingCells(cells: Array<HTMLInputElement>) {
    let output = 0;
    for (let cell of cells) {
        if (cell.checked) {
            output++;
        }
    }

    return output;
}

function getCellNeighbours(grid: HTMLDivElement, cell: HTMLInputElement) {
    let addressOffsets = [
            {x: 1 ,y: 0 },
            {x: 1 ,y:-1 },
            {x: 0 ,y:-1 },
            {x:-1, y:-1 },
            {x:-1, y: 0 },
            {x:-1, y: 1 },
            {x: 0, y: 1 },
            {x: 1, y: 1 }];

    let neighbours: Array<HTMLInputElement> = [];

    let cellXPos: number = parseInt((cell as any).getAttribute('x'));
    let cellYPos: number = parseInt((cell as any).getAttribute('y'));

    let gridSize = Array.from(grid.children).length

    const modulo = (input: number, wrapNumber: number) => ((input % wrapNumber) + wrapNumber) % wrapNumber;

    for (let offset of addressOffsets) {
        let y = modulo(offset.y + cellYPos, gridSize);
        let x = modulo(offset.x + cellXPos, gridSize);

        let row = Array.from(grid.children)[y];
        let cell = Array.from(row.children)[x];


        neighbours.push(cell as HTMLInputElement);
    }

    return neighbours
}

function nextGridFrame(grid : HTMLDivElement) {
    let rows = arrayFromElementChildren(grid)

    for (let row of rows) {
        for (let cell of arrayFromElementChildren(row as any)) {
            let neighbours = getCellNeighbours(grid, (cell as HTMLInputElement));
            let livingNeighboursCount = tallyLivingCells(neighbours);

            let cellAlive = (cell as HTMLInputElement).checked!;

            const isTwoOrThree = (j: number) => (j === 3 || j === 2);
            
            const cellLives = () => (cell as HTMLInputElement).toggleAttribute("live", true);
            const cellDies = () => (cell as HTMLInputElement).toggleAttribute("live", false);

            // Core simulation rules
            if (!cellAlive && livingNeighboursCount === 3) {
                cellLives();
            } else if (cellAlive && isTwoOrThree(livingNeighboursCount)) {
                cellLives();
            } else {
                cellDies();
            }
        }
    }

    for (let row of rows) {
        for (let cell of arrayFromElementChildren(row as any)) {
            (cell as HTMLInputElement).checked = (cell as any).getAttribute("live") !== null;
        }
    }
}

export { generateGrid, randomizeGrid, nextGridFrame }
