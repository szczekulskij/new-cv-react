---
title: "Unpaired Image-to-Image Translation using Cycle-Consistent Adversarial Networks"
date: 2024-01-20
labels: ["paper", "computer vision", "GANs"]
summary: "CycleGAN enables image translation between two domains without paired training examples, using cycle consistency loss to enforce that translating an image to the other domain and back yields the original."
authors: "Zhu et al. (2017)"
source: "ICCV"
sourceUrl: "https://arxiv.org/abs/1703.10593"
---

## Key Ideas

- **Unpaired training**: Unlike pix2pix, CycleGAN doesn't need paired examples (e.g., same scene photographed in summer and winter).
- **Cycle consistency**: If you translate image X→Y and then Y→X, you should get back X. This constraint prevents mode collapse.
- **Two generators, two discriminators**: G: X→Y, F: Y→X, D_X, D_Y.

## Loss Function

Total loss = adversarial loss (both directions) + λ × cycle consistency loss

The cycle consistency loss is simply ||F(G(x)) - x|| + ||G(F(y)) - y||

## Applications

- Style transfer (photos ↔ paintings)
- Season transfer (summer ↔ winter)
- Horse ↔ zebra (the famous demo)
- Medical imaging (my PWS research)

## Personal Notes

I applied this to PWS birthmark research - translating between healthy faces and PWS-affected faces. The main challenge was data quality: medical images have inconsistent lighting and angles, which the model sometimes confuses with domain-specific features. Data augmentation and careful preprocessing helped significantly.
