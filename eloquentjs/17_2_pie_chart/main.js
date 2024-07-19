import { Polygon } from "./src/polygon.js";
import { Vector2 } from "./src/vector2.js";

const surveyResults = [
    {name: "Satisfied", count: 1043, color: "lightblue"},
    {name: "Neutral", count: 563, color: "lightgreen"},
    {name: "Unsatisfied", count: 510, color: "pink"},
    {name: "No comment", count: 175, color: "silver"}
];


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
        let fontSize = 10;

        let centroidRadius = (2 * radius * Math.sin(sliceAngle * 2)) / 6 * sliceAngle;

        let offset = sliceAngle / 2;

        let textRadius = textStartingRadius;

        let textPosition = new Vector2(Math.cos(currentAngle - offset),  Math.sin(currentAngle - offset)).mult(textRadius).add(center);

        let a = new Vector2(0, 0);
        let b = new Vector2(Math.cos(currentAngle) * radius, Math.sin(currentAngle) * radius)
        let c = new Vector2(Math.cos(currentAngle - offset) * radius, Math.sin(currentAngle - offset) * radius)
        let d = new Vector2(Math.cos(currentAngle - sliceAngle) * radius, Math.sin(currentAngle - sliceAngle) * radius)

        let sliceBoundary = new Polygon([a, b, c, d], center);

        drawPoly(sliceBoundary, canvasID)

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


        drawPoly(textBoundary, canvasID)



        ctx.fillText(label, textPosition.x , textPosition.y)


    }
    ctx.stroke()
    function calculateFontTransform(text) {

    }

}


drawPieChart(surveyResults, "pieChartCanvas")

function drawPoly(poly, canvasID) {
    let vertices = poly.worldVertices;

    let canvas = document.getElementById(canvasID);
    let ctx = canvas.getContext("2d");  

    ctx.strokeStyle = 'red'

    ctx.moveTo(vertices[0].x, vertices[0].y);

    for (let i = 1; i < vertices.length + 1; i++) {
        ctx.lineTo(vertices[i % vertices.length].x, vertices[i % vertices.length].y);
    }
}


function isPolygonInPolygon(insidePolygon, outsidePolygon) {

    let polyVertices = insidePolygon.worldVertices;
    //console.log(polyVertices)
    
    for (let i = 0; i < polyVertices.length; i++) {
        if (!isPointInPolygon(outsidePolygon, polyVertices[i])) {
            return false;
        }
    }

    return true;
}

// function isPolygonInCircle(insidePolygon, circle) {

//     let polyVertices = insidePolygon.worldVertices;
    
//     for (let i = 0; i < polyVertices.length; i++) {
//         if (!isPointInCircle(circle, polyVertices[i])) {
//             return false;
//         }
//     }

//     return true;
// }

// function isPointInCircle() {
//     if (point.sub(cirle.position) < circle.radius)
// }

function isPointInPolygon(poly, point) {
    let vertices = poly.worldVertices;
    //console.log(vertices)

    if (vertices.length < 3) {
        throw "This aint no polygon";
    } 
    
    let polyEvals = [];
    for (let i = 0; i < vertices.length; i++) {
       // console.log(vertices[i])
       // console.log(vertices[i])
        polyEvals.push(evaluateEdge(vertices[i], vertices[(i + 1 ) % vertices.length]));
    }

   // console.log(polyEvals)

    return Math.max(...polyEvals) < 0;

    function evaluateEdge(a, b) {
        let result = a.sub(b).perp().norm().dot(point.sub(b).norm());
        //console.log(result)
        return result;
    }
}


// function drawTriangle(triangle, canvasID) {

//     let canvas = document.getElementById(canvasID);
//     let ctx = canvas.getContext("2d");  
//     //ctx.fillRect(0, 0, canvas.width, canvas.height)

//     // let xCenter = canvas.width / 2;
//     // let yCenter = canvas.height / 2;
//     // let center = new Vector2(xCenter, yCenter);
//     // let scale = 10;

//     // let a = new Vector2(1, 3).mult(scale).add(center);
//     // let b = new Vector2(2, -3).mult(scale).add(center);
//     // let c = new Vector2(-5, -3).mult(scale).add(center);

//     ctx.strokeStyle = 'red'

//    // let point = new Vector2(event.x, event.y)

//    let [a, b, c] = triangle;

//    // console.log(isPointInTriangle(point, [a, b, c]))

//     ctx.moveTo(a.x, a.y);
//     ctx.lineTo(b.x, b.y);
//     ctx.lineTo(c.x, c.y);
//     ctx.lineTo(a.x, a.y);
//     ctx.lineWidth = 1;

// }

// function isPointInTriangle(point, triangle) {
//     let [vertexA, vertexB, vertexC] = triangle;
    
//     let a = vertexA.sub(vertexB).perp().norm().dot(point.sub(vertexB).norm());
//     let b = vertexB.sub(vertexC).perp().norm().dot(point.sub(vertexC).norm());
//     let c = vertexC.sub(vertexA).perp().norm().dot(point.sub(vertexA).norm());

//     return Math.max(a, b, c) < 0;
// }
