"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.standardDisplay = standardDisplay;
exports.createGameDisplay = createGameDisplay;
function standardDisplay(state, deltaTime) {
    // if (this.actorLayer) {
    //     this.actorLayer.remove();
    // }
    //this.actorLayer = drawActors(state.actors, this.scale);
    //this.dom.appendChild(this.actorLayer);
    //this.dom.className = `game ${state.status}`;
    var displayedActors = document.getElementsByClassName('actor');
    for (var actor in displayedActors) {
        displayedActors[actor].remove();
    }
    var newActorElements = drawActors(state.actors, 20);
    //this.scrollPlayerIntoView(state);
}
/**
 * Builds game DOM that contains level geomertry and returns it
 * @param level
 * @returns
 */
function createGameDisplay(level) {
    var scale = 20;
    var dom = buildNode("div", [['class', 'game']], drawGrid(level, scale));
    return dom;
}
function buildNode(name, attributes) {
    var children = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        children[_i - 2] = arguments[_i];
    }
    var dom = document.createElement(name);
    for (var _a = 0, attributes_1 = attributes; _a < attributes_1.length; _a++) {
        var _b = attributes_1[_a], key = _b[0], value = _b[1];
        dom.setAttribute(key, value);
    }
    for (var _c = 0, children_1 = children; _c < children_1.length; _c++) {
        var child = children_1[_c];
        dom.appendChild(child);
    }
    return dom;
}
function drawGrid(level, scale) {
    var backdropAttributes = [['class', "background"], ['style', "width: ".concat(level.width * scale, "px")]];
    var rowAttributes = [["style", "height: ".concat(scale, "px")]];
    return buildNode.apply(void 0, __spreadArray(["table", backdropAttributes], level.rows.map(function (row) { return buildNode.apply(void 0, __spreadArray(["tr", rowAttributes], row.map(function (type) { return buildNode("td", [['class', type]]); }), false)); }), false));
}
function drawActors(actors, scale) {
    return buildNode.apply(void 0, __spreadArray(["div", [['class', 'actor layer']]], actors.map(function (actor) {
        var rect = buildNode("div", [["class", "actor ".concat(actor.type)]]);
        rect.style.width = "".concat(actor.size.x * scale, "px");
        rect.style.height = "".concat(actor.size.y * scale, "px");
        rect.style.left = "".concat(actor.position.x * scale, "px");
        rect.style.top = "".concat(actor.position.y * scale, "px");
        return rect;
    }), false));
}
