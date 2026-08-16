---
title: "#11 - Sorting & Aggregation Algorithms"
description: "Sorting data that doesn't fit in memory with external merge sort, plus how databases execute aggregations using sorting and hashing."
date: 2025-03-17
seriesOrder: 11
tags: ["databases", "cmu 15-445"]
---
### Assumption:
These lectures and the following sorting & aggregation algorithms will optimize for sequential IO rather than O(n) notation. Why? Because we work under the assumption that entire working set (eg. all of DB data), and further more even intermediate data won't fit in all of memory, and we'll need to perform a lot of I/O. 

### Sorting
We cover sorting first, because other than naive "ORDER BY" SQL, it also makes other operations such as "GROUP BY" or "DISTINCT" trivial once data has been sorted (quick reminder: We keep data sorted by indices, but we might want to sort by a different field for which we don't have a primary or secondary index).

