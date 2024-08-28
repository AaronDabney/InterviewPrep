import { Level , GameState, DisplayState} from "./interfaces";
import { planToLevel } from "./level";
import * as displayState_ops from "./display";
import * as gameState_ops from  "./gameState";


async function runGame(levelPlans : Array<string>, controls: Object, gameWindowElement : HTMLElement) {
    const maxLives = 3;
    let lives = maxLives;

    for (let levelIndex = 0; levelIndex < levelPlans.length;) {
        console.log(`${lives} lives remain`);

        let levelData = planToLevel(levelPlans[levelIndex])

        const status = await runLevel(levelData, controls, gameWindowElement);

        if (status === "won") {
            levelIndex++;
        }

        if (status === "lost") {
            lives--;
        }

        if (lives === 0) {
            console.log("YOU DIED");
            
            levelIndex = 0;
            lives = maxLives;
        }
    }

    console.log("You've won!");
    
}

function runLevel(level : Level, controls: Object, gameWindowElement : HTMLElement)  {

    let gameDisplay = displayState_ops.createGameDisplay(level, document.body); 
    let gameState : GameState = gameState_ops.createGameState(level, level.actors, 'playing');

    let levelEndDelay = 1;

    return new Promise(resolve => {

        runAnimation((deltaTime : number) => {
            gameState = gameState_ops.updateState(gameState, deltaTime, controls); //actors are updating one per anim frame
           
            displayState_ops.standardDisplay(gameState);


            // if (state.status == "playing") {
            //     return true;
            // } else if (levelEndDelay > 0) {
            //     levelEndDelay -= deltaTime;
            //     return true;
            // } else {
            //     display.clear();
            //     resolve(state.status);
            //     return false;
            // }

        });

    });

}

function runAnimation(frameFunc : Function) {
    let lastTime : null | number = null;

    function frame(time : number) {
        if (lastTime !== null) {
            const deltaTime : number = Math.min(time - lastTime, 100) / 1000;
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
