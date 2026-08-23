<!-- TODO: DO NOT INCLUDE IN WEBSITE YET -->

---
title: "#16 - TP 202 Percolator: Distributed Transactions"
description: "Implementing the Percolator distributed transaction protocol - ACID snapshot-isolation on top of a distributed KV store, two-phase commit with timestamps."
date: 2026-08-16
seriesOrder: 16
tags: ["rust", "talent-plan", "distributed-systems", "transactions", "percolator", "tp202"]
---

## Overview

**Course**: TP 202 - Distributed Systems in Rust
**Lab**: Percolator

**Task**: Implement the Percolator distributed transaction protocol providing ACID snapshot-isolation semantics.

Reference: [Large-scale Incremental Processing Using Distributed Transactions and Notifications (Google, 2010)](https://storage.googleapis.com/pub-tools-public-publication-data/pdf/36726.pdf)

## Key Concepts

### Timestamp Oracle (TSO)

TODO - strictly increasing timestamps, ordering transactions

### The Three Columns (Write, Data, Lock)

TODO - Bigtable-inspired storage model

### Two-Phase Commit in Percolator

TODO - prewrite phase, commit phase, primary/secondary keys

### Snapshot Isolation

TODO - read at start_ts, write at commit_ts, conflict detection

## Implementation

TODO

## Notes & Takeaways

TODO
