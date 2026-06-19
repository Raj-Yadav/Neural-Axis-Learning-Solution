output "acr_login_server" {
  value = azurerm_container_registry.acr.login_server
}

output "acr_username" {
  value = azurerm_container_registry.acr.admin_username
}

output "container_app_name" {
  value = azurerm_container_app.backend.name
}

output "static_web_app_api_token" {
  value     = azurerm_static_web_app.frontend.api_key
  sensitive = true
}
