import { IncomingMessage, ServerResponse } from "node:http";
import { ServerState } from "./server_util";
import { Route } from "./routes";


const defaultHeaders = { "Content-Type": "text/plain" };


async function serveFromRouter(serverState: ServerState, routelist: Array<Route>, request: IncomingMessage, response: ServerResponse, fallbackCallback: Function) {
    let resolved = await resolve(request, serverState, routelist)
        .catch(error => {
            const isHTTPError = error.status !== null;
            if (isHTTPError) {
                return error;
            } else {
                return { body: String(error), status: 500 }
            }
        });

    if (!resolved) {
        return fallbackCallback();
    }

    let { body, status = 200, headers = defaultHeaders } = resolved;

    response.writeHead(status, headers)
    response.end(body)
}

async function resolve(request: IncomingMessage, serverState: ServerState, routelist: Array<Route>) {
    let { pathname } = new URL(request.url, "http://d");

    for (let { method, urlRegExp, handler } of routelist) {
        let match = urlRegExp.exec(pathname);

        if (!match || request.method !== method) {
            continue;
        }

        let parts = match.slice(1).map(decodeURIComponent);
        return handler(serverState, ...parts, request);
    }
}


export { serveFromRouter }
