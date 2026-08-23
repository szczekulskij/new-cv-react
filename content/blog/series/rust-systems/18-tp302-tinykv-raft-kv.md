<!-- TODO: DO NOT INCLUDE IN WEBSITE YET -->

---
title: "#18 - TP 302 TinyKV Project 2: Raft KV"
description: "Building a fault-tolerant KV on Raft - implementing basic Raft, building a replicated state machine, and adding log GC and snapshots."
date: 2026-08-16
seriesOrder: 18
tags: ["go", "talent-plan", "distributed-systems", "raft", "kv-store", "tinykv", "tp302"]
---

## Overview

**Course**: TP 302 - TinyKV
**Project 2**: Raft KV

**Tasks**:
- Implement the basic Raft algorithm (leader election, log replication)
- Build a fault-tolerant KV server on top of Raft
- Add support for Raft log garbage collection and snapshot

This is the core of TinyKV - turning a standalone KV into a replicated, fault-tolerant system.

## Key Concepts

### Raft in Go vs Rust

TODO - comparing this implementation to TP 202

### Raft Log GC

TODO - preventing unbounded log growth

### Snapshot Support

TODO - InstallSnapshot for bringing new/slow nodes up to date

## Implementation

TODO

## Notes & Takeaways

TODO
