import { Actor, GameState, Vector2 } from "../interfaces";
import { createGameState } from "../gameState";
import * as vector2 from "../vector2";
import * as Level from "../level";

function create(position : Vector2, ch : string, resetPosition? : Vector2) {

    let speed = vector2.create(0, 0);

    if (!resetPosition) {
        resetPosition = position;
    }

    if (ch === "sliding") {
        speed = vector2.create(2, 0);
    } else if (ch === "bouncing") {
        speed = vector2.create(0, 2);
    } else if (ch === "dropping") {
        speed = vector2.create(0, 2);
    } else { 
        throw "this aint good lava :("
    }

    console.log("speed" + speed.y)

    return {
        position: position,
        speed: speed,
        size: vector2.create(1, 1),
        type: 'lava',
        state: {
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


    let stepVector = vector2.mult(lavaEntity.speed, deltaTime);


    const newPosition = vector2.add(lavaEntity.position, stepVector);

    console.log(newPosition)

    const newPositionTouchesWall = Level.touches(state.level, newPosition, lavaEntity.size, lavaEntity.type)

    let resetPosition : Vector2 | undefined = lavaEntity.state.resetPosition;

    console.log("Reset position : "  + `${resetPosition.x} | ${resetPosition.y}`)

    if (!newPositionTouchesWall) {

        lavaEntity.position = newPosition;

        return lavaEntity;

    } else if (resetPosition) {

        lavaEntity.position = resetPosition;

        return lavaEntity;

    } else {
        lavaEntity.speed = vector2.mult(lavaEntity.speed, -1);
    }
}


function collide(state : GameState) {
    return createGameState(state.level, state.actors, "lost");
}


export { create }
