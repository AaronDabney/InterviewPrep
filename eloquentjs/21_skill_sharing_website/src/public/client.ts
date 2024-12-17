import * as Render_utils from "./render";

interface AppState {
    user: string;
    talks: Object;
}

interface Talk {
    presenter: string;
    summary: string;
    comments: Array<Comment>;
    title: string;
}

interface Comment {
    author: string;
    message: string;
}


function handleAction(state: AppState, action: any) {
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

function fetchOK(url: string, options: Object) {
    return fetch(url, options).then(response => {
        if (response.status < 400) return response;
        else throw new Error(response.statusText);
    });
}


function talkURL(title: string) {
    return "talks/" + encodeURIComponent(title);
}

function reportError(error: any) {
    alert(String(error));
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
        } catch (e) {
            console.log("Request failed: " + e);
            await new Promise(resolve => setTimeout(resolve, 500));
            continue;
        }
        if (response.status == 304) continue; // 304 means not modified
        tag = response.headers.get("ETag");
        let respText = await response.json()
        console.log(respText)
        update(respText);
    }
}



var SkillShareApp = class SkillShareApp {
    constructor(state: AppState, dispatch: Function) {
        this.dispatch = dispatch;
        this.talkDOM = elt("div", { className: "talks" });

        this.dom = elt("div", null,
            renderUserField(state.user, dispatch),
            this.talkDOM,
            renderTalkForm(dispatch));

        this.syncState(state);
    }
    
    syncState(state: AppState) {
        if (state.talks != this.talks) {
            this.talkDOM.textContent = "";
            for (let talkTitle in state.talks) {
                let talk = state.talks[talkTitle]

                this.talkDOM.appendChild(renderTalk(talk, this.dispatch));
            }
            this.talks = state.talks;
        }
    }
}




function runApp() {
    let user = localStorage.getItem("userName") || "Anon";
    let talks: Array<Talk>;
    

    // let appState = {
    //     user,
    //     talks
    // }
    let state: AppState; 
    // // let app;

    function dispatch(action: any) {
        state = handleAction(state, action);
        // app.syncState(state);
    }

    pollTalks(talks => {
        if (!app) {
            state = { user, talks };
            app = new SkillShareApp(state, dispatch);

            let skillShareApp = {
                dispatch: dispatch,

            }
        
            document.body.appendChild(app.dom);
        } else {
            dispatch({ type: "setTalks", talks });
        }
    }).catch(reportError);
}

runApp();
