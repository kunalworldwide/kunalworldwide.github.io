---
title: "Comprehensive Azure Best Practices Guide"
description: "A complete guide to Azure best practices covering security, management, operations, and service-specific recommendations"
date: 2022-12-03
categories: [Azure, Security, Best Practices, Cloud]
image: "https://miro.medium.com/v2/resize:fit:700/0*JFxFUjxO8pAiWsq0.png"
---

Azure best practices assist businesses in making the most of Azure resources to create and maintain scalable, cost-efficient, and secure solutions on the Microsoft Azure cloud.

## Security

The most important thing before anything else is security. The recommendations below can help assure more robust Azure security.

### Enable Azure AD Conditional Access and enforce MFA

Azure AD Conditional Access assists administrators in enabling users to be productive whenever and wherever they choose while simultaneously safeguarding the assets of the company.

### Disable RDP/SSH from the Internet

Use JIT and Azure Bastion. Do not expose RDP and SSH access over the Internet.

**Just-In-Time (JIT) VM access:**
- JIT offers time-limited VM access through RDP and SSH
- Network Security Groups (NSGs) lock off RDP and SSH ports
- Users can request access using Azure AD and RBAC permissions

**Azure Bastion:**
- Direct RDP/SSH communication to your VMs over TLS
- No need for public IP addresses, agents, or specialized client software

### Secure privileged access with Azure AD PIM

Azure AD Privileged Identity Management enables management, control, and monitoring of access to vital resources in Azure, Microsoft 365, and Intune.

## Management

### Use Resource Groups and Tag Resources

Create a resource group strategy that meets your company's needs. Group resources by:
- Environment: prod, dev, uat, stg, perf, sit
- Application: BI, DWH
- Business Unit: ML, DS

### Follow a Well-Defined Naming Standard

Include resource type, application or business unit, environment, Azure region, and consecutive entity number.

Example: `dev-ause-asy-01` means Azure Synapse Workspace in Australia South East Region in DEV environment.

## Operations

### Use Azure Advisor

Azure Advisor offers individualized, practical advice for cost, security, dependability, operational excellence, and performance.

## Cost Optimization

### Use Reserved Instances

Reserved instances are useful when you frequently employ the same VM size across several VMs. Three-year reserved instances offer savings of up to 72%.

### Delete Unneeded Resources

After VMs are decommissioned, orphan resources are frequently forgotten. Common examples include network cards and OS discs.

## Service-Specific Best Practices

### Virtual Machine
- Enforce MFA and complex passwords
- Use JIT virtual machine access
- Have a patch process in place
- Lock down administrative ports
- Use Azure firewall and NSGs

### Storage
- Restrict database and storage access
- Leverage auditing
- Configure threat detection for Azure SQL
- Set log alerts in Azure Monitor
- Enable Azure Defender
- Use soft deletes
- Use shared access signatures (SAS)

### Network
- Encrypt data in transit
- Implement zero trust
- Limit open ports and Internet-facing endpoints
- Monitor device access
- Segment your networks

### Database (Cosmos DB, SQL, PostgreSQL, MySQL)
- Enable Advanced Threat Protection
- Enable automatic failover
- Restrict default network access
- Enable auditing
- Use Azure Active Directory for authentication

### App Service
- Use latest framework versions
- Enable HTTPS-only traffic
- Enable App Service Authentication
- Use Key Vaults for secrets

### Key Vault
- Enable AuditEvent logging
- Enable certificate transparency
- Enable Key Vault recoverability
- Restrict default network access

## Conclusion

There are numerous Azure features and services that require ongoing maintenance in terms of security. By keeping a few simple things in mind, you can strengthen your network considerably.
