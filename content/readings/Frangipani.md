---
title: "Frangipani: A Scalable Distributed File System"
date: 2026-04-30
labels: ["paper", "distributed systems", ]
summary: "Spanner"
authors: "Chandramohan A. Thekkath et all"
# source: "USENIX ATC"
sourceUrl: "https://www.cs.princeton.edu/courses/archive/fall08/cos597B/papers/frangipani.pdf"
---

## Key concepts for the paper
* Cache coherence - property of a caching system, even if I have an older version of something, if somebody else modifies in their cache, then my cache will automatically reflect that update.
* Distributed transactions & crash recovery 

## "Why is it (Fran-gipani) needed"
The use case behind Fran-gipani is somewhat funny. It was initially developed for resesarchers so they can have a shared file system where when one person made an update, the update would be accessible by another person. Also, it's nicely applicable to when we switch workspaces - whether you sat at the library, or your personal office - you'd have access to the shared directory. The idea itself reminds of me dropbox, or the infrustructure at either of the univeristies I've attended (and my high school).

As part of the use-case above, most people most time operated and worked on their own files, rarely touching other people files. To ensure smooth performance the data access was made cached locally on their machine. The modified/newly created files wouldn't propagate till later. Eg write would be locally initally only. The system is somewhat more "decentralized" in its nature, since local machines still handle the core logic of handling write/read and constructing the file system, the Petal only exposes a lightweight APIs for saving (or rather syncing) the data into seperate centralized storage.


## 10 thousand feet view
Let's imagine application running on your personal laptop - vim editor, word, compiler, etc. Imagine these applications try to write/read a file and make a system call.
In contrast to normal server, in this paper a Frangipani module running as part of OS, will intercept that call. From application perspective everything is as normal - it's still
able to write/read file; However from data storage perspective Frangipani has obfuscated the fact that data might live at a different machine, or has been distributed between machines.

The actual software responsible for managing the metadata about files and their distribution runs as a seperate service called Petal



## How did the use-case influence the design
Since want quick local performance -> we write locally and only later sync -> we require local machine to handle majority of core filesystem logic.
We write locally and only later sync -> how do we handle two people writing to same directory/file at the same time? This smells like requiring some sort of automatic (or maybe user-prompted?) resultion (which is simple for seperate addition of new files, but way more complex for 2 parallel modifications of the same binary)

## Consistency level
(Prepping for interview - will continue soon)


## Tradeoffs made

## Caveats


## Some key quotes


## Low-level implementation


## Real-life example of systems using Frangipani
