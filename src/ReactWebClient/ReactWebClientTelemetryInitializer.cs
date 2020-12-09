using Microsoft.ApplicationInsights.Channel;
using Microsoft.ApplicationInsights.Extensibility;

namespace ReactWebClient
{
    internal class ReactWebClientTelemetryInitializer : ITelemetryInitializer
    {
        private readonly string _roleName;

        public ReactWebClientTelemetryInitializer()
        {
            _roleName = "ReactWebClient";
        }

        public void Initialize(ITelemetry telemetry)
        {
            telemetry.Context.Cloud.RoleName = _roleName;
            telemetry.Context.Cloud.RoleInstance = _roleName;
        }
    }
}