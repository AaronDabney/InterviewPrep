runApp();


export interface Comment {
    author: string;
    message: string;
}


function runApp() {
    let user = localStorage.getItem("userName") || "Anon";

    let talksDOM = elt("div", { className: "talks" });

    let appData = {
        user: user,
        talks: {},
        talksBuffer: {},
        talksDOM: talksDOM,
        DOM: elt("div", null,
            renderUserField(user, dispatch),
            talksDOM,
            renderTalkForm(dispatch))
    }

    function dispatch(action: any) {
        appData = handleAction(appData, action);
        updateApp(appData, dispatch); // sync state substitute
    }

    document.body.appendChild(appData.DOM)

    pollTalks((talks: any) => { dispatch({ type: "setTalks", talks }) }).catch(reportError);
}

function handleAction(state: any, action: any) {
    if (action.type == "setUser") {
        localStorage.setItem("userName", action.user);
        return { ...state, user: action.user };
    } else if (action.type == "setTalks") {
        return { ...state, talks: action.talks };
    } else if (action.type == "newTalk") {
        fetchOK(talkURL(action.title), {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                presenter: state.user,
                summary: action.summary
            })
        }).catch(reportError);
    } else if (action.type == "deleteTalk") {
        fetchOK(talkURL(action.talk), { method: "DELETE" })
            .catch(reportError);
    } else if (action.type == "newComment") {
        fetchOK(talkURL(action.talk) + "/comments", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                author: state.user,
                message: action.message
            })
        }).catch(reportError);
    }
    return state;
}

function updateApp(appData: any, dispatch: Function) {
    for (let i = 0; i < appData.talksDOM.children.length; i++) {
        appData.talksDOM.children[i].update(appData.talks);
    }

    // For all new talks
    for (let talkTitle in appData.talks) {
        if (!appData.talksBuffer[talkTitle]) {
            // Construct talk dom
            let newTalkDOM = <any>renderTalk(appData.talks[talkTitle], dispatch);
            newTalkDOM.update = (talks: any) => updateTalk(newTalkDOM, talks);
            newTalkDOM.talkTitle = talkTitle;

            // Attach to the talksDOM
            appData.talksDOM.appendChild(newTalkDOM);
        }
    }

    // Update local talks
    appData.talksBuffer = appData.talks;
}

async function pollTalks(update: Function) {
    let tag = undefined;
    for (; ;) {
        let response;
        try {
            response = await fetchOK("/talks", {
                headers: tag && {
                    "If-None-Match": tag,
                    "Prefer": "wait=90"
                }
            });
        } catch (error) {
            console.log("Request failed: " + error);
            await new Promise(resolve => setTimeout(resolve, 500));
            continue;
        }
        if (response.status == 304) continue;
        tag = response.headers.get("ETag");
        update(await response.json());
    }
}

function updateTalk(talkDOM: any, talks: any) {
    let presenterDOM = <HTMLDivElement>document.getElementById(`${talkDOM.talkTitle}-presenter`);
    let summaryDOM = <HTMLDivElement>document.getElementById(`${talkDOM.talkTitle}-summary`);
    let commentsDOM = <HTMLDivElement>document.getElementById(`${talkDOM.talkTitle}-comments`)

    let talkData = talks[talkDOM.talkTitle];

    if (!talkData) { // Talk not present in refresh indicates deletion
        talkDOM.remove();
        return;
    }

    presenterDOM.textContent = talkData.presenter;
    summaryDOM.textContent = talkData.summary;

    commentsDOM.textContent = "";

    for (let comment of talkData.comments) {
        commentsDOM.appendChild(renderComment(comment))
    }
}

function fetchOK(url: string, options: any) {
    return fetch(url, options).then(response => {
        if (response.status < 400) {
            return response
        } else {
            throw new Error(response.statusText)
        }
    });
}

function talkURL(title: string) {
    return "talks/" + encodeURIComponent(title);
}

function reportError(error: string | Error) {
    alert(String(error));
}

function elt(type: string, props: any, ...children: any) {
    let dom = document.createElement(type);

    if (props) {
        Object.assign(dom, props)
    }

    for (let child of children) {
        if (typeof child != "string") {
            dom.appendChild(child);
        } else {
            dom.appendChild(document.createTextNode(child));
        }
    }

    return dom;
}

function renderUserField(name: string, dispatch: Function) {
    return elt("label", {}, "Your name: ", elt("input", {
        type: "text",
        value: name,
        onchange(event: any) {
            dispatch({ type: "setUser", user: event.target.value });
        }
    }));
}

function renderTalk(talk: any, dispatch: Function) {
    return elt(
        "section", { className: "talk" },
        elt("h2", null, elt("div", { id: `${talk.title}` }, talk.title), " ", elt("button", {
            type: "button",
            onclick() {
                dispatch({ type: "deleteTalk", talk: talk.title });
            }
        }, "Delete")),
        elt("div", null, "by ",
            elt("strong", { id: `${talk.title}-presenter` }, talk.presenter)),
        elt("p", { id: `${talk.title}-summary` }, talk.summary),
        elt("div", { id: `${talk.title}-comments` }, ...talk.comments.map(renderComment)),
        elt("form", {
            onsubmit(event: any) {
                event.preventDefault();
                let form = event.target;
                dispatch({
                    type: "newComment",
                    talk: talk.title,
                    message: form.elements.comment.value
                });
                form.reset();
            }
        }, elt("input", { type: "text", name: "comment" }), " ",
            elt("button", { type: "submit" }, "Add comment"))
    );
}

function renderComment(comment: any) {
    return elt("p", { className: "comment" },
        elt("strong", null, comment.author),
        ": ", comment.message);
}

function renderTalkForm(dispatch: Function) {
    let title = <HTMLInputElement>elt("input", { type: "text" });
    let summary = <HTMLInputElement>elt("input", { type: "text" });
    return elt("form", {
        onsubmit(event: any) {
            event.preventDefault();
            dispatch({
                type: "newTalk",
                title: title.value,
                summary: summary.value
            });
            event.target.reset();
        }
    }, elt("h3", null, "Submit a Talk"),
        elt("label", null, "Title: ", title),
        elt("label", null, "Summary: ", summary),
        elt("button", { type: "submit" }, "Submit"));
}
