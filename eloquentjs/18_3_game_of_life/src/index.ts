import { runGameOfLife} from './runtime';
import { RunTimeParameters } from './runtime';


const runParams: RunTimeParameters = {
    gridSize: 50,
    stepPeriodMilliseconds: 50,
    containerElement: <HTMLDivElement>document.getElementById("gridContainer"),
}

runGameOfLife(runParams);
