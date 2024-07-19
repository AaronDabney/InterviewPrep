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

export { Polygon }
