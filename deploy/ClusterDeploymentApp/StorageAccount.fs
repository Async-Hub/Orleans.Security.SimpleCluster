module ClusterDeploymentApp.StorageAccount

open Farmer
open Farmer.Builders

let stacgaci = storageAccount {
    name "stacgaci"
    sku Storage.Standard_LRS
}
