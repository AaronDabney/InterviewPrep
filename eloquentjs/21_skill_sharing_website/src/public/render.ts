/**
 * Create an element of type input strig
 * If an object with properties is attached assign them to the element
 * if there are children, append them to the element (string or otherwise)
 * return element
 * @param type 
 * @param props 
 * @param children 
 * @returns 
 */
function elt(type: string, props: Object | null, ...children: any) {
    let dom = document.createElement(type);
    if (props) Object.assign(dom, props);
    for (let child of children) {
        if (typeof child != "string") dom.appendChild(child);
        else dom.appendChild(document.createTextNode(child));
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

function renderTalk(talk: Talk, dispatch: Function) {
    return elt(
        "section", { className: "talk" },
        elt("h2", null, talk.title, " ", elt("button", {
            type: "button",
            onclick() {
                dispatch({ type: "deleteTalk", talk: talk.title });
            }
        }, "Delete")),
        elt("div", null, "by ",
            elt("strong", null, talk.presenter)),
        elt("p", null, talk.summary),
        ...talk.comments.map(renderComment),
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
            elt("button", { type: "submit" }, "Add comment")));
}

function renderComment(comment: Comment) {
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


export {
    elt,
    renderUserField,
    renderTalk,
    renderComment,
    renderTalkForm
}
