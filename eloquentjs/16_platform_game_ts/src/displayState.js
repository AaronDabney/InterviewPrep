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
exports.displaySync = displaySync;
exports.createDisplayState = createDisplayState;
exports.clearGameDOM = clearGameDOM;
var GameState_Utils = require("./gameState");
var Vector_Utils = require("./vector_utils");
/**
 * Updates display state to match gamestate
 * @param gameState
 * @param displayState
 * @returns
 */
function displaySync(gameState, displayState) {
    if (displayState.actorLayer) {
        displayState.actorLayer.remove();
    }
    var actorLayer = drawActors(gameState.level.actors, displayState.scale);
    displayState.dom.appendChild(actorLayer);
    displayState.dom.className = "game ".concat(gameState.status);
    scrollPlayerIntoView(gameState, displayState);
    return {
        scale: displayState.scale,
        dom: displayState.dom,
        actorLayer: actorLayer
    };
}
/**
 * Utilizes dom scrolling to keep player presented in center screen
 * with slack for visual appeal
 * @param gameState
 * @param displayState
 */
function scrollPlayerIntoView(gameState, displayState) {
    var dom = displayState.dom;
    var width = dom.clientWidth;
    var height = dom.clientHeight;
    var margin = width / 3;
    var left = dom.scrollLeft;
    var right = left + width;
    var top = dom.scrollTop;
    var bottom = top + height;
    var player = GameState_Utils.getPlayerFromGameState(gameState);
    var playerDisplayOffset = Vector_Utils.mult(player.size, 0.5);
    var center = Vector_Utils.mult(Vector_Utils.add(player.position, playerDisplayOffset), displayState.scale);
    if (center.x < left + margin) {
        dom.scrollLeft = center.x - margin;
    }
    else if (center.x > right - margin) {
        dom.scrollLeft = center.x + margin - width;
    }
    if (center.y < top + margin) {
        dom.scrollTop = center.y - margin;
    }
    else if (center.y > bottom - margin) {
        dom.scrollTop = center.y + margin - height;
    }
}
/**
 * Removes a dom element and all children.
 * Utilized upon level completion to reset displayState.
 * @param displayState
 */
function clearGameDOM(displayState) {
    displayState.dom.remove();
}
/**
 * Builds game DOM containing static level geomertry, attaches to target element, and returns reference to dom
 * @param level
 * @returns
 */
function createDisplayState(level) {
    var targetElement = document.body;
    while (targetElement.firstChild) {
        targetElement.removeChild(targetElement.lastChild);
    }
    var scale = 20;
    var dom = buildNode("div", [['class', 'game']], drawGrid(level, scale));
    var actorLayer = drawActors(level.actors, scale);
    targetElement.appendChild(dom);
    return {
        scale: scale,
        dom: dom,
        actorLayer: actorLayer
    };
}
/**
 * Builds an html element with specified tagName with specificed attributes.
 * Appends input children.
 * @param name
 * @param attributes
 * @param children
 * @returns
 */
function buildNode(tagName, attributes) {
    var children = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        children[_i - 2] = arguments[_i];
    }
    var dom = document.createElement(tagName);
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
/**
 * Builds DOM representation of static level geometry with table columns and rows
 * @param level
 * @param scale
 * @returns
 */
function drawGrid(level, scale) {
    var backdropAttributes = [['class', "background"], ['style', "width: ".concat(level.width * scale, "px")]];
    var rowAttributes = [["style", "height: ".concat(scale, "px")]];
    return buildNode.apply(void 0, __spreadArray(["table", backdropAttributes], level.rows.map(function (row) { return buildNode.apply(void 0, __spreadArray(["tr", rowAttributes], row.map(function (type) { return buildNode("td", [['class', type]]); }), false)); }), false));
}
/**
 * Populates and returns a div with representations of a levels actors
 * @param actors
 * @param scale
 * @returns
 */
function drawActors(actors, scale) {
    return buildNode.apply(void 0, __spreadArray(["div", [['class', 'actor-layer']]], actors.map(function (actor) {
        var rect = buildNode("div", [["class", "actor ".concat(actor.type)]]);
        rect.style.width = "".concat(actor.size.x * scale, "px");
        rect.style.height = "".concat(actor.size.y * scale, "px");
        rect.style.left = "".concat(actor.position.x * scale, "px");
        rect.style.top = "".concat(actor.position.y * scale, "px");
        return rect;
    }), false));
    ;
}
