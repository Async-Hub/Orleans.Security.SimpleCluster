using Common;
using Microsoft.ApplicationInsights.Channel;
using Microsoft.ApplicationInsights.Extensibility;

namespace SiloHost
{
    internal class SiloHostTelemetryInitializer : ITelemetryInitializer
    {
        private readonly string _roleName;

        public SiloHostTelemetryInitializer()
        {
            _roleName = Config.SiloHostName;
        }

        public void Initialize(ITelemetry telemetry)
        {
            telemetry.Context.Cloud.RoleName = _roleName;
            telemetry.Context.Cloud.RoleInstance = _roleName;
        }
    }
}