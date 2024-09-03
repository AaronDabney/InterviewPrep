import { Actor, GameState, Vector2 } from "../interfaces";
import { createGameState } from "../gameState";
import * as vector2 from "../vector2";
import * as Level from "../level";

function create(position : Vector2, ch : string, resetPosition? : Vector2) {

    let speed = vector2.create(0, 0);

    if (ch === "sliding") {
        speed = vector2.create(2, 0);
    } else if (ch === "bouncing") {
        speed = vector2.create(0, -2);
    } else if (ch === "dropping") {
        resetPosition = position;
        speed = vector2.create(0, 2);
    } else { 
        throw "this aint good lava :("
    }

    return {
        position: position,
        size: vector2.create(1, 1),
        type: 'lava',
        state: {
            speed: speed,
            resetPosition: resetPosition,
        },
        start: start,
        update: update,
        collide: collide,
    }
}

function start() {

}

function update(lavaEntity : Actor, deltaTime : number, state : GameState) {


    let stepVector = vector2.mult(lavaEntity.state.speed, deltaTime);


    const newPosition = vector2.add(lavaEntity.position, stepVector);


    const newPositionTouchesWall = Level.touches(state.level, newPosition, lavaEntity.size, "wall")


    let resetPosition : Vector2 | undefined = lavaEntity.state.resetPosition;


    if (!newPositionTouchesWall) {
        lavaEntity.position = newPosition;
    } else if (resetPosition) {
        lavaEntity.position = resetPosition;
    } else {
        lavaEntity.state.speed = vector2.mult(lavaEntity.state.speed, -1);
    }

    return lavaEntity;
}


function collide(actor: Actor, gameState : GameState) {
    return createGameState(gameState.level, "lost");
}


export { create }
