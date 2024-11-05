import { IncomingMessage } from "node:http";
import { mkdir, stat } from "node:fs/promises";
import { extractUrlPath } from "./helpers";


const MKCOL = async function(request: IncomingMessage) {
    console.log("Recieved MKCOL request");

    const path = extractUrlPath(request.url);
    let pathTargetInfo;

    try {
        pathTargetInfo = await stat(path);
    } catch (error) {
        const errorDueToMissingFileOrDirectory = error.code === "ENOENT";

        if (errorDueToMissingFileOrDirectory) {
            mkdir(path);
        } else {
            throw error;
        }
    }
    
    return { status: 204 }
}


export { MKCOL }
