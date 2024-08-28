
import { GAME_LEVELS } from "./src/levels/gameLevels"
import { planToLevel } from "./src/level"
import { controlMapping } from "./src/controlMapping"
import { runGame } from "./src/runTime";

const controls = controlMapping({
    left: "ArrowLeft",
    right: "ArrowRight",
    jump: "ArrowUp"
});

runGame(GAME_LEVELS, controls, document.body);
