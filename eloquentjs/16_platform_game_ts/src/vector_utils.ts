import { Vector2 } from "./interfaces";


function add(a: Vector2, b: Vector2) : Vector2 {
    return { x: a.x + b.x, y: a.y + b.y };
}

function sub(a: Vector2, b: Vector2) : Vector2 {
    return { x: a.x - b.x, y: a.y - b.y };
}

function mult(a: Vector2, scalar: number) : Vector2 {
    return { x: a.x * scalar, y: a.y * scalar };
}

function magnitude(a: Vector2) : number{
    return Math.sqrt(a.x * a.x + a.y * a.y);
}

function normalize(a: Vector2) : Vector2 {
    const length = magnitude(a);

    if (length === 0) {
        throw "Cannot normalize the zero vector."
    }

    return { x: a.x / length, y: a.y / length };
}

function dot(a: Vector2, b: Vector2) : number {
    return a.x * b.x + a.y * b.y;
}

function zero() : Vector2 {
    return { x: 0, y: 0 };
}

function perp(a: Vector2) : Vector2{
    return { x: a.y, y: -a.x };
}

function create(x : number, y: number) : Vector2 {
    return { x: x, y: y};
}


export { add, sub, mult, magnitude, normalize, dot, zero, perp, create }
