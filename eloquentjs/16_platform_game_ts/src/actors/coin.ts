import { Actor, Level, Vector2, GameState } from "../interfaces";
import * as vector2 from '../vector2'
import * as level from "../level";

import { createGameState } from "../gameState";

function create(position : Vector2) : Actor {
    const basePosition = vector2.add(position, vector2.create(0.2, 0.1));
    const wobble = Math.random() * Math.PI * 2;

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
    }
}


function collide(targetActor : Actor, gameState : GameState) : GameState {
    const actorsExcludingTarget = gameState.level.actors.filter(actor => actor !== targetActor);
    const coinsRemaining = actorsExcludingTarget.some(actor => actor.type === 'coin');
    const status = coinsRemaining ? gameState.status : 'won';

    let newGameState = gameState;
    newGameState.level.actors = actorsExcludingTarget;
    newGameState.status = status;

    return newGameState;
}

function start() {

}

function update(coinEntity : Actor, deltaTime : number, state: GameState) {
    const wobbleSpeed = 8, wobbleDist = 0.07;
    const wobble = coinEntity.state.wobble + deltaTime * wobbleSpeed;
    const wobblePos = Math.sin(wobble) * wobbleDist;

    let newPosition = vector2.add(coinEntity.state.basePosition, vector2.create(0, wobblePos))

    coinEntity.state.wobble = wobble;
    coinEntity.position = newPosition;

    return coinEntity;
}

export { create }
