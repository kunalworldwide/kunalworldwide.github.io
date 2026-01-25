---
title: "The Trick to Not Using a Self-Hosted Agent in Azure DevOps"
description: "Learn how to overcome firewall restrictions in Azure DevOps pipelines without using self-hosted agents"
date: 2022-11-18
categories: [Azure, DevOps, Security, Infrastructure]
image: "https://miro.medium.com/v2/resize:fit:700/0*abFuG6O6narmeqHG.png"
---

When you want to design the build and release pipeline for any software development the one thing that comes to mind is where to do the whole operation. There are two ways of doing it - the free and easy way is to use a Microsoft Hosted build agent, but in some cases, we may need to use a Self-hosted build agent.

## The Problem

In the image below, you can see public network access can be disabled. In that case, you will not be able to connect to this resource from the DevOps pipeline. In some places, I have seen people using a self-hosted agent just for this purpose but actually, this is not required.

The process here is adding the IP address as a rule into the firewall.

## The Solution

I am taking the example of Synapse. Just before the deployment task add an Azure CLI task in the pipeline.

Write the PowerShell script to add the build agent IP into the synapse workspace:

```bash
az synapse workspace firewall-rule create --name devops-build-agent-ip \
--workspace-name synapse-prod --resource-group synapse-prod-rg \
--start-ip-address  (Invoke-RestMethod http://ipinfo.io/json | Select -exp ip) \
--end-ip-address  (Invoke-RestMethod http://ipinfo.io/json | Select -exp ip)
```

If you like to use YAML then here is the code:

```yaml
steps:
- task: AzureCLI@2
  displayName: 'Add Build agent Ip to firewall'
  inputs:
    azureSubscription: 'sp-dev'
    scriptType: ps
    scriptLocation: inlineScript
    inlineScript: 'az synapse workspace firewall-rule create --name devops-build-agent-ip --workspace-name qa1-ause-asy-01 --resource-group QA1-AUSE-ASY-ARG-01 --start-ip-address  (Invoke-RestMethod http://ipinfo.io/json | Select -exp ip) --end-ip-address  (Invoke-RestMethod http://ipinfo.io/json | Select -exp ip)'
```

Now, as we can add the firewall rule we can delete the rule too:

```bash
az synapse workspace firewall-rule delete --name devops-build-agent-ip \
--workspace-name synapse-prod --resource-group synapse-prod-rg --yes
```

And that is it. Once you run the deployment it will copy the IP to the build agent, add it into the firewall rule, then run the deployment, and then delete it.
