### Exercise 5

Question: 

We have seen how dynamic arrays enable arrays to grow while still achiev-
ing constant-time amortized performance. This problem concerns extending
dynamic arrays to let them both grow and shrink on demand.

    (a) Consider an underfow strategy that cuts the array size in half whenever
    the array falls below half full. Give an example sequence of insertions and
    deletions where this strategy gives a bad amortized cost.

    (b) Then, give a better underfow strategy than that suggested above, one that
    achieves constant amortized cost per deletion.

Answer: 

    (a/b) With original strategy there is a possibility for repeated additions and deletions of elements near the threshold values causing the array allocation to grow/shrink repeatedly. This could be expensive. It would be better to:

    1. When an addition would exceed the length of the array, double the allocated length.
    2. Only halve the array allocation when the number of occupied elements falls below 1/4 of currently allocated size.
