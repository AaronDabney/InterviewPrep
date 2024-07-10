import { Vec } from "./vector.js";
import { State } from "./state.js";

class Player {
    constructor(pos, speed) {
        this.pos = pos;
        this.speed = speed;
        this.size = new Vec(0.8, 1.5);
    }

    get type() { 
        return "player"; 
    }

    static create(pos) {
        return new Player(pos.plus(new Vec(0, -0.5)), new Vec(0, 0));
    }

    update(deltaTime, state, commands) {
        const playerXSpeed = 7;
        const gravity = 30;
        const jumpSpeed = 17;

        let pos = this.pos;

        let xSpeed = !!commands.left * -playerXSpeed + !!commands.right * playerXSpeed;
        let ySpeed = this.speed.y + deltaTime * gravity;

        const xDelta = new Vec(xSpeed * deltaTime, 0);
        const yDelta = new Vec(0, ySpeed * deltaTime);
    
        let wontCollideWithWall = !state.level.touches(pos.plus(xDelta), this.size, "wall");

        if (wontCollideWithWall) {
            pos = pos.plus(xDelta);
        }

        let wontCollideWithGround = !state.level.touches(pos.plus(yDelta), this.size, "wall");
        
        if (wontCollideWithGround) {
            pos = pos.plus(yDelta);
        } else if (commands.jump && ySpeed > 0) {
            ySpeed = -jumpSpeed;
        } else {
            ySpeed = 0;
        }

        return new Player(pos, new Vec(xSpeed, ySpeed));
    }
}


class Lava {
    constructor(pos, speed, reset) {
        this.pos = pos;
        this.speed = speed;
        this.reset = reset;
        this.size = new Vec(1, 1);
    }

    get type() { 
        return "lava"; 
    }

    static create(pos, ch) {
        if (ch === "=") {
            return new Lava(pos, new Vec(2, 0));
        } else if (ch === "|") {
            return new Lava(pos, new Vec(0, 2));
        } else if (ch === "v") {
            return new Lava(pos, new Vec(0, 3), pos);
        }
    }

    collide (state) {
        return new State(state.level, state.actors, "lost");
    }

    update(deltaTime, state) {
        const newPos = this.pos.plus(this.speed.times(deltaTime));
        const newPositionTouchesWall = state.level.touches(newPos, this.size, "wall") 

        if (!newPositionTouchesWall) {
            return new Lava(newPos, this.speed, this.reset);
        } else if (this.reset) {
            return new Lava(this.reset, this.speed, this.reset);
        } else {
            return new Lava(this.pos, this.speed.times(-1));
        }
    }
}


class Coin {
    constructor(pos, basePos, wobble) {
        this.pos = pos;
        this.basePos = basePos;
        this.wobble = wobble;
        this.size = new Vec(0.6, 0.6);
    }

    get type() { 
        return "coin"; 
    }

    static create(pos) {
        const basePos = pos.plus(new Vec(0.2, 0.1));
        return new Coin(basePos, basePos, Math.random() * Math.PI * 2);
    }

    collide (state) {
        const actorsExcludingSelf = state.actors.filter(a => a !== this);
        const coinsRemaining = actorsExcludingSelf.some(a => a.type === "coin"); 
        const status = coinsRemaining ? state.status : "won";

        return new State(state.level, actorsExcludingSelf, status);
    }

    update(deltaTime) {
        const wobbleSpeed = 8, wobbleDist = 0.07;
        const wobble = this.wobble + deltaTime * wobbleSpeed;
        const wobblePos = Math.sin(wobble) * wobbleDist;
        
        return new Coin(this.basePos.plus(new Vec(0, wobblePos)), this.basePos, wobble);
    }
}

export { Player, Lava, Coin}
