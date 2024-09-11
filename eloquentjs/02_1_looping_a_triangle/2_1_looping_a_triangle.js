/**
 * Draws a right triangle utilizing the += operator
 * @param {*} height 
 */
function drawTriangle(height) { 
    if (isNaN(height)) {
        throw "Triangle height cannot be NaN";
    }
    if (height <= 0) {
        throw "Triangle height cannot be zero or less";
    }

    let tri = "\n#\n";
    for (let i = 2; i <= height; i++) {
        for (let j = 0; j < i; j++) {
            tri += "#";
        }
        tri += "\n";
    }
    console.log(tri);
}

/**
 * Draws a right triangle utilizing array join method
 * @param {*} height 
 */
function drawTriangleArrayJoin(height) { 
    if (isNaN(height)) {
        throw "Triangle height cannot be NaN";
    }
    if (height <= 0) {
        throw "Triangle height cannot be zero or less";
    }

    const tri = ["\n","#","\n"];
    for (let i = 2; i <= height; i++) {
        for (let j = 0; j < i; j++) {
            tri.push("#");
        }
        tri.push("\n");
    }
    console.log(tri.join(''));
}

/**
 * Draws a right triangle utilizing combination of array join and repeat function
 * @param {*} height 
 */
function drawTriangleRepeat(height) { 
    if (isNaN(height)) {
        throw "Triangle height cannot be NaN";
    }
    if (height <= 0) {
        throw "Triangle height cannot be zero or less";
    }

    const tri = ["\n","#","\n"];
    for (let i = 2; i <= height; i++) {
        tri.push(('#').repeat(i))
        tri.push("\n");
    }
    console.log(tri.join(''));
}

drawTriangle(7);
drawTriangleArrayJoin(7);
drawTriangleRepeat(7);
