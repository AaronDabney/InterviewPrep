import {json as readJSON} from "node:stream/consumers";
import { packageTalksResponse } from "./utils";
import { waitForChanges } from "./router_utils";
import { updateServerState } from "./utils";
import { SkillShareServerState } from "./server";
import { IncomingMessage } from "node:http";

const talksPath = /^\/talks$/;
const talkPath = /^\/talks\/([^\/]+)$/;
const talkCommentsPath = /^\/talks\/([^\/]+)\/comments$/;

interface Talk {
    presenter: string;
    summary: string;
    comments: Array<Comment>
}

interface Comment {
    author: string;
    message: string;
}

export interface Route {
    method: string;
    urlRegExp: RegExp;
    handler: Function;
}

export const routes: Array<Route> = 
[
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
    },
];



async function getTalkHandler(serverState: SkillShareServerState, title: string) {
    console.log("~getTalkHandler~")
    if (Object.hasOwn(serverState.talks, title)) {
      return {body: JSON.stringify(serverState.talks[title as keyof Object]),
              headers: {"Content-Type": "application/json"}};
    } else {
      return {status: 404, body: `No talk '${title}' found`};
    }
}


async function deleteTalkHandler(serverState: SkillShareServerState, title:string) {
    console.log("~deleteTalkHandler~")
    if (Object.hasOwn(serverState.talks, title)) {
      delete serverState.talks[title as keyof Object];
      serverState = updateServerState(serverState)
    }
    return {status: 204};
}


async function putTalkHandler(serverState: SkillShareServerState, title: string, request: IncomingMessage) {
    console.log("~putTalkHandler~")
    let talk: any = await readJSON(request);

    if (!talk ||
        typeof talk.presenter != "string" ||
        typeof talk.summary != "string") {
      return {status: 400, body: "Bad talk data"};
    }

    serverState.talks[title as keyof Object] = {
      title,
      presenter: talk.presenter,
      summary: talk.summary,
      comments: []
    };

    serverState = updateServerState(serverState)
    return {status: 204};
}


async function postCommentHandler(serverState: SkillShareServerState, title: string, request: IncomingMessage) {
    console.log("~postCommentHandler~")
    let comment: any = await readJSON(request);
    if (!comment ||
        
        typeof comment.author != "string" ||
        
        typeof comment.message != "string") {
        return {status: 400, body: "Bad comment data"};
    } else if (Object.hasOwn(serverState.talks, title)) {
        (<any>serverState.talks[title as keyof Object]).comments.push(comment);
        serverState = updateServerState(serverState)
        return {status: 204};
    } else {
        return {status: 404, body: `No talk '${title}' found`};
    }
}


async function getTalksHandler(serverState: SkillShareServerState, request: IncomingMessage) {
    console.log("~getTalksHandler~")
    let tag = /"(.*)"/.exec(request.headers["if-none-match"]);
    let wait = /\bwait=(\d+)/.exec(<string>request.headers["prefer"]);
    if (!tag || Number(tag[1]) !== serverState.version) {
        return packageTalksResponse(serverState)
    } else if (!wait) {
      return { status: 304 };
    } else {
      return waitForChanges(serverState, Number(wait[1]));//serverState.waitForChanges();
    }
}
