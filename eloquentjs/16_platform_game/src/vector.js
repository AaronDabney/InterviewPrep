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

    dot(input) {
        return this.x * input.x + this.y * input.y;
    }

    normalized() {
        return new Vec(this.x / this.length, this.y / this.length);
    }

    get length() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
}

export { Vec }