### Exercise 24

**Question:**

An array A is called k-unique if it does not contain a pair of duplicate
elements within k positions of each other, that is, there is no i and j such that
A[i] = A[j] and |j − i| less than or equal to k. Design a worst-case O(n log k) algorithm to test if
A is k-unique.

**Answer:**


1. Create a map (S)
2. Begin iterating over A's indices
3. Get the value of A[i]
4. j = S[A[i]].

    (a) if j = undefined, assign S[A[i]] = i;

    (b) else If dist(i, j) <= k, return false

    (c) else S[A[i]] = i;

5. return true;

See implementation in main.js
