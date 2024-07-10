class Vec {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    plus(input) {
        return new Vec(this.x + input.x, this.y + input.y)
    }

    minus(input) {
        return new Vec(this.x - input.x, this.y - input.y)
    }

    times(input) {
        return new Vec(this.x * input, this.y * input);
    }

    dot(input) {
        return this.x * input.x + this.y * input.y;
    }

    normalized() {
        return new Vec(this.x / this.length, this.y / this.length);
    }

    lerp(input, t) {
        t = Math.max(t, 0);
        t = Math.min(t, 1);

        return new Vec(this.x * (1 - t) + input.x * t, this.y * (1 - t) + input.y * t)
    }

    get length() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
}

export { Vec }
