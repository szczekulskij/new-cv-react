---
title: "#07 - Database Hash Tables"
description: "Learnt a lot about low-level design of specific hashing implementations; The other half of the lecture focused on how these hashing ties into DBMS"
date: 2025-02-17
seriesOrder: 7
tags: ["databases", "cmu 15-445"]
---
### Hash functions - requirements
* We want it to be quick - we care about speed;
* Space matters too - since this will live in RAM (Therefore we're mapping larger space into - therefore we need to have a hash function which can handle hash colission)
* We don't about cryptographic safety or reversebility of hash function


### Hash functions - linear probe hashing (static hashing - requires resizing)
Insertion looks like below:
```
1. hash = calculate_hash(entry)
2. if no collision (eg. entry in hash table is free):
    insert (entry, pointer) into hashTable at the hash
3. if colission:
    traverse down hashTable one entry at a time until you find colission free spot
```
Read and deletion will work similarly; Read works because we do not only store a pointer, but we also store entry in the hashTable - allowing us to traverse during the read until we find location where input_entry = (entry, pointer)[0]. We traverse until either we find the key, or we find empty space; The issue with read is that we might have deleted something that created unnecessary space therefore stopping a read early. How do we solve that?
(a) re-hash and move things around during delete (expensive! Nobody does it!)
(b) during delete leave a tombstone, so we know that we should continue scanning during a read (preferred)

(Self-note: Not discussed, but another somewhat of a horrible approach would be not to early-stop on an empty-space; That might have a horrible performance though, and early-stop + tombstone has basically no drawbacks anyway)

Caveat - if we run out of space in hash table, we'll need to re-size (copy hash table into new space in-memory, and re-has elements on by one). This is expensive, so we try to avoid that through creating a big enough of hash table initially; The trigger on that re-sizing is usually the % fullness of hash table, also called a "load factor". Some DBMS's allow users to toy with that "load factor" variable


### Hash functions - Cuckoo hashing (static hashing - requires resizing)
Use multiple hash functions to find multiple (possible) locations in the hash table to insert records
-> On insert - check multiple locations, and pick empty
-> If no location available - evict the element from one of them and then re-hash it to find a new location

Look-ups/deletions are always O(1); Inserts might be more expensive, because might need to do more re-hashes and re-inserts; Good idea because look-ups >> inserts

The algorithm itself behaves differently based on how many hash functions we utilized - this can be mathematically formulated and solved to optimize different workflows

Slower than linear-probing, but a cool concept nevertheless


### Hash functions - dynamic hashing
Advantage - doesn't require expensive re-sizing. Example algorithm: Chained hashing.
If two entries map to the same hash - we simply make a linkedList out of them at that entry; Worst-case we need to travel a long linked-list


### Side-note on DBMS' hash table vs B+ trees and where they fit into DBMS interface abstractions
B+ Trees help the database find where data lives on disk, while hash tables help the database quickly find or organize data that is already being processed in memory.