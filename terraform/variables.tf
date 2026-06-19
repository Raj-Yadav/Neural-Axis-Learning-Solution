variable "location" {
  type        = string
  default     = "Central India"
  description = "The Azure region where resources will be created."
}

variable "resource_group_name" {
  type        = string
  default     = "rg-neuralaxis-prod"
}

variable "environment_name" {
  type        = string
  default     = "neuralaxis-prod-env"
}

variable "domain_name" {
  type        = string
  default     = "neuralaxis.co.in"
}

variable "backend_subdomain" {
  type        = string
  default     = "api.neuralaxis.co.in"
}

variable "mongo_url" {
  type        = string
  description = "MongoDB Connection String"
  sensitive   = true
}

variable "db_name" {
  type        = string
  description = "MongoDB Database Name"
  default     = "neural_axis"
}
