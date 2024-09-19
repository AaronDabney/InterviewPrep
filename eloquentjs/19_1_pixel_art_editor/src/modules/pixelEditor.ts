import { Pixel } from "../legacy/modules/pixels";
import { HexColor, Picture } from "./picture";

import * as Picture_Utils from './picture'
import *  as PictureCanvas_Utils from './pictureCanvas'

export interface PixelEditor {
    picture: Picture
    activeToolID: string,
    color: HexColor
    canvas?: HTMLElement;
    controls?: Array<HTMLElement>;
    dom?: HTMLElement;
}

function create(): PixelEditor {

    let picture = Picture_Utils.createEmpty(30, 60, '#ffaaff');
    let activeToolID = 'draw';
    let color = '#aabb66'

    let subState: PixelEditor = {
        picture: picture,
        activeToolID: activeToolID,
        color: <HexColor>color,
    }

    let canvas = PictureCanvas_Utils.create(picture, 
        pos => {
            //let tool = tools[activeToolID];
            let onMove = tool(pos, subState, dispatch);
        }
    )
}