import { Actor, Vector2, GameState } from "../interfaces";
import * as Vector_Utils from '../vector_utils'
import * as GameState_Utils from '../gameState'


/**
 * Creates actor instance of type coin
 * @param position 
 * @returns 
 */
function create(position : Vector2) : Actor {
    const displayOffset = Vector_Utils.create(0.2, 0.1);
    const startingPosition = Vector_Utils.add(position, displayOffset);

    // Wobble is assigned to random starting phase
    const wobble = Math.random() * Math.PI * 2; 

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
    }
}

/**
 * This collision function returns the gameState with coin removed and will change the gameStatus to won if no coins remain
 * @param coinEntity 
 * @param gameState 
 * @returns 
 */
function collide(coinEntity : Actor, gameState : GameState) : GameState {
    const actorsExcludingTarget = gameState.level.actors.filter(actor => actor !== coinEntity);
    const coinsRemaining = actorsExcludingTarget.some(actor => actor.type === 'coin');
    const status = coinsRemaining ? gameState.status : 'won';

    const newLevel = gameState.level;
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
function update(coinEntity : Actor, deltaTime : number, state: GameState) {
    const wobbleSpeed = 8, wobbleDist = 0.07;
    const wobble = coinEntity.state.wobble + deltaTime * wobbleSpeed;
    const wobblePos = Math.sin(wobble) * wobbleDist;

    const newPosition = Vector_Utils.add(coinEntity.state.basePosition, Vector_Utils.create(0, wobblePos))

    const newCoinEntity = coinEntity;
    newCoinEntity.state.wobble = wobble;
    newCoinEntity.position = newPosition;

    return newCoinEntity;
}


export { create }
