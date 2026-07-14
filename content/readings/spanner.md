---
title: "Spanner: Google’s Globally-Distributed Database"
date: 2026-05-19
labels: ["paper", "distributed systems"]
summary: "Spanner is Google's globally-distributed, externally-consistent database. It's heavily based on clock synchronization, and solves prominent clock synchronization issue through its novel TrueTime API (GPS + atomic clocks with bounded uncertainty) to assign globally meaningful commit timestamps, enabling (!!!) lock-free consistent reads and distributed transactions, even across datacenters."
authors: "James C. Corbett, Jeffrey Dean, Michael Epstein et al. [Google Inc] (2012)"
source: "OSDI"
sourceUrl: "https://static.googleusercontent.com/media/research.google.com/en//archive/spanner-osdi2012.pdf"
---

## "Why is it (Spanner) needed"
(Prepping for interview - will continue soon)

## Key promises of Spanner

## Consistency level

## How the key promises of Spanner are tighted to its design

## Tradeoffs made

## Caveats


## Some key quotes


## Low-level implementation

## Real-life example of systems using Spanner  
