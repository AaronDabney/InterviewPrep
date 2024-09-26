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
        let drawn = {x, y, color: state.color}
        dispatch({picture: Picture_Utils.updatePicturePixels([drawn], state.picture)})
    }

    drawPixel(pos, state);

    return drawPixel;
}

function rectangle(start: Vector2, state: PixelEditorState, dispatch: Function) {
    function drawRectangle(position: Vector2) {
        let xStart = Math.min(start.x, position.x);
        let yStart = Math.min(start.y, position.y);
        let xEnd = Math.max(start.x, position.x);
        let yEnd = Math.max(start.y, position.y);
        let drawn = [];

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
    let targetColor = Picture_Utils.getPixelColor(x, y, state.picture);
    let drawn = [{x, y, color: state.color}];
    let visited = new Set();

    for (let done = 0; done < drawn.length; done++) {
        for (let {dx, dy} of around) {
            let x = drawn[done].x + dx, y = drawn[done].y + dy;

            let inbounds = (x >= 0 && x < state.picture.width && y >= 0 && y < state.picture.height)
            let notVisited = !visited.has(x + ',' + y);
            let matchesTargetColor = Picture_Utils.getPixelColor(x, y, state.picture) === targetColor;

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
