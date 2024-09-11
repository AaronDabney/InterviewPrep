import { CommandData } from "./controlMapping";
import { GameState } from "./gameState";
import { Level } from "./level";
import { DisplayState } from "./displayState";

import * as Level_Utils from "./level";
import * as DisplayState_Utils from "./displayState";
import * as GameState_Utils from  "./gameState";


async function runGame(levelPlans: Array<string>, commands: CommandData) {
    const maxLives = 3;
    let lives = maxLives;

    console.log("Go!")

    for (let levelIndex = 0; levelIndex < levelPlans.length;) {

        const levelData = Level_Utils.planToLevel(levelPlans[levelIndex])

        const status = await runLevel(levelData, commands);

        if (status === "won") {
            levelIndex++;
        }

        if (status === "lost") {
            lives--;
            console.log(`${lives} lives remaining`)
        }

        if (lives === 0) {
           console.log("YOU DIED");
            
            levelIndex = 0;
            lives = maxLives;
        }
    }

   console.log("You've won!");
}

function runLevel(level: Level, commands: CommandData)  {
    let gameState: GameState = GameState_Utils.createGameState(level, 'playing');
    let gameDisplay: DisplayState = DisplayState_Utils.createDisplayState(level); 

    let levelEndDelay = 1;

    return new Promise(resolve => {

        runAnimation((deltaTime: number) => {
            gameState = GameState_Utils.updateGameState(gameState, deltaTime, commands);
            gameDisplay = DisplayState_Utils.displaySync(gameState, gameDisplay);

            if (gameState.status == "playing") {
                return true;
            } else if (levelEndDelay > 0) {
                levelEndDelay -= deltaTime;
                return true;
            } else {
                DisplayState_Utils.clearGameDOM(gameDisplay);
                resolve(gameState.status);
                return false;
            }
        });
    });
}

function runAnimation(frameFunc: Function) {
    let lastTime: null | number = null;

    function frame(time: number) {
        if (lastTime !== null) {
            const deltaTime: number = Math.min(time - lastTime, 100) / 1000;
            if (frameFunc(deltaTime) === false) {
                return;
            } 
        }

        lastTime = time;
        requestAnimationFrame(frame);
    }

    requestAnimationFrame(frame);
}


export { runGame }
