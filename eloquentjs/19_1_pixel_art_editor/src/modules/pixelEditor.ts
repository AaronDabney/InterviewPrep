import { elt, HexColor } from "./helper";
import { Picture } from "./picture";
import * as Picture_Utils from './picture'
import *  as PictureCanvas_Utils from './pictureCanvas'

export interface PixelEditorState {
    activeToolID?: string;
    color?: HexColor;
    picture?: Picture;
    done?: Array<Picture>;
    doneAt?: number;
    undo?: boolean
}

export interface PixelEditorComponentConfig {
    state?: PixelEditorState;
    tools?:  Map<string, Function>;
    dispatch?: Function;
}

function create(state: PixelEditorState, tools: Map<string, Function>, controlInits: Array<Function>, pixelScale: number): Node {
    function dispatch(action: PixelEditorState) {
        state = historyUpdateState(state, action);
        syncState(state);
    }

    let componentConfig: PixelEditorComponentConfig = {
        state,
        tools,
        dispatch,
    }

    let pictureCanvas = PictureCanvas_Utils.create(state.picture, 
        (mouseEvent: MouseEvent) => {
            let tool = tools.get(state.activeToolID);
            let onMove = tool(mouseEvent, state, dispatch);
            if (onMove) {
                return (position: MouseEvent) => onMove(position, state)
            }
        }, 
        pixelScale
    );

    let controls = controlInits.map(createControlComponent => createControlComponent(componentConfig))

    function syncState(state: PixelEditorState) {
        pictureCanvas.syncState(state)
        for (let cntrl of controls) {
            if (cntrl.syncState) {
                cntrl.syncState(state)
            }
        }
    }

    let canvasDOM = pictureCanvas.dom;
    canvasDOM.setAttribute("class", "pixel-editor canvas");

    let controlBarDOM = elt("div", {}, ...controls.map(cntrl => cntrl.dom))
    controlBarDOM.setAttribute("class", "pixel-editor control-bar");

    let pixelEditorDom = elt("div", {
        tabIndex: 0,
    }, controlBarDOM, canvasDOM);
    pixelEditorDom.setAttribute("class", "pixel-editor frame");

    return pixelEditorDom;
}

function historyUpdateState(state: PixelEditorState,  action: PixelEditorState) {
    if (action.undo === true) {
        if (state.done.length === 0) {
            return state;
        }
        return {
            ...state,
            picture: state.done[0],
            done: state.done.slice(1),
            doneAt: 0,
        }
    } else if (action.picture && state.doneAt < Date.now() - 1000) {
        return {
            ...state,
            ...action,
            done: [state.picture, ...state.done],
            doneAt: Date.now()
        }
    } else {
        return {...state, ...action}
    }
}


export { create }
