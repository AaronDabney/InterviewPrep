import { Actor, DisplayState, GameState, Level, Vector2 } from "./interfaces";
import { getPlayerFromGameState } from "./gameState";
import * as  vector2 from "./vector2";

function displaySync(gameState : GameState, displayState : DisplayState) {
    if (displayState.actorLayer) {
        displayState.actorLayer.remove();
    }

    let actorLayer = drawActors(gameState.level.actors, displayState.scale);

    displayState.dom.appendChild(actorLayer);

    displayState.dom.className = `game ${gameState.status}`;

    scrollPlayerIntoView(gameState, displayState);



    return {
        scale: displayState.scale,
        dom: displayState.dom,
        actorLayer: actorLayer
    }

}


function scrollPlayerIntoView(gameState : GameState, displayState: DisplayState) {

    let dom = displayState.dom;

    let width = dom.clientWidth;
    let height = dom.clientHeight;

    let margin = width / 3;

    let left = dom.scrollLeft;
    let right = left + width;
    let top = dom.scrollTop;
    let bottom = top + height;

    let player: Actor = getPlayerFromGameState(gameState);

    let playerDisplayOffset = vector2.mult(player.size, 0.5);

    let center : Vector2 = vector2.mult(vector2.add(player.position, playerDisplayOffset), displayState.scale);

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

function clearGameDOM(displayState : DisplayState) {
    displayState.dom.remove();
}


/**
 * Builds game DOM containing static level geomertry, attaches to target element, and returns reference to dom
 * @param level 
 * @returns 
 */
function createDisplayState(level : Level) : DisplayState {

    
   let targetElement = document.body;
   
    while(targetElement.firstChild) { //reset display
        targetElement.removeChild(targetElement.lastChild)
    }

    let scale = 20;

    let dom = buildNode("div", [['class', 'game']], drawGrid(level, scale));
    let actorLayer =  drawActors(level.actors, scale);
    targetElement.appendChild(dom)

    
    return {
        scale: scale,
        dom: dom,
        actorLayer: actorLayer
    };
}

function buildNode(name : string, attributes : Array<Array<string>>, ...children : Array<Node>) {
    const dom = document.createElement(name);

    for (let [key, value] of attributes) {
        dom.setAttribute(key, value);
    }

    for (let child of children) {
        dom.appendChild(child);
    }

    return dom;
}


function drawGrid(level : Level, scale : number) {
    let backdropAttributes = [['class', "background"], ['style', `width: ${level.width * scale}px`]];
    let rowAttributes = [[`style`,`height: ${scale}px`]];

    return buildNode("table", backdropAttributes,
        ...level.rows.map(row => buildNode("tr", rowAttributes,
        ...row.map(type => buildNode("td", [['class', type]])))
    ));
}


function drawActors(actors : Array<Actor>, scale : number) {
    
    let output = buildNode("div", [['class','actor-layer']], ...actors.map(actor => {
        const rect = buildNode("div", [[`class`, `actor ${actor.type}`]]);

        rect.style.width = `${actor.size.x * scale}px`;
        rect.style.height = `${actor.size.y * scale}px`;
        rect.style.left = `${actor.position.x * scale}px`;
        rect.style.top = `${actor.position.y * scale}px`;

        return rect;
    }));


    return output;
}

export { displaySync, createDisplayState, clearGameDOM}
