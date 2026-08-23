---
title: "Attention Is All You Need"
date: 2024-03-15
labels: ["paper", "NLP", "deep learning"]
summary: "Introduces the Transformer architecture, replacing recurrence and convolutions entirely with self-attention mechanisms. The model achieves state-of-the-art on machine translation while being more parallelizable and faster to train."
authors: "Vaswani et al. (2017)"
source: "arXiv"
sourceUrl: "https://arxiv.org/abs/1706.03762"
---

## Key Ideas

- **Self-attention** allows the model to attend to all positions in the input simultaneously, unlike RNNs which process sequentially.
- **Multi-head attention** lets the model jointly attend to information from different representation subspaces at different positions.
- **Positional encoding** is added since the model has no recurrence - uses sinusoidal functions of different frequencies.

## Architecture

The Transformer follows an encoder-decoder structure:
- Encoder: 6 identical layers, each with multi-head self-attention + feed-forward network
- Decoder: 6 identical layers, with an additional cross-attention layer attending to encoder output
- Both use residual connections and layer normalization

## Why It Matters

This paper fundamentally changed NLP and later vision/audio. GPT, BERT, and all modern LLMs are built on this architecture. The key insight is that attention alone (without recurrence) is sufficient for capturing long-range dependencies, and it's much more parallelizable.

## Personal Notes

The positional encoding choice is interesting - sinusoidal functions allow the model to extrapolate to sequence lengths longer than those seen during training. Later work (RoPE, ALiBi) improved on this significantly.
