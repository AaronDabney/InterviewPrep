export async function GET_TALKS (server, request) {
    let tag = /"(.*)"/.exec(request.headers["if-none-match"]);
    let wait = /\bwait=(\d+)/.exec(request.headers["prefer"]);
    if (!tag || tag[1] != server.version) {
      return server.talkResponse();
    } else if (!wait) {
      return {status: 304};
    } else {
      return server.waitForChanges(Number(wait[1]));
    }
}
