class DOMDisplay {
    constructor(parent, level) {
        this.scale = 20;
        this.dom = buildNode("div", {class: "game"}, drawGrid(level, this.scale));
        this.actorLayer = null;
        
        parent.appendChild(this.dom)
    }

    clear() {
        this.dom.remove();
    }

    syncState(state, deltaTime) {
        if (this.actorLayer) {
            this.actorLayer.remove();
        }
        
        this.actorLayer = drawActors(state.actors, this.scale);
        this.dom.appendChild(this.actorLayer);
        this.dom.className = `game ${state.status}`;
        this.scrollPlayerIntoView(state);
    }

    scrollPlayerIntoView(state) {
        const width = this.dom.clientWidth;
        const height = this.dom.clientHeight;
        const margin = width / 3;

        const left = this.dom.scrollLeft;
        const right = left + width;
        const top = this.dom.scrollTop;
        const bottom = top + height;

        const player = state.player;

        const center = player.pos.plus(player.size.times(0.5)).times(this.scale);

        if (center.x < left + margin) {
            this.dom.scrollLeft = center.x - margin;
        } else if (center.x > right - margin) {
            this.dom.scrollLeft = center.x + margin - width;
        }
        if (center.y < top + margin) {
            this.dom.scrollTop = center.y - margin;
        } else if (center.y > bottom - margin) {
            this.dom.scrollTop = center.y + margin - height;
        }
    }
}


function buildNode(name, attrs, ...children) {
    const dom = document.createElement(name);

    for (let attr of Object.keys(attrs)) {
        dom.setAttribute(attr, attrs[attr]);
    }

    for (let child of children) {
        dom.appendChild(child);
    }

    return dom;
}


function drawGrid(level, scale) {
  return buildNode("table", { class: "background", style: `width: ${level.width * scale}px` },
     ...level.rows.map(row => buildNode("tr", { style: `height: ${scale}px` },
        ...row.map(type => buildNode("td", { class: type })))
  ));
}


function drawActors(actors, scale) {
    return buildNode("div", {}, ...actors.map(actor => {
        const rect = buildNode("div", {class: `actor ${actor.type}`});

        rect.style.width = `${actor.size.x * scale}px`;
        rect.style.height = `${actor.size.y * scale}px`;
        rect.style.left = `${actor.pos.x * scale}px`;
        rect.style.top = `${actor.pos.y * scale}px`;

        return rect;
    }));
}

export { DOMDisplay }
