import { createServer, OutgoingMessage, Server } from "node:http";
import { GET } from "./modules/get";
import { PUT } from "./modules/put";
import { MKCOL } from "./modules/mkcol";
import { DELETE } from "./modules/delete";

const methods: any = { GET, PUT, MKCOL, DELETE }

async function initalizeServer() {
    console.log("Creating server");
    const server = await createServer(async (request, response) => {
        const handler = methods[request.method] || notAllowed;
        let requestResult;

        try {
            requestResult = await handler(request)
        } catch(error) {
            if (error.status !== null) {
                return error;
            } else {
                return {
                    body: String(error),
                    status: 500
                }
            }
        }

        let responseStatus = 200;
        response.writeHead(responseStatus, {"Content-Type": "text/plain"});

        if (requestResult.body?.pipe) {
            requestResult.body.pipe(response);
        } else {
            response.end(requestResult.body);
        }
    });

    server.listen(8000)
    console.log("Listening");
}

initalizeServer()

async function notAllowed(request: any) {
    return {
        status: 405,
        body: `Method ${request.method} not allowed`
    }
}
