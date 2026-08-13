---
title: "Beyond Single-Cluster Limits: Scaling GPU Workloads Across Kubernetes with Virtual Nodes"
description: "How Liqo virtual nodes, Kueue, and plain Kubernetes scheduling unify heterogeneous GPU clusters into one schedulable topology — with honest notes on networking, failure modes, and real production scars."
date: 2026-07-29
location: "Yokohama, Japan"
venue: "Room 5F/502, Pacifico Yokohama"
event: "KubeCon + CloudNativeCon Japan 2026"
eventLink: "https://events.linuxfoundation.org/kubecon-cloudnativecon-japan/program/schedule/"
slides: "https://kunaldas.net/Sessions/2026/kubeconjapan/"
categories: [Kubernetes, GPU, Multi-cluster, Liqo, Kueue, Cilium, AI+ML, Cloud Native, Scheduling, Cost Optimization]
---

Co-presented with [Esmira Bayramova](https://www.linkedin.com/in/esmira-bayramova/) at KubeCon + CloudNativeCon Japan 2026, this 30-minute AI+ML track session tackled the reachability problem behind GPU scarcity: fine-tuning jobs queued for hours while idle H100s sat one region away.

The talk walked through how we unified five heterogeneous GPU clusters — on-prem A100/H100 nodes plus cloud spot and on-demand instances — into a single schedulable topology using Liqo's virtual-node pattern. The payoff: no new scheduler, no manifest rewrites, just the Kubernetes primitives teams already know (`nodeSelector`, `nodeAffinity`, `tolerations`).

Key technical beats:

- **Liqo offloading internals** — Virtual Kubelet per peering, twin namespaces/pods, resource reflection, and ShadowPod CRs that preserve workload presence during control-plane partitions.
- **Honest networking comparison** — Cilium Cluster Mesh vs Liqo's WireGuard fabric, with a clear decision framework based on CNI reality and CIDR overlap.
- **Unified queuing with Kueue** — `ResourceFlavor`, `ClusterQueue`, and `LocalQueue` mapped to virtual-node labels so a single Kueue installation spans all GPUs.
- **MultiKueue vs Liqo+Kueue** — when independent clusters make sense, and when one scheduling plane is the better fit.
- **Failure-mode honesty** — traffic continuity on cluster failure via ShadowEndpointSlice, and the `enableNodeFailureController` flag you must set for pod re-creation on remote node failure.
- **Production scars** — spot reclamation mid-job, cross-cluster MTU cliffs on WireGuard, and the Terminating-forever trap.

The one-number close: fleet GPU utilization moved from 42% to 78%, with queue wait dropping from 10 hours to under 30 minutes — on the same hardware, with zero manifest changes to unlock burst.
