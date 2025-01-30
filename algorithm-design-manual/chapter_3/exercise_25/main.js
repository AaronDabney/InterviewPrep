function bestFitBinPacker(mice) {
    let bins = [];
    for (let mouse of mice) {
        let bestFitIndex;
        let bestFit = 0;

        for (let i = 0; i < bins.length; i++) {
            if (bins[i] + mouse > bestFit && bins[i] + mouse < 1) {
                bestFit = bins[i] + mouse;
                bestFitIndex = i;
            }
        }

        if (bestFitIndex === undefined) {
            bins.push(mouse) // Be careful when pushing mouse
        } else {
            bins[bestFitIndex] += mouse;
        }
    }
    return bins;
}

function worstFitBinPacker(mice) {
    let bins = [];
    for (let mouse of mice) {
        let bestFitIndex;
        let bestFit = 1;

        for (let i = 0; i < bins.length; i++) {
            if (bins[i] + mouse < bestFit) {
                bestFit = bins[i] + mouse;
                bestFitIndex = i;
            }
        }

        if (bestFitIndex === undefined) {
            bins.push(mouse) // Be careful when pushing mouse
        } else {
            bins[bestFitIndex] += mouse;
        }
    }
    return bins;
}


const randomMouseWeight = () => Math.floor((1 + Math.random() * 49)) / 100;

const averageBinRoom = (bins) => bins.reduce((previousValue, currentValue) => previousValue + (1/bins.length) * (1 - currentValue), 0)

let mice = new Array(20000).fill(0).map(randomMouseWeight)

let bestBins = bestFitBinPacker(mice);
let worstBins = worstFitBinPacker(mice);

console.log("Best Bins")
console.log(bestBins)

console.log("Worst Bins")
console.log(worstBins)

console.log("Average Room: Best Bins")
console.log(averageBinRoom(bestBins))

console.log("Average Room: Worst Bins")
console.log(averageBinRoom(worstBins))

console.log("Num bins: Best Bins")
console.log(bestBins.length)

console.log("Num bins: Worst Bins")
console.log(worstBins.length)


// Best Bins
// [
//   0.9900000000000001, 0.9900000000000001,               0.99, 0.9900000000000002,
//                 0.99, 0.9900000000000002,               0.99, 0.9900000000000001,
//                 0.99, 0.9999999999999999,               0.99,               0.99,
//   0.9900000000000001, 0.9900000000000001,               0.99,               0.99,
//                 0.99,               0.99,               0.99,               0.99,
//                 0.99,               0.99,               0.99,               0.99,
//                 0.99, 0.9999999999999999,               0.99,               0.99,
//   0.9999999999999999,               0.99,               0.99,               0.99,
//                 0.99,               0.99,               0.99,               0.99,
//                 0.99, 0.9900000000000001,               0.99,               0.99,
//                 0.99, 0.9999999999999999,               0.99,               0.99,
//                 0.99, 0.9900000000000001,               0.99,               0.99,
//                 0.99,               0.99,               0.99,               0.99,
//   0.9999999999999999,               0.99, 0.9900000000000001,               0.99,
//                 0.99, 0.9900000000000001,               0.99,               0.99,
//                 0.99,               0.99, 0.9900000000000001,               0.99,
//                 0.99,               0.99,               0.99,               0.99,
//   0.9900000000000001,               0.99,               0.99,               0.99,
//                 0.99,               0.99,               0.99, 0.9900000000000001,
//                 0.99,               0.99,               0.99,               0.99,
//   0.9999999999999999, 0.9900000000000001, 0.9999999999999999,               0.99,
//   0.9999999999999999,               0.99,               0.99,               0.99,
//   0.9900000000000001,               0.99, 0.9900000000000001, 0.9900000000000001,
//                 0.99,               0.99,               0.99,               0.99,
//   0.9999999999999999,               0.99,               0.99,               0.99,
//   ... 4955 more items
// ]
// Worst Bins
// [
//                 0.91, 0.8700000000000001, 0.9800000000000001,               0.89,
//                 0.87,               0.91,               0.87,               0.93,
//   0.9299999999999999,               0.87,               0.89,               0.99,
//                 0.99,               0.96,               0.91, 0.9299999999999999,
//                 0.86,               0.89,               0.87,               0.93,
//                 0.99, 0.8500000000000001,               0.97, 0.8500000000000001,
//                 0.98,               0.98, 0.8999999999999999,               0.89,
//   0.9100000000000001, 0.8999999999999999,               0.85,               0.97,
//                 0.98,               0.88, 0.9700000000000001,               0.86,
//                 0.85, 0.9500000000000001, 0.9500000000000001,               0.98,
//   0.9700000000000001,               0.92, 0.9099999999999999, 0.8500000000000001,
//                 0.84,               0.99, 0.8500000000000001,               0.85,
//                  0.9, 0.9299999999999999,               0.88,               0.83,
//                 0.96,               0.87,               0.92,               0.94,
//   0.8400000000000001, 0.8899999999999999, 0.9199999999999999, 0.8800000000000001,
//                 0.98,               0.99, 0.9299999999999999, 0.8300000000000001,
//                 0.99, 0.9600000000000001, 0.9299999999999999,                0.9,
//   0.8999999999999999,               0.96, 0.9400000000000001, 0.9300000000000002,
//                 0.98,               0.94,               0.98,               0.95,
//   0.9099999999999999, 0.8999999999999999, 0.9199999999999999, 0.8800000000000001,
//   0.9199999999999999,               0.96, 0.9199999999999999,               0.96,
//   0.9700000000000001,               0.83,               0.96, 0.8900000000000001,
//                 0.99, 0.9199999999999999,               0.96,               0.99,
//   0.9000000000000001,               0.97,               0.85,               0.92,
//                 0.87, 0.8600000000000001,               0.98,               0.94,
//   ... 5418 more items
// ]

// Average Room: Best Bins
// 0.012787339268051735
// Average Room: Worst Bins
// 0.09562160202972082
// Num bins: Best Bins
// 5055
// Num bins: Worst Bins
// 5518
