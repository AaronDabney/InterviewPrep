import { IncomingMessage } from "node:http";
import { urlPath } from "./helpers";
import { stat } from "node:fs/promises";
import { createReadStream } from "node:fs";
import { lookup } from "mime-types";
import { readdir } from "node:fs/promises";


const GET = async function(request: IncomingMessage) {
    console.log("Recieved GET request");

    const path = urlPath(request.url);
    let stats;

    try {
        stats = await stat(path);
    } catch (error) {
        if (error.code !== "ENOENT") {
            throw error;
        } else {
            return { status: 404, body: "File not found" }
        }
    }

    if (stats.isDirectory()) {
        return { body: (await readdir(path)).join('\n')};
    } else {
        return {
            body: createReadStream(path),
            type: lookup(path)
        }
    }
};


export { GET }
