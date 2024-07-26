import { Vector2 } from "./src/vector2.js";


const randomRGBString = () => `rgb(${64 + Math.random() * 192}, ${64 + Math.random() * 192}, ${64 + Math.random() * 192})`


const surveyResults = [
    {name: "Satisfied"  , count: Math.random(), color: randomRGBString()},
    {name: "Neutral"    , count: Math.random(), color: randomRGBString()},
    {name: "Unsatisfied", count: Math.random(), color: randomRGBString()},
    {name: "No comment" , count: Math.random(), color: randomRGBString()}
];


const drawingContext = document.getElementById("pieChartCanvas").getContext("2d");


function chartTest() {
    for (let result of surveyResults) {
        const countRandomDrift = (Math.random() - 0.5) * .001;
        const countWobble = Math.sin(Date.now() * 0.002) * 0.002

        result.count = Math.max(0, result.count + countRandomDrift + countWobble);
    } 

    drawPieChart(surveyResults, drawingContext);
    requestAnimationFrame(chartTest);
}


function drawPieChart(results, ctx) {
    const canvasCenter = new Vector2(ctx.canvas.clientWidth / 2, ctx.canvas.clientHeight / 2);
    const pieRadius = Math.min(canvasCenter.x * 0.9, canvasCenter.y * 0.9);
    const labelSpacingPercentage = .1;

    const resultsTotal = results.reduce((sum, {count}) => sum + count, 0);
    const startingAngle = -0.5 * Math.PI;

    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);

    let currentAngle = startingAngle;

    for (let result of results) {
        const sliceAngle = (result.count / resultsTotal) * 2 * Math.PI;

        ctx.beginPath();
        ctx.arc(canvasCenter.x, canvasCenter.y, pieRadius, currentAngle, currentAngle + sliceAngle);
        ctx.lineTo(canvasCenter.x, canvasCenter.y);
        ctx.fillStyle = result.color;
        ctx.fill();

        currentAngle += sliceAngle;
    }

    ctx.textAlign = 'center';
    ctx.fillStyle = 'black';

    let fontSize;
    currentAngle = startingAngle;

    for (let result of results) {
        const sliceAngle = (result.count / resultsTotal) * 2 * Math.PI;
        
        // Resetting the font size mid-loop mitigates a side effect issue.
        // If this is not done, font transformations from a very small pie slice will negatively affect the accuracy of the aspect ratio calculation for the next slice
        fontSize = 10;
        ctx.font = `${fontSize}px Courier New`;
        const metrics = ctx.measureText(result.name);
        const textAspectRatio =  metrics.width / fontSize;

        // Font size is calculated by:
        //  1: Finding the largest circle that fits within the given pie slice
        //  2: Calculating the height of the largest rectangle that fits within that circle whose aspect ratio matches the input text

        const clampedSliceAngle = Math.min(sliceAngle, Math.PI);
        const textWindowRadius = (Math.sin(clampedSliceAngle * 0.5) / (Math.sin(clampedSliceAngle * 0.5) + 1)) * pieRadius;
        
        let textPosition;
        
        if (results.length > 1) {
            textPosition = new Vector2(Math.cos(currentAngle + sliceAngle * 0.5), Math.sin(currentAngle + sliceAngle * 0.5))
                .mult(pieRadius- textWindowRadius)
                .add(canvasCenter);

            fontSize = Math.sin((Math.atan(1 / textAspectRatio))) * textWindowRadius * (2 - labelSpacingPercentage * 2);
        } else {
            textPosition = canvasCenter;
            fontSize = 2 * pieRadius * (1 - labelSpacingPercentage) / textAspectRatio;
        }

        ctx.font = `${fontSize}px serif`;
        ctx.fillText(result.name, textPosition.x , textPosition.y);
        currentAngle += sliceAngle;

        // Visible circle around label is for demonstration purposes
        ctx.beginPath();
        ctx.arc(textPosition.x, textPosition.y, textWindowRadius, 0, 2 * Math.PI);
        ctx.lineWidth = 5;
        ctx.strokeStyle = 'red'
        ctx.stroke();
    }

}

chartTest();
