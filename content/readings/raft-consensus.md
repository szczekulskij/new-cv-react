---
title: "In Search of an Understandable Consensus Algorithm (RAFT)"
date: 2025-02-10
labels: ["paper", "distributed systems"]
summary: "RAFT is a consensus algorithm designed to be more understandable than Paxos while providing equivalent strong consistenct guarantees."
authors: "Ongaro & Ousterhout (2014)"
source: "USENIX ATC"
sourceUrl: "https://raft.github.io/raft.pdf"
---

## Key ideas
As I'm reading through more and more distributed papers research a lot of key ideas keep on coming up. This post talks about general ideas I've seen across different papers in context of what Raft does.

### How to replicate
Starting off simply, the first tradeoff most of distributed systems make is how to replicate the state. There are 2 "mainstream" choices here - either

Ensure that backup's entire state always reflects that of the primary as in [The Design of a
Practical System for Fault-Tolerant Virtual Machines](https://pdos.csail.mit.edu/6.824/papers/vm-ft.pdf?utm_source=chatgpt.com). This is a very costly and mostly un-scalable approach that's relatively never used. It's big advantage is the "black-boxness" of it, where it can be applied to any application - even if we only have the binary of it.

A log-replication approach. The approach is based on a key simple idea - if we know all the steps of how we arrived at the current state of the machine, then we can replicate the state at any other machine. Usually to avoid stepping through all log-steps on a cold re-start, systems tend to also store the exact copy of the state at time t, so at time t + &delta we only need to go through subset of log steps. An example of that can be found in Google's [GFS](https://static.googleusercontent.com/media/research.google.com/en//archive/gfs-sosp2003.pdf)


### What level of consistancy
There are entire books written on the levels of consistency and how it ties to the design of our systems.
(TODO: Discuss on level of consistencies, the tradeoffs, some cool known use-cases like Dynamo, DDB or Google's Differential Synchronization. Perhaps do a little spin off into Dynamo's evolution into DDB)

## Low-level details of implementation
- **Decomposition**: RAFT breaks consensus into three sub-problems: leader election, log replication, and safety.
- **Strong leader**: All log entries flow from leader to followers (never the reverse). Simplifies reasoning.
- **Randomized timeouts**: Used for leader election to avoid split votes without complex logic.

## How It Works
- **Leader Election**: Nodes start as followers. If no heartbeat received, a follower becomes a candidate and requests votes. Majority wins.
- **Log Replication**: Leader appends entries to its log, then replicates to followers. Entry is committed once majority acknowledges.
- **Safety**: A candidate can only win election if its log is at least as up-to-date as any majority of nodes.

## Personal Notes
Implemented this for my CSE-224 Dropbox project. The trickiest part was handling network partitions correctly - specifically ensuring that a leader that gets partitioned doesn't keep serving stale reads.
