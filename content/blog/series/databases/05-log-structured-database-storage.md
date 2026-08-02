---
title: "#05 - Log-Structured Database Storage"
description: "CMU Intro to Database Systems (15-445) — CMU Database Group. Featuring a SingleStore database talk."
date: 2025-02-03
seriesOrder: 5
tags: ["databases", "cmu 15-445"]
---

## (Lecture 4 continuation) Buffer Pools - per db, per table
There are different ways to define buffer pools and what's being kept vs evicted there. We can define them per entirity of db, per a table. In that example we'd have an eviction algorithm running per a buffer pool; 

## (Lecture 4 continuation) Buffer Pools - optimization - pre-fetching
If we're doing something like sequential read, which requires loading all pages into memory - we should pre-fetch these into buffer pools. Example - while the cpu is reading pages 1-4, pre-fetch 5-8, while it's reading 5-8, evict 1-4 and pre-fetch 9-12. (Somewhat like pipelining)

## (Lecture 4 continuation) Buffer Pools - optimization - scan sharing
If we're doing something like sequential read, and another sequential read, that'll look at the same data comes along - keep things in buffer while both of them are executing on the same data pieces to avoid aditional fetches from memory [Few systems support this]


## Log-Structured Storage
Side-note: the book (DDIA) described this way better than the lecture did.

The core flow:
* Buffer incoming writes in memory, keeping them sorted as we go using something like a heap or a balanced tree (e.g. a B-Tree). This in-memory sorted structure is the "memtable".
* Once it grows large enough, convert the in-memory structure into an **SSTable** (Sorted String Table)(conversion is quick since we use heap) and flush it to disk as an immutable file.
* Run a background task combining SSTables into bigger and bigger tables - this is easy to do because (1) SSTables are flushed in historic order and (2) SSTables are sorted. The approach mentioned in the boko/lecture is similar to merge sort
