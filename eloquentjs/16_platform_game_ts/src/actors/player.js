"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = create;
var Vector_Utils = require("../vector_utils");
var Level_Utils = require("../level");
/**
 * Creates player entity
 * @param position
 * @returns
 */
function create(position) {
    return {
        position: Vector_Utils.add(position, Vector_Utils.create(0, -0.5)),
        size: Vector_Utils.create(0.8, 1.5),
        type: 'player',
        state: {
            speed: Vector_Utils.create(0, 0),
        },
        update: update,
    };
}
/**
 * Updates the player entity
 * @param playerEntity
 * @param deltaTime
 * @param gameState
 * @param commands
 * @returns
 */
function update(playerEntity, deltaTime, gameState, commands) {
    var playerXSpeed = 7;
    var gravity = 30;
    var jumpSpeed = 17;
    var xSpeed = ((commands.left ? -1 : 0) + (commands.right ? 1 : 0)) * playerXSpeed;
    var ySpeed = playerEntity.state.speed.y + deltaTime * gravity;
    var xDelta = Vector_Utils.create(xSpeed * deltaTime, 0);
    var yDelta = Vector_Utils.create(0, ySpeed * deltaTime);
    var wontCollideWithWall = !Level_Utils.touches(gameState.level, Vector_Utils.add(xDelta, playerEntity.position), playerEntity.size, 'wall');
    if (wontCollideWithWall) {
        playerEntity.position = Vector_Utils.add(playerEntity.position, xDelta);
    }
    var wontCollideWithGround = !Level_Utils.touches(gameState.level, Vector_Utils.add(yDelta, playerEntity.position), playerEntity.size, 'wall');
    if (wontCollideWithGround) {
        playerEntity.position = Vector_Utils.add(playerEntity.position, yDelta);
    }
    else if (commands.jump && ySpeed > 0) {
        ySpeed = -jumpSpeed;
    }
    else {
        ySpeed = 0;
    }
    playerEntity.state.speed = Vector_Utils.create(xSpeed, ySpeed);
    return playerEntity;
}
