"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createGameState = createGameState;
exports.updateGameState = updateGameState;
exports.getPlayerFromGameState = getPlayerFromGameState;
var level_1 = require("./level");
function createGameState(level, status) {
    if (status === void 0) { status = 'playing'; }
    return {
        level: level,
        status: status
    };
}
function getPlayerFromGameState(gameState) {
    return gameState.level.actors.find(function (actor) { return actor.type === "player"; });
}
function updateGameState(gameState, deltaTime, commands) {
    var newState = createGameState(gameState.level, gameState.status);
    newState.level.actors = newState.level.actors.map(function (actor) { return actor.update(actor, deltaTime, gameState, commands); });
    if (newState.status !== "playing") {
        return newState;
    }
    var player = getPlayerFromGameState(newState);
    var playerTouchingLava = (0, level_1.touches)(newState.level, player.position, player.size, "lava");
    if (playerTouchingLava) {
        return createGameState(newState.level, 'lost');
    }
    for (var _i = 0, _a = newState.level.actors; _i < _a.length; _i++) {
        var actor = _a[_i];
        if (actor !== player && overlap(actor, player)) {
            newState = actor.collide(actor, newState);
        }
    }
    return newState;
}
function overlap(actor1, actor2) {
    return actor1.position.x + actor1.size.x > actor2.position.x &&
        actor1.position.x < actor2.position.x + actor2.size.x &&
        actor1.position.y + actor1.size.y > actor2.position.y &&
        actor1.position.y < actor2.position.y + actor2.size.y;
}
