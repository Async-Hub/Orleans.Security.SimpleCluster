using System;
using System.Net;
using System.Threading.Tasks;
using Grains;
using GrainsInterfaces;
using Microsoft.ApplicationInsights.Channel;
using Microsoft.ApplicationInsights.Extensibility;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Orleans;
using Orleans.Configuration;
using Orleans.Hosting;
using Orleans.Security;
using Orleans.Security.Clustering;

namespace SiloHost1
{
    internal class MyTelemetryInitializer : ITelemetryInitializer
    {
        private readonly string _roleName;

        public MyTelemetryInitializer()
        {
            _roleName = "SiloHost1";
        }

        public void Initialize(Microsoft.ApplicationInsights.Channel.ITelemetry telemetry)
        {
            telemetry.Context.Cloud.RoleName = _roleName;
            telemetry.Context.Cloud.RoleInstance = _roleName;
        }
    }
    internal static class Program
    {
        public static async Task Main(string[] args)
        {
            //var telemetryClient = TelemetryInitializer.CreateTelemetryClient();
            try
            {
                Console.Title = "SiloHost1";

                var host = await StartSilo();
                Console.WriteLine("Press Enter to terminate...");
                Console.ReadLine();

                await host.StopAsync();
            }
            catch (Exception ex)
            {
                //telemetryClient.TrackException(ex);
                Console.WriteLine(ex);
            }

            //telemetryClient.Flush();
        }

        private static async Task<IHost> StartSilo()
        {
            var identityServer4Info = new IdentityServer4Info(Common.Config.IdentityServerUrl,
                "Orleans", "@3x3g*RLez$TNU!_7!QW", "Orleans");

            var builder = new HostBuilder()
                .UseEnvironment(Environments.Staging)
                .ConfigureServices((hostContext, services) =>
                {
                    services.AddSingleton<ITelemetryInitializer, MyTelemetryInitializer>();
                    services.AddApplicationInsightsTelemetryWorkerService(options =>
                    {
                        options.InstrumentationKey = "20d4b612-e229-4ba7";
                    });
                })
                .UseOrleans((context, siloBuilder) =>
                {
                    siloBuilder
                        // Use localhost clustering for a single local silo
                        .UseLocalhostClustering()
                        // Configure ClusterId and ServiceId
                        .Configure<ClusterOptions>(options =>
                        {
                            options.ClusterId = "Orleans.Security.Test";
                            options.ServiceId = "ServiceId1";
                        })
                        // Configure connectivity
                        .Configure<EndpointOptions>(options => options.AdvertisedIPAddress = IPAddress.Loopback)
                        .ConfigureApplicationParts(parts =>
                            parts.AddApplicationPart(typeof(UserGrain).Assembly).WithReferences())
                        .ConfigureServices(services =>
                        {
                            services.AddOrleansClusteringAuthorization(identityServer4Info,
                                config =>
                                {
                                    config.ConfigureAuthorizationOptions = AuthorizationConfig.ConfigureOptions;
                                    config.TracingEnabled = true;
                                    config.ConfigureAccessTokenVerifierOptions = options =>
                                    {
                                        //For not production environments only!
                                        options.DisableCertificateValidation = true;
                                    };
                                });
                        });
                })
                // Configure logging with any logging framework that supports Microsoft.Extensions.Logging.
                // In this particular case it logs using the Microsoft.Extensions.Logging.Console package.
                .ConfigureLogging(logging => logging.AddConsole());

            var host = builder.Build();
            await host.StartAsync();
            return host;
        }
    }
}
