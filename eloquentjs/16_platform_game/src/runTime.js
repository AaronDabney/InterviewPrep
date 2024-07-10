import { Level } from './level.js'
import { State } from './state.js'

async function runGame(plans, Display, controls) {
    for (let level = 0; level < plans.length;) {
        let status = await runLevel(new Level(plans[level]), Display, controls);
        if (status == "won") {
            level++;
        }
    }

    console.log("You've won!");
}


function runLevel(level, Display, controls) {
    let display = new Display(document.body, level);
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
        if (lastTime != null) {
            let deltaTime = Math.min(time - lastTime, 100) / 1000;
            if (frameFunc(deltaTime) === false) {
                return;
            } 
        }

        lastTime = time;
        requestAnimationFrame(frame);
    }

    requestAnimationFrame(frame);
}

export {runGame, runLevel, runAnimation}
