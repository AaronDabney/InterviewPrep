import { Server } from "http";
import fs from "node:fs"


export interface ServerState {
    talks: any;
    waiting: Array<Function>;
    version: number; 
}


function packageTalksResponse(serverState: ServerState) {
    let talksList = Object.keys(serverState.talks).map(title => serverState.talks[title]);

    return {
        body: JSON.stringify(serverState.talks),
        headers: {
            "Content-Type": "application/json",
            "ETag": `"${ serverState.version }"`,
            "Cache-Control": "no-store"
        }
    }
}

function updateServerState(serverState: ServerState) {
    let serverData: ServerState = {
        talks: serverState.talks,
        version: serverState.version + 1,
        waiting: []
    }

    fs.writeFileSync("serverData.json", JSON.stringify(serverData, null, 4));

    let response = packageTalksResponse(serverState);
    serverState.waiting.forEach(resolve => resolve(response));

    return serverData;
}

function waitForChanges(serverState: ServerState, delayInSeconds: number) {
    return new Promise(resolve => {
        serverState.waiting.push(resolve);
        setTimeout(() => {
            if (!serverState.waiting.includes(resolve)) { 
                return;
            }

            serverState.waiting = serverState.waiting.filter(res => res != resolve);

            resolve({ status: 304 });
        }, delayInSeconds * 1000);
    });
}


export {
    packageTalksResponse,
    updateServerState,
    waitForChanges
}
