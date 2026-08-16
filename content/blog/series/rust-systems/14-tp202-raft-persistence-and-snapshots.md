<!-- TODO: DO NOT INCLUDE IN WEBSITE YET -->

---
title: "#14 - TP 202 Raft Part C: Persistence and Snapshots"
description: "Making Raft survive restarts — persisting state to stable storage, implementing InstallSnapshot RPC, and log compaction via snapshots."
date: 2026-08-16
seriesOrder: 14
tags: ["rust", "talent-plan", "distributed-systems", "raft", "persistence", "tp202"]
---

## Overview

**Course**: TP 202 — Distributed Systems in Rust
**Lab 2C**: Persistence and Snapshots

**Task**: Add persistence so that Raft nodes can recover from crashes and resume. Implement snapshot-based log compaction so that logs don't grow without bound.

## Key Concepts

### Persistent State

TODO — currentTerm, votedFor, log[] must survive restarts

### Snapshots & Log Compaction

TODO — InstallSnapshot RPC, discarding prefix of log

### Recovery

TODO — replaying from persisted state

## Implementation

TODO

## Notes & Takeaways

TODO
