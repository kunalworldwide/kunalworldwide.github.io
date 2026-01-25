---
title: "Comprehensive Guide: Running GPU Workloads on Kubernetes"
description: "Deep dive into running and managing GPU workloads on Kubernetes clusters, including setup, optimization, and best practices"
date: 2024-12-06
categories: [Kubernetes, GPU, Cloud Computing, DevOps]
image: "https://miro.medium.com/v2/resize:fit:700/1*kfaefcgQPHrPsNobjuiiSg.jpeg"
---

## Understanding GPU Computing in Kubernetes

### Architectural Overview
GPU (Graphics Processing Unit) computing leverages specialized processors originally designed for rendering graphics to perform parallel computations. Unlike CPUs which are optimized for sequential processing with few cores, GPUs contain thousands of smaller cores optimized for handling multiple tasks simultaneously.

#### Key Components in Kubernetes GPU Architecture:

1. **Hardware Layer**
   - Physical GPU cards (e.g., NVIDIA Tesla, V100, A100)
   - PCIe interface connection
   - GPU memory (VRAM)
   - CUDA cores for parallel processing

2. **Driver Layer**
   - NVIDIA drivers: Interface between hardware and software
   - CUDA toolkit: Programming interface for GPU computing
   - Container runtime hooks: Enable GPU access from containers

3. **Container Runtime Layer**
   - NVIDIA Container Toolkit (nvidia-docker2)
   - Container runtime (containerd/Docker)
   - Device plugin interface

4. **Kubernetes Layer**
   - NVIDIA Device Plugin
   - Kubernetes scheduler
   - Resource allocation system

### How GPU Scheduling Works in Kubernetes

1. **Resource Advertisement**
   - The NVIDIA Device Plugin runs as a DaemonSet
   - Discovers GPUs on each node
   - Advertises GPU resources to Kubernetes API server
   - Updates node capacity with `nvidia.com/gpu` resource

2. **Resource Scheduling Process**
   ```
   Pod Request → Scheduler → Device Plugin → GPU Allocation
   ```

3. **GPU Resource Isolation**
   - Each container gets exclusive access to assigned GPUs
   - GPU memory is not oversubscribed
   - NVIDIA driver enforces hardware-level isolation

## Prerequisites

Before starting, ensure you have:
- An active Kubernetes cluster (e.g., AKS cluster)
- `kubectl` command-line tool installed and configured
- Access to create or modify node pools
- Helm v3 installed (for NVIDIA device plugin installation)

## GPU Node Pool Setup

### 1. Select appropriate GPU VM size
Choose a GPU-enabled VM size based on your workload requirements. Common options include:
- Standard_NC6s_v3 (1 NVIDIA Tesla V100)
- Standard_NC24rs_v3 (4 NVIDIA Tesla V100 with RDMA)
- Standard_ND96asr_v4 (8 NVIDIA A100)

### 2. Create GPU node pool

```bash
az aks nodepool add \
    --resource-group myResourceGroup \
    --cluster-name myAKSCluster \
    --name gpunodepool \
    --node-count 1 \
    --node-vm-size Standard_NC6s_v3 \
    --node-taints sku=gpu:NoSchedule \
    --enable-cluster-autoscaler \
    --min-count 1 \
    --max-count 3
```

## NVIDIA Device Plugin Installation

### Using Helm (Recommended Method)

1. Add NVIDIA Helm repository:
```bash
helm repo add nvdp https://nvidia.github.io/k8s-device-plugin
helm repo update
```

2. Install the device plugin:
```bash
helm install nvdp nvdp/nvidia-device-plugin \
    --version=0.15.0 \
    --namespace nvidia-device-plugin \
    --create-namespace
```

## Running GPU Workloads

### Example GPU Workload YAML

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: gpu-pod
spec:
  containers:
  - name: gpu-container
    image: nvidia/cuda:11.8.0-base-ubuntu22.04
    command: ["nvidia-smi", "-l", "30"]
    resources:
      limits:
        nvidia.com/gpu: 1
  tolerations:
  - key: "sku"
    operator: "Equal"
    value: "gpu"
    effect: "NoSchedule"
```

## Best Practices

### Resource Management Strategy
- Define explicit GPU resource requests and limits
- Implement resource quotas at namespace level
- Use pod priority classes for critical GPU workloads

### Container Optimization
- Use official NVIDIA CUDA images as base
- Implement multi-stage builds to minimize image size
- Include only necessary CUDA libraries

### Security Implementation
- Implement RBAC for GPU resource access
- Enable SecurityContext for GPU containers
- Regular security scanning of GPU container images
