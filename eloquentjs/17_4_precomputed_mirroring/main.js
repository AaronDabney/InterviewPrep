/**
 * Appends two canvas children to an element
 * Flips one canvas transform horizontally.
 * Takes image from URL and draws it on both canvases
 * Toggles between canvases every second using CSS visibility
 * @param {*} hostElement 
 * @param {*} imgURL 
 * @param {*} width 
 * @param {*} height 
 */
function imageFlipper(hostElement, imgURL) {
    const img = document.createElement('img');
    img.src = imgURL;
    
    const canvasA = document.createElement("canvas");
    const canvasB = document.createElement("canvas");

    canvasA.style.position = "absolute";
    canvasB.style.position = "absolute";

    const drawingContext_a = canvasA.getContext("2d");
    const drawingContext_b = canvasB.getContext("2d");

    hostElement.appendChild(canvasA);
    hostElement.appendChild(canvasB);

    img.addEventListener("load", () => {
        drawingContext_a.drawImage(img, 0, 0)

        flipDrawingContextHorizontally(drawingContext_b,  img.width / 2);
        drawingContext_b.drawImage(img, 0, 0)
    });

    canvasA.width = img.width;
    canvasB.width = img.width;

    canvasA.height = img.height;
    canvasB.height = img.height;
        
    function loop(time = 0, flipped = false) {
        const integerSeconds = Math.floor(time / 1000);
        const isEven = x => x % 2 === 0;
    
        const flip = isEven(integerSeconds) && !flipped;
        const unflip = !isEven(integerSeconds) && flipped;
    
        if (flip || unflip) {
            flipped = !flipped;
        }
    
        if (flip) {
            canvasA.style.visibility = "hidden";
            canvasB.style.visibility = "visible";
        }

        if (unflip) {
            canvasA.style.visibility = "visible";
            canvasB.style.visibility = "hidden";
        }
    
        requestAnimationFrame((time) => loop(time, flipped));
    }

    loop();
}


/**
 * Flips drawing context horizontally around provided x-position
 * @param {*} context 
 * @param {*} around 
 */
function flipDrawingContextHorizontally(context, around) {
    context.translate(around, 0);
    context.scale(-1, 1);
    context.translate(-around, 0);
}


// Molly the cat
const imgURL = "img/molly.png";
const catFlipperDisplay= document.getElementById("catFlipperDisplay");

imageFlipper(catFlipperDisplay, imgURL);
