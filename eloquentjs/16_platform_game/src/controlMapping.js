function controlMapping(controlPairs) {
    let down = Object.create(null);

    function track(event) {
        for (let [command, key] of controlPairs) {
            if (event.key === key) {
                down[command] = event.type === "keydown";
            }
        }
    }

    down.removeListeners = () => {
        console.log("Removing event listeners");
        window.removeEventListener("keydown", track);
        window.removeEventListener("keyup", track);
    }

    console.log("Adding event listeners");
    window.addEventListener("keydown", track);
    window.addEventListener("keyup", track);

    return down;
}

export { controlMapping }
