import { Vector2 } from "../vector_utils";
import { GameState } from "../gameState";
import { Actor } from "../actor";
import { CommandData } from "../controlMapping";

import * as Vector_Utils from '../vector_utils'
import * as Level_Utils from "../level";


/**
 * Creates player entity
 * @param position 
 * @returns 
 */
function create(position: Vector2): Actor {
    return {
        position: Vector_Utils.add(position, Vector_Utils.create(0, -0.5)),
        size: Vector_Utils.create(0.8, 1.5),
        type: 'player',
        state: {
            speed: Vector_Utils.create(0, 0),
        },
        update: update,
    }
}

/**
 * Updates the player entity
 * @param playerEntity 
 * @param deltaTime 
 * @param gameState 
 * @param commands 
 * @returns 
 */
function update(playerEntity: Actor, deltaTime: number, gameState: GameState, commands: CommandData) {
    const playerXSpeed = 7;
    const gravity = 30;
    const jumpSpeed = 17;


    let xSpeed = ((commands.left ? -1 : 0) + (commands.right ? 1 : 0)) * playerXSpeed;
    let ySpeed = playerEntity.state.speed.y + deltaTime * gravity;

    const xDelta = Vector_Utils.create(xSpeed * deltaTime, 0);
    const yDelta = Vector_Utils.create(0, ySpeed * deltaTime);

    const wontCollideWithWall = !Level_Utils.touches(gameState.level, Vector_Utils.add(xDelta, playerEntity.position), playerEntity.size, 'wall');

    if (wontCollideWithWall) {
        playerEntity.position = Vector_Utils.add(playerEntity.position, xDelta);
    }

    const wontCollideWithGround = !Level_Utils.touches(gameState.level, Vector_Utils.add(yDelta, playerEntity.position), playerEntity.size, 'wall');

    if (wontCollideWithGround) {
        playerEntity.position = Vector_Utils.add(playerEntity.position, yDelta);
    } else if (commands.jump && ySpeed > 0) {
        ySpeed = -jumpSpeed;
    } else {
        ySpeed = 0;
    }

    playerEntity.state.speed = Vector_Utils.create(xSpeed, ySpeed);

    return playerEntity;

}


export { create }
