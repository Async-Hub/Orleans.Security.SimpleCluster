using Common;
using Microsoft.ApplicationInsights;
using Microsoft.ApplicationInsights.DependencyCollector;
using Microsoft.ApplicationInsights.Extensibility;

namespace SiloHost
{
    internal static class TelemetryInitializer
    {
        public static readonly ITelemetryInitializer SiloHostTelemetryInitializer =
            new SiloHostTelemetryInitializer();

        public static TelemetryClient CreateTelemetryClient()
        {
            var configuration = TelemetryConfiguration.CreateDefault();

            configuration.InstrumentationKey = Common.Config.InstrumentationKey;
            configuration.TelemetryInitializers.Add(SiloHostTelemetryInitializer);

            var telemetryClient = new TelemetryClient(configuration);
            using (InitializeDependencyTracking(configuration))
            {
            }

            return telemetryClient;
        }

        private static DependencyTrackingTelemetryModule 
            InitializeDependencyTracking(TelemetryConfiguration configuration)
        {
            var module = new DependencyTrackingTelemetryModule();
            module.Initialize(configuration);

            return module;
        }
    }
}