interface Vector2 {
    x: number;
    y: number;
}

interface Actor {
    position: Vector2;
    speed: Vector2;
    size: Vector2;
    type: string;
    [key: string] : any; 
    start: Function;
    update: Function;
    collide: Function;
}

interface GameState {
    level: Level;
    actors: Array<Actor>;
    status: string;
}
interface DisplayState {
    scale: number;
    dom: HTMLElement;
    actorElementsLayer: Array<HTMLElement>
}

interface Level {
    rows: Array<Array<string>>;
    height: number;
    width: number;
    actors: Array<Actor>;
}


export { Vector2, Actor, GameState, DisplayState, Level }
