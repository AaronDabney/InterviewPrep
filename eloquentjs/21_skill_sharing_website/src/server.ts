import { createServer } from "http";
import fs from "node:fs"
import { ServerState } from "./server_util";
import { serveFromRouter } from "./router_utils";
import { routeList } from "./routes";
import serveStatic from "serve-static";


const fileServer = serveStatic("./public")
const serverStoragePath = "serverData.json";

let serverState: ServerState = {
    talks: {},
    waiting: [],
    version: 0
}

try {
    if (fs.existsSync(serverStoragePath)) {
        console.log("Found local server data.")
        serverState = JSON.parse(fs.readFileSync(serverStoragePath, "utf8"));
    } else {
        console.log("No local server data found.")
    }
} catch (error) {
    console.log("Error retrieving local server data.")
    console.log(error)
}

console.log("Initializing server")

const server = createServer((request, response) => {
    serveFromRouter(serverState, routeList, request, response, () => {
        fileServer(request, response, () => {
            response.writeHead(404, "Not found");
            response.end("<h1>Not found</h1>");
        });
    });
});

server.listen(8000, '0.0.0.0')
