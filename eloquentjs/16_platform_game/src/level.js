import { Vec } from './vector.js';
import { Player, Lava, Coin } from "./actors.js";

class Level {
    constructor(plan) {
        let rows = plan.trim().split("\n").map( l => [...l]);
        this.height = rows.length;
        this.width = rows[0].length;
        this.startActors = [];
        
        this.rows = rows.map((row, y) => {
            return row.map((ch, x) => {
                let type = levelChars[ch];
                if (typeof type !== 'string') {
                    let pos = new Vec(x, y);
                    this.startActors.push(type.create(pos, ch));
                    type = 'empty';
                }
                return type;
            });
        });
    }

    touches(pos, size, type) {
        const xStart = Math.floor(pos.x);
        const xEnd = Math.ceil(pos.x + size.x);
        const yStart = Math.floor(pos.y);
        const yEnd = Math.ceil(pos.y + size.y);
      
        for (let y = yStart; y < yEnd; y++) {
            for (let x = xStart; x < xEnd; x++) {
                const isOutside = x < 0 || x >= this.width || y < 0 || y >= this.height;
                const here = isOutside ? "wall" : this.rows[y][x];
                
                if (here === type) {
                    return true;
                }
            }
        }

        return false;
    }
}


const levelChars = {
    ".": "empty", 
    "#": "wall", 
    "+": "lava",
    "@": Player, 
    "o": Coin,
    "=": Lava, 
    "|": Lava, 
    "v": Lava
};

export { Level, levelChars }
