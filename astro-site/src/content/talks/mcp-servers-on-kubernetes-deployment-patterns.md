---
title: "MCP Servers on Kubernetes: Deployment Patterns, Scaling, and What Breaks"
description: "Real-world deployment patterns, scaling strategies, and failure modes for running MCP servers on Kubernetes"
date: 2026-06-09
location: "Bengaluru, India"
venue: "Scarlet 2&3"
event: "MCP Dev Summit Bengaluru 2026"
eventLink: "https://mcpbengaluru26.sched.com/event/2NLMh/mcp-servers-on-kubernetes-deployment-patterns-scaling-and-what-breaks-kunal-das-cast-ai"
categories: [MCP, Kubernetes, Deployment, Scaling, AI Infrastructure, DevOps, Platform Engineering]
---

Most MCP talks focus on the protocol or the AI side. This one is about the infrastructure underneath.

I run MCP servers on Kubernetes, and I've hit enough weird failure modes to have opinions about it. This talk covers how to deploy MCP servers as containerized workloads: health checks that actually make sense for long-lived agent connections, resource limits that don't starve your servers mid-conversation, and what happens when an agent decides to call 200 tools in a loop.

I'll walk through deployment patterns I've tested: sidecars vs standalone pods, service mesh routing for multi-tenant setups, and HPA configurations that don't flap every time an agent goes quiet. I'll also cover the stuff that broke: connection drops during rolling updates, memory leaks from unbounded context, and the time a misconfigured liveness probe took down every MCP server in the cluster.

Expect a live demo on a real cluster, real YAML, and zero slides about what MCP stands for.

**Event:** MCP Dev Summit Bengaluru 2026

**Time:** 16:50 – 17:15 IST

**Venue:** Scarlet 2&3
