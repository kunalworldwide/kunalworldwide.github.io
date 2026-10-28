---
title: "How to Govern AI Even If It's Hard to Predict"
description: "A main-stage talk at India's largest AI conference: three real case files — Samsung, Uber, Microsoft — where AI governance failed, and the one pattern that works: a control plane instead of a ban."
date: 2026-10-07
location: "Bengaluru, India"
venue: "Main Hall 3, KTPO Whitefield"
event: "Cypher 2026"
eventLink: "https://cypher.analyticsindiamag.com/"
slides: "https://github.com/kunalworldwide/Sessions/blob/main/2026/cypher-2026-govern-ai.pdf"
categories: [AI, AI Governance, Coding Agents, FinOps, Data Sovereignty, Kimchi]
---

Cypher 2026, the 10th edition of India's largest AI conference by Analytics India Magazine, drew 5,000+ practitioners to KTPO Whitefield. On the Main Hall 3 stage, I opened three case files that span two years of AI adoption — and one pattern that connects them all.

**Case 001 — Samsung Semiconductor (2023, unrecoverable).** Three leaks in twenty days. Engineers pasted confidential fab code, chip-testing code, and a meeting transcript into ChatGPT. The response: a 1,024-byte prompt cap, then a total ban on generative AI. The data sat on servers they could not control or delete.

**Case 002 — Uber (2026, budget exhausted).** 5,000 engineers, token leaderboards, and a full year of AI budget gone by April. Adoption jumped from 32% to 84% in 30 days; one CTO's two-hour demo alone cost $1,200. Uber now enforces a $1,500 per-engineer monthly cap per AI coding tool.

**Case 003 — Microsoft, Experiences & Devices (2026, licenses cancelled).** The company that knows AI costs best looked at its own invoice and blinked. Claude Code went from preferred tool across Windows, Office, and Surface teams to cancelled licenses on June 30 — the last day of Microsoft's fiscal year. The tell: the decision was as much financial as architectural.

Every response was **restriction** — and that is the pattern. Restriction buys slower teams, the same exposure, and the data that already left does not come back. DLP watches files, email, and USB, but AI exfiltration happens in a paste, inside HTTPS, on a personal account — 89% of enterprise AI usage generates no logs at all.

You cannot predict what AI will do. You can own every decision about how it is used. Governance lives in the **routing**, not on top of it: an orchestrator classifies each task and sends it to the right model, and the routing table becomes your policy — spend caps per user and team, resilience when a model is deprecated, zero model-data egress enforced before the request leaves, and a human-written routing table the system applies on every request.

The India angle: under the DPDP Act, every prompt sent to a foreign model endpoint is a cross-border transfer — and most teams cannot say where theirs goes. Sovereignty becomes a routing rule, enforced in your own cluster.

We built this control plane. It's called Kimchi, and it's open source: an orchestrator classifies and delegates, cheap models handle bulk work, the strongest model reviews every diff, and the spend console puts hard caps and real-time attribution per phase behind every request. The honest limits: evaluation still needs humans, a bad spec routes perfectly, and the Samsung leak already happened — routing prevents the next one.

The precedent is clear — cloud computing already lived this curve: 2006, cloud arrives with no per-team billing; 2012, tags; 2017, policy enforced; 2019, FinOps; 2026, tokens — the same problem with no tags yet.

**Start Monday:** route one real workflow, read the routing table, set one hard cap.

Get the [slides here](https://github.com/kunalworldwide/Sessions/blob/main/2026/cypher-2026-govern-ai.pdf).