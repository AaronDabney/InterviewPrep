import { Vec } from './vector.js';
import { levelChars } from './levelChars.js';

class Level {
    constructor(plan) {
        let rows = plan.trim().split("\n").map( l => [...l]);
        this.height = rows.length;
        this.width = rows[0].length;
        this.startActors = [];


        this.row = rows.map((row, y) => {
            return row.map((ch, x) => {
                let type = levelChars[ch];
                if (typeof type != 'string') {
                    let pos = new Vec(x, y);
                    this.startActors.push(type.create(pos, ch));
                    type = 'empty';
                }
                return type;
            });
        });
    }
}

export { Level }
