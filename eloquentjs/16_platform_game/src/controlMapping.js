function controlMapping(controlPairs) {
    let down = Object.create(null);

    function track(event) {
        for (let [command, key] of controlPairs) {
            if (event.key === key) {
                down[command] = event.type === "keydown";
            }
        }
    }

    window.addEventListener("keydown", track);
    window.addEventListener("keyup", track);

    return down;
}

export { controlMapping }
