import { Actor, Level, Vector2 } from "./interfaces";
import * as Vector_Utils from './vector_utils';
import * as Lava from './actors/lava';
import * as Coin from './actors/coin';
import * as Player from './actors/player';


/**
 * Builds level object from string
 * @param plan 
 * @returns 
 */
function planToLevel(plan: string) : Level {
    let rows = plan.trim().split("\n").map(l => l.split(''));
    const height = rows.length;
    const width = rows[0].length;
    const actors : Array<Actor> = [];

    rows = rows.map((row, y) => {
        return row.map((ch : string, x) => {
            const levelGeometryMapping = levelGeometryMap[ch as keyof typeof levelGeometryMap];
            const levelActorMapping = levelActorMap[ch as keyof typeof levelActorMap];

            if (levelGeometryMapping) {
                return levelGeometryMapping;
            }

            if (levelActorMapping) {
                const actorType : string | Function = levelActorMapping;
                actors.push(actorType(Vector_Utils.create(x, y)))

                return 'empty';
            }

            throw `invalid level character`
        });
    });

    return {
        rows: rows,
        height: height,
        width: width,
        actors: actors
    }
}

const levelGeometryMap = {
    ".": "empty",
    "#": "wall",
    "+": "lava"
}

const levelActorMap = {
    "@": (position : Vector2) => Player.create(position),
    "o": (position : Vector2) => Coin.create(position),
    "=": (position : Vector2) => Lava.create(position, 'sliding'),
    "|": (position : Vector2) => Lava.create(position, 'bouncing'),
    "v": (position : Vector2) => Lava.create(position, 'dropping')
}

/**
 * Checks if something of given position and size intersects a static level feature of given type
 * If point being evaluated is outside boundary of defined level geometry it is evaluated as a 'wall'
 * @param level 
 * @param pos 
 * @param size 
 * @param type 
 * @returns 
 */
function touches(level: Level, pos : Vector2, size : Vector2, type : string) {
    const xStart = Math.floor(pos.x);
    const xEnd = Math.ceil(pos.x + size.x);
    const yStart = Math.floor(pos.y);
    const yEnd = Math.ceil(pos.y + size.y);

    for (let y = yStart; y < yEnd; y++) {
        for (let x = xStart; x < xEnd; x++) {
            const isOutside = x < 0 || x >= level.width || y < 0 || y >= level.height;
            const here = isOutside ? "wall" : level.rows[y][x];

            if (here === type) {
                return true;
            }
        }
    }
    
    return false
}


export { planToLevel, touches }
