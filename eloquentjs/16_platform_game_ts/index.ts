
import { CommandData } from "./src/interfaces";
import { controlMapping } from "./src/controlMapping"
import { runGame } from "./src/runTime";
import { GAME_LEVELS } from "./src/levels/gameLevels"


const commands : CommandData = controlMapping({
    left: "ArrowLeft",
    right: "ArrowRight",
    jump: "ArrowUp"
});

runGame(GAME_LEVELS, commands);
