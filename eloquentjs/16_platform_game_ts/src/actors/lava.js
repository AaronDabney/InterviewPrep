"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = create;
var Vector_Utils = require("../vector_utils");
var Level_Utils = require("../level");
var GameState_Utils = require("../gameState");
/**
 * Creates actor instance of type lava
 * Allows for different varieties/behaviours of lava
 * @param position
 * @param ch
 * @param resetPosition
 * @returns
 */
function create(position, lavaSubtype, resetPosition) {
    var speed = Vector_Utils.create(0, 0);
    if (lavaSubtype === "sliding") {
        speed = Vector_Utils.create(2, 0);
    }
    else if (lavaSubtype === "bouncing") {
        speed = Vector_Utils.create(0, -2);
    }
    else if (lavaSubtype === "dropping") {
        resetPosition = position;
        speed = Vector_Utils.create(0, 2);
    }
    else {
        throw "Invalid lava subtype";
    }
    return {
        position: position,
        size: Vector_Utils.create(1, 1),
        type: 'lava',
        state: {
            speed: speed,
            resetPosition: resetPosition,
        },
        update: update,
        collide: collide,
    };
}
/**
 * Encapsulates update logic for instances of moving lava
 * @param lavaEntity
 * @param deltaTime
 * @param state
 * @returns
 */
function update(lavaEntity, deltaTime, state) {
    var positionDelta = Vector_Utils.mult(lavaEntity.state.speed, deltaTime);
    var newPosition = Vector_Utils.add(lavaEntity.position, positionDelta);
    var newPositionTouchesWall = Level_Utils.touches(state.level, newPosition, lavaEntity.size, "wall");
    // If reset positon is defined the lava will reset to that position upon collision with a "wall" tile
    var resetPosition = lavaEntity.state.resetPosition;
    var newLavaEntity = lavaEntity;
    if (!newPositionTouchesWall) {
        newLavaEntity.position = newPosition;
    }
    else if (resetPosition) {
        newLavaEntity.position = resetPosition;
    }
    else {
        newLavaEntity.state.speed = Vector_Utils.mult(lavaEntity.state.speed, -1);
    }
    return lavaEntity;
}
/**
 * Any collision with instance of lava entity returns a "lost" gamestate
 * @param actor
 * @param gameState
 * @returns
 */
function collide(actor, gameState) {
    return GameState_Utils.createGameState(gameState.level, "lost");
}
