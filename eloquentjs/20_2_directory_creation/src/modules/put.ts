import { IncomingMessage } from "node:http";
import { createWriteStream } from "node:fs";
import { extractUrlPath, pipeStream } from "./helpers";


const PUT = async function(request: IncomingMessage) {
    console.log("Recieved PUT request");

    const path = extractUrlPath(request.url);

    await pipeStream(request, createWriteStream(path));
    return { status: 204 }
};


export { PUT }
