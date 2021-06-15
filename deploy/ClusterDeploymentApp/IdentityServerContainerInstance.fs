module ClusterDeploymentApp.IdentityServer

open Farmer
open Farmer.Builders
open Farmer.ContainerGroup
open Common

let acgacisample (instrumentationKey) = 

    let identityServerContainerInstance  = containerInstance {
        name "identityserver"
        image "identityserver"
        add_ports PublicPort [ 8083us; 8084us ]
        //add_ports InternalPort [ 9090us; ]
        memory 0.5<Gb>
        cpu_cores 1
    }

    let containerGroup = containerGroup {
        name "acg-aci-sample"
        operating_system Linux
        restart_policy AlwaysRestart
        add_udp_port 123us
        add_instances [ identityServerContainerInstance ]
    }

    containerGroup
