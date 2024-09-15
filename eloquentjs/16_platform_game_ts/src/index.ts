import { runGame } from "./runTime";
import { GAME_LEVELS } from "./levels/gameLevels"

let commandMap = {
    left: "ArrowLeft",
    right: "ArrowRight",
    jump: "ArrowUp",
    pause: "Escape"
}

runGame(GAME_LEVELS, commandMap);
