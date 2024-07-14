const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext('2d');

const spacing = canvas.width / 6;

function trapezoid(ctx, transform, topWidth, bottomWidth, height) {
    ctx.save();

    ctx.translate(transform.x, transform.y)
    ctx.rotate(transform.rotation)

    const path = new Path2D();
    path.moveTo(-topWidth / 2, -height / 2);
    path.lineTo( topWidth / 2, -height / 2);
    path.lineTo( bottomWidth / 2, height / 2);
    path.lineTo(-bottomWidth / 2, height / 2);
    path.closePath();

    ctx.stroke(path);

    ctx.restore();
}

function square(ctx, transform, size, color) {
    ctx.save();

    ctx.translate(transform.x, transform.y);
    ctx.rotate(transform.rotation)

    const dist = size / 2

    const path = new Path2D();
    path.moveTo(-dist, -dist);
    path.lineTo( dist, -dist);
    path.lineTo( dist,  dist);
    path.lineTo(-dist,  dist);
    path.closePath();
 
    ctx.fillStyle = color;
    ctx.fill(path);

    ctx.restore();
}

function zigZag(ctx, transform, width, height, iterations) {
    ctx.save();

    ctx.translate(transform.x, transform.y)
    ctx.rotate(transform.rotation);

    ctx.beginPath();
    ctx.moveTo(-width / 2, height / 2);

    for (let i = 1; i < iterations; i++) {
        ctx.scale(1, -1)
        ctx.lineTo((i / iterations) * width - width / 2, height / 2);
    }

    ctx.stroke();
    
    ctx.restore();
}

function spiral(ctx, transform, size, windings = 3) {
    ctx.save();

    ctx.translate(transform.x, transform.y)
    ctx.rotate(transform.rotation);

    ctx.moveTo(0, 0);

    const iterations = 100;
    for (let i = 0; i < iterations; i++) {
        ctx.rotate((1 / iterations) * Math.PI * 2 * windings);
        ctx.lineTo(0, (i / iterations) * size);
    }

    ctx.stroke();

    ctx.restore();
}

function star(ctx, transform, scale, flareFrequency, color) {
    ctx.save();

    ctx.translate(transform.x, transform.y)
    ctx.rotate(transform.rotation);
    
    const path = new Path2D();
    path.moveTo(scale, 0);
    for (let i = 0; i < Math.PI * 2; i += .01) {
        const radius = (1 - 0.5 * Math.cbrt(Math.abs(Math.sin(i * flareFrequency)))) * scale;
        path.lineTo(Math.cos(i) * radius, Math.sin(i) * radius);
    }
    path.closePath();
 
    ctx.fillStyle = color;
    ctx.fill(path);

    ctx.restore();
}


trapezoid(ctx, {x: spacing, 
                y: 300,
                rotation: 0}, 50, 100, 50);

square(ctx, {x: spacing * 2, 
             y: 300,
             rotation: Math.PI / 4}, 60, 'red')

zigZag(ctx, {x: spacing * 3, 
             y: 300,
             rotation: Math.PI / 2}, 80, 80, 13)

spiral(ctx, {x: spacing * 4, 
             y: 300,
             rotation: 0}, 50);

star(ctx, {x: spacing * 5, 
           y: 300,
           rotation: 0}, 50, 4, 'orange');
