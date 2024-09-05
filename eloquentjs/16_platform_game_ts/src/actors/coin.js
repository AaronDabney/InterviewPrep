"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = create;
var Vector_Utils = require("../vector_utils");
var GameState_Utils = require("../gameState");
/**
 * Creates actor instance of type coin
 * @param position
 * @returns
 */
function create(position) {
    var displayOffset = Vector_Utils.create(0.2, 0.1);
    var startingPosition = Vector_Utils.add(position, displayOffset);
    // Wobble is assigned to random starting phase
    var wobble = Math.random() * Math.PI * 2;
    return {
        position: startingPosition,
        size: Vector_Utils.create(0.6, 0.6),
        type: 'coin',
        state: {
            basePosition: startingPosition,
            wobble: wobble
        },
        update: update,
        collide: collide,
    };
}
/**
 * This collision function returns the gameState with coin removed and will change the gameStatus to won if no coins remain
 * @param coinEntity
 * @param gameState
 * @returns
 */
function collide(coinEntity, gameState) {
    var actorsExcludingTarget = gameState.level.actors.filter(function (actor) { return actor !== coinEntity; });
    var coinsRemaining = actorsExcludingTarget.some(function (actor) { return actor.type === 'coin'; });
    var status = coinsRemaining ? gameState.status : 'won';
    var newLevel = gameState.level;
    newLevel.actors = actorsExcludingTarget;
    return GameState_Utils.createGameState(newLevel, status);
}
/**
 * Every coin entity wobbles around its base position
 * Keeping track of basePosition seperate from the current position mitigates potential 'drift' issues
 * @param coinEntity
 * @param deltaTime
 * @param state
 * @returns
 */
function update(coinEntity, deltaTime, state) {
    var wobbleSpeed = 8, wobbleDist = 0.07;
    var wobble = coinEntity.state.wobble + deltaTime * wobbleSpeed;
    var wobblePos = Math.sin(wobble) * wobbleDist;
    var newPosition = Vector_Utils.add(coinEntity.state.basePosition, Vector_Utils.create(0, wobblePos));
    var newCoinEntity = coinEntity;
    newCoinEntity.state.wobble = wobble;
    newCoinEntity.position = newPosition;
    return newCoinEntity;
}
