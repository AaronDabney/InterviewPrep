import { validHexString } from "./helper_utils";

export interface Pixel {
    x: number;
    y: number;
    color: string;
}

export interface Picture {
    width: number;
    height: number;
    pixels: Array<Pixel>;
}

function createEmpty(width: number, height: number, color: string) {
    if (!validHexString) {
        throw "Color invalid. Failure of this shouldn't throw in final app";
    }

    const pixels = new Array(width * height);

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            pixels[x + y * width] = createPixel(x, y, color)
        }
    }

   // console.log(pixels)

    return {
        width: width,
        height: height,
        pixels: pixels,
    }
}

function getPixelColor(x: number, y: number, picture: Picture) : string {
    return picture.pixels[x + y * picture.width].color;
}

function createPixel(x: number, y: number, color: string) {
    return {
        x: x,
        y: y,
        color: color,
    }
}

function draw(pixelUpdates: Array<Pixel>, picture: Picture): Picture {
    let newPixels = picture.pixels.slice();

    for (let updatedPixel of pixelUpdates) {
        let index = updatedPixel.x + updatedPixel.y * picture.width;
        newPixels[index] = updatedPixel;
    }

    return {
        width: picture.width,
        height: picture.height,
        pixels: newPixels,
    }
}

function drawPicture(picture: Picture, canvas: HTMLCanvasElement, scale: number) {
    canvas.width = picture.width * scale;
    canvas.height = picture.height * scale;

    let ctx = canvas.getContext("2d");

    for (let y = 0; y < picture.height; y++) {
        for (let x = 0; x < picture.width; x++) {
            ctx.fillStyle = getPixelColor(x, y, picture);
            ctx.fillRect(x * scale, y * scale, scale, scale);
        }   
    }
}


export { createEmpty, getPixelColor, drawPicture, draw }
