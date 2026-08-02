---
title: "#04 - Memory Management & Buffer Pools"
description: "What interface did DBMS people come up with for loading from memory - eg. Buffer pools, page tables, and frames. Another lesson on why a DBMS manages memory instead of using hihg-level OS functions, plus low-level details on memory management - buffer replacement strategies/dirty-page eviction."
date: 2025-01-27
seriesOrder: 4
tags: ["databases", "cmu 15-445"]
---

## Loading pages from disk into memory - structure
Firstly let's remember that volatile memory (like RAM) itself is a bunch of 0 and 1s. We design our program to load pages from non-volatile memory into RAM into "frames"; Where frame is the exact same size as a page, so it's a straightforward 1-to-1 mapping. However other than loading in pages, we also need to track: (1) page's memory in RAM and (2) whether page is being used, (3) other metadata like dirty flag (has it been modified). All of these are tracked in a seperate place in-volatile memory called "page table"; While we call the other part of RAM where we load pages into a "Buffer Pool" (or sometimes buffer cache) - where the loaded-in memory pages are stored.

## Naive idea for loading pages from disk into memory
Use OS to do it for us; When DBMS tries to access a page, if it's not in-memory, we'll get a page fault and OS will load it in. This however means, DBMS won't have any information on what pages are loaded in (since that'd be abstracted away from DBMS), therefore we can't optimise DBMS logic. Other than performence, we also run into issues with how to implement transactions and consistency, since OS could flush dirty pages before we want them to be flushed (Again, in this implementation DMBS doesn't have any knowledge on how/which pages OS loads into RAM)

## Better idea: "getting around OS"
First thing during DB start - just mallock all the memory we need for buffer pool and page table - this allows to manage all that memory (say most of available RAM memory) as we wish. The obvious questions is what would happen if another process running on our DB system also asks for a large mallock - won't OS thrash pages for us to free space up for another process? The answer is - yes it would - which would intervene with our maticulous design and assumption - therefore - when running a DBMS on a machine - do not run another system on that machine (good to know!).

## High-level goals when designing algorithms on what to keep and what to evict from the buffer pool 
So as described in the paragraph above, we've decided that just using OS is not the best idea. So we're gonna study design of algorithms for buffer pool management. So what are some high levels goals we want to keep in mind? Also FYI - we call these algorithms "buffer replacement strategies"
* Correctness
* Speed - if the algorihtm is too slow, and it takes orders of magniute more than actual read/write - then it's kind of pointless
* Meta-data overhead - if the algorithm relies on too much extra metadata information in order to keep track and optimize itself, then we're wasting space which itself might be used for more pages (in the worst case scenario, if we're wasting say 80% of space, a brute simple algorithm might just be more efficient)

## Buffer Replacement Strategy - LRU
Like caching or OS - track last time used, and always evict the one that was not used for the longest time

## Buffer Replacement Strategy - Clock
Same as OS's idea, it's an approximation to LRU, where you organize pages in circular manner (think circular linked list), have an extra bit for "was used"; set bit to start with 1; Iterate through one clock cycle and set these to 0 (on what schedule can be discussed separetely), and then if you met bit=0, that means it was not used for a while, so we can delete it. Advantage over previous approach: We don't need to maintain in-order linkedinlist for quick access

The BRS (Buffer Replacement Strategy) algorithms only run when we need to evict something; Both clock and LRU are suspectible to flooding (eg. sequential scan of a table), where both algorithms will effectively evict everything out to make space for loading all pages - but that's not ideal, since we lost for example an already-loaded in "hot" page that might have for example Taylor Swift's newest album url


## Buffer Replacement Strategy - LRU-K
Every algorithm for Buffer Replacement Strategy is trying to simply answer a question: "When is the page going to be used the next time?". If we knew that, then we'd simply evict the page that won't be used again anytime soon and have most optimal algorithm. LRU-K tries to approximate answer to that question, by tracking few last access times for EVERY single page. Then based on these it estimates if the page is gonna be used soon (As an example - if last 5 accesses were all in quick succession one day ago then they probably won't be used soon) [TODO: Need to add lower-level details here]

## Buffer Replacement Strategy - Adaptive Replacement Cache
Considered state of the art; Skipping it since I'm focusing on end-to-end DBMS; Will learn & implement it later as part of Project 1 from CMU

## Buffer Replacement Strategy (concept, not algorithm) - Localization
All of the implementations up to now were abstracting away that DBMS knows what queries are being run. Given the knowlege about query structure, we can on by-query basis decide the eviction strategy

## Buffer Replacement Strategy (concept, not algorithm) - Priority hints
As we'll learn later - we'll use B-tress so store data. Assuming we need to get top pages into memory to get info from them required to go into pages below - then we might as well keep these pages in memory always. So we can add hints/weights to sway our algorithm on what needs to be kept in-memory

## Evicting pages - evicting clean pages vs dirty pages
If page is clean -> can evict
If page is dirty -> need to write to disk both log and page itsel (more on correctness later) -> only then can evict

Since disk writes are expensive, we want to keep most pages clean and easy to evict. DBMS therefore runs a background thread flushing dirty data to risk (also called page cleaning/buffer flushing) (more on that in correctness chapter); 

The background task mention above itself has an inherity tradeoff - we can't spend 100% flushing buffers (0% system performence), nor we shouldn't spend 0% (un-optimal system performence since too many "blocking" evictions). Therefore there is an ideal threshold, and the threshold itself depends on the upstream usage of database; High-end enterprise systems have dynamic thresholds based on algorithms (which itself is a tradeoff, since you're using time/space to run algorithm optimizing the threshold instead of using RAM for storing more pages)