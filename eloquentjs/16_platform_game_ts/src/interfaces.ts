interface Vector2 {
    x: number;
    y: number;
}

interface Actor {
    position: Vector2;
    speed?: Vector2;
    size: Vector2;
    type: string;
    [key: string]: any; 
    update: Function;
    collide?: Function;
}

interface GameState {
    level: Level;
    status: string;
}
interface DisplayState {
    scale: number;
    dom: HTMLElement;
    actorLayer: HTMLElement;
}

interface Level {
    rows: Array<Array<string>>;
    height: number;
    width: number;
    actors: Array<Actor>;
}

interface CommandData {
    left?: boolean,
    right?: boolean,
    jump?: boolean,
}


export { Vector2, Actor, GameState, DisplayState, Level, CommandData }
