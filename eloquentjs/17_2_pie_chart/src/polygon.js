import { Vector2 } from "./vector2.js";

class Polygon {
    constructor(points = [], position = new Vector2()) {
        this.vertices = points;
        this.position = position;
    }

    scale(scalar) {
        for (vertex of this.vertices) {
            vertex *= scalar;
        }
    }

    get worldVertices () {
        return this.vertices.map(el => el.add(this.position));
    }
}

function drawPoly(poly, canvasID) {
    let vertices = poly.worldVertices;

    let canvas = document.getElementById(canvasID);
    let ctx = canvas.getContext("2d");  

    ctx.strokeStyle = 'red';

    ctx.moveTo(vertices[0].x, vertices[0].y);

    for (let i = 1; i < vertices.length + 1; i++) {
        ctx.lineTo(vertices[i % vertices.length].x, vertices[i % vertices.length].y);
    }
}

function isPolygonInPolygon(insidePolygon, outsidePolygon) {

    let polyVertices = insidePolygon.worldVertices;
    
    for (let i = 0; i < polyVertices.length; i++) {
        if (!isPointInPolygon(outsidePolygon, polyVertices[i])) {
            return false;
        }
    }

    return true;
}

function isPointInPolygon(poly, point) {
    let vertices = poly.worldVertices;

    if (vertices.length < 3) {
        throw "This aint no polygon";
    } 
    
    let polyEvals = [];
    for (let i = 0; i < vertices.length; i++) {
        polyEvals.push(evaluateEdge(vertices[i], vertices[(i + 1 ) % vertices.length]));
    }


    return Math.max(...polyEvals) < 0;

    function evaluateEdge(a, b) {
        return a.sub(b).perp().norm().dot(point.sub(b).norm());;
    }
}


export { Polygon, drawPoly, isPolygonInPolygon, isPointInPolygon }
