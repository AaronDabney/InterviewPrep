const testCases = [
    [['a', 'b', 'c']],
    [['a', 'b', 'c'], [1, 2, 3]],
    [['a', 'b', 'c'], [1, 2, 3], ["🌒", "🌓", "🌔"]],
    [[]],
    [[], [], []],
];

const errorCases = [
    [],
    'legumes',
    undefined,
    3,
    Infinity,
    null
];

for (element of testCases) {
    flattenedElement = element.reduce((acc, currentArray) => acc.concat(currentArray))
    console.log('\n' + JSON.stringify(element) + " --> " + JSON.stringify(flattenedElement));
}
