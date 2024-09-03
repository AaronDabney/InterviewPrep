"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = create;
var gameState_1 = require("../gameState");
var vector2 = require("../vector2");
var Level = require("../level");
function create(position, ch, resetPosition) {
    var speed = vector2.create(0, 0);
    if (ch === "sliding") {
        speed = vector2.create(2, 0);
    }
    else if (ch === "bouncing") {
        speed = vector2.create(0, -2);
    }
    else if (ch === "dropping") {
        resetPosition = position;
        speed = vector2.create(0, 2);
    }
    else {
        throw "this aint good lava :(";
    }
    return {
        position: position,
        size: vector2.create(1, 1),
        type: 'lava',
        state: {
            speed: speed,
            resetPosition: resetPosition,
        },
        start: start,
        update: update,
        collide: collide,
    };
}
function start() {
}
function update(lavaEntity, deltaTime, state) {
    var stepVector = vector2.mult(lavaEntity.state.speed, deltaTime);
    var newPosition = vector2.add(lavaEntity.position, stepVector);
    var newPositionTouchesWall = Level.touches(state.level, newPosition, lavaEntity.size, "wall");
    var resetPosition = lavaEntity.state.resetPosition;
    if (!newPositionTouchesWall) {
        lavaEntity.position = newPosition;
    }
    else if (resetPosition) {
        lavaEntity.position = resetPosition;
    }
    else {
        lavaEntity.state.speed = vector2.mult(lavaEntity.state.speed, -1);
    }
    return lavaEntity;
}
function collide(actor, gameState) {
    return (0, gameState_1.createGameState)(gameState.level, "lost");
}
