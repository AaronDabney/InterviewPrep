import { Actor, GameState, Vector2 } from "../interfaces";
import * as Vector_Utils from "../vector_utils";
import * as Level_Utils from "../level";
import * as GameState_Utils from '../gameState'


/**
 * Creates actor instance of type lava
 * Allows for different varieties/behaviours of lava
 * @param position 
 * @param ch 
 * @param resetPosition 
 * @returns 
 */
function create(position : Vector2, lavaSubtype : string, resetPosition? : Vector2) {
    let speed = Vector_Utils.create(0, 0);

    if (lavaSubtype === "sliding") {
        speed = Vector_Utils.create(2, 0);
    } else if (lavaSubtype === "bouncing") {
        speed = Vector_Utils.create(0, -2);
    } else if (lavaSubtype === "dropping") {
        resetPosition = position;
        speed = Vector_Utils.create(0, 2);
    } else { 
        throw "Invalid lava subtype"
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
    }
}

/**
 * Encapsulates update logic for instances of moving lava
 * @param lavaEntity 
 * @param deltaTime 
 * @param state 
 * @returns 
 */
function update(lavaEntity : Actor, deltaTime : number, state : GameState) {
    const positionDelta = Vector_Utils.mult(lavaEntity.state.speed, deltaTime);

    const newPosition = Vector_Utils.add(lavaEntity.position, positionDelta);

    const newPositionTouchesWall = Level_Utils.touches(state.level, newPosition, lavaEntity.size, "wall")

    // If reset positon is defined the lava will reset to that position upon collision with a "wall" tile
    const resetPosition : Vector2 | undefined = lavaEntity.state.resetPosition;

    const newLavaEntity = lavaEntity;

    if (!newPositionTouchesWall) {
        newLavaEntity.position = newPosition;
    } else if (resetPosition) {
        newLavaEntity.position = resetPosition;
    } else {
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
function collide(actor: Actor, gameState : GameState) {
    return GameState_Utils.createGameState(gameState.level, "lost");
}


export { create }
