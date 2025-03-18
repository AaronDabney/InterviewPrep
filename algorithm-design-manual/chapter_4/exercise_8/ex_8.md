### Exercise 8

**Question:** 

Outline a reasonable method of solving each of the following problems. Give
the order of the worst-case complexity of your methods.

(a) You are given a pile of thousands of telephone bills and thousands of checks
sent in to pay the bills. Find out who did not pay.

(b) You are given a printed list containing the title, author, call number, and
publisher of all the books in a school library and another list of thirty
publishers. Find out how many of the books in the library were published
by each company.

(c) You are given all the book checkout cards used in the campus library during
the past year, each of which contains the name of the person who took out
the book. Determine how many distinct people checked out at least one
book

**Answer:**

(a) 
- Sort the bills by the name of the account holder. 
- Sort the checks by the name of the check author.
- Set pointer i in the bill array to index zero.
- Increment pointer j along check array until we arrive at check author who is alphabetically after the account holder or we arrive at the end of the array. (this means no check was recieved for this bill)
- Move pointer i to the position of pointer j and repeat process.

Explanation: Effectively pointer i and pointer j are moving down their respective arrays and using the properties of their sorted arrays to avoid the need for backtracking.

Time complexity: O(nlogn)

(b) 

- Create a mapping from each publisher of our list to a counter initalized at zero.
- Perform a linear scan of every book in the library list and if our map contains that publisher, we increment the value in the map.
- Return the map.

Time complexity: O(n)

Alternatively, since a physical 'map' doesn't have constant time access, the better solution would be to: 
- Sort the short list of publishers by their name.
- Start traversing down from the top of the book list.
- For each book, consult the list of publishers and stop the publisher list search when we have either found the listed publisher, or arrived at a publisher name that is lexagraphically after the books publisher.
- When we find a match in the publisher list, we increment a counter for that publisher in a  map.
- Return the map

O(n*m)

(c) 

Use a set to record distinct names if you can digitize the book cards but if not:

- Sort the book checkout cards by name.
- Traverse array and count every time the evaluated name changes from one value to a different value.
- Return count.


