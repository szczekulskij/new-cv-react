---
title: "#08 - B+Trees: The Best Data Structure in the World"
description: "B+Trees, the workhorse index of databases: how they stay balanced, why they're built for disk-based storage, and how they power range scans and point lookups."
date: 2025-02-24
seriesOrder: 8
tags: ["databases", "cmu 15-445"]
---
### Side-note on DBMS' indexes (personal)
If we do a query on userId=100 and userId is an index - it's quick; Because we store the table in such a way (using B+ trees), that we only need to traverse O(log N) pages where N=# pages;

However if we do a query on userName=John, and userName is not an index (*and we use tuples)- we basically need to perform scan of the entire table, since DBMS has no idea which page would have John

DBMSes usually support multi-indexing, where the same table can be sorted "twice" in memory using 2 seperate B+ trees; The more indexes the more re-balancing on B+ trees on insertion though



### B+ tree vs SSTables
When we look for an index, we don't know on which page is it stored; Similarly when we look for a range of indices - we do not know which pages we need to look up. Naive idea would be to store these sequentially - but then we need to re-size and move things around when a place in-between 2 entries varies; Other idea was SSTable, while good for heavy writes workload - duplicate elements and larger/more in non-voliate memory data structure makes both (1)point reads and (2) scans slower. SSTable is generally used for NoSQL like DDB (although DDB paper only mentions they use log-structured storage techniques - no exact quote of using SSTable)

B+ trees over SSTables (which generally compares page-oriented storage vs log-oriented storage):
* Pro - good point queries (but probably not that much better than SSTables)
* Pro - amazing scan queries (way better than SSTables)
* Con - way worse writes comapred to SSTables

### Where does B+ tree fit into DBMS
They help eficiently answer the question of "How can we find a record on disk while performing as few disk page reads as possible?"
It's somewhat of a structure to help traverse and find the right pages and help guide inserts in such as a way that ids stay next to each other

While initially when DMBS is populated the ids might be stored sequentially and I/O is easily to be batched, over time, records with nearby keys could end up stored on different pages, making range scans less efficient - B+ trees guide inserts so that keys remain in sorted order across leaf pages

Also, think about non-incremental indices like indexing on a name - we need a way to insert that in a balance way to maintain sorted order; Just inserting one at a time doesn't work

### B+ Trees workings
Some basics:
* Large fan-out
* Perfectly balanced (every leaf-node has the same depth) 
* Every node other than the root is at least half-full
* Why B+ trees ? -> Makes I/O sequential