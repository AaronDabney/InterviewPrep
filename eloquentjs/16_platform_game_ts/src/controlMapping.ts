import { CommandData } from "./interfaces";


/**
 * Returns reference to command data object that is modified via event listener callback to reflect player input
 * @param controlPairs 
 * @returns 
 */
function controlMapping(controlPairs: Object): CommandData {
    const down = Object.create(null);

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
