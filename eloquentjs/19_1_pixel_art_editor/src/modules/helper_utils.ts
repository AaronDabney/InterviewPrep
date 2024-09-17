/**
 * Tests if a string represents a valid hex color. 
 * Not case sensitive
 * @param input 
 * @returns 
 */
function validHexString(input: string): boolean {
    let validCharacters = ['a', 'b', 'c', 'd', 'e', 'f', '1', '2' ,'3', '4', '5', '6', '7', '8', '9', '0'];

    let splitInput = input.split('');

    if (splitInput.length !== 7) {
        return false;
    }

    if (splitInput.shift() !== '#') {
        return false;
    }

    let allCharactersValid = splitInput.every(char => validCharacters.some(hexChar => hexChar === char));
    
    return allCharactersValid;
}


function elt(type: string, props?: Object | null, ...children: Array<HTMLElement | string>): HTMLElement {
    //console.log("TESTA: " + type)
        let dom = document.createElement(type);
        if (props) {
            Object.assign(dom, props)
        }
        //console.log("TESTB: " + type)
        for (let child of children) {
            if (child === undefined) {
                console.log(type)
                console.log(props)
                console.log(children)
                throw "child undefined"
            }
            try {
                if (typeof child !== "string") {
                  //  console.log("A")
                    dom.appendChild(child);
                } else {
                   // console.log("B")
                    dom.appendChild(document.createTextNode(child));
                }
            } catch (e) {
                console.log(child)
                throw (e)
            }


        }
        return dom;
}


export { validHexString, elt }
