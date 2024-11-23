"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_http_1 = require("node:http");
const serve_static_1 = __importDefault(require("serve-static"));
const routes_1 = require("./routes");
const router_utils_1 = require("./router_utils");
let skillShareServerState = {
    talks: {},
    version: 0,
    waiting: []
};
let fileServer = (0, serve_static_1.default)("./public");
const server = (0, node_http_1.createServer)((request, response) => {
    console.log("~createServer~");
    (0, router_utils_1.serveFromRouter)(skillShareServerState, routes_1.routes, request, response, () => {
        fileServer(request, response, () => {
            response.writeHead(404, "Not found");
            response.end("<h1>Not found</h1>");
        });
    });
});
server.listen(8000);
//# sourceMappingURL=server.js.map