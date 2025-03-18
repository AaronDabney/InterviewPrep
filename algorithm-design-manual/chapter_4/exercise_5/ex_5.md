### Exercise 5

**Question:** 

The mode of a bag of numbers is the number that occurs most frequently in
the set. The set {4, 6, 2, 4, 3, 1} has a mode of 4. Give an efficient and correct
algorithm to compute the mode of a bag of n numbers.

**Answer:**

- Create map.
- Traverse input array. 
- Set any value that is not already present in the map to 1.
- If value is present, increment its corresponding value in map.
- Use the map to determine which value has the greatest number of occurances (this is the mode)
- Return the mode.

