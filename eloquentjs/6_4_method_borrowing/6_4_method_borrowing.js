const hasOwnPropertySymbol = Symbol("hasOwnProperty");

let map = {one: true, two: true, hasOwnProperty: true};

Object.prototype[hasOwnPropertySymbol] = Object.hasOwnProperty;
console.log(map[hasOwnPropertySymbol]("one")); // true

// Alternate solution using the .call method
console.log(Object.hasOwnProperty.call(map, "one")) // true
console.log(Object.hasOwnProperty.call(map, "two")) // true
console.log(Object.hasOwnProperty.call(map, "goo")) // false
