import { Actor } from "./actor";
import { Level } from "./level";
import { CommandData } from "./controlMapping";

import * as Level_Utils from "./level";

export interface GameState {
    level: Level;
    status: string;
}

/**
 * Convenient for creating gameState objects within a single line
 * @param level 
 * @param status 
 * @returns 
 */
function createGameState(level: Level, status: string = 'playing'): GameState {
    return {
        level: level,
        status: status
    }
}

/**
 * Generally useful for scene actors to have an easy reference to the player entity
 * Does not support multiple players
 * @param gameState 
 * @returns 
 */
function getPlayerFromGameState(gameState: GameState): Actor{
    return gameState.level.actors.find(actor => actor.type === "player");
}

/**
 * Higher level management of actor updates/collisions
 * Directly handles player + static lava collisions
 * @param gameState 
 * @param deltaTime 
 * @param commands 
 * @returns 
 */
function updateGameState(gameState: GameState, deltaTime: number, commands: CommandData): GameState {
    let newState = createGameState(gameState.level, gameState.status);

    newState.level.actors = newState.level.actors.map(actor => actor.update(actor, deltaTime, gameState, commands));

    if (newState.status !== "playing") {
        return newState;
    }

    const player = getPlayerFromGameState(newState);

    const playerTouchingLava = Level_Utils.touches(newState.level, player.position, player.size, "lava");

    if (playerTouchingLava) {
        return createGameState(newState.level, 'lost');
    }

    for (let actor of newState.level.actors) {
        if (actor !== player && overlap(actor, player)) {
            newState = actor.collide(actor, newState);
        }
    }

    return newState;
}

/**
 * Detects collisions between two actors
 * Assumes actors are rectangular
 * @param actor1 
 * @param actor2 
 * @returns 
 */
function overlap(actor1: Actor, actor2: Actor) {
    return actor1.position.x + actor1.size.x > actor2.position.x &&
           actor1.position.x < actor2.position.x + actor2.size.x &&
           actor1.position.y + actor1.size.y > actor2.position.y &&
           actor1.position.y < actor2.position.y + actor2.size.y;
}


export { createGameState, updateGameState, getPlayerFromGameState } 
