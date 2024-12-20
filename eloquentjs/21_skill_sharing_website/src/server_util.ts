import { Server } from "http";

export interface ServerState {
    talks: any;
    waiting: Array<Function>;
    version: number; 
}

const fs = require('fs');

function packageTalksResponse(serverState: ServerState): any {
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


/**
 * Adds a promise to the server state waitlist that represents a clients poll for new information
 * If there are no changes it means the promise is unresolved and server responds with status
 * indicating no new changes
 * @param {*} serverState 
 * @param {*} time 
 * @returns 
 */
function waitForChanges(serverState: ServerState, timeInSeconds: number) {
    return new Promise(resolve => {
        serverState.waiting.push(resolve);
        setTimeout(() => {
            // If the server doesn't include this specific promise resolve callback
            let waitingPromiseResolved = !serverState.waiting.includes(resolve);
            if (waitingPromiseResolved) { 
                return;
            }
            // Filter out the resolve in the queue
            serverState.waiting = serverState.waiting.filter(r => r != resolve);

            // Resolve
            resolve({ status: 304 });
        }, timeInSeconds * 1000);
    });
}


export {
    packageTalksResponse,
    updateServerState,
    waitForChanges
}
