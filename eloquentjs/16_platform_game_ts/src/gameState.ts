import { GameState, Level, Actor } from "./interfaces";
import { touches } from "./level";

function createGameState(level: Level, actors : Array<Actor> = [], status: string = 'playing') : GameState {
    return {
        level: level,
        actors: actors,
        status: 'status'
    }
}

function getPlayerFromGameState(gameState: GameState) {
    return gameState.actors.find(actor => actor.type === "player");
}

function updateState(gameState : GameState, deltaTime : number, controls : Object) {
    const actors = gameState.actors.map(actor => actor.update(actor, deltaTime, gameState, controls));
    console.log(actors)
    let newState = createGameState(gameState.level, actors, gameState.status)

    if (newState.status !== "playing") {
        return newState;
    }

    const player = getPlayerFromGameState(newState);

    // let playerTouchingLava = touches(gameState.level, player.position, player.size, "lava");
    
    // if (playerTouchingLava) {
    //    // return new State(this.level, actors, "lost");
    //     return initializeGameState(this.level, actors, 'lost');
    // }

    for (let actor of actors) {
        if (actor !== player && overlap(actor, player)) {
            //newState = actor.collide(newState);
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

export { createGameState, updateState } 
