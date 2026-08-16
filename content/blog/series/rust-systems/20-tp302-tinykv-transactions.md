<!-- TODO: DO NOT INCLUDE IN WEBSITE YET -->

---
title: "#20 - TP 302 TinyKV Project 4: Distributed Transactions"
description: "Adding MVCC and distributed transactions to TinyKV — implementing Percolator-style two-phase commit with KvGet, KvPrewrite, KvCommit, KvScan, and rollback."
date: 2026-08-16
seriesOrder: 20
tags: ["go", "talent-plan", "distributed-systems", "transactions", "mvcc", "tinykv", "tp302"]
---

## Overview

**Course**: TP 302 — TinyKV
**Project 4**: Transactions

**Tasks**:
- Implement the multi-version concurrency control (MVCC) layer
- Implement handlers of `KvGet`, `KvPrewrite`, and `KvCommit` requests
- Implement handlers of `KvScan`, `KvCheckTxnStatus`, `KvBatchRollback`, and `KvResolveLock` requests

This is the capstone of TinyKV — adding full distributed transaction support using the Percolator model.

## Key Concepts

### MVCC Layer

TODO — multi-version storage, timestamp-ordered reads

### Percolator in Practice

TODO — comparing with the Rust implementation from TP 202

### Transaction Lifecycle

TODO — begin → prewrite → commit, handling failures and rollbacks

### Lock Resolution

TODO — KvCheckTxnStatus, KvResolveLock for cleaning up stuck transactions

## Implementation

TODO

## Notes & Takeaways

TODO
