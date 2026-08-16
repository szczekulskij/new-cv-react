---
title: "#10 - Latching in Data Structures"
description: "Latches vs locks, and how databases keep shared data structures like B+Trees correct under concurrent access using techniques such as latch crabbing."
date: 2025-03-10
seriesOrder: 10
tags: ["databases", "cmu 15-445"]
---
### The issue we're solving
Is the internal representation of an object "sound" - eg. no pointers pointing to where object was, not is, no segfaults, and so on. 
What's not covered - the logical (business logic) or correctness (read your writes, Linearizability, Causal Consistency). We use word "latches" for former (think workers/threads). And we use locks for latter (think transactions)

Latches are used to protect our in-memory datastructures, workers might require to rollback changes if they can't acquire latches. We won't have a top-view supervisor which keeps track of all workers, therefore each worker needs to self-encapsulate logic on what do when it can't get a latch. And we need that logic to not be blocking and not require deadlock detection & resolution.

### Latch implementation goals
* Small memory footprint
* Fast execution path when no contention
* Decentralized management of latches (as mentioned above)
* Avoid expensive syscalls

### Latch implementation goals