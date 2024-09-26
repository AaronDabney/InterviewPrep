import { Picture } from "./picture";
import { elt } from "./helper";
import { getPixelColor } from "./picture";
import { PixelEditorState } from "./pixelEditor";
import { Vector2 } from './vector2'


export interface PictureCanvas {
    dom: HTMLElement;
    picture: Picture;
    syncState: Function;
}

function create(picture : Picture, pointerDown: Function, pixelScale: number) {
    let dom = document.createElement("canvas");

    dom.onmousedown = (event: MouseEvent) => mouse(event, pointerDown, dom, pixelScale);
    
    drawPicture(picture, dom, pixelScale)

    return {
        dom: dom,
        picture: picture,
        syncState: (state: PixelEditorState) => {
            picture = state.picture;
            drawPicture(picture, dom, pixelScale)
        }
    }

}

function drawPicture(picture: Picture, canvas: HTMLCanvasElement, pixelScale: number) {
    canvas.width = picture.width * pixelScale;
    canvas.height = picture.height * pixelScale;
    let ctx = canvas.getContext('2d');
    
    for (let y = 0; y < picture.height; y++) {
        for (let x = 0; x < picture.width; x++) {
            ctx.fillStyle = getPixelColor(x, y, picture);
            ctx.fillRect(x * pixelScale, y * pixelScale, pixelScale, pixelScale)
        }
    }   
}

function mouse(downEvent: MouseEvent, onDown: Function, canvasDOM: HTMLCanvasElement, pixelScale: number) {
    let leftMouseDown = (downEvent.button === 0);

    if (!leftMouseDown) {
        return;
    }

    let position = pointerPosition(downEvent, canvasDOM, pixelScale);
    let onMove = onDown(position);

    if (!onMove) {
        return;
    }

    let move = (moveEvent: MouseEvent) => {
        if (moveEvent.buttons === 0) {
            canvasDOM.removeEventListener("mousemove", move);
        } else {
            let newPosition = pointerPosition(moveEvent, canvasDOM, pixelScale);

            let positionChanged = (newPosition.x !== position.x || newPosition.y !== position.y);

            if (!positionChanged) {
                return;
            }

            position = newPosition;
            onMove(newPosition);
        }
    };

    canvasDOM.addEventListener("mousemove", move)
};


function pointerPosition(mouseEvent: MouseEvent, domNode: HTMLElement, pixelScale: number) {
    let rect = domNode.getBoundingClientRect();
    return {x: Math.floor((mouseEvent.clientX - rect.left) / pixelScale),
            y: Math.floor((mouseEvent.clientY - rect.top) / pixelScale)}
}


export { create, drawPicture }
