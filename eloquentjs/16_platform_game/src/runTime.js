import { Level } from './level.js'
import { State } from './state.js'
import { controlMapping } from './controlMapping.js';

async function runGame(plans, Display, controls) {
    const maxLives = 3
    let lives = maxLives;

    for (let level = 0; level < plans.length;) {
        console.log(`${lives} lives remain`);

        const status = await runLevel(new Level(plans[level]), Display, controls);

        if (status === "won") {
            level++;
        }

        if (status === "lost") {
            lives--;
        }

        if (lives === 0) {
            console.log("YOU DIED");
            
            level = 0;
            lives = maxLives;
        }
    }

    console.log("You've won!");
}


function runLevel(level, Display, controls) {
    const display = new Display(document.body, level);
    const controller = controlMapping(controls);
    let state = State.start(level);
    let levelEndDelay = 1;

    let paused = false;
    const pauseDebounceTime = 0.1;
    let pauseToggleTimer = pauseDebounceTime;

    return new Promise(resolve => {
        runAnimation(deltaTime => {
            const pauseToggle = controller.pause;

            if (pauseToggle && pauseToggleTimer <= 0) {
                paused = !paused
                pauseToggleTimer = pauseDebounceTime;
            }

            if (pauseToggleTimer > 0) {
                pauseToggleTimer -= deltaTime;
            }
            
            if (paused) {
                deltaTime = 0;
            }
        
            state = state.update(deltaTime, controller);
            display.syncState(state);
            
            if (state.status == "playing") {
                return true;
            } else if (levelEndDelay > 0) {
                levelEndDelay -= deltaTime;
                return true;
            } else {
                display.clear();
                controller.removeListeners();
                resolve(state.status);
                return false;
            }
        });
    });
}


function runAnimation(frameFunc) {
    let lastTime = null;

    function frame(time) {
        if (lastTime !== null) {
            const deltaTime = Math.min(time - lastTime, 100) / 1000;
            if (frameFunc(deltaTime) === false) {
                return;
            } 
        }

        lastTime = time;
        requestAnimationFrame(frame);
    }

    requestAnimationFrame(frame);
}

export { runGame, runLevel, runAnimation }
