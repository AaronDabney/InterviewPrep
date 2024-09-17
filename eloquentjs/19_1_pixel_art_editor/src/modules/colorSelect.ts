
import { ApplicationState } from "./applicationState";
import { elt } from "./helper_utils";

export interface ColorSelect {
    input: HTMLInputElement;
    dom: HTMLElement,
}


function create(state: ApplicationState, { dispatch }: any) {
    let input = elt("input", {
        type: "color",
        value: state.color,
        onchange: () => dispatch({color: state.color})
      });

      let dom = elt("label", null, "🎨 Color: ", input);

      return {
        input: input,
        dom: dom,
      }
}


function syncState(state: ApplicationState, colorSelect: ColorSelect) {
    colorSelect.input.value = state.color;
}

export { create, syncState}