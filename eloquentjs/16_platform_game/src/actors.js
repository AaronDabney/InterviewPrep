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

    update(time, state, keys) {
        const playerXSpeed = 7;
        const gravity = 30;
        const jumpSpeed = 17;
        let xSpeed = 0;

        if (keys.ArrowLeft) {
            xSpeed -= playerXSpeed;
        } 
        if (keys.ArrowRight) {
            xSpeed += playerXSpeed;
        }

        let pos = this.pos;
        let movedX = pos.plus(new Vec(xSpeed * time, 0));

        if (!state.level.touches(movedX, this.size, "wall")) {
            pos = movedX;
        }
      
        let ySpeed = this.speed.y + time * gravity;
        let movedY = pos.plus(new Vec(0, ySpeed * time));

        if (!state.level.touches(movedY, this.size, "wall")) {
            pos = movedY;
        } else if (keys.ArrowUp && ySpeed > 0) {
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
        if (ch == "=") {
            return new Lava(pos, new Vec(2, 0));
        } else if (ch == "|") {
            return new Lava(pos, new Vec(0, 2));
        } else if (ch == "v") {
            return new Lava(pos, new Vec(0, 3), pos);
        }
    }

    collide (state) {
        return new State(state.level, state.actors, "lost");
    }

    update(time, state) {
        let newPos = this.pos.plus(this.speed.times(time));
        if (!state.level.touches(newPos, this.size, "wall")) {
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
        let basePos = pos.plus(new Vec(0.2, 0.1));
        return new Coin(basePos, basePos, Math.random() * Math.PI * 2);
    }

    collide (state) {
        let filtered = state.actors.filter(a => a != this);
        let status = state.status;
        
        if (!filtered.some(a => a.type == "coin")) {
            status = "won";
        }

        return new State(state.level, filtered, status);
    }

    update(time) {
        const wobbleSpeed = 8, wobbleDist = 0.07;
        let wobble = this.wobble + time * wobbleSpeed;
        let wobblePos = Math.sin(wobble) * wobbleDist;
        return new Coin(this.basePos.plus(new Vec(0, wobblePos)), this.basePos, wobble);
    }
}


export { Player, Lava, Coin}
