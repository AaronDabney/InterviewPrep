export type HexColor = `#${string}`;

export interface Picture {
    width: number;
    height: number;
    pixelColors: Array<string>;
}

function createEmpty(width: number, height: number, color: HexColor): Picture {
    const pixelColors: Array<HexColor> = new Array(width * height).fill(color);

    return {
        width: width,
        height: height,
        pixelColors: pixelColors
    }
}

export { createEmpty }
