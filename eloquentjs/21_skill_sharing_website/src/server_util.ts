import { resolve } from "./router_utils";
import { SkillShareServerState } from "./server";

export function packageTalksResponse(serverState: SkillShareServerState) {
    console.log("~packageTalksResponse~")
    let talksList = Object.keys(serverState.talks).map(title => serverState.talks[title as keyof Object]);
    return {
      body: JSON.stringify(serverState.talks),
      headers: {"Content-Type": "application/json",
                "ETag": `"${serverState.version}"`,
                "Cache-Control": "no-store"}
    };
}


export function updateServerState(serverState: SkillShareServerState): SkillShareServerState {
    let response = packageTalksResponse(serverState);

    serverState.waiting.forEach(resolve => resolve(response))
    return {
        talks: serverState.talks,
        version: serverState.version + 1,
        waiting: []
    }
}

