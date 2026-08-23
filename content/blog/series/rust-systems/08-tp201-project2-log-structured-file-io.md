<!-- TODO: DO NOT INCLUDE IN WEBSITE YET -->

---
title: "#08 - TP 201 Project 2: Log-Structured File I/O"
description: "Building a persistent key/value store using log-structured storage (bitcask). Serialization with serde, robust error handling, and log compaction."
date: 2026-08-16
seriesOrder: 8
tags: ["rust", "talent-plan", "kv-store", "storage", "tp201"]
---

## Overview

**Course**: TP 201 - Practical Networked Applications in Rust
**Project 2**: Log-Structured File I/O

**Task**: Create a persistent key/value store that can be accessed from the command line.

**Goals**:
- Handle and report errors robustly
- Use serde for serialization
- Write data to disk as a log using standard file APIs
- Read the state of the key/value store from disk
- Map in-memory key-indexes to on-disk values
- Periodically compact the log to remove stale data

## Building Blocks 2 (pre-reading)

Topics: Log-structured file I/O, the bitcask algorithm, Rust error handling, comparing collection types.

TODO - bitcask paper, log-structured merge trees

## Implementation

TODO

### The Bitcask Storage Model

TODO

### Serde & Serialization

TODO

### Log Compaction

TODO

## Notes & Takeaways

TODO
