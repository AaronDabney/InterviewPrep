### Exercise 16

**Question:**

Find the storage efficiency ratio (the ratio of data space over total space)
for each of the following binary tree implementations on n nodes:

    (a) All nodes store data, two child pointers, and a parent pointer. The data
    held requires 4 bytes and each pointer requires 4 bytes.

    (b) Only leaf nodes store data; internal nodes store two child pointers. The
    data held requires four bytes and each pointer requires two bytes

**Answer:** 

(a) 

    4 / (nodes * (pointerSize * 3 + dataSize)) = storageEfficiencyRatio

    storageEfficiencyRatio = 4 / 16

(b) 

I'm assuming the leaves aren't storing pointers.

    leafNodes aprox. =  1/2 * nodes + 1/2

    internalNodes aprox. = 1/2 * nodes - 1/2

    leafNodes * dataSize / (leafNodes * dataSize + internalNodes * pointerSize * 2)

    leafNodes / (leafNodes + internalNodes)

    leafNodes / nodes

    storageEfficiencyRatio = (1/2 * nodes + 1/2) / nodes
    