import { Vector2 } from "./src/vector2.js";
import { animator } from "./src/animator.js"; 

// Simulation parameters
const grainSize = 10;
const gravityAcceleration = new Vector2(0, 0.2);
const floorHeight = window.innerHeight * (2 / 3);

// Heightmap construction
const heightMapLength = Math.floor(window.innerWidth / grainSize)
const heightMap = Array(heightMapLength);
heightMap.fill(0);

// Grain divs
const sandContainer = document.getElementById("sand-container");
const landedSandContainer = document.getElementById("landed-sand-container");

// Helper functions
const fetchTime = () => new Date().getTime();
const randomRange = (min, max) => Math.random() * (max - min) + min;

// Time vars
const grainEmitterTimeout = 2;
let lastTime;

// Begin animator loop
animator(grainAnimation);

window.addEventListener("mousemove", event => {
    if (fetchTime() - lastTime < grainEmitterTimeout) {
        return;
    }
    lastTime = fetchTime();

    const mousePosition = new Vector2(event.clientX, event.clientY);
    const randomVelocity = new Vector2(randomRange(-5, 5), randomRange(-20, 0));

    const grain = document.createElement('div');

    grain.className = "grain";
    grain.position = mousePosition;
    grain.velocity = randomVelocity;

    grain.style.width = `${grainSize}px`;
    grain.style.height = `${grainSize}px`;
    grain.style.backgroundColor = `rgb(${randomRange(155, 175)}, ${randomRange(155, 175)}, ${randomRange(125, 155)})`;

    sandContainer.appendChild(grain);
});

function grainAnimation(timeData) {
    const [_, deltaTime] = timeData;

    const sand = sandContainer.getElementsByClassName("grain");

    for (const grain of sand) {
        grain.velocity = grain.velocity.add(gravityAcceleration.mult(deltaTime));
        grain.position = grain.position.add(grain.velocity);

        let heightMapIndex = Math.floor(grain.position.x / grainSize);

        // Adjusts final grain position to minimize vertical stacking
        if (heightMapIndex > 0 && heightMapIndex < heightMap.length - 2) {
            if (heightMap[heightMapIndex] > heightMap[heightMapIndex - 1]) {
                heightMapIndex--;
            } else if (heightMap[heightMapIndex] > heightMap[heightMapIndex + 1]) {
                heightMapIndex++;
            }
        }

        const sandElevation = floorHeight - heightMap[heightMapIndex] * grainSize;

        if (grain.position.y > floorHeight || grain.position.y > sandElevation) {
            heightMap[heightMapIndex]++;

            grain.style.transform = `translate(${heightMapIndex * grainSize}px, ${floorHeight - heightMap[heightMapIndex] * grainSize}px)`;

            sandContainer.removeChild(grain);
            landedSandContainer.appendChild(grain);
            
            continue;
        }

        grain.style.transform = `translate(${grain.position.x}px, ${grain.position.y}px)`;
    }
}
