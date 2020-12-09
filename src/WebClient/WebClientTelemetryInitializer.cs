using Microsoft.ApplicationInsights.Channel;
using Microsoft.ApplicationInsights.Extensibility;

namespace WebClient
{
    internal class WebClientTelemetryInitializer : ITelemetryInitializer
    {
        private readonly string _roleName;

        public WebClientTelemetryInitializer()
        {
            _roleName = "WebClient";
        }

        public void Initialize(ITelemetry telemetry)
        {
            telemetry.Context.Cloud.RoleName = _roleName;
            telemetry.Context.Cloud.RoleInstance = _roleName;
        }
    }
}