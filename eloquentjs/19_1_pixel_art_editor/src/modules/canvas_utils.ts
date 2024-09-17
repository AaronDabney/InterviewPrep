import { Picture } from "./picture_utils";
import * as Picture_utils from "./picture_utils";
import { elt } from "./helper_utils";


const scale = 10;

export interface PictureCanvas {
    dom?: HTMLElement;
    picture: Picture;
}


function create(picture: Picture, pointerDown: Function) {
    // More confident than i was..
    let pictureCanvas: PictureCanvas = {
        dom: elt("canvas", {
            onmouseDown: (event: Event) => mouse(event, pointerDown, pictureCanvas)
          }),
          picture: picture
    }
    return pictureCanvas;
}


function mouse(downEvent: any, onDown: any, pictureCanvas: PictureCanvas) {
    if (downEvent.button !== 0) {
        return;
    }

    let pos = pointerPosition(downEvent, pictureCanvas.dom);
    let onMove = onDown(pos);

    if (!onMove) {
        return;
    }

    let move = (moveEvent: MouseEvent) => {
        if (moveEvent.buttons === 0) {
            pictureCanvas.dom.removeEventListener("mousemove", move);
        } else {
            let newPos = pointerPosition(moveEvent, pictureCanvas.dom);
            if (newPos.x === pos.x && newPos.y === pos.y) {
                return;
            }
            pos = newPos;
            onMove(newPos);
        }
    };
    pictureCanvas.dom.addEventListener("mouseMove", move);
}



function pointerPosition(pos: any, domNode: HTMLElement) {
    let rect = domNode.getBoundingClientRect();
    return {
        x: Math.floor((pos.clientX - rect.left) / scale),
        y: Math.floor((pos.clientY - rect.top) / scale),
    }
}

function updatePicture(picture: Picture,  pictureCanvas: PictureCanvas) {
    if (pictureCanvas.picture === picture) {
        return;
    }
    pictureCanvas.picture = picture;
    Picture_utils.drawPicture(pictureCanvas.picture, <HTMLCanvasElement>pictureCanvas.dom, scale);
}


export { create }








