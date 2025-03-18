### Exercise 1

**Question:** 

The Grinch is given the job of partitioning 2n players into two teams of n
players each. Each player has a numerical rating that measures how good he or
she is at the game. The Grinch seeks to divide the players as unfairly as possible,
so as to create the biggest possible talent imbalance between the teams. Show
how the Grinch can do the job in O(n log n) time.

**Answer:**

1. Sort the players by numerical rating using an nlog(n) algorithm like quicksort.
2. Divive the teams into two teams of n along the middle index of sorted players.