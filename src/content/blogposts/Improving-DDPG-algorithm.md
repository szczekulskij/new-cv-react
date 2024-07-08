---
title: Improving DDPG algorithm
description: DDPG algorithm is a Reinforcement Learning algorithm that is difficult to converge and stabilize. To counteract its weaknesess, we've utilized Stochastic Weighted Averaging (SWA) and One-Cycle Policy.
date: 2020-01-01
tags: ["RL research", "AI", "PyTorch"]
technologies: "PyTorch, Numpy"
GHlink: https://github.com/szczekulskij/DDPG-reconstruction
---

During the process of writing my thesis, I implemented a DDPG (Reinforcement Learning) algorithm using PyTorch improving it by (then) recent breakthroughs in AI, such as Stochastic Weighted Averaging (SWA) and One-Cycle Policy. This lead to a more successful convergence and stability of DDPG, which is most often difficult.