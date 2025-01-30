### Exercise 19

**Question:** 

Suppose you have access to a balanced dictionary data structure that sup-
ports each of the operations search, insert, delete, minimum, maximum, suc-
cessor, and predecessor in O(log n) time. Explain how to modify the insert
and delete operations so they still take O(log n) but now minimum and max-
imum take O(1) time. (Hint: think in terms of using the abstract dictionary
operations, instead of mucking about with pointers and the like.)

**Answer:** 

General changes
- At the top level of the dictionary abstraction we store the current max and min

Insertion
1. On insert, if our input value crosses below our current min or above our max we record it.

Deletion 
1. On deletion we compare the value we're deleting to the current min and max. 
2. If we're deleting either we use sucessor commands for min and predecessor for max to locate the new max or min should it exist.
3. If it doesn't exist then we are deleting the last element and min and max are undefined.
