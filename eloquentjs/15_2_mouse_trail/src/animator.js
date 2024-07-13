function animator(animation) {
    let lastTime = null;

    requestAnimationFrame(loop);
    
    function loop(time) {
        const deltaTime = time - lastTime;
        lastTime = time;
        
        animation([time, deltaTime]);

        requestAnimationFrame(loop);
    }
}

export { animator }
