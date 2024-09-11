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
        return new Vec(this.x/this.length, this.y/this.length);
    }

    get length() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
}

let bob = new Vec(5, 5);
let sal = new Vec(8, -4);
let tim = new Vec(-2, 2);

console.log("\nVector friends");
console.log("bob: " + JSON.stringify(bob));
console.log("sal: " + JSON.stringify(sal));
console.log("tim: " + JSON.stringify(tim));

console.log("\nTesting plus");
console.log("bob.plus(sal) = " + JSON.stringify(bob.plus(sal)))

console.log("\nTesting minus");
console.log("bob.minus(tim) = " + JSON.stringify(bob.minus(tim)));

console.log("\nTesting dot");
console.log("sal.dot(tim) = " + JSON.stringify(sal.dot(tim)));

console.log("\nTesting normalize");
console.log("sal.normalized() = " + JSON.stringify(sal.normalized()));
console.log("sal.normalized().length = " + JSON.stringify(sal.normalized().length));

console.log("\nTesting length");
console.log("tim.length = " + JSON.stringify(tim.length));
