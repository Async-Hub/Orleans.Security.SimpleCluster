using System;
using System.Threading.Tasks;
using Microsoft.ApplicationInsights;
using Microsoft.ApplicationInsights.DataContracts;
using Orleans;

namespace Api.Orleans
{
    // ReSharper disable once ClassNeverInstantiated.Global
    public class ApplicationInsightsGrainCallFilter : IOutgoingGrainCallFilter
    {
        private readonly TelemetryClient _telemetryClient;


        public ApplicationInsightsGrainCallFilter(TelemetryClient telemetryClient)
        {
            _telemetryClient = telemetryClient;
        }

        public async Task Invoke(IOutgoingGrainCallContext context)
        {
            using var operation = _telemetryClient
                .StartOperation<DependencyTelemetry>(Common.Config.SiloHostName);
            //var dependencyTelemetry = CreateRequestTelemetry(_telemetryClient.Context);
            //var operation = _telemetryClient.StartOperation(dependencyTelemetry);

            try
            {
                await context.Invoke();

                operation.Telemetry.Success = true;
                operation.Telemetry.Context.Cloud.RoleName = "SiloHost";
                //operation.Telemetry.Context.Cloud.RoleInstance = _clusterClient.;
                //operation.Context.Component.Version = Common.Config.SiloHostName;

                _telemetryClient.StopOperation(operation);
            }
            catch(Exception)
            {
                operation.Telemetry.Success = false;
                _telemetryClient.StopOperation(operation);
                throw;
            }
        }

        private DependencyTelemetry CreateRequestTelemetry(TelemetryContext originalContext)
        {
            // Let's create and start RequestTelemetry.
            var dependencyTelemetry = new DependencyTelemetry()
            {
                Name = $"TCP {Common.Config.SiloHostName} TCP Port: {Common.Config.SiloHostGatewayPort}"
            };

                //requestTelemetry.Context.Operation.Id = GetOperationId(requestId);
                dependencyTelemetry.Context.Operation.ParentId = originalContext.Operation.Id;

                return dependencyTelemetry;
        }
    }
}
