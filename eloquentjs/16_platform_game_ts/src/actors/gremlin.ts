import { Vector2 } from "../vector_utils";
import { GameState } from "../gameState";
import { Actor } from "../actor";
import { CommandData } from "../controlMapping";

import * as Vector_Utils from '../vector_utils'
import * as Level_Utils from "../level";
import * as GameState_Utils from '../gameState';


function create(position: Vector2) : Actor {
    const offsetPosition = Vector_Utils.add(position, Vector_Utils.create(0, .2));
    const randomSign = (Math.round(Math.random()) * 2) - 1;

    return {
        position: offsetPosition,
        size: Vector_Utils.create(0.8, 0.8),
        type: 'gremlin',
        state: {
            speed: Vector_Utils.create(randomSign, 0),
            originalPosition: offsetPosition,
        },
        collide: collide,
        update: update,
    }
}

function update(gremlinEntity: Actor, deltaTime: number, gameState: GameState, commands: CommandData) {
    const position = gremlinEntity.position;
    const speed = gremlinEntity.state.speed;    

    // Zeroing out the bounce modifer before calculation
    position.y = gremlinEntity.state.originalPosition.y;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
    const xDelta = speed.x * deltaTime;
    const nextPosition = Vector_Utils.add(position, Vector_Utils.create(xDelta, 0));

    const bounceHeight = 0.65;
    const bounceFrequency = 8;
    const bounceOffset = Vector_Utils.create(0, -bounceHeight * Math.abs(Math.sin(position.x * bounceFrequency)))

    const wontCollideWithWall = !Level_Utils.touches(gameState.level, nextPosition, gremlinEntity.size, 'wall');

    if (wontCollideWithWall) {
        gremlinEntity.position = Vector_Utils.add(nextPosition, bounceOffset);
    } else {
        gremlinEntity.state.speed = Vector_Utils.mult(speed, -1);
    }

    return gremlinEntity;
}

function collide(gremlinEntity: Actor, gameState: GameState) {
    const playerEntity = GameState_Utils.getPlayerFromGameState(gameState);

    const playerFeetY = playerEntity.position.y + playerEntity.size.y;
    const gremlinHeadY = gremlinEntity.position.y;

    const distanceThreshold = 0.25;
    const distanceBetweenFeetAndHead = Math.abs(playerFeetY - gremlinHeadY) 

    if (distanceBetweenFeetAndHead < distanceThreshold) {
        const levelActorsWithoutGremlin = gameState.level.actors.filter(actor => actor !== gremlinEntity);
        gameState.level.actors = levelActorsWithoutGremlin;

        return gameState;
    } else {
        return GameState_Utils.createGameState(gameState.level, "lost");
    }
}


export { create }
