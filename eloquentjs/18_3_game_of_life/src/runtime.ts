import * as Grid_Utils from './grid_utils'
import { Grid, Cell } from './grid_utils';
import { callOnInterval } from './callOnInterval'
import { arrayFromElementChildren, forEachCellInGrid } from './helper_utils';

export interface SimulationState {
    grid: Grid;
    intervalID?: any;
}

export interface RunTimeParameters {
    gridSize: number;
    stepPeriodMilliseconds: number;
    containerElement: HTMLDivElement;
}

const simulationRunning = (sim : SimulationState) => !!sim.intervalID;

function runGameOfLife(runTimeParameters: RunTimeParameters) {
    const simulationState: SimulationState = {
        grid: Grid_Utils.buildGridDom(runTimeParameters.containerElement, runTimeParameters.gridSize),
        intervalID: undefined,
    }

    function pausePlaySimulation(grid: Grid) {
        //simulationState.playing = !simulationState.playing;


        if (!simulationState.intervalID) {
            simulationState.intervalID = setInterval( () => Grid_Utils.nextGridFrame(grid), runTimeParameters.stepPeriodMilliseconds);
            return;
        }

        if (simulationState.intervalID) {
            clearInterval(simulationState.intervalID);
            simulationState.intervalID = undefined;
            return;
        }

        // if (!simulationState.intervalID && simulationState.playing) {
        //     simulationState.intervalID = setInterval( () => Grid_Utils.nextGridFrame(grid), runTimeParameters.stepPeriodMilliseconds);
        //     return;
        // }

        // if (simulationState.intervalID && !simulationState.playing) {
        //     clearInterval(simulationState.intervalID);
        //     return;
        // }
    





        // if (simulationState) {
        //    // callOnInterval(runTimeParameters.stepPeriodMilliseconds, () => Grid_Utils.nextGridFrame(grid), () => !simulationState.playing);
        // }
    }
    
    function clearSimulationGrid(grid: Grid) {
        if (simulationRunning(simulationState)) {
            pausePlaySimulation(grid);
        }
    
        forEachCellInGrid(grid, (cell: Cell) => {
            cell.checked = false;
        });
    }
    
    function stepSimulation(grid: Grid)  {
        if (simulationRunning(simulationState)) {
            pausePlaySimulation(grid);
        }

        Grid_Utils.nextGridFrame(grid)
    }
    
    function setGridRandom(grid: Grid)  {
        if (simulationRunning(simulationState)) {
            pausePlaySimulation(grid);
        }

        Grid_Utils.randomizeGrid(grid)
    }
    
    document.getElementById("random")!.addEventListener("click", () => setGridRandom(simulationState.grid));
    document.getElementById("step")!.addEventListener("click", () => stepSimulation(simulationState.grid));
    document.getElementById("pausePlay")!.addEventListener("click", () => pausePlaySimulation(simulationState.grid));
    document.getElementById("clear")!.addEventListener("click", () => clearSimulationGrid(simulationState.grid));
}


export { runGameOfLife }
