import { PictureCanvas } from "./canvas_utils";
import * as Canvas_Utils from "./canvas_utils";
import { elt } from "./helper_utils";

export interface PixelEditor {
    state: any;
    canvas: PictureCanvas;
    controls?: any;
    dom: HTMLElement;
}



function create(state: any, config: any) {
    let { tools, controlMap, dispatch } = config;

    console.log(state);

    let canvas = Canvas_Utils.create(state.picture, (pos: any) => {
        let tool = tools[state.tool];
        let onMove = tool(pos, state, dispatch);
        if (onMove) {
            return (pos: any)=> onMove(pos, state);
        }
    });

    let controls = controlMap.map((control: Function) => () => control(state, config));//{new Control(state, config);});

    let dom = elt("div", {}, canvas.dom, elt("br"),
                   ...controlMap.reduce(
                     (a: any, c: any) => a.concat(" ", c.dom), []));
    
    return {
        state: state,
        canvas: canvas,
        controls: controls,
        dom: dom,
    }

}


function syncState(pixelEditor: PixelEditor, state: any) {
    pixelEditor.state = state;
    pixelEditor.canvas = state.picture;
    for (let ctrl of pixelEditor.controls) {
        console.log(ctrl)
        ctrl.syncState(ctrl, state);
    }
}

export {create, syncState}
