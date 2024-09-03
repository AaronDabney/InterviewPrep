"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = create;
var vector2 = require("../vector2");
function create(position) {
    var basePosition = vector2.add(position, vector2.create(0.2, 0.1));
    var wobble = Math.random() * Math.PI * 2;
    return {
        position: basePosition,
        size: vector2.create(0.6, 0.6),
        type: 'coin',
        state: {
            basePosition: basePosition,
            wobble: wobble
        },
        start: start,
        update: update,
        collide: collide,
    };
}
function collide(targetActor, gameState) {
    var actorsExcludingTarget = gameState.level.actors.filter(function (actor) { return actor !== targetActor; });
    var coinsRemaining = actorsExcludingTarget.some(function (actor) { return actor.type === 'coin'; });
    var status = coinsRemaining ? gameState.status : 'won';
    var newGameState = gameState;
    newGameState.level.actors = actorsExcludingTarget;
    newGameState.status = status;
    return newGameState;
}
function start() {
}
function update(coinEntity, deltaTime, state) {
    var wobbleSpeed = 8, wobbleDist = 0.07;
    var wobble = coinEntity.state.wobble + deltaTime * wobbleSpeed;
    var wobblePos = Math.sin(wobble) * wobbleDist;
    var newPosition = vector2.add(coinEntity.state.basePosition, vector2.create(0, wobblePos));
    coinEntity.state.wobble = wobble;
    coinEntity.position = newPosition;
    return coinEntity;
}
