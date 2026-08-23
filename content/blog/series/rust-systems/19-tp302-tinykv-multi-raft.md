<!-- TODO: DO NOT INCLUDE IN WEBSITE YET -->

---
title: "#19 - TP 302 TinyKV Project 3: Multi-Raft KV"
description: "Scaling Raft horizontally - membership changes, leadership transfer, conf changes, region splits, and implementing a basic scheduler (PD)."
date: 2026-08-16
seriesOrder: 19
tags: ["go", "talent-plan", "distributed-systems", "raft", "scheduling", "tinykv", "tp302"]
---

## Overview

**Course**: TP 302 - TinyKV
**Project 3**: Multi-Raft KV

**Tasks**:
- Implement membership change and leadership change to Raft algorithm
- Implement conf change and region split on Raft store
- Implement a basic scheduler (inspired by PD/TiKV scheduler)

This project transforms TinyKV from a single Raft group into a horizontally scalable system with multiple Raft groups managing different key ranges.

## Key Concepts

### Multi-Raft Architecture

TODO - multiple Raft groups, each owning a key range (region)

### Membership Changes (Conf Change)

TODO - adding/removing nodes safely

### Region Split

TODO - splitting a region when it gets too large

### The Scheduler (PD)

TODO - collecting heartbeats, generating scheduling tasks, load balancing

## Implementation

TODO

## Notes & Takeaways

TODO
