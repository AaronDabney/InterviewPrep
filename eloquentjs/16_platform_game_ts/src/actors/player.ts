import { Actor, Level, Vector2, GameState, CommandData } from "../interfaces";
import * as vector2 from '../vector2'
import * as level from "../level";

import { createGameState } from "../gameState";

function create(position : Vector2) : Actor {

    return {
        position: vector2.add(position, vector2.create(0, -0.5)),
        size: vector2.create(0.8, 1.5),
        type: 'player',
        state: {
            speed: vector2.create(0, 0),
        },
        start: start,
        update: update,
    }
}



function start() {

}

function update(playerEntity : Actor, deltaTime : number, gameState: GameState, commands : CommandData) {
    const playerXSpeed = 7;
    const gravity = 30;
    const jumpSpeed = 17;


    let xSpeed = (commands.left ? 1 : 0) * -playerXSpeed + (commands.right ? 1 : 0) * playerXSpeed;
    let ySpeed = playerEntity.state.speed.y + deltaTime * gravity;

    const xDelta = vector2.create(xSpeed * deltaTime, 0);
    const yDelta = vector2.create(0, ySpeed * deltaTime);

    let wontCollideWithWall = !level.touches(gameState.level, vector2.add(xDelta, playerEntity.position), playerEntity.size, 'wall');

    if (wontCollideWithWall) {
        playerEntity.position = vector2.add(playerEntity.position, xDelta);
    }

    let wontCollideWithGround = !level.touches(gameState.level, vector2.add(yDelta, playerEntity.position), playerEntity.size, 'wall');


    if (wontCollideWithGround) {
        playerEntity.position = vector2.add(playerEntity.position, yDelta);
    } else if (commands.jump && ySpeed > 0) {
        ySpeed = -jumpSpeed;
    } else {
        ySpeed = 0;
    }

    playerEntity.state.speed = vector2.create(xSpeed, ySpeed);

    return playerEntity;

}

export { create, start, update }
