### Exercise 30

**Question:**

You are consulting for a hotel that has n one-bed rooms. When a guest
checks in, they ask for a room whose number is in the range [l, h]. Propose a
data structure that supports the following data operations in the allotted time:

    (a) Initialize(n): Initialize the data structure for empty rooms numbered
    1, 2, . . . , n, in polynomial time.

    (b) Count(l, h):
    time.

    Return the number of available rooms in [l, h], in O(log n)
    (c) Checkin(l, h): In O(log n) time, return the rst empty room in [l, h] and
    mark it occupied, or return NIL if all the rooms in [l, h] are occupied.

    (d) Checkout(x): Mark room x as unoccupied, in O(log n) time.

**Answer:** 

General: Structure is a binary segment tree

1. Initalize(n)

    Initialize the tree with the total range of all rooms. There should be a node for every range and leaf nodes representing individual rooms i.e. ranges such as [4-4] or [2-2]. 

2. Count(l, h): 

    Recursively travel to the node representing your range and check the sumOccupied property of the node. Works for checking room occupancy as well by querying ranges such as [3-3].

3. Checkin(l, h)

    1. Go to the node representing the range of rooms being checked. 
    2. If the range is full, return `null`, else take the left branch if you can (it has available rooms), and go right if you cant. 
    3. Repeat until you arrive at a leaf node. 
    4. Return to the top of the tree and travel back down again to that leaf node again, reducing the occupancy of every node you pass.

4. Checkout(l, h)
    1. Travel to target toom, incrementing occupancy by 1 as you go.
