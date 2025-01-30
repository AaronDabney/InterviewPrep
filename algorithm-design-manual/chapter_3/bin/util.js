function clamp(value, minimum, maximum) {
    return Math.max(minimum, Math.min(maximum, value));
}

function randomRange(min, max) {
    return Math.random() * (max - min) + min;
}


module.exports = {
    clamp,
    randomRange
}
