(1) Show that a + b can be less than min(a, b).

(3) Design/draw a road network with two points a and b such that the fastest
route between a and b is not the shortest route.

(4) Design/draw a road network with two points a and b such that the shortest
route between a and b is not the route with the fewest turns.

(5) The knapsack problem is as follows: given a set of integers S = {s1, s2, . . . , sn},
and a target number T , find a subset of S that adds up exactly to T . For ex-
ample, there exists a subset within S = {1, 2, 5, 9, 10} that adds up to T = 22
but not T = 23. Find counterexamples to each of the following algorithms for the knapsack prob-
lem. That is, give an S and T where the algorithm does not find a solution that
leaves the knapsack completely full, even though a full-knapsack solution exists.

(a) Put the elements of S in the knapsack in left to right order if they fit, that is, the first-fit algorithm.

(b) Put the elements of S in the knapsack from smallest to largest, that is, the
    best-fit algorithm.

 (c) Put the elements of S in the knapsack from largest to smallest.

(6) The set cover problem is as follows: given a set S of subsets S1, . . . , Sm of
the universal set U = {1, ..., n}, find the smallest subset of subsets T ⊆ S such
that ∪ti∈T ti = U . For example, consider the subsets S1 = {1, 3, 5}, S2 = {2, 4},
S3 = {1, 4}, and S4 = {2, 5}. The set cover of {1, . . . , 5} would then be S1 and
S2.

Find a counterexample for the following algorithm: Select the largest subset for
the cover, and then delete all its elements from the universal set. Repeat by
adding the subset containing the largest number of uncovered elements until all
are covered.

(7) The maximum clique problem in a graph G = (V, E) asks for the largest
subset C of vertices V such that there is an edge in E between every pair of
vertices in C. Find a counterexample for the following algorithm: Sort the
vertices of G from highest to lowest degree. Considering the vertices in order
of degree, for each vertex add it to the clique if it is a neighbor of all vertices
currently in the clique. Repeat until all vertices have been considered.

(22) How many words are there in this textbook?

(24) Estimate how many cities and towns there are in the United States.

(28) Is disk drive access time normally measured in milliseconds (thousandths of
a second) or microseconds (millionths of a second)? Does your RAM memory
access a word in more or less than a microsecond? How many instructions can
your CPU execute in one year if the machine is left running all the time?

(32) Write a function to perform integer division without using either the / or *
operators. Find a fast way to do it.