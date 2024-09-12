async function urlHeaderAcceptTest(url: string, mediaTypeList: Array<string>) {
    const baselineStatus: Number = (await fetch(url)).status;

    if (baselineStatus !== 200) {
        throw `Baseline test failure. Server returned status: ${baselineStatus}`;
    }

    for (let mediaType of mediaTypeList) {
        const response =  await fetch(url, {
            headers: {
                Accept: mediaType
            }
        });

        console.log(`Header request for mediatype ${mediaType} returned status code ${response.status}`);
    }
}

const mediaRequestTypes = [
    'text/plain',
    'text/html',
    'application/json',
    'application/rainbows+unicorns'
];

const targetURL = 'https://eloquentjavascript.net/author';


urlHeaderAcceptTest(targetURL, mediaRequestTypes);

// --> 
// Header request for mediatype text/plain returned status code 200
// Header request for mediatype text/html returned status code 200
// Header request for mediatype application/json returned status code 200
// Header request for mediatype application/rainbows+unicorns returned status code 406
