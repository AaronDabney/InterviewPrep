import { resolve } from "./router_utils";

// @ts-ignore
export function packageTalksResponse(serverState) {
    console.log("~packageTalksResponse~")
    let talksList = Object.keys(serverState.talks).map(title => serverState.talks[title]);
    return {
      body: JSON.stringify(serverState.talks),
      headers: {"Content-Type": "application/json",
                "ETag": `"${serverState.version}"`,
                "Cache-Control": "no-store"}
    };
}

// @ts-ignore
export function updateServerState(serverState) {
    let response = packageTalksResponse(serverState);
    // @ts-ignore
    serverState.waiting.forEach(resolve => resolve(response))
    return {
        talks: serverState.talks,
        version: serverState.version + 1,
        // @ts-ignore
        waiting: []
    }
}
