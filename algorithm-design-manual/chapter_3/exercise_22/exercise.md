### Exercise 22

**Question:**

Design a data structure that supports the following two operations:
• insert(x) - Insert item x from the data stream to the data structure.
• median() - Return the median of all elements so far.
All operations must take O(log n) time on an n-element set.

**Answer:**

This is a stack or binary search tree that has a top level abstraction recording the median.
    

1. If the tree is undefined we initalize the median to a entryCount of 1 and a median of the first items value.
2. If the tree is defined we increment entryCount by 1 and set the new median.

median = (median * entryCount - median) / entryCount + newValue / entryCount

3. Pass value to correct position as normal.

If needed we could record the median at every node in a binary search tree. This would allow us to get the median value of any subtree in O(log(n))
