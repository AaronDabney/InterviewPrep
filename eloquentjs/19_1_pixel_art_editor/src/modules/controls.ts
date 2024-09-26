import { elt } from './helper'
import { drawPicture } from './pictureCanvas'
import { draw } from './tools';
import { PixelEditorState, PixelEditorComponentConfig } from './pixelEditor';

function createToolSelect({state, tools, dispatch}: PixelEditorComponentConfig) {
    let toolOptionFromToolID = ((toolID: string) => elt("option", {selected: toolID === state.activeToolID, innerText: toolID}));

    let toolOptions = Array.from(tools.keys()).map(toolID => toolOptionFromToolID(toolID));

    let select = <HTMLInputElement>elt("select", {
        onchange: () => {
            dispatch({activeToolID: select.value})
        }
    }, ...toolOptions);

    return {
        dom: elt("label", null, "Tool: ", select),
        syncState: (state: PixelEditorState) => select.value = state.activeToolID
    }
}

function createColorSelect({state, dispatch}: PixelEditorComponentConfig) {
    let input = elt("input", {
        type: "color",
        value: state.color
    });

    input.onchange = () => dispatch({color: (<HTMLInputElement>input).value});

    let dom = elt("label", null, "Color: ", input);

    return {
        dom: dom,
        syncState: (state: PixelEditorState) => (<HTMLInputElement>input).value = state.color
    }
}


function createSaveButton({state}: PixelEditorComponentConfig) {
    let dom = elt("button", {
        onclick: () => save(),
        innerText: "Save"
    });

    let picture = state.picture;

    function save() {
        let canvas = document.createElement("canvas");
        drawPicture(picture, canvas, 1);

        let link = elt("a", {
            href: canvas.toDataURL(),
            download: "pixelart.png"
        });

        document.body.appendChild(link);
        link.click();
        link.remove();
    }

    let syncState = (state: PixelEditorState) => picture = state.picture;

    return {
        dom: dom,
        picture: picture,
        syncState: syncState
    }
}


function createLoadButton({dispatch}: PixelEditorComponentConfig) {
    let dom = elt("button", {
        onclick: () => startLoad(dispatch),
        innerText: "Load"
    });

    function startLoad(dispatch: Function) {
        let input = elt("input", {
            type: "file",
            onchange: () => finishLoad((<any>input).files[0], dispatch)
        });
        
        document.body.appendChild(input);
        input.click();
        input.remove();
    }

    function finishLoad(file: File, dispatch: Function) {
        if (file === null) {
            return;
        }

        let reader = new FileReader();

        reader.addEventListener("load", () => {
            let image = elt("img" , {
                onload: () => dispatch({picture: pictureFromImage(<HTMLImageElement>image)}),
                src: reader.result
            });
        });

        reader.readAsDataURL(file);
    }

    function pictureFromImage(image: HTMLImageElement) {
        let width = Math.min(100, image.width);
        let height = Math.min(100, image.height);
        
        let canvas = <HTMLCanvasElement>elt("canvas", {width, height});
        let ctx = canvas.getContext("2d");
        ctx.drawImage(image, 0, 0);

        let pixelColors = [];

        let { data } = ctx.getImageData(0, 0, width, height);
        
        function hex(n: number) {
            return n.toString(16).padStart(2, "0");
        }

        for (let i = 0; i < data.length; i += 4) {
            let [r, g, b] = data.slice(i, i + 3);
            pixelColors.push('#' + hex(r) + hex(g) + hex(b))
        }

        return {
            width: width,
            height: height,
            pixelColors: pixelColors
        }
    }

    return {
        dom: dom,
    }
}

function createUndoButton({state, dispatch}: PixelEditorComponentConfig) {
    let dom = <HTMLButtonElement>elt("button", {
        onclick: () => {dispatch({undo: true})},
        disabled: state.done.length === 0
    }, "Undo")


    let syncState = (state: PixelEditorState) => {
        dom.disabled = state.done.length === 0;
    }

    return {
        dom: dom,
        syncState: syncState
    }
}


export { createToolSelect, createColorSelect, createSaveButton, createLoadButton, createUndoButton }
