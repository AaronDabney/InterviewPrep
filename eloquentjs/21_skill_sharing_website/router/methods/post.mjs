import {json as readJSON} from "node:stream/consumers";

export async function POST(server, title, request) {
    console.log("A")
  let comment = await readJSON(request);
  if (!comment ||
      typeof comment.author != "string" ||
      typeof comment.message != "string") {
        console.log("B")
    return {status: 400, body: "Bad comment data"};
  } else if (Object.hasOwn(server.talks, title)) {
    console.log("C")
    server.talks[title].comments.push(comment);
    server.updated();
    return {status: 204};
  } else {
    console.log("D")
    return {status: 404, body: `No talk '${title}' found`};
  }
}
