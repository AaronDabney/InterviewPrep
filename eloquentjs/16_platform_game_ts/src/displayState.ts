import { Actor, DisplayState, GameState, Level, Vector2 } from "./interfaces";
import * as GameState_Utils from './gameState'
import * as  Vector_Utils from "./vector_utils";


/**
 * Updates display state to match gamestate
 * @param gameState 
 * @param displayState 
 * @returns 
 */
function displaySync(gameState : GameState, displayState : DisplayState) : DisplayState {
    if (displayState.actorLayer) {
        displayState.actorLayer.remove();
    }

    const actorLayer = drawActors(gameState.level.actors, displayState.scale);

    displayState.dom.appendChild(actorLayer);

    displayState.dom.className = `game ${gameState.status}`;

    scrollPlayerIntoView(gameState, displayState);

    return {
        scale: displayState.scale,
        dom: displayState.dom,
        actorLayer: actorLayer
    }

}

/**
 * Utilizes dom scrolling to keep player presented in center screen
 * with slack for visual appeal
 * @param gameState 
 * @param displayState 
 */
function scrollPlayerIntoView(gameState : GameState, displayState: DisplayState) {
    const dom = displayState.dom;

    const width = dom.clientWidth;
    const height = dom.clientHeight;

    const margin = width / 3;

    const left = dom.scrollLeft;
    const right = left + width;
    const top = dom.scrollTop;
    const bottom = top + height;

    const player: Actor = GameState_Utils.getPlayerFromGameState(gameState);

    const playerDisplayOffset = Vector_Utils.mult(player.size, 0.5);

    const center : Vector2 = Vector_Utils.mult(Vector_Utils.add(player.position, playerDisplayOffset), displayState.scale);

    if (center.x < left + margin) {
        dom.scrollLeft = center.x - margin;
    } else if ( center.x > right - margin) {
        dom.scrollLeft = center.x + margin - width;
    }
    if (center.y < top + margin) {
        dom.scrollTop = center.y - margin;
    } else if (center.y > bottom - margin) {
        dom.scrollTop = center.y + margin - height;
    }

}

/**
 * Removes a dom element and all children.
 * Utilized upon level completion to reset displayState.
 * @param displayState 
 */
function clearGameDOM(displayState : DisplayState) {
    displayState.dom.remove();
}

/**
 * Builds game DOM containing static level geomertry, attaches to target element, and returns reference to dom
 * @param level 
 * @returns 
 */
function createDisplayState(level : Level) : DisplayState {
    const targetElement = document.body;
   
    while(targetElement.firstChild) {
        targetElement.removeChild(targetElement.lastChild)
    }

    const scale = 20;

    const dom = buildNode("div", [['class', 'game']], drawGrid(level, scale));
    const actorLayer =  drawActors(level.actors, scale);
    targetElement.appendChild(dom)
    
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
function buildNode(tagName : string, attributes : Array<Array<string>>, ...children : Array<Node>) {
    const dom = document.createElement(tagName);

    for (let [key, value] of attributes) {
        dom.setAttribute(key, value);
    }

    for (let child of children) {
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
function drawGrid(level : Level, scale : number) {
    const backdropAttributes = [['class', "background"], ['style', `width: ${level.width * scale}px`]];
    const rowAttributes = [[`style`,`height: ${scale}px`]];

    return buildNode("table", backdropAttributes,
        ...level.rows.map(row => buildNode("tr", rowAttributes,
        ...row.map(type => buildNode("td", [['class', type]])))
    ));
}

/**
 * Populates and returns a div with representations of a levels actors
 * @param actors 
 * @param scale 
 * @returns 
 */
function drawActors(actors : Array<Actor>, scale : number) {
    return buildNode("div", [['class','actor-layer']], ...actors.map(actor => {
        const rect = buildNode("div", [[`class`, `actor ${actor.type}`]]);

        rect.style.width = `${actor.size.x * scale}px`;
        rect.style.height = `${actor.size.y * scale}px`;
        rect.style.left = `${actor.position.x * scale}px`;
        rect.style.top = `${actor.position.y * scale}px`;

        return rect;
    }));;
}


export { displaySync, createDisplayState, clearGameDOM}
