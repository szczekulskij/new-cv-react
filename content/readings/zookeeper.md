---
title: "ZooKeeper: Wait-free coordination for Internet-scale systems"
date: 2026-05-16
labels: ["paper", "distributed systems"]
summary: "Zookeper is a distributed coordination service which handles a lot of distribtued system application workload and logic out of box. It works for specific use-cases."
authors: "Ongaro & Ousterhout (2014)"
source: "USENIX ATC"
sourceUrl: "https://github.com/szczekulskij/CSE-224"
---

## "Why is it (Zookeper) needed"
Building raft (or pasox or so on) into your application to support making your system distributed is a huge overhead. Zookeper aims to *partially* solve that overhead by providing an out-of-box implementation with certain interfaces. Tradeoff (which is often the case with frameworks) is that we're losing on application-specific logic/optimization. Furthermore, Zookeper implements a specific kind of consistency which won't fit all applications.

## Key promises of Zookeper
* Wait-free - operation can complete without being blocked indefinitely by failures (see network partitions, servers going down)
* high-performance (more servers = more supported throughput) for both read and write heavy application  Scaling linearly ?
* Fifo execution of writes and reaads
* Linearizability with respect to writes
* Extendable to a lot of disitrbuted system use-cases (this strongly guided the API interface design) 
    Quoted in paper:
    * queueing service → message queues
    * lock service → distributed locks
    * naming service → service discovery
    * config service → configuration storage
    * election service → leader election

## Consistency level
Despite distributed nature, zookeper promises linearizability with respect to writes as well as FIFO execution of writes/reads\*. Zookeper promises ordered reads across all servers/nodes, but sometimes zookeper will serve a stale data. This has to do with an implementation, where consensus algorithm is triggered during write, but read is `local` - eg. server/node simply returns current state of ddb without checking with other servers. This generally makes read very quick. 

One sample which zookeper doesn't handle is read-my-own-write consistency, but it exposes a specific seperate sort of `ad-hoc` API called sync to solve this issue (more on that later)

Zookeper also promises FIFO reads - meaning a 2nd read will always have all log-entires like the 1st read and potentially more. \*\*

*Side-note: This level of consistency is stronger than `eventual consistency` where reads can happen out of order or data can diverge, but eventually all data converges.*

\* - It's not straightforward to understand how is that achieved since as paper notes clients can send asynchronous requests (eg. requests without waiting for an ack from server). We can imagine that clients for example specify timestamp as part of their request for Zookeper to achieve it

\*\* - This could be (?) achieved by sticky-session and sending a request to same replica always, that however doesn't handle servers going down. In Zookeper implementation, this is solved by retuning a z-index of newest log as part of response to client, and on client-side adding that z-index during a request to get data. This together with a point above, means clients are AT LEAST responsible for providing timestamps during writes and z-indexes during reads in their requests.

## How the key promises of Zookeper are tighted to its design
*Side-note: It's hard to say whether the key promises of Zookeper guided it's design, or whether the bottlenecks and limitations of distributed systems guided design which then in part influenced promises.*

## Tradeoffs made
* No linearizability with respect to reads, clients can read stale data
* Linearizability with respect to writes means that we have a hard threshold limiting how many writes we can do, no matter how many servers we add.

## Caveats
* Zookeper exposes a seperate specific API called sync, which promises that after using it we'll get the read which WILL include


## Some key quotes
> The ZooKeeper service comprises an ensemble of servers that use replication to achieve high availability and performance. Its high performance enables applications comprising a large number of processes to use such a coordination kernel to manage all aspects of coordination.
Replication for high availability. In its definition Zookeper is a coordination kernel running at each server, used to manage the overall state of entire application (like who is the current leader, which partition service belongs to and so on)

>


## Low-level implementation

## Real-life example of systems using Zookeper  
