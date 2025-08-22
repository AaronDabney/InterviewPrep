import * as Picture_Utils from './picture'
import { PixelEditorState } from './pixelEditor';
import { Vector2 } from './vector2';


/**
 * Does a thing, returns a function
 * @param pos 
 * @param state 
 * @param dispatch 
 * @returns 
 */
function draw(pos: Vector2, state: PixelEditorState, dispatch: Function) {
    function drawPixel({x, y}: Vector2, state: PixelEditorState) {
        const drawn = {x, y, color: state.color}
        dispatch({picture: Picture_Utils.updatePicturePixels([drawn], state.picture)})
    }

    drawPixel(pos, state);

    return drawPixel;
}

function rectangle(start: Vector2, state: PixelEditorState, dispatch: Function) {
    function drawRectangle(position: Vector2) {
        const xStart = Math.min(start.x, position.x);
        const yStart = Math.min(start.y, position.y);
        const xEnd = Math.max(start.x, position.x);
        const yEnd = Math.max(start.y, position.y);
        const drawn = [];

        for (let y = yStart; y <= yEnd; y++) {
            for (let x = xStart; x <= xEnd; x++) {
                drawn.push({x, y, color: state.color});
            }
        }

        dispatch({picture: Picture_Utils.updatePicturePixels(drawn, state.picture)})
    }

    drawRectangle(start);
    
    return drawRectangle;
}

const around = [{dx: -1, dy:  0}, {dx:  1, dy: 0},
                {dx:  0, dy: -1}, {dx:  0, dy: 1}]

function fill({x, y}: Vector2, state: PixelEditorState, dispatch: Function) {
    const targetColor = Picture_Utils.getPixelColor(x, y, state.picture);
    const drawn = [{x, y, color: state.color}];
    const visited = new Set();

    for (let done = 0; done < drawn.length; done++) {
        for (let {dx, dy} of around) {
            const x = drawn[done].x + dx, y = drawn[done].y + dy;

            const inbounds = (x >= 0 && x < state.picture.width && y >= 0 && y < state.picture.height)
            const notVisited = !visited.has(x + ',' + y);
            const matchesTargetColor = Picture_Utils.getPixelColor(x, y, state.picture) === targetColor;

            if (inbounds && notVisited && matchesTargetColor) {
                drawn.push({x, y, color: state.color});
                visited.add(x + ',' + y);
            }
        }
    }

    dispatch({picture: Picture_Utils.updatePicturePixels(drawn, state.picture)})
}

function pick(position: Vector2, state: PixelEditorState, dispatch: Function) {
    dispatch({color: Picture_Utils.getPixelColor(position.x, position.y, state.picture)});
}


export { draw, rectangle, fill, pick }
