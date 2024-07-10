import { GAME_LEVELS } from './levels/gameLevels.js';
import { controlMapping } from './src/controlMapping.js';
import { runGame } from './src/runTime.js';
import { DOMDisplay } from './src/display.js'

const controls = controlMapping([
    ["left", "ArrowLeft"], 
    ["right", "ArrowRight"], 
    ["jump", "ArrowUp"]
]);

runGame(GAME_LEVELS, DOMDisplay, controls);
