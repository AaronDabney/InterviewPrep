"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.controlMapping = controlMapping;
/**
 * Returns reference to command data object that is modified via event listener callback to reflect player input
 * @param controlPairs
 * @returns
 */
function controlMapping(controlPairs) {
    var down = Object.create(null);
    function track(event) {
        for (var _i = 0, _a = Object.entries(controlPairs); _i < _a.length; _i++) {
            var _b = _a[_i], command = _b[0], key = _b[1];
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
