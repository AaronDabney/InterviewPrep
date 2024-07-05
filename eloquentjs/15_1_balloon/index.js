let balloon = document.getElementById("balloon");

let balloonSize = 1;
let explosionThreshold = 18;

let balloonHandler = event => {
    if (event.key === 'ArrowUp') {
        if (balloonSize > explosionThreshold) {
            explosion();
            return;
        }
        
        balloonSize *= 1.1;
        balloon.style.fontSize = `${balloonSize}em`;
        
        event.preventDefault();
    } else if (event.key === 'ArrowDown') {
        balloonSize *= 0.9;
        balloon.style.fontSize = `${balloonSize}em`;

        event.preventDefault();
    }
}

window.addEventListener('keydown', balloonHandler);

function explosion() {
    console.log("Pop!")
    balloon.textContent = '💥';
    window.removeEventListener('keydown', balloonHandler)
}
