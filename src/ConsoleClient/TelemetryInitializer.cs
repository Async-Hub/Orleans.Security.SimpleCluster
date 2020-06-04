using Microsoft.ApplicationInsights;
using Microsoft.ApplicationInsights.DependencyCollector;
using Microsoft.ApplicationInsights.Extensibility;

namespace ConsoleClient
{
    internal static class TelemetryInitializer
    {
        public static TelemetryClient CreateTelemetryClient()
        {
            var configuration = TelemetryConfiguration.CreateDefault();

            configuration.InstrumentationKey = "3719cf50-6237-47d3";

            var telemetryClient = new TelemetryClient(configuration);
            using (InitializeDependencyTracking(configuration))
            {
            }

            telemetryClient.Context.Cloud.RoleInstance = "ConsoleClient";
            telemetryClient.Context.Cloud.RoleName = "ConsoleClient";

            return telemetryClient;
        }

        private static DependencyTrackingTelemetryModule InitializeDependencyTracking(TelemetryConfiguration configuration)
        {
            var module = new DependencyTrackingTelemetryModule();
            module.Initialize(configuration);
            module.IncludeDiagnosticSourceActivities.Add("");

            return module;
        }
    }
}