### Exercise 6

**Question:** 

Suppose you seek to maintain the contents of a refrigerator so as to minimize
food spoilage. What data structure should you use, and how should you use
it?

**Answer:**

A priority queue is a good option.

A normal queue might take insertion order into the fridge into account but not the fact that certain items would expire faster than others.

1. We order the priority queue by expiration date.
2. When deciding what to cook we evaluate the element closest to expiration to include in a recipe.
3. We then evaluate the set of all recipes we can make the with that element and our other currently stocked ingredients.
4. From those recipes select the one that minimizes this function. (Most ingredients closest to expiration)

![alt text](image-1.png)
