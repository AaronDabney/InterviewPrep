"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = create;
exports.start = start;
exports.update = update;
var vector2 = require("../vector2");
var level = require("../level");
function create(position) {
    return {
        position: vector2.add(position, vector2.create(0, -0.5)),
        size: vector2.create(0.8, 1.5),
        type: 'player',
        state: {
            speed: vector2.create(0, 0),
        },
        start: start,
        update: update,
    };
}
function start() {
}
function update(playerEntity, deltaTime, gameState, commands) {
    var playerXSpeed = 7;
    var gravity = 30;
    var jumpSpeed = 17;
    var xSpeed = (commands.left ? 1 : 0) * -playerXSpeed + (commands.right ? 1 : 0) * playerXSpeed;
    var ySpeed = playerEntity.state.speed.y + deltaTime * gravity;
    var xDelta = vector2.create(xSpeed * deltaTime, 0);
    var yDelta = vector2.create(0, ySpeed * deltaTime);
    var wontCollideWithWall = !level.touches(gameState.level, vector2.add(xDelta, playerEntity.position), playerEntity.size, 'wall');
    if (wontCollideWithWall) {
        playerEntity.position = vector2.add(playerEntity.position, xDelta);
    }
    var wontCollideWithGround = !level.touches(gameState.level, vector2.add(yDelta, playerEntity.position), playerEntity.size, 'wall');
    if (wontCollideWithGround) {
        playerEntity.position = vector2.add(playerEntity.position, yDelta);
    }
    else if (commands.jump && ySpeed > 0) {
        ySpeed = -jumpSpeed;
    }
    else {
        ySpeed = 0;
    }
    playerEntity.state.speed = vector2.create(xSpeed, ySpeed);
    return playerEntity;
}
