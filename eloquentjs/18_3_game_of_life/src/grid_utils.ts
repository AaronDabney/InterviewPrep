export type Grid = Array<Array<HTMLInputElement>>;

function generateGrid(targetElement : HTMLDivElement, gridSize: number) {
    let gridReference: Grid = [];

    for (let y = 0; y < gridSize; y++) {
        let rowElement = document.createElement('div');
        rowElement.setAttribute("class", "customRow");

        for (let x = 0; x < gridSize; x++) {
           let cell = document.createElement("input");
           cell.type = "checkbox";

           cell.setAttribute("x", x.toString());
           cell.setAttribute("y", y.toString());

           rowElement.appendChild(cell);
        }

        targetElement.appendChild(rowElement);
    }

    return targetElement;
}

function randomizeGrid(grid: HTMLElement) {
    let rows = Array.from(grid.children);

    for (let row of rows) {
        let cells = Array.from(row.children);
        for (let cell of  cells) {
            (cell as HTMLInputElement).checked = Math.random() > 0.5;
        }
    }
}

function nextGridFrame(grid : HTMLElement) {
    let rows = Array.from(grid.children);

    for (let row of rows) {
        let cells = Array.from(row.children);
        for (let cell of cells) {

            let neighbours = getCellNeighbours(grid, cell);
            let livingNeighboursCount = tallyLivingCells(neighbours);

            let alive = (cell as HTMLInputElement).checked!;

            if (!alive && livingNeighboursCount === 3) {
                cell.toggleAttribute("live", true);
            } else if (alive && (livingNeighboursCount === 3 || livingNeighboursCount === 2)) {
                cell.toggleAttribute("live", true);
            } else {
                cell.toggleAttribute("live", false);
            }
            
        }
    }

    for (let row of rows) {
        let cells = Array.from(row.children);
        for (let cell of cells) {
            (cell as HTMLInputElement).checked = (cell as any).getAttribute("live") !== null;
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

function getCellNeighbours(grid: HTMLElement, cell: any) {
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

    let cellX: number = parseInt(cell.getAttribute('x'));
    let cellY: number = parseInt(cell.getAttribute('y'));

    let gridSize = Array.from(grid.children).length

    const modulo = (input: number, wrapNumber: number) => ((input % wrapNumber) + wrapNumber) % wrapNumber;

    for (let offset of addressOffsets) {
        let y = modulo(offset.y + cellY, gridSize);
        let x = modulo(offset.x + cellX, gridSize);

        let row = Array.from(grid.children)[y];
        let cell = Array.from(row.children)[x];


        neighbours.push(cell as HTMLInputElement);
        
    }

    return neighbours
}


export { generateGrid, randomizeGrid, nextGridFrame }
