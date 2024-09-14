import * as Grid_Utils from './grid_utils';
import { Grid } from './grid_utils';
import { callOnInterval } from './callOnInterval';


let gridContainer: HTMLDivElement = document.getElementById("gridContainer") as HTMLDivElement;

let grid = Grid_Utils.generateGrid(gridContainer, 50);

let simulationState = {
    playing: false
};

document.getElementById("random").addEventListener("click", () => Grid_Utils.randomizeGrid(grid));

document.getElementById("next").addEventListener("click", () => Grid_Utils.nextGridFrame(grid));


const pausePlaySimulation = () => {
    simulationState.playing = !simulationState.playing;
    let targetDeltaTimeMilliseconds = 50;

    if (simulationState) {
        callOnInterval(targetDeltaTimeMilliseconds, () => Grid_Utils.nextGridFrame(grid), () => !simulationState.playing);
    }
}

document.getElementById("pausePlay").addEventListener("click", pausePlaySimulation);

document.getElementById("clear").addEventListener("click", () => {
    if (simulationState.playing) {
        pausePlaySimulation();
    }

    let rows = Array.from(grid.children);

    for (let row of rows) {
        let cells = Array.from(row.children);
        for (let cell of cells) {
            (cell as HTMLInputElement).checked = false;
        }
    }
});
