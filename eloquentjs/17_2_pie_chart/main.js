import { Polygon, drawPoly, isPolygonInPolygon, isPointInPolygon} from "./src/polygon.js";
import { Vector2 } from "./src/vector2.js";

const surveyResults = [
    {name: "Satisfied", count: 1043, color: "lightblue"},
    {name: "Neutral", count: 563, color: "lightgreen"},
    {name: "Unsatisfied", count: 510, color: "pink"},
    {name: "No comment", count: 175, color: "silver"}
];

drawPieChart(surveyResults, "pieChartCanvas");

function drawPieChart(results, canvasID) {
    let canvas = document.getElementById(canvasID);
    let ctx = canvas.getContext("2d");  

    let xCenter = canvas.width / 2;
    let yCenter = canvas.height / 2;

    let center = new Vector2(xCenter, yCenter);

    let total = results.reduce((sum, {count}) => sum + count, 0)
    let startingAngle = -0.5 * Math.PI;

    let currentAngle = startingAngle;

    let radius = Math.min(xCenter / 1.1, yCenter / 1.1);
    
    for (let result of results) {
        let sliceAngle = (result.count / total) * 2 * Math.PI;
        ctx.beginPath();
        ctx.arc(xCenter, yCenter, radius, currentAngle, currentAngle + sliceAngle);
        
        currentAngle += sliceAngle;

        ctx.lineTo(xCenter, yCenter);
        ctx.fillStyle = result.color;
        ctx.fill();
    }
   
    ctx.textAlign = 'center'
    ctx.fillStyle = 'black';

    currentAngle = startingAngle;

    for (let result of results) {
        let sliceAngle = (result.count / total) * 2 * Math.PI;

        let label = result.name;

        currentAngle += sliceAngle;
        let textStartingRadius = radius * 0.66;
        
        let offset = sliceAngle / 2;

        let textRadius = textStartingRadius;

        let textPosition = new Vector2(Math.cos(currentAngle - offset),  Math.sin(currentAngle - offset)).mult(textRadius).add(center);

        let a = new Vector2(0, 0);
        let b = new Vector2(Math.cos(currentAngle) * radius, Math.sin(currentAngle) * radius)
        let c = new Vector2(Math.cos(currentAngle - offset) * radius, Math.sin(currentAngle - offset) * radius)
        let d = new Vector2(Math.cos(currentAngle - sliceAngle) * radius, Math.sin(currentAngle - sliceAngle) * radius)

        let sliceBoundary = new Polygon([a, b, c, d], center);

        drawPoly(sliceBoundary, canvasID);

        let fontSize = 10;
        ctx.font = `${fontSize }px serif`;

        let metrics = ctx.measureText(label);

        let width = metrics.width;
        let height = fontSize;

        let textTopLeft = new Vector2(-width / 2,  -metrics.fontBoundingBoxAscent);
        let textTopRight = new Vector2( width / 2,  -metrics.fontBoundingBoxAscent);
        let textBottomRight = new Vector2( width / 2,  metrics.fontBoundingBoxDescent);
        let textBottomLeft = new Vector2(-width / 2,  metrics.fontBoundingBoxDescent);

        let textBoundary = new Polygon([textTopLeft, textTopRight, textBottomRight, textBottomLeft], textPosition);


        while (isPolygonInPolygon(textBoundary, sliceBoundary)) {
            fontSize += 1;
    
            ctx.font = `${fontSize }px serif`;
            metrics = ctx.measureText(label);

            width = metrics.width;
            height = fontSize;

            textTopLeft = new Vector2(-width / 2,  -metrics.fontBoundingBoxAscent);
            textTopRight = new Vector2(width / 2,  -metrics.fontBoundingBoxAscent);
            textBottomRight = new Vector2( width / 2,  metrics.fontBoundingBoxDescent);
            textBottomLeft = new Vector2(-width / 2,  metrics.fontBoundingBoxDescent);

            textBoundary = new Polygon([textTopLeft, textTopRight, textBottomRight, textBottomLeft], textPosition);
    
            console.log('grow');
        }

        drawPoly(textBoundary, canvasID);

        ctx.fillText(label, textPosition.x , textPosition.y);
    }

    ctx.stroke()

}
