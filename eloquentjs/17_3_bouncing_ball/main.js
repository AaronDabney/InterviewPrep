function animator(animationFrame) {
    let lastTime = null;

    function loop(time) {
        if (lastTime !== null) {
           let deltaTime = time - lastTime;
           animationFrame(deltaTime)
        }

        lastTime = time;
        requestAnimationFrame(loop);
    }

   requestAnimationFrame(loop);
}

function bouncingBall(ctx) {
    const canvasWidth = ctx.canvas.clientWidth;
    const canvasHeight = ctx.canvas.clientHeight;

    const period = 5;

    // Range: [-1 , 1]
    const triangleWave = (x, period) => 2 * Math.abs( 2 * (x / period - Math.floor(x / period + 0.5))) - 1; 
    
    const verticalPhaseShift = Math.PI / 2;
    const ballRadius = 50;
    
    const xCenter = canvasWidth / 2;
    const yCenter = canvasHeight / 2;

    const timeInSeconds = Date.now() / 1000; // (since January 1, 1970)

    const xPosition = xCenter + triangleWave(timeInSeconds, period) * xCenter * (1 - ballRadius / xCenter);
    const yPosition = yCenter + triangleWave(timeInSeconds + verticalPhaseShift, period) * yCenter * (1 - ballRadius / yCenter);

    // Clear canvas
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    // Draw ball
    ctx.fillStyle = 'blue';
    ctx.beginPath();
    ctx.ellipse(xPosition, yPosition, ballRadius, ballRadius, 0, 0, Math.PI * 2);
    ctx.fill();
}


let drawingContext =  document.getElementById("box").getContext("2d");

animator(() => bouncingBall(drawingContext));
