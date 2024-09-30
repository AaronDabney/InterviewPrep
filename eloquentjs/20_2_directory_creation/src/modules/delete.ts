import { IncomingMessage } from "node:http";
import { stat, rmdir, unlink } from "node:fs/promises";
import { urlPath } from "./helpers";


const DELETE = async function(request: IncomingMessage) {
    console.log("Recieved DELETE request");

    const path = urlPath(request.url);

    let stats;
    try {
        stats = await stat(path)
    } catch (error) {   
        if (error.code !== "ENOENT") {
            throw error;
        } else {
            return {
                status: 204
            }
        }
    }

    if (stats.isDirectory()) {
        await rmdir(path);
    } else {
        await unlink(path);
    }

    return { status: 204 }
};


export { DELETE }
