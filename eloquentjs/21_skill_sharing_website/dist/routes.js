"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const consumers_1 = require("node:stream/consumers");
const utils_1 = require("./utils");
const router_utils_1 = require("./router_utils");
const utils_2 = require("./utils");
const talksPath = /^\/talks$/;
const talkPath = /^\/talks\/([^\/]+)$/;
const talkCommentsPath = /^\/talks\/([^\/]+)\/comments$/;
exports.routes = [
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
    console.log("~getTalkHandler~");
    if (Object.hasOwn(serverState.talks, title)) {
        return { body: JSON.stringify(serverState.talks[title]),
            headers: { "Content-Type": "application/json" } };
    }
    else {
        return { status: 404, body: `No talk '${title}' found` };
    }
}
// @ts-ignore
async function deleteTalkHandler(serverState, title) {
    console.log("~deleteTalkHandler~");
    if (Object.hasOwn(serverState.talks, title)) {
        delete serverState.talks[title];
        serverState = (0, utils_2.updateServerState)(serverState);
    }
    return { status: 204 };
}
// @ts-ignore
async function putTalkHandler(serverState, title, request) {
    console.log("~putTalkHandler~");
    let talk = await (0, consumers_1.json)(request);
    if (!talk ||
        // @ts-ignore
        typeof talk.presenter != "string" ||
        // @ts-ignore
        typeof talk.summary != "string") {
        return { status: 400, body: "Bad talk data" };
    }
    serverState.talks[title] = {
        title,
        // @ts-ignore
        presenter: talk.presenter,
        // @ts-ignore
        summary: talk.summary,
        comments: []
    };
    serverState = (0, utils_2.updateServerState)(serverState);
    return { status: 204 };
}
// @ts-ignore
async function postCommentHandler(serverState, title, request) {
    console.log("~postCommentHandler~");
    let comment = await (0, consumers_1.json)(request);
    if (!comment ||
        // @ts-ignore
        typeof comment.author != "string" ||
        // @ts-ignore
        typeof comment.message != "string") {
        return { status: 400, body: "Bad comment data" };
    }
    else if (Object.hasOwn(serverState.talks, title)) {
        serverState.talks[title].comments.push(comment);
        serverState = (0, utils_2.updateServerState)(serverState);
        return { status: 204 };
    }
    else {
        return { status: 404, body: `No talk '${title}' found` };
    }
}
// @ts-ignore
async function getTalksHandler(serverState, request) {
    console.log("~getTalksHandler~");
    let tag = /"(.*)"/.exec(request.headers["if-none-match"]);
    let wait = /\bwait=(\d+)/.exec(request.headers["prefer"]);
    if (!tag || tag[1] != serverState.version) {
        return (0, utils_1.packageTalksResponse)(serverState);
    }
    else if (!wait) {
        return { status: 304 };
    }
    else {
        return (0, router_utils_1.waitForChanges)(serverState, Number(wait[1])); //serverState.waitForChanges();
    }
}
//# sourceMappingURL=routes.js.map