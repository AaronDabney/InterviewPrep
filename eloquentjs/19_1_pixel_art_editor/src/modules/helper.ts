function elt(type: string, props: Object | null | undefined, ...children) {
    let dom = document.createElement(type);
    if (props) {
        Object.assign(dom, props);
    }

    for (let child of children) {
        if (typeof child !== 'string') {
            dom.appendChild(child);
        } else {
            dom.appendChild(document.createTextNode(child))
        }
    }

    return dom;
}
