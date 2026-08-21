---
title: "Who Owns Your Code? Data Sovereignty in the Age of AI Coding Agents"
description: "How AI coding agents expose your codebase to third-party clouds, and how to reclaim sovereignty with self-hosted, zero-retention architectures."
date: 2026-08-22
location: "Bengaluru, India"
venue: "Vaishnavi Summit, Koramangala"
event: "Cloud-Native & AI Unlocked: Bengaluru Edition"
eventLink: "https://www.meetup.com/cloud-computing-circle/events/315929715/"
slides: "http://kunaldas.net/Sessions/2026/data-sovereignty-ai-coding-agents/"
categories: [AI, Data Sovereignty, Coding Agents, Security, Compliance, Kimchi]
---

Every time an AI coding agent reads your repository, your code travels through infrastructure you don't control. The question isn't whether to use AI coding tools — that ship has sailed. The question is who owns the data that flows through them.

This talk breaks down the three surfaces where code leaks: source code in transit to vendor inference endpoints, context becoming training fuel, and generated code provenance disputes. It covers the regulatory reality of GDPR, India's DPDP Act 2023, and the EU AI Act, and presents a practical four-pillar framework for evaluating any AI coding tool: data residency, zero retention, no training on your data, and full audit trails.

Key topics covered:

- The data exposure surface: where your code goes when an AI agent reads it
- The vendor transparency gap: what Terms of Service don't tell you
- Four pillars of code sovereignty: residency, zero retention, no training, audit trail
- Self-hosted architecture: running the agent, models, and inference inside your VPC
- Multi-model routing without data leakage — all models stay in your perimeter
- Spend governance as data governance: phase-tagged provenance for every LLM request
- A sovereignty checklist to evaluate any AI coding tool before it touches your codebase

Get the [slides here](http://kunaldas.net/Sessions/2026/data-sovereignty-ai-coding-agents/).
