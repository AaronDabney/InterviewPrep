export type HexColor = `#${string}`;

/**
 * Creates element of a type, assigns properties, and appends children elements/strings
 * @param type 
 * @param props 
 * @param children 
 * @returns 
 */
function elt(type: string, props: Object | null | undefined, ...children: Array<HTMLElement | string>) {
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


export { elt }
