import { Grid, Cell } from "./grid_utils";


function arrayFromElementChildren(element: HTMLElement): Array<HTMLElement>  {
    return <Array<HTMLElement>>Array.from(element.children);
}

const positiveModulo = (n: number, wrapNumber: number) => ((n % wrapNumber) + wrapNumber) % wrapNumber;

function forEachCellInGrid(grid: Grid, callback: Function) {
    for (let row of arrayFromElementChildren(grid)) {
        for (let cell of arrayFromElementChildren(row as any)) {
            callback(<Cell>cell);
        }
    }
}

const isTwoOrThree = (j: number) => (j === 3 || j === 2);
            
const setCellAlive = (cell: Cell) => cell.live = true;
const setCellDead = (cell: Cell) => cell.live = false;


export { arrayFromElementChildren, positiveModulo, forEachCellInGrid, isTwoOrThree, setCellAlive, setCellDead };
