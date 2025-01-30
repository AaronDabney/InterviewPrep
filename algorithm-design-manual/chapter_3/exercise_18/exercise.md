### Exercise 18

**Question:** 

Describe how to modify any balanced tree data structure such that search,
insert, delete, minimum, and maximum still take O(log n) time each, but successor and predecessor now take O(1) time each. Which operations have to be
modified to support this?

**Answer:** 

General changes
- We insert prebuilt node objects into the tree instead of values.
- Nodes now store pointers to their predecessor and sucessor.
- Delete and insert need to be modifed.

Insertion
1. On insert, as we travel down the tree, we evaluate every node we pass and determine if our incoming value should replace their current sucessor or predecessor. If so, record/overwrite the pointer in both the passing and passed node.
2. When we arrive at final location of node insertion we evaluate which of the two pointers we're missing (sucessor or predecessor)
3. We fill the missing value with the value of our new direct parent if and only if they are not already our current populated pointer.

Deletion (similar to deletion from a doubly linked list)
1. In the process of deletion, we reference predecessor and sucessor pointers of the node to be deleted. 
2. We set the predecessors sucessor to be the current nodes sucessor.
3. We set the sucessors predecessor to be the current nodes predecessor. 
