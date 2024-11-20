import { createServer } from "node:http";
import serveStatic from "serve-static";
import { routes } from "./routes";
import { serveFromRouter } from "./router_utils";

let skillShareServerState: any = {
    talks: {},
    version: 0,
    waiting: []
}

let fileServer = serveStatic("./public")

const server = createServer((request, response) => {
    console.log("~createServer~")
    serveFromRouter(skillShareServerState, routes, request, response, () => {
        fileServer(request, response, () => {
            response.writeHead(404, "Not found");
            response.end("<h1>Not found</h1>");
        });
    });
})

server.listen(8000);
