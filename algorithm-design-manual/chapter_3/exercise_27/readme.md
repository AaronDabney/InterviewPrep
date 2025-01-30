### Exercise 27

**Question:**

Suppose you are given an input set S of n integers, and a black box that if
given any sequence of integers and an integer k instantly and correctly answers
whether there is a subset of the input sequence whose sum is exactly k. Show
how to use the black box O(n) times to find a subset of S that adds up to k.

**Answer:** 

```
function getSubsetThatAddsToK(numbers, k) {
    let sum = 0; // Sum of digits pushed so far
    let nums = new Set(); // In set

    for (let i = 0; i < numbers; i++) {
        let current = numbers[i];
        if (blackbox(numbers.slice(i + 1, numbers.length), k - sum + current)) {
            nums.add(current)
            sum += current;
        }
    }

    return nums;
}

```
Explanation: 

As we travel along the array, we evaluate "if we add this digit to our set and to our running sum, do the remaining numbers in the input still contain a subset required to meet k?" If yes, we update the sum and push the new subset member to nums. If not, we move to the next number.
