import {json as readJSON} from "node:stream/consumers";
import { IncomingMessage } from "http";
import { ServerState, updateServerState, waitForChanges, packageTalksResponse } from "./server_util";


export interface Route {
    method: string;
    urlRegExp: RegExp;
    handler: Function;
}

export interface Comment {
    author: string;
    message: string;
}

export interface Talk {
    title: string;
    presenter: string;
    summary: string;
    comments: Array<Comment>
}


const talksPath = /^\/talks$/;
const talkPath = /^\/talks\/([^\/]+)$/;
const talkCommentsPath = /^\/talks\/([^\/]+)\/comments$/;

const routeList: Array<Route> = [
    {
        method: "GET",
        urlRegExp: talkPath,
        handler: getTalkHandler
    },
    {
        method: "DELETE",
        urlRegExp: talkPath,
        handler: deleteTalkHandler
    },
    {
        method: "PUT",
        urlRegExp: talkPath,
        handler: putTalkHandler
    },
    {
        method: "POST",
        urlRegExp: talkCommentsPath,
        handler: postCommentHandler
    },
    {
        method: "GET",
        urlRegExp: talksPath,
        handler: getTalksHandler
    }
];


async function getTalkHandler(serverState: ServerState, title: string) {
    if (Object.hasOwn(serverState.talks, title)) {
        return {
            body: JSON.stringify(serverState.talks[title]),
            headers: { "Content-Type": "application/json" }
        }
    } else {
        return { status: 404, body: `No talk '${title}' found` };
    }
}


async function deleteTalkHandler(serverState: ServerState, title: string) {
    if (Object.hasOwn(serverState.talks, title)) {
        delete serverState.talks[title];
        serverState = updateServerState(serverState)
    }

    return { status: 204 };
}

async function putTalkHandler(serverState: ServerState, title: string, request: IncomingMessage) {
    let talk = <Talk>await readJSON(request);

    if (!talk || typeof talk.presenter != "string" || typeof talk.summary != "string") {
        return { status: 400, body: "Bad talk data" };
    }

    serverState.talks[title] = {
        title,
        presenter: talk.presenter,
        summary: talk.summary,
        comments: []
    };

    serverState = updateServerState(serverState)
    return { status: 204 };
}

async function postCommentHandler(serverState: ServerState, title: string, request: IncomingMessage) {
    let comment = <Comment>await readJSON(request);
    if (!comment || typeof comment.author != "string" || typeof comment.message != "string") {
        return { status: 400, body: "Bad comment data" };
    } else if (Object.hasOwn(serverState.talks, title)) {
        (serverState.talks[title]).comments.push(comment);
        serverState = updateServerState(serverState)
        return { status: 204 };
    } else {
        return { status: 404, body: `No talk '${title}' found` };
    }
}

/**
 * Responds immediately to initial request for talks data
 * Responds to waiting requests upon server update
 * Responds to waiting requests after client defined delay if no server update occurs
 * @param {*} serverState 
 * @param {*} request 
 * @returns 
 */
async function getTalksHandler(serverState: ServerState, request: IncomingMessage) {
    let tag = /"(.*)"/.exec(request.headers["if-none-match"]);
    let wait = /\bwait=(\d+)/.exec(<string>request.headers["prefer"]);

    if (!tag || Number(tag[1]) !== serverState.version) {
        return packageTalksResponse(serverState)
    } else if (!wait) {
        return { status: 304 };
    } else {
        const waitTimeSeconds = Number(wait[1]);
        return waitForChanges(serverState, waitTimeSeconds);
    }
}


export { routeList }
