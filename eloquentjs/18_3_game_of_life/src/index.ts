
import * as ControlSetup from './controlSetup';
import * as Grid_Utils from './grid_utils'
import { callOnInterval } from './callOnInterval'


let gridContainer: HTMLDivElement = document.getElementById("gridContainer") as HTMLDivElement;

let grid = Grid_Utils.generateGrid(gridContainer, 50);

document.getElementById("random").addEventListener("click", () => Grid_Utils.randomizeGrid(grid));

document.getElementById("step").addEventListener("click", () => Grid_Utils.nextGridFrame(grid));

let simulationState = {
    playing: false
};


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


// async function gameOfLife(controlInterface: any) {

//     let playing = true;
//     let deltaTime = 500; 
    
//     let gridContainer = document.getElementById("gridContainer");
//     let grid = Grid_Utils.generateGrid(gridContainer as HTMLDivElement, 30);
//     Grid_Utils.randomizeGrid(grid);

//    // let intervalID = setInterval(runTime, deltaTime)

//    function runTime() {

//    }

//  //  callOnInterval(runTime, 50);

//     // function runTime() {
//     //     Grid_Utils.nextGridFrame(grid);
//     //     console.log("tock")

//     //     let commandsUpdated = objectHasTruthyValues(controlInterface);

//     //     if (playing && !commandsUpdated) {
//     //         Grid_Utils.nextGridFrame(grid);
//     //         return;
//     //     }

//     //     if (!playing && !commandsUpdated) {
//     //         return;
//     //     }
        
//     //     if (playing && controlInterface.pausePlay) {
//     //         playing = false;
//     //         clearInterval(intervalID);
//     //         return;
//     //     }

//     //     if (!playing && controlInterface.pausePlay) {
//     //         playing = true;
//     //         intervalID = setInterval(runTime, deltaTime)
//     //         return;
//     //     }

//     //     runTime();

//     // }

//     const objectHasTruthyValues = (object: any) =>  Object.keys(object).some(key => object[key]);
//     const setAllObjectValuesFalse = (object: any) =>  Object.keys(object).forEach(key => object[key] = false);
// }


// let buttonIdentifierList = [
//     'pausePlay',
//     'step',
//     'clear',
//     'random'];

// let controlInterface = ControlSetup.buildControlInterface(buttonIdentifierList);

//gameOfLife(controlInterface);
