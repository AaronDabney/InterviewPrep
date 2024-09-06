import { Vector2 } from "./src/vector2";


function animate(frameFunc) {
    let lastTime = null;

    function loop(time) {
        if (lastTime !== null) {
           let deltaTime = time - lastTime; //time in milliseconds
           frameFunc(deltaTime)
        }

        lastTime = time;
        requestAnimationFrame(loop)
    }

   requestAnimationFrame(loop)
}

// animate((x) => console.log(x))
