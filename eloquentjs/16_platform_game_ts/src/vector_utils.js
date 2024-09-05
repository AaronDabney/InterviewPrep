"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.add = add;
exports.sub = sub;
exports.mult = mult;
exports.magnitude = magnitude;
exports.normalize = normalize;
exports.dot = dot;
exports.zero = zero;
exports.perp = perp;
exports.create = create;
function add(a, b) {
    return { x: a.x + b.x, y: a.y + b.y };
}
function sub(a, b) {
    return { x: a.x - b.x, y: a.y - b.y };
}
function mult(a, scalar) {
    return { x: a.x * scalar, y: a.y * scalar };
}
function magnitude(a) {
    return Math.sqrt(a.x * a.x + a.y * a.y);
}
function normalize(a) {
    var length = magnitude(a);
    if (length === 0) {
        throw "Cannot normalize the zero vector.";
    }
    return { x: a.x / length, y: a.y / length };
}
function dot(a, b) {
    return a.x * b.x + a.y * b.y;
}
function zero() {
    return { x: 0, y: 0 };
}
function perp(a) {
    return { x: a.y, y: -a.x };
}
function create(x, y) {
    return { x: x, y: y };
}
