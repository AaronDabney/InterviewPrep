export async function DELETE(server, title) {

    if (Object.hasOwn(server.talks, title)) {
      delete server.talks[title];
      server.updated();
    }

    return { status: 204 };
}
