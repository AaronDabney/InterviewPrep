import { Picture } from "./picture_utils";

export interface ApplicationState {
    picture: Picture;
    tool: any;
    color: string;
}


function updateAppState(state: ApplicationState, action: any) {
    return {...state, ...action};
}

export { updateAppState }
