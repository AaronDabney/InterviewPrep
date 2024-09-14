class ControlSetupError extends Error {}

function buildControlInterface(buttonIdentifierList: Array<string>) {
    let controlInterface: any = Object.create(null);

    for (let buttonID of buttonIdentifierList) {
        let buttonElement = document.getElementById(buttonID);

        if (!buttonElement) {
            throw new ControlSetupError("Button ID not found.");
        }

        controlInterface.buttonID = false;

        buttonElement.addEventListener("click", () => {
            controlInterface.buttonID = true;
        });
    }

    return controlInterface;
}

export { buildControlInterface }
