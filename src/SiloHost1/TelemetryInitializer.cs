using Microsoft.ApplicationInsights;
using Microsoft.ApplicationInsights.DependencyCollector;
using Microsoft.ApplicationInsights.Extensibility;

namespace SiloHost1
{
    internal static class TelemetryInitializer
    {
        public static TelemetryClient CreateTelemetryClient()
        {
            var configuration = TelemetryConfiguration.CreateDefault();

            configuration.InstrumentationKey = "20d4b612-e229-4ba7";
            configuration.TelemetryInitializers.Add(new HttpDependenciesParsingTelemetryInitializer());

            var telemetryClient = new TelemetryClient(configuration);
            using (InitializeDependencyTracking(configuration))
            {
            }

            telemetryClient.Context.Cloud.RoleInstance = "SiloHost1";
            telemetryClient.Context.Cloud.RoleName = "SiloHost1";

            return telemetryClient;
        }

        private static DependencyTrackingTelemetryModule InitializeDependencyTracking(TelemetryConfiguration configuration)
        {
            var module = new DependencyTrackingTelemetryModule();
            module.Initialize(configuration);

            return module;
        }
    }
}