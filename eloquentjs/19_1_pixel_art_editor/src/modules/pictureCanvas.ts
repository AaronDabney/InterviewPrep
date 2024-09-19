import { Picture } from "./picture";

export interface PictureCanvas {
    dom: HTMLElement;
    picture: Picture;
    syncState: Function;
}

const scale = 10;

function create(picture : Picture, pointerDown: Function) {
    return {
        dom: elt("canvas", {
            onMouseDown: event => mouse(event, pointerDown)
        }),
        picture: picture,
        syncState: (picture: Picture) => {
            if (this.picture === picture) {
                return;
            } else {
                this.picture = picture;
                console.log("Draw Picture here")
            }
        }
    }
}




function mouse(downEvent, onDown) {
    let pictureCanvas = downEvent.currentTarget; //experimental
    if (downEvent.button != 0) return;
    let pos = pointerPosition(downEvent, pictureCanvas.dom);
    let onMove = onDown(pos);
    if (!onMove) return;

    let move = moveEvent => {
      if (moveEvent.buttons == 0) {
        pictureCanvas.dom.removeEventListener("mousemove", move);
      } else {
        let newPos = pointerPosition(moveEvent, pictureCanvas.dom);
        if (newPos.x == pos.x && newPos.y == pos.y) return;
        pos = newPos;
        onMove(newPos);
      }
    };
    pictureCanvas.dom.addEventListener("mousemove", move);
};


function pointerPosition(pos, domNode) {
    let rect = domNode.getBoundingClientRect();
    return {x: Math.floor((pos.clientX - rect.left) / scale),
            y: Math.floor((pos.clientY - rect.top) / scale)};
}



function drawPicture(picture, canvas, scale) {
    canvas.width = picture.width * scale;
    canvas.height = picture.height * scale;
    let cx = canvas.getContext("2d");
  
    for (let y = 0; y < picture.height; y++) {
      for (let x = 0; x < picture.width; x++) {
        cx.fillStyle = picture.pixel(x, y);
        cx.fillRect(x * scale, y * scale, scale, scale);
      }
    }
  }

  export { create }
  