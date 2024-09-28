import * as fs from "fs"
import { request } from "http";

import { createServer } from "node:http"

const methods = Object.create(null);


createServer((request, response) => {
    let handler = methods[<string>request.method] || notAllowed;
})

async function notAllowed(request) {
    return {
        status: 405,
        body: `Method ${request.method} not allowed.`
    };
}
// let fileContents = fs.readFileSync('main.js', 'utf-8')
// console.log(fileContents)
