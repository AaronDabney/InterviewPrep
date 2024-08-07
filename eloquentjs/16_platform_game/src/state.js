class State {
    constructor(level, actors, status) {
        this.level = level;
        this.actors = actors;
        this.status = status;
    }

    static start(level) {
        return new State(level, level.startActors, "playing");
    }
    
    get player() {
        return this.actors.find(a => a.type === "player");
    }

    update(deltaTime, keys) {
        const actors = this.actors.map(actor => actor.update(deltaTime, this, keys));

        let newState = new State(this.level, actors, this.status);

        if (newState.status !== "playing") {
            return newState;
        }

        const player = newState.player;
        let playerTouchingLava = this.level.touches(player.pos, player.size, "lava");
        
        if (playerTouchingLava) {
            return new State(this.level, actors, "lost");
        }

        for (let actor of actors) {
            if (actor !== player && overlap(actor, player)) {
                newState = actor.collide(newState);
            }
        }

        return newState;
    }
}


function overlap(actor1, actor2) {
    return actor1.pos.x + actor1.size.x > actor2.pos.x &&
           actor1.pos.x < actor2.pos.x + actor2.size.x &&
           actor1.pos.y + actor1.size.y > actor2.pos.y &&
           actor1.pos.y < actor2.pos.y + actor2.size.y;
}

export { State }
