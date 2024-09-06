
import { CommandData } from "./interfaces";
import { controlMapping } from "./controlMapping"
import { runGame } from "./runTime";
import { GAME_LEVELS } from "./levels/gameLevels"


const commands : CommandData = controlMapping({
    left: "ArrowLeft",
    right: "ArrowRight",
    jump: "ArrowUp"
});

runGame(GAME_LEVELS, commands);
