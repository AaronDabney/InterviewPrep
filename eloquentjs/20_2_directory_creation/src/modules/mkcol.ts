import { IncomingMessage } from "node:http";
import { mkdir } from "node:fs/promises";
import { urlPath } from "./helpers";
import { stat } from "node:fs/promises";


const MKCOL = async function(request: IncomingMessage) {
    console.log("Recieved MKCOL request");

    const path = urlPath(request.url);
    let stats;

    try {
       stats = await stat(path);
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
