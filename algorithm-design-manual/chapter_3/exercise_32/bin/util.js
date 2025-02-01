function measurePerformance(callback, iterations = 10000) {
    let start = performance.now();

    for (let i = 0; i < iterations; i++) {
        callback();
    }

    let end = performance.now();

    return (end - start) / iterations;
}

module.exports = {
    measurePerformance
}
