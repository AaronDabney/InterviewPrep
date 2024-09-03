"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.planToLevel = planToLevel;
exports.touches = touches;
var Lava = require("./actors/lava");
var Coin = require("./actors/coin");
var Player = require("./actors/player");
var vector2 = require("./vector2");
/**
 * Turns a string into a level state object
 * transforms characters into either terrain OR actors
 *
 * @param plan
 * @returns
 */
function planToLevel(plan) {
    var rows = plan.trim().split("\n").map(function (l) { return l.split(''); });
    var height = rows.length;
    var width = rows[0].length;
    var actors = [];
    rows = rows.map(function (row, y) {
        return row.map(function (ch, x) {
            if (levelGeometryMap.has(ch)) {
                return levelGeometryMap.get(ch);
            }
            else if (levelActorMap[ch]) {
                var actorType = levelActorMap[ch];
                actors.push(actorType(vector2.create(x, y)));
                return 'empty';
            }
            else {
                throw "invalid level character: ".concat(ch.charCodeAt(0), " lol");
            }
        });
    });
    return {
        rows: rows,
        height: height,
        width: width,
        actors: actors
    };
}
// const levelGeometryMap = {
//     ".": "empty", 
//     "#": "wall", 
//     "+": "lava",
// };
var levelGeometryMap = new Map([
    [".", "empty"],
    ["#", "wall"],
    ["+", "lava"]
]);
var levelActorMap = {
    "@": function (position) { return Player.create(position); },
    "o": function (position) { return Coin.create(position); },
    "=": function (position) { return Lava.create(position, 'sliding'); },
    "|": function (position) { return Lava.create(position, 'bouncing'); },
    "v": function (position) { return Lava.create(position, 'dropping'); }
};
function touches(level, pos, size, type) {
    var xStart = Math.floor(pos.x);
    var xEnd = Math.ceil(pos.x + size.x);
    var yStart = Math.floor(pos.y);
    var yEnd = Math.ceil(pos.y + size.y);
    for (var y = yStart; y < yEnd; y++) {
        for (var x = xStart; x < xEnd; x++) {
            var isOutside = x < 0 || x >= level.width || y < 0 || y >= level.height;
            var here = isOutside ? "wall" : level.rows[y][x];
            if (here === type) {
                return true;
            }
        }
    }
    return false;
}
