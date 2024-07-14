let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext('2d');

let spacing = canvas.width / 6;

trapezoid(ctx, {x: spacing, 
                y: 300,
                rotation: 0},
                40, 80, 50);

square(ctx, {x: spacing * 2, 
             y: 300,
             rotation: Math.PI / 4},
             60);

//square(ctx, new Vector2(spacing * 2, 300), Math.PI/4, 60);

zigZag(ctx, new Vector2(spacing * 3, 300), Math.PI/2, 80, 80, 13);

spiral(ctx, new Vector2(spacing * 4, 300), 0, 50);

star(ctx, new Vector2(spacing * 5, 300), 0, 50, 4);


function trapezoid(ctx, transform, topWidth, bottomWidth, height) {
    ctx.save();

    ctx.translate(transform.x, transform.y)
    ctx.rotate(transform.rotation)
    
    let path = new Path2D();
    path.moveTo(-topWidth / 2, -height / 2);
    path.lineTo( topWidth / 2, -height / 2);
    path.lineTo( bottomWidth / 2, height / 2);
    path.lineTo(-bottomWidth / 2, height / 2);
    path.closePath();

    ctx.stroke(path);

    ctx.restore();
}

function square(ctx, position, rotation, size, color = 'red') {
    ctx.save();

    ctx.translate(position.x, position.y);
    ctx.rotate(rotation)

    let dist = size / 2

    let path = new Path2D();
    path.moveTo(-dist, -dist);
    path.lineTo( dist, -dist);
    path.lineTo( dist,  dist);
    path.lineTo(-dist,  dist);
    path.closePath();
 
    ctx.fillStyle = color;
    ctx.fill(path);

    ctx.restore();
}

function zigZag(ctx, position, rotation, width, height, iterations) {
    ctx.save();

    ctx.translate(position.x, position.y)
    ctx.rotate(rotation);

    ctx.beginPath();
    ctx.moveTo(-width / 2, height / 2);

    for (let i = 1; i < iterations; i++) {
        ctx.scale(1, -1)
        ctx.lineTo((i / iterations) * width - width / 2, height / 2);
    }

    ctx.stroke();
    
    ctx.restore();
}

function spiral(ctx, position, rotation, size, windings = 3) {
    ctx.save();

    ctx.translate(position.x, position.y)
    ctx.rotate(rotation);

    
    ctx.moveTo(0, 0);

    let iterations = 100;
    for (let i = 0; i < iterations; i++) {
        let angle = (1 / iterations) * Math.PI * 2 * windings;
        ctx.lineTo(0, (i / iterations) * size);
        ctx.rotate(angle);
    }

    ctx.stroke();
    ctx.restore();
}

function star(ctx, position, rotation, scale, frequency, color = 'orange') {
    ctx.save();

    ctx.translate(position.x, position.y)
    ctx.rotate(rotation);

    let path = new Path2D();
    path.moveTo(scale, 0);
    for (let i = 0; i < Math.PI * 2; i += .01) {
        let radius = (1 - 0.5 * Math.cbrt(Math.abs(Math.sin(i * frequency)))) * scale;
        path.lineTo(Math.cos(i) * radius, Math.sin(i) * radius);
    }
    path.closePath();
 
    ctx.fillStyle = color;
    ctx.fill(path);

    ctx.restore();
}

