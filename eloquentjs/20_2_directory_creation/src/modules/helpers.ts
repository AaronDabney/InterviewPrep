import {resolve, sep} from "node:path"
import { IncomingMessage } from "node:http";
import { WriteStream } from "node:fs";


const baseDirectory = process.cwd();

function pipeStream(from: IncomingMessage, to: WriteStream) {
    return new Promise((resolve, reject) => {
        from.on("error", reject);
        to.on("error", reject);
        to.on("finish", resolve);
        from.pipe(to);
    });
}

function urlPath(url: string) {
    const { pathname } = new URL(url, "http://d");
    const path = resolve(decodeURIComponent(pathname).slice(1));

    if (path !== baseDirectory && !path.startsWith(baseDirectory + sep)) {
        throw { status: 403, body: 'forbidden'}
    }

    return path;
}


export { pipeStream, urlPath}
