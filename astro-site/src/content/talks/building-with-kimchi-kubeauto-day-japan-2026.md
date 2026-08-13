---
title: "Building with Kimchi: An Open Source Approach to Autonomous Coding"
description: "How Kimchi combines a multi-model AI coding agent, open-source inference layer, and spend governance console to make autonomous coding cheaper, controllable, and production-ready."
date: 2026-07-28
location: "Yokohama, Japan"
venue: "The Wharf House Yamashita Koen, Yokohama"
event: "KubeAuto Day Japan 2026"
eventLink: "https://luma.com/kubeautojp"
slides: "https://kunaldas.net/Sessions/2026/kubeautojapan/"
categories: [Kubernetes, AI, Automation, Cloud Native, DevOps, Kimchi, Multi-model AI, Open Source, FinOps]
---

At KubeAuto Day Japan 2026, co-located with KubeCon + CloudNativeCon Japan, I introduced Kimchi — an open-source approach to autonomous coding that routes every task to the right model instead of forcing a single frontier model to do everything.

The talk opened with the real economics behind the $500M AI bill problem: agentic loops, tokenmaxxing, and context abuse are turning coding assistants from flat SaaS seats into uncapped utility meters. I walked through how Kimchi's harness architecture — Planner, Builder, Researcher, Explorer, Reviewer, and Judge roles — auto-routes work to the cheapest capable model, cutting token spend 12× while keeping or improving quality on SWE-bench Pro.

We covered the full stack in one demo story:

- **Multi-model orchestration** — seven specialized roles matched to models like MiniMax M3, Kimi K2.7, and Nemotron-3, with no self-grading.
- **/ferment workflows** — give the agent a project, not a task; it plans phases, executes, grades each milestone, and resumes across sessions.
- **Teleport sandboxes** — close the laptop, the agent keeps running in a persistent cloud sandbox.
- **Spend governance** — org, team, API key, and user-level hard caps that auto-terminate runaway loops.
- **One-command migration** from Claude Code, Cursor, and OpenCode, plus self-hosted VPC deployment for full data sovereignty.

The closing line: "From today, tokens are cheaper." 今日から、トークンはもっと安くなる。
