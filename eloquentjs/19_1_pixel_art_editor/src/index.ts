import * as PixelEditor_Utils from './modules/pixelEditor'
import * as Picture_Utils from './modules/picture'
import { draw, rectangle, fill, pick } from './modules/tools'
import { createToolSelect, createColorSelect, createSaveButton, createLoadButton, createUndoButton } from './modules/controls'

const toolMap = new Map([
    ['draw', draw],
    ['rectangle', rectangle],
    ['fill', fill],
    ['pick', pick]
]);

const controlInitializers = [
    createToolSelect,
    createColorSelect,
    createSaveButton,
    createLoadButton,
    createUndoButton
];

const startState: PixelEditor_Utils.PixelEditorState = {
    activeToolID: 'draw',
    color: '#000000',
    picture: Picture_Utils.createEmpty(60, 60, '#ffffff'), // cyan
    done: [],
    doneAt: 0
};

const app = <Node>PixelEditor_Utils.create(startState, toolMap, controlInitializers, 10);

document.getElementById("pixelEditorApp").appendChild(app);
