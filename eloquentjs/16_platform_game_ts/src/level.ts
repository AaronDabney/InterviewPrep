import { Actor, Level, Vector2 } from "./interfaces";
import * as Lava from './actors/lava'
import * as vector2 from './vector2'

/**
 * Turns a string into a level state object
 * transforms characters into either terrain OR actors
 * 
 * @param plan 
 * @returns 
 */
function planToLevel(plan: string) : Level {
    let rows = plan.trim().split("\n").map(l => l.split(''));
    let height = rows.length;
    let width = rows[0].length;
    let actors : Array<Actor> = [];

    rows = rows.map((row, y) => {
        return row.map((ch : string, x) => {
            if (levelGeometryMap.has(ch)) {
                return levelGeometryMap.get(ch);
            } else if (levelActorMap[ch as keyof typeof levelActorMap]) {
                // need to push full built actors to the actors list here from the level actor map
                let actorType : string | Function = levelActorMap[ch as keyof typeof levelActorMap];
                
                actors.push(actorType(vector2.create(x, y)))

                return 'empty';
            } else {
                throw "invalid level character"
            }

        });
    });

    return {
        rows: rows,
        height: height,
        width: width,
        actors: actors
    }
}

// const levelGeometryMap = {
//     ".": "empty", 
//     "#": "wall", 
//     "+": "lava",
// };

const levelGeometryMap = new Map([
    [".", "empty"],
    ["#", "wall"],
    ["+", "lava"]
])

const levelActorMap = {
    // "@": "player",
    // "o": "coin",
    "=": (position : Vector2) => Lava.create(position, 'sliding'),
    "|": (position : Vector2) => Lava.create(position, 'bouncing'),
    "v": (position : Vector2) => Lava.create(position, 'dropping')
}


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
