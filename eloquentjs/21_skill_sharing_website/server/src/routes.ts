import {json as readJSON} from "node:stream/consumers";
import { packageTalksResponse } from "./utils";
import { waitForChanges } from "./router_utils";
import { updateServerState } from "./utils";

const talksPath = /^\/talks$/;
const talkPath = /^\/talks\/([^\/]+)$/;
const talkCommentsPath = /^\/talks\/([^\/]+)\/comments$/;

export const routes = 
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


// @ts-ignore
async function getTalkHandler(serverState, title) {
    console.log("~getTalkHandler~")
    if (Object.hasOwn(serverState.talks, title)) {
      return {body: JSON.stringify(serverState.talks[title]),
              headers: {"Content-Type": "application/json"}};
    } else {
      return {status: 404, body: `No talk '${title}' found`};
    }
}

// @ts-ignore
async function deleteTalkHandler(serverState, title) {
    console.log("~deleteTalkHandler~")
    if (Object.hasOwn(serverState.talks, title)) {
      delete serverState.talks[title];
      serverState = updateServerState(serverState)
    }
    return {status: 204};
}

// @ts-ignore
async function putTalkHandler(serverState, title, request) {
    console.log("~putTalkHandler~")
    let talk = await readJSON(request);
    if (!talk ||
        // @ts-ignore
        typeof talk.presenter != "string" ||
        // @ts-ignore
        typeof talk.summary != "string") {
      return {status: 400, body: "Bad talk data"};
    }
    serverState.talks[title] = {
      title,
      // @ts-ignore
      presenter: talk.presenter,
      // @ts-ignore
      summary: talk.summary,
      comments: []
    };
    serverState = updateServerState(serverState)
    return {status: 204};
}

// @ts-ignore
async function postCommentHandler(serverState, title, request) {
    console.log("~postCommentHandler~")
    let comment = await readJSON(request);
    if (!comment ||
        // @ts-ignore
        typeof comment.author != "string" ||
        // @ts-ignore
        typeof comment.message != "string") {
        return {status: 400, body: "Bad comment data"};
    } else if (Object.hasOwn(serverState.talks, title)) {
        serverState.talks[title].comments.push(comment);
        serverState = updateServerState(serverState)
        return {status: 204};
    } else {
        return {status: 404, body: `No talk '${title}' found`};
    }
}

// @ts-ignore
async function getTalksHandler(serverState, request) {
    console.log("~getTalksHandler~")
    let tag = /"(.*)"/.exec(request.headers["if-none-match"]);
    let wait = /\bwait=(\d+)/.exec(request.headers["prefer"]);
    if (!tag || tag[1] != serverState.version) {
        return packageTalksResponse(serverState)
    } else if (!wait) {
      return {status: 304};
    } else {
      return waitForChanges(serverState, Number(wait[1]));//serverState.waitForChanges();
    }
}
