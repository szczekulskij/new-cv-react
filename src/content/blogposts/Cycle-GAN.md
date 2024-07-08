---
title: Application of CycleGAN to PWS birtmarks removal
description: A research project which utilizes cycleGAN architecture to translate between images of (A) healthy faces and (B) faces affected by PWS (Port Wine Stain Birtmark) and vice-versa
date: 2024-05-01
tags: ["AI applications", "GANs", "cycleGAN", "PyTorch"]
technologies: "PyTorch, Python"
GHlink: https://github.com/szczekulskij/cycleGAN-pws/
---

## Background - PWS birtmarks
Port-Wine Stains (PWS) are birthmarks caused by capillary malformations, appearing as persistent red or purple skin discolorations. PWS are usually present at birth and can occur anywhere on the body, but most commonly on the face, which is the focus of our data.

[add a photo of PWS face from internet]

Treatment for PWS birthmarks often requires multiple laser sessions for cosmetic reduction, with improvement typically around ~60% as measured by the % GCE metric. This can vary depending on factors such as age and gender.

[add a photo of improvement]

## Background - GANs
Generative Adversarial Networks (GANs) are a class of generative AI models used primarily for image generation and synthesis. They have been a significant part of AI advancements for image-related tasks.

## Background - CycleGAN
A specific variant of GANs, known as CycleGAN, is employed for image translation tasks. The translation task involves the conversion back and forth between two different image forms (eg. images distribution). For instance, it can be used for converting between ordinary photographs and monet’s artworks as can be seen on the picture below. For cycleGAN we don't require paired images, since we learn how translate between 2 underlying distributions.

## Background - cGAN
A specific variant of GANs, known as cGAN, is employed for image translation tasks. 


## Problem statements
PWB treatment can be expensive, and the treatment results can vary from person to person depending on multitude of factors described previously. Therefore we'd like to (1) show our patients how their face would look like with PWB removed and (2) accurately predict patient's look post-operation.

## Problem 1 solution - Showing patient how their face would look like with PWB fully removed
### Data gathering
To train cycleGAN for this use-case, we require (1) photos of "healthy" faces without PWB and (2) photos of PWB faces. To gather as much data as possible, we've scraped internet using python and serpapi for (2). For (1) we've utilized already existing dataset of human faces.

### Training cycleGAN
The cycleGAN's architecture follows that of the original paper (https://arxiv.org/pdf/1703.10593) with few caveats listed below. The exact hyperparameters of our cycleGAN's nets can be found in the code linked at the bottom of the page. Training took approximately 3 days at Kaggle's free TPU.

Main differences with the original cycleGAN paper:
* Rather than using patchGAN (eg. discrimnator classifing whether 70 × 70 overlapping image patches are real or fake), we've used a disciminator that looks at the entire image. This was required since disciminator needs to be able to look at the entire face at once.
* To counteract network overfitting due to limited amount of data, we've used data augmentation. Since applying non-differentiable data augmentation results in shift of underlying distribution, we've applied differentiable data augmentations.


## Problem 2 solution - Showing patient how their face would look post treatment
For this task we need to train a cGAN on paired images of (1) patient pre-treatment; (2) patient post-treatment. However there is not enough photos available online or at any single clinic, therefore we're currentely unable to implement and test this solution.



## Final notes
* All the code can be found in the github repo, link included at the bottom of this blog post. 
* For this project we've utilized Kaggle's free TPU. Although it's a great resource, it's still quite limited which resulted in a need for downsizing nr of parameters in our models. In the future we're planning to extend this project by using higher quality resources.
* It'd be interesting to use VITs rather than CNNs for discriminator implementations, since VITs should be able to zoom/focus onto the PWB easier.
* In my opinion, the main bottleneck in extending this research is limited amount of data. As medicine becomes more modarnized and accessible (eg. clinics putting their resources such as photos together), models like the one introduced above will become more and more powerful. Furthermore, doors to new project ideas will open up.

