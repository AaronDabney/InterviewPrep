import { runGameOfLife} from './runtime'
import { RunTimeParameters } from './runtime'


const runTimeParameters = {
    gridSize: 50,
    stepPeriodMilliseconds: 50,
    containerElement: <HTMLDivElement>document.getElementById("gridContainer"),
}

runGameOfLife(runTimeParameters);
