terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.0"
    }
  }
}

provider "azurerm" {
  features {}
}

# 1. Resource Group
resource "azurerm_resource_group" "rg" {
  name     = var.resource_group_name
  location = var.location
}

# 2. Azure Container Registry (To store FastAPI Docker images)
resource "azurerm_container_registry" "acr" {
  name                = "acrneuralaxisprod"
  resource_group_name = azurerm_resource_group.rg.name
  location            = azurerm_resource_group.rg.location
  sku                 = "Basic"
  admin_enabled       = true
}

# 3. Log Analytics Workspace (Required for Container Apps)
resource "azurerm_log_analytics_workspace" "law" {
  name                = "law-neuralaxis"
  resource_group_name = azurerm_resource_group.rg.name
  location            = azurerm_resource_group.rg.location
  sku                 = "PerGB2018"
  retention_in_days   = 30
}

# 4. Container App Environment
resource "azurerm_container_app_environment" "env" {
  name                       = var.environment_name
  resource_group_name        = azurerm_resource_group.rg.name
  location                   = azurerm_resource_group.rg.location
  log_analytics_workspace_id = azurerm_log_analytics_workspace.law.id
}

# 5. FastAPI Container App (Initial placeholder image, replaced by CD pipeline)
resource "azurerm_container_app" "backend" {
  name                         = "ca-backend"
  resource_group_name          = azurerm_resource_group.rg.name
  container_app_environment_id = azurerm_container_app_environment.env.id
  revision_mode                = "Single"

  template {
    container {
      name   = "fastapi-app"
      image  = "mcr.microsoft.com/azuredocs/aci-helloworld:latest" # Temporary placeholder
      cpu    = "0.25"
      memory = "0.5Gi"
      
      env {
        name  = "PORT"
        value = "80"
      }
      
      env {
        name        = "MONGO_URL"
        secret_name = "mongo-url"
      }
      
      env {
        name  = "DB_NAME"
        value = var.db_name
      }
    }
    
    # Scale down to 0 when there is no incoming traffic to eliminate costs
    min_replicas = 0
    max_replicas = 10
  }

  ingress {
    allow_insecure_connections = false
    external_enabled           = true
    target_port                = 80
    traffic_weight {
      percentage      = 100
      latest_revision = true
    }
  }

  secret {
    name  = "registry-password"
    value = azurerm_container_registry.acr.admin_password
  }

  secret {
    name  = "mongo-url"
    value = var.mongo_url
  }

  registry {
    server               = azurerm_container_registry.acr.login_server
    username             = azurerm_container_registry.acr.admin_username
    password_secret_name = "registry-password"
  }
}

# 6. Azure Static Web App (React Frontend)
resource "azurerm_static_web_app" "frontend" {
  name                = "swa-frontend"
  resource_group_name = azurerm_resource_group.rg.name
  location            = "East Asia" # Static Web Apps have specific regional availability
  sku_tier            = "Free"
  sku_size            = "Free"
}
