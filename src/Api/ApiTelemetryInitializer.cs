using Microsoft.ApplicationInsights.Extensibility;

namespace Api
{
    internal class ApiTelemetryInitializer : ITelemetryInitializer
    {
        private readonly string _roleName;

        public ApiTelemetryInitializer()
        {
            _roleName = "Cluster Api";
        }

        public void Initialize(Microsoft.ApplicationInsights.Channel.ITelemetry telemetry)
        {
            telemetry.Context.Cloud.RoleName = _roleName;
            telemetry.Context.Cloud.RoleInstance = _roleName;
        }
    }
}