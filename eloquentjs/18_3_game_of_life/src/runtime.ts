import * as Grid_Utils from './grid_utils'
import { Grid, Cell } from './grid_utils';
import { callOnInterval } from './callOnInterval'
import { arrayFromElementChildren, forEachCellInGrid } from './helper_utils';

function runGameOfLife(grid: Grid, period: number) {
    console.log("runGameOfLife");
    let simulationState = {
        playing: false
    }

    function pausePlaySimulation(grid: Grid) {
        console.log("pausePlaySimulation");
        simulationState.playing = !simulationState.playing;
    
        if (simulationState) {
            console.log("pausePlaySimulation 2");
            callOnInterval(period, () => Grid_Utils.nextGridFrame(grid), () => !simulationState.playing);
        }
    }
    
    function clearSimulationGrid(grid: Grid) {
        console.log("clearSimulationGrid");
        if (simulationState.playing) {
            pausePlaySimulation(grid);
        }
    
        forEachCellInGrid(grid, (cell: Cell) => {
            (cell as HTMLInputElement).checked = false;
        });
    }
    
    function stepSimulation(grid: Grid)  {
        console.log("stepSimulation");
        if (simulationState.playing) {
            pausePlaySimulation(grid);
        }

        Grid_Utils.nextGridFrame(grid)
    }
    
    function setGridRandom(grid: Grid)  {
        console.log("setGridRandom");
        if (simulationState.playing) {
            pausePlaySimulation(grid);
        }

        Grid_Utils.randomizeGrid(grid)
    }
    
    document.getElementById("random")!.addEventListener("click", () => setGridRandom(grid));
    document.getElementById("step")!.addEventListener("click", () => stepSimulation(grid));
    document.getElementById("pausePlay")!.addEventListener("click", () => pausePlaySimulation(grid));
    document.getElementById("clear")!.addEventListener("click", () => clearSimulationGrid(grid));
}

export { runGameOfLife }
