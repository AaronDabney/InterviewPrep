### Exercise 17

**Question:**

[5] Give an O(n) algorithm that determines whether a given n-node binary tree
is height-balanced (see Problem 3-15).

**Answer:**

    Record max depth recursively O(n)

    Count number of nodes recursively O(n)

    idealMaxDepth = ceiling(log_2(nodes + 1))

    return (max depth === idealMaxDepth)
