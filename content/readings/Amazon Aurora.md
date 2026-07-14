---
title: "Amazon Aurora: Design Considerations for High Throughput Cloud-Native Relational Databases"
date: 2026-04-30
labels: ["paper", "distributed systems", ]
summary: "Aurora is a (...)"
authors: "Alexandre Verbitski, Anurag Gupta, Debanjan Saha et al. (2017)"
source: "SIGMOD"
sourceUrl: "https://homepages.cwi.nl/~boncz/lsde/papers/aurora.pdf"
---

## Key concepts for the paper

## "Why is it (Aurora) needed"

As part of the use-case above, most people most time operated and worked on their own files, rarely touching other people files. To ensure smooth performance the data access was made cached locally on their machine. The modified/newly created files wouldn't propagate till later. Eg write would be locally initally only. The system is somewhat more "decentralized" in its nature, since local machines still handle the core logic of handling write/read and constructing the file system, the Petal only exposes a lightweight APIs for saving (or rather syncing) the data into seperate centralized storage.


## 10 thousand feet view



## How did the use-case influence the design

## Consistency level


## Tradeoffs made

## Caveats

## Some key quotes

## Low-level implementation

## Real-life example of systems using Aurora
From the general knowledge, some of the internal system used for holding static information (such as inventory information) use Aurora as data storage, however as part of the bigger initiative these systems might end up migrating to DDB; 

Other examples:
* 