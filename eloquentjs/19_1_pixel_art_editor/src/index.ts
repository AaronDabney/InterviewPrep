import { validHexString, elt } from './modules/helper_utils';
import { PixelEditor } from './modules/pixelEditor';
import * as PixelEditor_Utils from './modules/pixelEditor'
import * as Tools from './modules/tools';
import * as Picture_Utils from './modules/picture_utils'
import { ApplicationState } from './modules/applicationState'
import * as ApplicationState_Utils from './modules/applicationState'
import { ToolSelect } from './modules/toolSelect'
import { ColorSelect } from './modules/colorSelect'
import * as ToolSelect__Utils from './modules/toolSelect'
import * as ColorSelect__Utils from './modules/colorSelect'

let canvas = document.getElementById("myCanvas");

console.clear();

let state: ApplicationState = {
    tool: "draw",
    color: "#000000",
    picture: Picture_Utils.createEmpty(60, 30,  "#f0f0f0")//Picture.empty(60, 30, "#f0f0f0")
};

let dispatch =  (action: ApplicationState) => {
    state = ApplicationState_Utils.updateAppState(state, action);
    PixelEditor_Utils.syncState(app, state);
}

let tools = {draw: Tools.draw, rectangle: Tools.rectangle};

let config = {
    tools: tools,
    dispatch: dispatch
};

let toolSelect = ToolSelect__Utils.create(state, config);
let colorSelect = ColorSelect__Utils.create(state, tools);

let app = PixelEditor_Utils.create(state,  {
    tools: tools,
    controlMap: [toolSelect, colorSelect],
    dispatch: dispatch,
});



document.querySelector("div").appendChild(app.dom);
