export async function GET(server, title) {
    if (Object.hasOwn(server.talks, title)) {
        return {body: JSON.stringify(server.talks[title]),
                headers: {"Content-Type": "application/json"}};
      } else {
        return {status: 404, body: `No talk '${title}' found`};
      }
}
