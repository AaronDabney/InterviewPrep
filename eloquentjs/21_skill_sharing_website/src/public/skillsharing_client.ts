// @ts-ignore
function handleAction(state, action) {
    if (action.type == "setUser") {
      localStorage.setItem("userName", action.user);
      return {...state, user: action.user};
    } else if (action.type == "setTalks") {
      return {...state, talks: action.talks};
    } else if (action.type == "newTalk") {
      fetchOK(talkURL(action.title), {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          presenter: state.user,
          summary: action.summary
        })
      }).catch(reportError);
    } else if (action.type == "deleteTalk") {
      fetchOK(talkURL(action.talk), {method: "DELETE"})
        .catch(reportError);
    } else if (action.type == "newComment") {
      fetchOK(talkURL(action.talk) + "/comments", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          author: state.user,
          message: action.message
        })
      }).catch(reportError);
    }
    return state;
  }
  
  // @ts-ignore
  function fetchOK(url, options) {
    return fetch(url, options).then(response => {
      if (response.status < 400) return response;
      else throw new Error(response.statusText);
    });
  }
  
  // @ts-ignore
  function talkURL(title) {
    return "talks/" + encodeURIComponent(title);
  }
  
  // @ts-ignore
  function reportError(error) {
    alert(String(error));
  }
  
  // @ts-ignore
  function renderUserField(name, dispatch) {
    return elt("label", {}, "Your name: ", elt("input", {
      type: "text",
      value: name,
      // @ts-ignore
      onchange(event) {
        dispatch({type: "setUser", user: event.target.value});
      }
    }));
  }
  // @ts-ignore
  function elt(type, props, ...children) {
    let dom = document.createElement(type);
    if (props) Object.assign(dom, props);
    for (let child of children) {
      if (typeof child != "string") dom.appendChild(child);
      else dom.appendChild(document.createTextNode(child));
    }
    return dom;
  }
  // @ts-ignore
  function renderTalk(talk, dispatch) {
    return elt(
      "section", {className: "talk"},
      elt("h2", null, talk.title, " ", elt("button", {
        type: "button",
        onclick() {
          dispatch({type: "deleteTalk", talk: talk.title});
        }
      }, "Delete")),
      elt("div", null, "by ",
          elt("strong", null, talk.presenter)),
      elt("p", null, talk.summary),
      ...talk.comments.map(renderComment),
      elt("form", {
        // @ts-ignore
        onsubmit(event) {
          event.preventDefault();
          let form = event.target;
          dispatch({type: "newComment",
                    talk: talk.title,
                    message: form.elements.comment.value});
          form.reset();
        }
      }, elt("input", {type: "text", name: "comment"}), " ",
         elt("button", {type: "submit"}, "Add comment")));
  }
  // @ts-ignore
  function renderComment(comment) {
    return elt("p", {className: "comment"},
               elt("strong", null, comment.author),
               ": ", comment.message);
  }
  // @ts-ignore
  function renderTalkForm(dispatch) {
    let title = elt("input", {type: "text"});
    let summary = elt("input", {type: "text"});
    return elt("form", {
        // @ts-ignore
      onsubmit(event) {
        event.preventDefault();
        dispatch({type: "newTalk",
                  title: title.value,
                  summary: summary.value});
        event.target.reset();
      }
    }, elt("h3", null, "Submit a Talk"),
       elt("label", null, "Title: ", title),
       elt("label", null, "Summary: ", summary),
       elt("button", {type: "submit"}, "Submit"));
  }
  // @ts-ignore
  async function pollTalks(update) {
    let tag = undefined;
    for (;;) {
      let response;
      try {
        response = await fetchOK("/talks", {
          headers: tag && {"If-None-Match": tag,
                           "Prefer": "wait=90"}
        });
      } catch (e) {
        console.log("Request failed: " + e);
        await new Promise(resolve => setTimeout(resolve, 500));
        continue;
      }
      if (response.status == 304) continue;
      tag = response.headers.get("ETag");
      let respText = await response.json()
      console.log(respText)
      update(respText);
    }
  }
  
  // @ts-ignore
  var SkillShareApp = class SkillShareApp {
    // @ts-ignore
    constructor(state, dispatch) {
        // @ts-ignore
      this.dispatch = dispatch;
      // @ts-ignore
      this.talkDOM = elt("div", {className: "talks"});
      // @ts-ignore
      this.dom = elt("div", null,
                     renderUserField(state.user, dispatch),
                     // @ts-ignore
                     this.talkDOM,
                     renderTalkForm(dispatch));
      this.syncState(state);
    }
  // @ts-ignore
    syncState(state) {
        // @ts-ignore
      if (state.talks != this.talks) {
        // @ts-ignore
        this.talkDOM.textContent = "";
        for (let talkTitle in state.talks) {
          let talk = state.talks[talkTitle]
          // @ts-ignore
          this.talkDOM.appendChild(renderTalk(talk, this.dispatch));
        }
        // @ts-ignore
        this.talks = state.talks;
      }
    }
  }
  
  function runApp() {
    let user = localStorage.getItem("userName") || "Anon";
    // @ts-ignore
    let state, app;
    // @ts-ignore
    function dispatch(action) {
        // @ts-ignore
      state = handleAction(state, action);
      // @ts-ignore
      app.syncState(state);
    }
  // @ts-ignore
    pollTalks(talks => {
        // @ts-ignore
      if (!app) {
        state = {user, talks};
        app = new SkillShareApp(state, dispatch);
        // @ts-ignore
        document.body.appendChild(app.dom);
      } else {
        dispatch({type: "setTalks", talks});
      }
    }).catch(reportError);
  }
  
runApp();
