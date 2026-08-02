---
title: "#06 - Column-Store Databases"
description: "CMU Intro to Database Systems (15-445) — CMU Database Group."
date: 2025-02-10
seriesOrder: 6
tags: ["databases", "cmu 15-445"]
---
### Alternative to tuple-oriented storage - column-oriented storage
We store data instead of one row in consecutive memory on disk -> one column in consecutive memory; 

### Why use column-based storage?
Speeds up certain queries - mostly analytics; Where query all data from 3 columns, but don't need rest of the data;
In tuple-oriented system that'd mean we need to load into disk all tuples, in column-oriented storage we get exactly the data that we need; Furhtermore - in column-oriented storage we have better locality

Further benefit - generally tuples are hard to compress, but column data is usually easily compressable (think temperature over past 300 days - no need to store 78, but only offset off of avg - less bytes)

Drawback - imagine we have 1000 columns, a single write would need to access 1000 pages (more on how to find middle-ground to solve that issue later); Same is true for a single tuple read

### The beauty of interfaces
We change the underlying way we store data - but we can still use same higher-level interfaces which build on top of way we store data (So SQL can be re-used between both :) )

### Different storage models in low-level detail
* N-ray - straight up tuple storage without any advantages/drawbacks explained so fat (and also what majority of what our learning focused on so far)
* DSM - straight up column storage with all advantages/drawbacks explained above (one page always store only one attribute)
* PAX - column-store with a twist : )

### Storage model - PAX
From lecture: "When somebody says they're using a column store, 99% of the time they probably mean they use hybrid approach of PAX"; (That's what parquet implements! That's cool)

The idea is simple - we want to get rid of 1000 attributes split across 1000 pages;
So what we do is we write out data in column-format within a page, and we store say ~50 attributes in a single page. In the mock example that'd reduce that'd mean we store load in unnecessary data during read, but we still achieve 50x less pages loaded in and write means only 20x more pages loaded in. And read also benefits from the locality of data which is huge (perhaps chosen example isn't great, but basically we can tweak the thresold to find a good middle ground)


### Compression
Tradeoff between CPU and RAM usage to perform comperssion vs data saved on disk (and therefore later more eficcient I/O and more free RAM space) (especially useful if you're trying to have entire working set of DB in your RAM)

Some goals of compression:
* (1) Must produce fixed-length values (to allow offset mechanism to work)
* (2) Postpone decompression for as long as possible (we want to run queries on compressed data, so we only de-compress the final minimal required result to save up CPU time)
* (3) Must be lossless scheme


### Compression - page level compression
If we do a page-level compression, then by default we always have to de-compress it before applying updates; 
So, on write - to avoid the above issue (especially bad with "hot pages") - we utilize a write-ahead log. We attach a write-ahead log to each of the pages, and every once in a while, when write-ahead log of a specific page gets full then we: (1) de-compress page; (2) apply changes from write-ahead log; (3) compress back again

On read - we try to first serve from write-ahead log, but if we can't find the entry, then we have to de-compress page; Once decompress, we might as well save CPU cycles and apply write-ahead log's changes.

Write-ahead log is ofc flushed into non-volaite memory (more on using write-ahead log for transactions later)

This approach uses naive compression, in this approach the DDB can't query on the compressed data (Eg. SQL (userId="Andy") isn't possible) - not possible since we're encoding at page-level, so the output is just a un-readeable stream of bytes


### Compression - columnar level compression
Encode columns, save the dictionary output of gzip to enable on-fly decoding and running queries on encoded data; 
Other non-dictionary encoders can be applied as-well; Such as bit-encoding, or run-length encoding - but these are more use-case specific