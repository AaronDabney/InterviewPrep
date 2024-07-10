import { Level } from './level.js'
import { State } from './state.js'

async function runGame(plans, Display, controls) {
    const maxLives = 3
    let lives = maxLives;

    for (let level = 0; level < plans.length;) {
        console.log(`${lives} lives remain`);

        const status = await runLevel(new Level(plans[level]), Display, controls);

        if (status == "won") {
            level++;
        }

        if (status == "lost") {
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
    let state = State.start(level);
    let ending = 1;

    return new Promise(resolve => {
        runAnimation(deltaTime => {
            state = state.update(deltaTime, controls);
            display.syncState(state);
            
            if (state.status == "playing") {
                return true;
            } else if (ending > 0) {
                ending -= deltaTime;
                return true;
            } else {
                display.clear();
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
