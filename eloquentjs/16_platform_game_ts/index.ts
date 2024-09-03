
import { GAME_LEVELS } from "./src/levels/gameLevels"
import { planToLevel } from "./src/level"
import { controlMapping } from "./src/controlMapping"
import { runGame } from "./src/runTime";
import { CommandData } from "./src/interfaces";

const commands : CommandData = controlMapping({
    left: "ArrowLeft",
    right: "ArrowRight",
    jump: "ArrowUp"
});

runGame(GAME_LEVELS, commands);
