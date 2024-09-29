import { createServer, OutgoingMessage } from "node:http";
import { GET } from "./modules/get";
import { PUT } from "./modules/put";
import { MKCOL } from "./modules/mkcol";
import { DELETE } from "./modules/delete";

interface ServerResponse {
    status: number,
    body?: any,
    type?: string
}


const methods = Object.create(null);

methods.GET = GET;
methods.PUT = PUT;
methods.MKCOL = MKCOL;
methods.DELETE = DELETE;

console.log("Creating server");

createServer((request, response) => {
    const handler = methods[request.method] || notAllowed;

    handler(request).catch((error: ServerResponse) => {
        if (error.status !== null) {
            return error;
        } else {
            return {
                body: String(error),
                status: 500
            }
        }
    }).then(({body, status = 200, type="text/plain"}: ServerResponse) => {
        response.writeHead(status, {"Content-Type": type});

        if (body?.pipe) {
            body.pipe(response)
        } else {
            response.end(body);
        }
    })
}).listen(8000);

console.log("Listening");

async function notAllowed(request: any) {
    return {
        status: 405,
        body: `Method ${request.method} not allowed`
    }
}
