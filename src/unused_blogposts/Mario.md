---
title: Reinforcement Learning in Super Mario
description: Reinforcement Learning (RL) is a type of machine learning where an agent learns to make decisions by taking actions in an environment. In this post, we'll discuss how RL can be applied to a Super Mario game.
date: 2022-01-01
tags: ["Reinforcement Learning", "AI", "Super Mario"]
technologies: "PyTorch, Numpy"
GHlink: https://github.com/szczekulskij/DDPG-reconstruction
---

# Reinforcement Learning in Super Mario

![Mario](./mario.png)

Reinforcement Learning (RL) is a type of machine learning where an agent learns to make decisions by taking actions in an environment. In this post, we'll discuss how RL can be applied to a Super Mario game.

## The Environment

In the context of Super Mario, the environment is the game itself. The agent (Mario) interacts with the environment by performing actions (moving left, right, jumping, etc.) and receives rewards or penalties based on its actions.

![Environment](./environment.png)

## The Agent

The agent is Mario. The agent's goal is to maximize its total reward. It does this by learning a policy, which is a strategy for choosing actions based on the current state of the environment.

## The Reward

The reward is a signal that tells the agent how well it's doing. In Super Mario, the reward could be the game score. The agent's goal is to maximize its total reward over an episode (a single run of the game).

## Reinforcement Learning Algorithm

One common RL algorithm is Q-learning. Here's a simplified version of the Q-learning algorithm:

```python
Initialize Q arbitrarily
Repeat (for each episode):
    Initialize state
    Repeat (for each step of episode):
        Choose action from state using policy derived from Q
        Take action and get reward and next state
        Update Q
    until state is terminal