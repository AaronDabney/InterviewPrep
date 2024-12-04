import { HexColor } from "./helper";


export interface Picture {
    width: number;
    height: number;
    pixelColors: Array<HexColor>;
}

interface Pixel {
    x: number;
    y: number;
    color: HexColor;
}

function createEmpty(width: number, height: number, color: HexColor): Picture {
    return {
        width: width,
        height: height,
        pixelColors: new Array(width * height).fill(color)
    }
}

function getPixelColor(x: number, y: number, picture: Picture) {
    return picture.pixelColors[y * picture.width + x];
}

function updatePicturePixels(pixels: Array<Pixel>, picture: Picture) {
    let copy = picture.pixelColors.slice();

    for (let {x, y, color} of pixels) {
        copy[x + y * picture.width] = color;
    }

    return {
        width: picture.width,
        height: picture.height,
        pixelColors: copy,
    }
}


export { createEmpty, getPixelColor, updatePicturePixels }
