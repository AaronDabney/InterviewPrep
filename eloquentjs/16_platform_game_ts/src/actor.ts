import { Vector2 } from "./vector_utils"

export interface Actor {
    position: Vector2;
    speed?: Vector2;
    size: Vector2;
    type: string;
    [key: string]: any; 
    update: Function;
    collide?: Function;
}
