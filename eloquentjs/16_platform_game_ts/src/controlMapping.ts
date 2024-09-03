import { CommandData } from "./interfaces";

function controlMapping(controlPairs : Object) : CommandData {
    let down = Object.create(null);

    function track(event: KeyboardEvent) {
        for (let [command, key] of Object.entries(controlPairs)) {
            if (event.key === key) {
                down[command] = event.type === "keydown";
                event.preventDefault();
            }
        }
    }

    window.addEventListener("keydown", track);
    window.addEventListener("keyup", track);

    return down;
}

export { controlMapping }
