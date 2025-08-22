import { Grid, buildGrid } from './grid_utils';
import { RunTimeParameters } from './runtime';

export interface SimulationState {
    grid: Grid;
    intervalID: any;
    runTimeSettings: RunTimeParameters;
}

function buildSimulationStateFromRunTimeParameters(runTimeParameters: RunTimeParameters): SimulationState {
    return {
        grid: buildGrid(runTimeParameters.containerElement, runTimeParameters.gridSize),
        intervalID: undefined,
        runTimeSettings: runTimeParameters,
    }
}


export { buildSimulationStateFromRunTimeParameters}
