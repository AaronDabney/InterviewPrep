"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.planToLevel = planToLevel;
exports.touches = touches;
var Vector_Utils = require("./vector_utils");
var Lava = require("./actors/lava");
var Coin = require("./actors/coin");
var Player = require("./actors/player");
/**
 * Builds level object from string
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
            var levelGeometryMapping = levelGeometryMap[ch];
            var levelActorMapping = levelActorMap[ch];
            if (levelGeometryMapping) {
                return levelGeometryMapping;
            }
            if (levelActorMapping) {
                var actorType = levelActorMapping;
                actors.push(actorType(Vector_Utils.create(x, y)));
                return 'empty';
            }
            throw "invalid level character";
        });
    });
    return {
        rows: rows,
        height: height,
        width: width,
        actors: actors
    };
}
var levelGeometryMap = {
    ".": "empty",
    "#": "wall",
    "+": "lava"
};
var levelActorMap = {
    "@": function (position) { return Player.create(position); },
    "o": function (position) { return Coin.create(position); },
    "=": function (position) { return Lava.create(position, 'sliding'); },
    "|": function (position) { return Lava.create(position, 'bouncing'); },
    "v": function (position) { return Lava.create(position, 'dropping'); }
};
/**
 * Checks if something of given position and size intersects a static level feature of given type
 * If point being evaluated is outside boundary of defined level geometry it is evaluated as a 'wall'
 * @param level
 * @param pos
 * @param size
 * @param type
 * @returns
 */
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
