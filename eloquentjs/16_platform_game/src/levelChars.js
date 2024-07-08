import { Player, Lava, Coin } from "./actors.js";

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

export { levelChars }
