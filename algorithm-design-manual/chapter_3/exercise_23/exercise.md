### Exercise 23

**Question:**

Assume we are given a standard dictionary (balanced binary search tree)
defined on a set of n strings, each of length at most l. We seek to print out all
strings beginning with a particular prefix p. Show how to do this in O(ml log n)
time, where m is the number of strings.

**Answer:**

Assuming the binary search tree items are strings and organized alphabetically.

Assuming prefix checking a node is a O(l) operation.


1. Navigate the search tree to the first node that contains the prefix. O(llog(n))
2. Recursisvely branch down the subtree from there to all nodes that match the prefix. O(mllog(n))
3. Terminate at non-matches.
3. Push all matches to an output stack. 

O(mllog(n)) = O(llog(n)) + O(mllog(n))
