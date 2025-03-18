### Exercise 7

**Question:** 

Give an efficient algorithm to take the array of citation counts (each count
is a non-negative integer) of a researcher’s papers, and compute the researcher’s
h-index. By definition, a scientist has index h if h of his or her n papers have
been cited at least h times, while the other n − h papers each have no more than
h citations.

**Answer:**

- Sort the array in reverse order.
- Initiate a hRecord of 0.
- As we traverse array, calculate the currentH: min(currentValue, currentIndex + 1)
- Set hRecord to max(hRecord, currentH)

Example:
``` 
    hRecord = 0;
    currentH = undefined;
    6, 6, 6, 4, 3, 2


    hRecord = 1;
    currentH = 1;
    6, 6, 6, 4, 3, 2
    ^

    hRecord = 2;
    currentH = 2;
    6, 6, 6, 4, 3, 2
       ^

    hRecord = 3;
    currentH = 3;
    6, 6, 6, 4, 3, 2
          ^

    hRecord = 4;
    currentH = 4;
    6, 6, 6, 4, 3, 2
             ^


    hRecord = 4;
    currentH = 3;
    6, 6, 6, 4, 3, 2
                ^

    hRecord = 4;
    currentH = 2;
    6, 6, 6, 4, 3, 2
                   ^


Result: h-index = 4
```