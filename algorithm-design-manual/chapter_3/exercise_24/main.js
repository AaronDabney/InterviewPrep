function kUnqiueTest(input, k) {
    let map = new Map()

    for (let i = 0; i < input.length; i++) {
        const distance = Math.abs(i - map.get(input[i]));

        if (distance < k) {
            return false;
        }

        map.set(input[i], i)
    }

    return true;
}



let test = [1, 2, 3, 4, 5, 6, 7, 8, 9]
let result = kUnqiueTest(test, 3);

console.log(result)
