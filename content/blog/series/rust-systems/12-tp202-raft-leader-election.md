<!-- TODO: DO NOT INCLUDE IN WEBSITE YET -->

---
title: "#12 - TP 202 Raft Part A: Leader Election and Heartbeats"
description: "Implementing Raft consensus in Rust - Part 2A: leader election, heartbeats via AppendEntries RPCs, and handling failures. Based on MIT 6.824."
date: 2026-08-16
seriesOrder: 12
tags: ["rust", "talent-plan", "distributed-systems", "raft", "consensus", "tp202"]
---

## Overview

**Course**: TP 202 - Distributed Systems in Rust (adapted from MIT 6.824)
**Lab 2A**: Leader Election and Heartbeats

**Task**: Implement leader election and heartbeats (`AppendEntries` RPCs without log entries). A single leader should be elected, remain leader when there are no failures, and a new leader should take over when the old one fails.

## Background: The Raft Consensus Algorithm

TODO - what problem does Raft solve, why is it designed to be understandable

Reference: [Raft paper (extended version)](https://raft.github.io/raft.pdf)

## Implementation

TODO

### State Machine & Node Structure

TODO

### Election Mechanics

TODO - terms, timeouts, RequestVote RPC

### Heartbeats

TODO - AppendEntries with no entries as heartbeat

## Notes & Takeaways

TODO
