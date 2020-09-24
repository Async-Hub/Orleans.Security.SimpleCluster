using Microsoft.ApplicationInsights.Channel;
using Microsoft.ApplicationInsights.Extensibility;

namespace SiloHost1
{
    internal class MyTelemetryInitializer : ITelemetryInitializer
    {
        private readonly string _roleName;

        public MyTelemetryInitializer()
        {
            _roleName = "SiloHost1";
        }

        public void Initialize(ITelemetry telemetry)
        {
            telemetry.Context.Cloud.RoleName = _roleName;
            telemetry.Context.Cloud.RoleInstance = _roleName;
        }
    }
}