import { GAME_LEVELS } from './levels/gameLevels.js';
import { runGame } from './src/runTime.js';
import { DOMDisplay } from './src/display.js'

const controls = [
    ["left", "ArrowLeft"], 
    ["right", "ArrowRight"], 
    ["jump", "ArrowUp"],
    ["pause", "Escape"]
];

runGame(GAME_LEVELS, DOMDisplay, controls);
