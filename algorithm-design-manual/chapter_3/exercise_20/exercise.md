### Exercise 20

**Question:** 

Design a data structure to support the following operations:

• insert(x,T) - Insert item x into the set T .

• delete(k,T) - Delete the kth smallest element from T .

• member(x,T) - Return true if x ∈ T .


All operations must take O(log n) time on an n-element set.

**Answer:** 

1. Insert: 

    Every node alongside its value, stores a count of how many children it has +1.

    As a result every sub-tree now has a count of its own nodes to include the root.

    Insertion now must search for the existence of its node before inserting.

    On insertion, we update the count of the nodes we pass through.

2. Delete

    Start at the root.

    If K exceeds count of root node we return `null` otherwise k exists.

    As we travel down we narrow down the range of smallest numbers using the node counts until we arrive at the kth smallest.

    We mark the current node for deletion if:
    
        The (upper end of the left childs range + 1) === k OR (lower end of the right childs range + 1) === k

        OR 

        Current node count is 1

    
    Then we return to the root, descend tree by value, and decrement the count of each node as we descend until we delete the returned node.


    Example:

    `left child <--- (nodeValue, subTreeCount) ---> right child`

     `k = 4`

    `(2, 4) < --- (5, 8)--- > (7, 4)` `currentRange = [1, 9]`

    `leftChildRange = [1, 4]` // Updating right value of range by subtracting (count of right child + 1);
    
    `rightChildRange = [6, 9]` // Updating left value of range by adding (count of left child + 1);

     If the rightside of left child range or

     Since the left range [1, 4] contains our target we continue left.

    `(1, 1) < --- (2, 4)--- > (3, 2)` `currentRange = [1, 4]`

    `leftChildRange = [1, 1]` // Updating right value of range by subtracting (count of right child + 1);
    
    `rightChildRange = [3, 4]` // Updating left value of range by adding (count of left child + 1);

     Since the right range [3, 4] contains our target we continue right.

    `undefined < --- (3, 2)--- > (1, 4)` `currentRange = [3, 4]`

    `leftChildRange = undefined` // We may not continue left. Undefined is considered to have a count of zero.
    
    `rightChildRange = [4, 4]` // Updating left value of range by adding (count of left child + 1);

     Since the right range [4, 4] contains our target we continue right.

    `undefined < --- (4, 1)--- > undefined` `currentRange = [4, 4]`

    Condition (nodeCount === 1) is fullfilled. Perform conventional delete operation on value of node decrementing the node counts as we descend.


3. Member

    Works identical to regular binary tree search.

