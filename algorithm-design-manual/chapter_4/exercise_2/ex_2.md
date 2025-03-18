### Exercise 2

**Question:** 

For each of the following problems, give an algorithm that nds the de-
sired numbers within the given amount of time. To keep your answers brief,
feel free to use algorithms from the book as subroutines. For the example,
S = {6, 13, 19, 3, 8}, 19 − 3 maximizes the difference, while 8 − 6 minimizes the
difference.

**Answer:**

(a) Let S be an unsorted array of n integers. Give an algorithm that finds the
pair x, y ∈ S that maximizes |x−y|. Your algorithm must run in O(n) worst-case
time.
- Perform a linear search through the array keeping track of the largest element encountered (x) and the smallest element encountered(y). Return (x, y)

(b) Let S be a sorted array of n integers. Give an algorithm that finds the pair
x, y ∈ S that maximizes |x − y|. Your algorithm must run in O(1) worst-case
time.
- Return (S[Last Index], S[0])

(c) Let S be an unsorted array of n integers. Give an algorithm that nds the
pair x, y ∈ S that minimizes |x − y|, for x != y. Your algorithm must run in
O(n log n) worst-case time.
- Sort the array with quick sort. 
- Perform a linear search evaluating every pair of adjacent elements.
- return the pair of elements that minimizes [S[i] = S[i + 1]]

(d) Let S be a sorted array of n integers. Give an algorithm that finds the pair
x, y ∈ S that minimizes |x − y|, for x != y. Your algorithm must run in O(n)
worst-case time.
- Same as answer to (c) without sorting.

