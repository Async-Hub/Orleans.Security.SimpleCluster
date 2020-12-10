module ClusterDeploymentApp.ContainerRegistry

open Farmer
open Farmer.Builders

let acraci = containerRegistry {
    name "acraci"
    sku ContainerRegistry.Basic
    enable_admin_user
}