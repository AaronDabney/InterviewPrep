"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolve = resolve;
exports.serveFromRouter = serveFromRouter;
exports.waitForChanges = waitForChanges;
// @ts-ignore
async function resolve(request, serverState, routes) {
    console.log("~resolve~");
    let { pathname } = new URL(request.url, "http://d");
    for (let { method, urlRegExp, handler } of routes) {
        let match = urlRegExp.exec(pathname);
        if (!match || request.method != method) {
            continue;
        }
        let parts = match.slice(1).map(decodeURIComponent);
        return handler(serverState, ...parts, request);
    }
}
// @ts-ignore
async function serveFromRouter(serverState, routes, request, response, fallbackCallback) {
    console.log("~serveFromRouter~");
    // @ts-ignore
    const defaultHeaders = { "Content-Type": "text/plain" }; //Why does this var exst?
    // @ts-ignore
    let resolved = await resolve(request, serverState, routes)
        .catch(error => {
        if (error.status != null)
            return error;
        return { body: String(error), status: 500 };
    });
    if (!resolved) {
        console.log("~fallbackCallback~");
        return fallbackCallback();
    }
    let { body, status = 200, headers = defaultHeaders } = await resolved; // Not sure why we are awaiting this twice
    response.writeHead(status, headers);
    response.end(body);
}
// @ts-ignore
function waitForChanges(serverState, time) {
    return new Promise(resolve => {
        serverState.waiting.push(resolve);
        setTimeout(() => {
            if (!serverState.waiting.includes(resolve))
                return;
            // @ts-ignore
            serverState.waiting = serverState.waiting.filter(r => r != resolve);
            resolve({ status: 304 });
        }, time * 1000);
    });
}
//# sourceMappingURL=router_utils.js.map