resource "random_integer" "cosmos_suffix" {
  min = 10000
  max = 99999
}

resource "azurerm_cosmosdb_account" "mongodb" {
  name                = "cosmos-neuralaxis-${random_integer.cosmos_suffix.result}"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  offer_type          = "Standard"
  kind                = "MongoDB"

  enable_free_tier = true

  capabilities {
    name = "EnableMongo"
  }

  consistency_policy {
    consistency_level = "Session"
  }

  geo_location {
    location          = azurerm_resource_group.rg.location
    failover_priority = 0
  }
}
