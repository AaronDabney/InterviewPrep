### Exercise 3

**Question:** 

Take a list of 2n real numbers as input. Design an O(n log n) algorithm
that partitions the numbers into n pairs, with the property that the partition
minimizes the maximum sum of a pair. For example, say we are given the
numbers (1,3,5,9). The possible partitions are ((1,3),(5,9)), ((1,5),(3,9)), and
((1,9),(3,5)). The pair sums for these partitions are (4,14), (6,12), and (10,8).
Thus, the third partition has 10 as its maximum sum, which is the minimum
over the three partitions.

**Answer:**

We can achieve this by distributing the value of the array as evenly as possible. This means matching the smallest element with the largest element. The second smallest element with the second largest element. Etc.

- Start with two pointers i and j at either end of the array.
- let pairs = []
- If (i <= j) return pairs.
- Push the pair (S[i], S[j]) to pairs 
- Increment i. Decrement j

