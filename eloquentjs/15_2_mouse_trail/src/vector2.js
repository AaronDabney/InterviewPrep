class Vector2 {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    add(input) {
        return new Vector2(this.x + input.x, this.y + input.y)
    }

    sub(input) {
        return new Vector2(this.x - input.x, this.y - input.y)
    }

    mult(input) {
        return new Vector2(this.x * input, this.y * input);
    }

    dot(input) {
        return this.x * input.x + this.y * input.y;
    }

    normalized() {
        return new Vector2(this.x / this.length, this.y / this.length);
    }

    get length() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
}


export { Vector2 }
