import { IncomingMessage } from "node:http";
import { createWriteStream } from "node:fs";
import { urlPath, pipeStream } from "./helpers";


const PUT = async function(request: IncomingMessage) {
    console.log("Recieved PUT request");

    const path = urlPath(request.url);

    await pipeStream(request, createWriteStream(path));
    return { status: 204 }
};


export { PUT }
