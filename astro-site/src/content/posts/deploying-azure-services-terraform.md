---
title: "Deploying Azure Data Factory, Azure Databricks, Azure Data Lake Storage & MySQL DB using Terraform"
description: "A comprehensive guide to deploying Azure data services using Terraform"
date: 2022-10-12
categories: [Azure, Terraform, DevOps, Data Engineering]
image: "https://miro.medium.com/v2/resize:fit:720/format:webp/1*u3A9mWuZN_E-v-W8pi12uw.png"
---

Here I am going to share some terraform code to deploy ADF, ADLS, ADB, and several other necessary resources.

## Resource Group

```tf
data "azurerm_client_config" "Current" {}
resource "azurerm_resource_group" "RG" {
  name     = var.ResourceGroup.Name
  location = var.ResourceGroup.Location
}
```

## Azure Data Factory

```tf
resource "azurerm_data_factory" "DataFactory" {
  name                = "DataFactory Name"
  location            = azurerm_resource_group.RG.location
  resource_group_name = azurerm_resource_group.RG.name

  identity {
    type = "SystemAssigned"
  }
}
```

## Azure Databricks

```tf
resource "azurerm_databricks_workspace" "Databricks" {
  location                      = azurerm_resource_group.RG.location
  name                          = "Databricks Name"
  resource_group_name           = azurerm_resource_group.RG.name
  managed_resource_group_name   = "Databricks Managed Resource Group"
  sku                           = "Databricks Sku"

  custom_parameters {
    no_public_ip        = true
    virtual_network_id  = azurerm_virtual_network.DatabricksVnet.id
    public_subnet_name  = azurerm_subnet.DatabricksSubnetPublic.name
    private_subnet_name = azurerm_subnet.DatabricksSubnetPrivate.name
  }

  depends_on = [
    azurerm_subnet_network_security_group_association.public,
    azurerm_subnet_network_security_group_association.private
  ]
}
```

## Virtual Network

```tf
resource "azurerm_virtual_network" "DatabricksVnet" {
  name                     = "VNET NAME"
  resource_group_name      = azurerm_resource_group.RG.name
  location                 = azurerm_resource_group.RG.location
  address_space            = ["VNET CIDR"]
}
```

## Data Lake Storage Account

```tf
resource "azurerm_storage_account" "DataLake" {
  name                     = "DataLake Name"
  resource_group_name      = azurerm_resource_group.RG.name
  location                 = azurerm_resource_group.RG.location
  account_tier             = "DataLake Tier"
  account_replication_type = "DataLake Replication"
  is_hns_enabled           = true
  min_tls_version          = "DataLake TLSVersion"

  network_rules {
    default_action             = "Allow"
  }
}
```

## SQL Server

```tf
resource "azurerm_mssql_server" "SQLServer" {
  name                         = "SQLServer Name"
  resource_group_name          = azurerm_resource_group.RG.name
  location                     = azurerm_resource_group.RG.location
  version                      = "SQLServer Version"
  administrator_login          = "SQLServer AdministratorLogin"
  administrator_login_password = random_string.SQLAdminPassword.result
  minimum_tls_version          = "SQLServer TLS Version"
}
```

## SQL Database

```tf
resource "azurerm_mssql_database" "SQLDatabase" {
  name           = "SQLDatabase Name"
  server_id      = azurerm_mssql_server.SQLServer.id
  collation      = "SQL_collation"
  max_size_gb    = "SQLDatabase MaxSizeGB"
  sku_name       = "SQLDatabase SKU"
  zone_redundant = "SQLDatabase ZoneRedundant"
}
```

This is a complete part by part snippets to create a running ADB ADF system, feel free to reach me in case any clarification required!
