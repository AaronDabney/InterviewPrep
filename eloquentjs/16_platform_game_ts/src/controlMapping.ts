function controlMapping(controlPairs : Object) {
    let down = Object.create(null);

    function track(event: KeyboardEvent) {
        for (let [command, key] of Object.entries(controlPairs)) {
            if (event.key === key) {
                down[command] = event.type === "keydown";
            }
        }
        //console.log(event)
    }

    window.addEventListener("keydown", track);
    window.addEventListener("keyup", track);

    return down;
}

export { controlMapping }
