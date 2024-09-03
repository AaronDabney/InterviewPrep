import { Level , GameState, DisplayState, CommandData} from "./interfaces";
import { planToLevel } from "./level";
import * as display from "./display";
import * as gameState_ops from  "./gameState";


async function runGame(levelPlans : Array<string>, commands: CommandData) {
    const maxLives = 3;
    let lives = maxLives;

    for (let levelIndex = 0; levelIndex < levelPlans.length;) {

        let levelData = planToLevel(levelPlans[levelIndex])

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

function runLevel(level : Level, commands: CommandData)  {
    
    let gameState : GameState = gameState_ops.createGameState(level, 'playing');
    let gameDisplay : DisplayState = display.createDisplayState(level); 

    let levelEndDelay = 1;

    return new Promise(resolve => {

        runAnimation((deltaTime : number) => {
            gameState = gameState_ops.updateGameState(gameState, deltaTime, commands); //actors are updating one per anim frame
           
            gameDisplay = display.displaySync(gameState, gameDisplay);


            if (gameState.status == "playing") {
                return true;
            } else if (levelEndDelay > 0) {
                levelEndDelay -= deltaTime;
                return true;
            } else {
                display.clearGameDOM(gameDisplay);
                resolve(gameState.status);
                return false;
            }

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
