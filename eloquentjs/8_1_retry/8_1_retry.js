class MultiplicationUnitFailure extends Error{};

function primitiveMultiply(a, b) {
    if (Math.random() < 0.20) {
        console.log("Multiplication sucessful!")
        return a * b;
    } else {
        throw new MultiplicationUnitFailure();
    }
}

function reliableMultiply(a, b) {
    while (true) {
        try {
            return primitiveMultiply(a, b);
        } catch (e) {
            if (e instanceof MultiplicationUnitFailure) {
                console.log("Multiplication failed. Trying again..");
            } else {
                throw e;
            }
        }
    }
}

console.log(reliableMultiply(3, 5));

// Sample output: 
// Multiplication failed. Trying again..
// Multiplication failed. Trying again..
// Multiplication failed. Trying again..
// Multiplication sucessful!
// 15
