import { GameState, Level, Actor, CommandData } from "./interfaces";
import { touches } from "./level";

function createGameState(level: Level, status: string = 'playing') : GameState {
    return {
        level: level,
        status: status
    }
}

function getPlayerFromGameState(gameState: GameState) : Actor{
    return gameState.level.actors.find(actor => actor.type === "player");
}

function updateGameState(gameState : GameState, deltaTime : number, commands : CommandData) : GameState {

    let newState = createGameState(gameState.level, gameState.status);

    newState.level.actors = newState.level.actors.map(actor => actor.update(actor, deltaTime, gameState, commands));

    if (newState.status !== "playing") {
        return newState;
    }


    const player = getPlayerFromGameState(newState);

    let playerTouchingLava = touches(newState.level, player.position, player.size, "lava");

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

function overlap(actor1 : Actor, actor2 : Actor) {
    return actor1.position.x + actor1.size.x > actor2.position.x &&
           actor1.position.x < actor2.position.x + actor2.size.x &&
           actor1.position.y + actor1.size.y > actor2.position.y &&
           actor1.position.y < actor2.position.y + actor2.size.y;
}

export { createGameState, updateGameState, getPlayerFromGameState } 
