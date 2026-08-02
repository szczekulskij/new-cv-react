---
title: "#03 - Database Storage: Files, Pages, Tuples"
description: "CMU Intro to Database Systems (15-445) — CMU Database Group."
date: 2025-01-20
seriesOrder: 3
tags: ["databases", "cmu 15-445"]
---
### Integration of OS and DBMS
#### Integration of OS and DBMS - filesystem
The core idea that came up is that majority of databases live on top of OS layer, therefore they use OS-exposed interface in form of filesystem to interact and save data in non-volatile memory. There exists some databases like these produced by Oracle which implement their own filesystem; However these DB-specific filesystems only give ~15% increase in performance (at this point neither exact number nor definition of performance are clear), while being "a major engineering effort".

#### Integration of OS and DBMS - scheduling
DBMS can't trust OS to handle all scheduling of writing/reading to non-volatile memory, the interface OS exposes is too simlpe and not aware of DBMS' state or intent; So I assume DBMS skips over the general interface OS exposes, and uses the lowest-level APIs exposed by OS (the ones that give the most control), while DMBS manages batching the read/write and general management of the non-volatie memory (which I assume is at the core of what makes DBMS logically hard).

#### How does DBMS store data in a filesystem
DBMS creates multiple files; Some store data, some metadata (eg. tables). So the mapping of (all db data) <-> single file is untrue. But mapping all tables <-> single file is mostly true (according to chatGPT).

Rather than focusing on OS file, we start the lecture with a new abstraction called "dmbs page"; Which is a singular chunk of bytes used to store data

#### Size of DBMS' pages
As it's often the case, the ideal size of DBMS' pages differs on whether the upstream user of DBMS is write or read-heavy (reminds of conesus algorithm in distributed system, where you can fine tune the count of replicas required for read vs write depending on the use-case). The write heavy workloads are better on DBMS's using small pages (4-16KBs) - because during write we write entire page to a disk - so bytes are stored close to each other. So why not the biggest possible page size? Because too big of a page size and we waste time writing empty data to disk. 

#### How are DBMS' pages stored. Is there order/logic to how they're stored?
There are few options; All of which have their own tradeoffs.
Typical options:
* Heap File Organization - not ordered in any way; Simple; But not very performant
* Tree File Organization - Storing pages in tree structure
* Sequential/Sorted File Organization - 
* Hashing File Organization

#### Heap File Organization
Pages are just simply stored and added one by one. When a new page is added, it's given a new sequential page id. Given a page id, when we need to find its memory location - we go to file's memory location and add (page_id * size of pages) to get memory location of our page's id. The caveat is that we won't always have a single file storing all of single table's data; So to get a page we might need to first look up a directory/map which stores mapping of (1) index ranges to (2) filename. This is however rather simple look up and doesn't change the rest of the logic other than requiring to update/maintain that lookup data and load it/write it to/from non-volatile memory (which come to think might be quite a bit of constant overhead)

#### Page structure
Within the page itself we also store chunks of data, one row at a time, where a row in DBMS' context is often called a "tuple". So how are tuples stored? The naive idea is to store them similary to pages. We assume every tuple is the same size (and add 000s or so offset if they're not) and we insert them one at a time. That however doesn't work well with deletions. In case of a deletion and then re-insertion (say we delete 2nd row, and then in same memory location we add 5th) - the offset calculation doesn't work anymore. Since we want to support deletion and re-inseration, then we can't use simple offset idea that we used for pages organization itself. The simple idea is to store memory pointers of each row in the page in the page's header. Since both header and rows themselves are added, we borrow the idea from OS - and we grow one side of the page with pointers, and we grom from the end of the page with actual tuples.


#### Tuple structure
Key concept: (1) We pre-define the size of each elemnt (eg. color is char(2), zipcode is int etc.) - and we use these as offsets to get us pointers to correct memory location. (2) (due to word-definition in OS and how hardware operate on words) (think Assembly) We add further padding in-between whatever we defined above, so that we always load full words, and we do not have things spanning at the intersection of OS words wasting read/write time (Now that I think of it - it's a tradeoff of speed vs space, but it seems the speed-up is too important here)