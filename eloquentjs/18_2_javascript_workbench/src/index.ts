const codeInput: HTMLTextAreaElement = document.getElementById('codeInput') as HTMLTextAreaElement;
const codeOutput: HTMLPreElement = document.getElementById("codeOutput") as HTMLPreElement;

/**
 * Accepts textArea and pre element
 * Evaluates textArea value as Javascript
 * Returns result or caught error to innerText of pre element
 * @param codeInput 
 * @param codeOutput 
 */
function codeProcesser(codeInput: HTMLTextAreaElement, codeOutput: HTMLPreElement) {
    try {
        const func = new Function(codeInput.value);
        codeOutput.innerText = func();;
    } catch(error) {
        codeOutput.innerText = error;
    }
}

const workbenchProcess = () => codeProcesser(codeInput, codeOutput);

(document.querySelector("button") as HTMLButtonElement).addEventListener("click", workbenchProcess);
