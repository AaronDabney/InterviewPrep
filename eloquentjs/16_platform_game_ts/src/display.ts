import { Actor, GameState, Level, Vector2 } from "./interfaces";


function standardDisplay(state : GameState) {
    // if (this.actorLayer) {
    //     this.actorLayer.remove();
    // }

    
    //this.actorLayer = drawActors(state.actors, this.scale);
    //this.dom.appendChild(this.actorLayer);
    //this.dom.className = `game ${state.status}`;
    

    let displayedActors = document.getElementsByClassName('actor');
    for (let actor in displayedActors) {
        displayedActors[actor].remove();
    }

    let newActorElements = drawActors(state.actors, 20);

    //this.scrollPlayerIntoView(state);

}


/**
 * Builds game DOM containing static level geomertry, attaches to target element, and returns reference to dom
 * @param level 
 * @returns 
 */
function createGameDisplay(level : Level, targetElement: HTMLElement) : Node {
   
    while(targetElement.firstChild) { //reset display
        targetElement.removeChild(targetElement.lastChild)
    }

    let scale = 20;
    let dom = buildNode("div", [['class', 'game']], drawGrid(level, scale));

    targetElement.appendChild(dom)

    
    return dom;
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
    return buildNode("div", [['class','actor layer']], ...actors.map(actor => {
        const rect = buildNode("div", [[`class`, `actor ${actor.type}`]]);

        rect.style.width = `${actor.size.x * scale}px`;
        rect.style.height = `${actor.size.y * scale}px`;
        rect.style.left = `${actor.position.x * scale}px`;
        rect.style.top = `${actor.position.y * scale}px`;

        return rect;
    }));
}

export { standardDisplay, createGameDisplay }
