import { IncomingMessage } from "node:http";
import { stat, rmdir, unlink } from "node:fs/promises";
import { extractUrlPath } from "./helpers";


const DELETE = async function(request: IncomingMessage) {
    console.log("Recieved DELETE request");

    const path = extractUrlPath(request.url);
    let pathTargetInfo;

    try {
        pathTargetInfo = await stat(path)
    } catch (error) {   
        if (error.code !== "ENOENT") {
            throw error;
        } else {
            return {
                status: 204
            }
        }
    }

    if (pathTargetInfo.isDirectory()) {
        await rmdir(path);
    } else {
        await unlink(path);
    }

    return { status: 204 }
};


export { DELETE }
