### Exercise 4

**Question:** 

Assume that we are given n pairs of items as input, where the rst item
is a number and the second item is one of three colors (red, blue, or yellow).
Further assume that the items are sorted by number. Give an O(n) algorithm
to sort the items by color (all reds before all blues before all yellows) such that
the numbers for identical colors stay sorted.

**Answer:**

- Travel through array once. Pushing reds, blues, and yellows to their own stack
- Concatenate the red, blue, and yellow arrays.
