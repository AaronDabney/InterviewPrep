import { elt } from "./helper_utils";

export interface ToolSelect {
    dom: HTMLElement;
    select: HTMLElement;
}


function create(state: any, {tools, dispatch}: any) {
    let select = elt("select", {
        onchange: () => dispatch({tool: state.tool})
      }, ...Object.keys(tools).map(name => elt("option", 
        {
            selected: name == state.tool
        }, name))
    );

    let dom = elt("label", null, "🖌 Tool: ", select);

    return {
        select: select,
        dom: dom,
    }
}

function syncState(state: any, toolSelect: any) {
    toolSelect.select.value = state.tool;
}

export { create, syncState };
