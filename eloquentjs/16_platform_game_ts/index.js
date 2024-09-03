"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var gameLevels_1 = require("./src/levels/gameLevels");
var controlMapping_1 = require("./src/controlMapping");
var runTime_1 = require("./src/runTime");
var commands = (0, controlMapping_1.controlMapping)({
    left: "ArrowLeft",
    right: "ArrowRight",
    jump: "ArrowUp"
});
(0, runTime_1.runGame)(gameLevels_1.GAME_LEVELS, commands);
