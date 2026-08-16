---
title: "#09 - Vector Indexes + Inverted Indexes + Skip Lists + Bloom Filters"
description: "Beyond B+Trees: vector indexes for similarity search, inverted indexes for full-text, skip lists for probabilistic ordering, and bloom filters for fast set membership."
date: 2025-03-03
seriesOrder: 9
tags: ["databases", "cmu 15-445"]
---
### What is bloom filter?
It's a probabilistic data structure. Given a key "x" we have 2 ops: 
* insert(x) 
* lookup(x) - check if x exists. Always returns yes if it exists; Often returns no if it doesn't (but not always)

The implementation idea is very slick: one-hot encoding to see whether a key hashes to a location in a bit-map (bitmap is of a limited size so we're hasing from bigger space to a smaller space). We use multiple hashes (say y of them), so given initially empty bitmap of size 1000 - insert(x) might populate y spaces with 1. Then during look up we check if all y spaces are 1. That's where the possible false positives come from (think of when we've insert 250 elements using 4 hashes - most spaces will be occupied, so lookup for most elements will return true.)

### Few other sub-types of bloom filters:
* Counting bloom filter - instead of 0/1 map store a count of occurances - this way we can support deletion of keys (while the og bloom filter didn't support that)
* Cuckoo filter - based on cuckoo hashing


#### Use-case of a bloom filter
A good use-case would be adding a bloom filter on top of each SSTable, where we store it to speed up traversing through SSTables

### Inverted indices
Seperate idea of given a list of text snippets (think articles), we create an inverted index, which is simply a hashmap mapping word:List[articles] where that word occurs


### Vector indices
Simple idea - when doing n-gram or inverted indices, we lose information - and searches such as "Wu Tang" wouldn't match "Wu-TngKlan" (taking really obscure example that can't be solved by simply update in tokenizer to work with "-"). To enable search for these sort of similarities, we often translate both input and search terms into an embedding space using some ML technique. Then we perform search in that embedding space - usually using something like nearest-neighbour classifier. To save on time we'd perform K-means clustering beforehand so we don't have to run nearest-neighbour on entirity of our datasets. Further improvement with its own tradeoffs (think for when there is a lot of clusters so we'd need to compare our search against all of them) - is introducing graphs and graph traversal