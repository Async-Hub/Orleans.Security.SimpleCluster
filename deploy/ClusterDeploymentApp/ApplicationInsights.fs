module ClusterDeploymentApp.ApplicationInsights

open Farmer
open Farmer.Builders

let appiacraci = appInsights {
    name "appiacraci"
}