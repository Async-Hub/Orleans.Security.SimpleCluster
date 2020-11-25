open Farmer
open Farmer.Builders

let deployment = arm {
    location Location.NorthEurope
    add_resource ClusterDeploymentApp.ContainerRegistry.acraci
    add_resource ClusterDeploymentApp.StorageAccount.stacgaci
    add_resource ClusterDeploymentApp.ApplicationInsights.appiacraci
}

let out = deployment |> Deploy.execute "rg-aci-sample" Deploy.NoParameters
printf "%O" out