import * as Grid_Utils from './grid_utils';
import { Grid, Cell } from './grid_utils';
import {  SimulationState, buildSimulationStateFromRunTimeParameters } from './sim_utils';
import { arrayFromElementChildren, forEachCellInGrid } from './helper_utils';


export interface RunTimeParameters {
    gridSize: number;
    stepPeriodMilliseconds: number;
    containerElement: HTMLDivElement;
}

const simulationRunning = (sim: SimulationState) => !!sim.intervalID;

function runGameOfLife(runTimeParameters: RunTimeParameters) {
    let sim = buildSimulationStateFromRunTimeParameters(runTimeParameters);

    function toggleSimulation(sim: SimulationState) {
        // Play
        if (!sim.intervalID) {
            sim.intervalID = setInterval(() => Grid_Utils.nextGridFrame(sim), runTimeParameters.stepPeriodMilliseconds);
            return;
        }

        // Pause
        if (sim.intervalID) {
            clearInterval(sim.intervalID);
            sim.intervalID = undefined;
            return;
        }
    }

    const pauseSimulation = (sim: SimulationState) => {
        if (simulationRunning(sim)) {
            toggleSimulation(sim);
        }
    }

    function clearSimulationGrid(sim: SimulationState) {
        pauseSimulation(sim);
    
        forEachCellInGrid(sim.grid, (cell: Cell) => {
            cell.checked = false;
        });
    }
    
    function stepSimulation(sim: SimulationState)  {
        pauseSimulation(sim);

        Grid_Utils.nextGridFrame(sim)
    }
    
    function setGridRandom(sim: SimulationState)  {
        pauseSimulation(sim);

        Grid_Utils.randomizeGrid(sim)
    }
    
    document.getElementById("random")!.addEventListener("click", () => setGridRandom(sim));
    document.getElementById("step")!.addEventListener("click", () => stepSimulation(sim));
    document.getElementById("pausePlay")!.addEventListener("click", () => toggleSimulation(sim));
    document.getElementById("clear")!.addEventListener("click", () => clearSimulationGrid(sim));
}


export { runGameOfLife }
