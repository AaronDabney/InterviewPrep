import { IncomingMessage } from "node:http";
import { createReadStream } from "node:fs";
import { readdir, stat } from "node:fs/promises";
import { lookup } from "mime-types";
import { extractUrlPath } from "./helpers";


const GET = async function(request: IncomingMessage) {
    console.log("Recieved GET request");

    const path = extractUrlPath(request.url);
    let pathTargetInfo;

    try {
        pathTargetInfo = await stat(path);
    } catch (error) {
        if (error.code !== "ENOENT") {
            throw error;
        } else {
            return { status: 404, body: "File not found" }
        }
    }

    if (pathTargetInfo.isDirectory()) {
        return { body: (await readdir(path)).join('\n')};
    } else {
        return {
            body: createReadStream(path),
            type: lookup(path)
        }
    }
};


export { GET }
