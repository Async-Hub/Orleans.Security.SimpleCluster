using System;
using System.Net;
using System.Threading.Tasks;
using Common;
using Grains;
using GrainsInterfaces;
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
    internal static class Program
    {
        public static async Task Main(string[] args)
        {
            var telemetryClient = TelemetryInitializer.CreateTelemetryClient();
            try
            {
                Console.Title = "SiloHost1";
                // Read Azure Storage connection string.
                var simpleClusterAzureStorageConnection =
                    Environment.GetEnvironmentVariable(EnvironmentVariables.SimpleClusterAzureStorageConnection);

                var host = await StartSilo(simpleClusterAzureStorageConnection);

#if DEBUG
                Console.WriteLine("Press Enter to terminate...");
                Console.ReadLine();

                await host.StopAsync();
#endif
            }
            catch (Exception ex)
            {
                telemetryClient.TrackException(ex);
                Console.WriteLine(ex);
            }

            telemetryClient.Flush();
        }

        private static async Task<IHost> StartSilo(string simpleClusterAzureStorageConnection)
        {
            var identityServer4Info = new IdentityServer4Info(Common.Config.IdentityServerUrl,
                "Cluster", "@3x3g*RLez$TNU!_7!QW", "Cluster");

            var builder = new HostBuilder()
                .UseEnvironment(Environments.Staging)
                .ConfigureServices((hostContext, services) =>
                {
                    services.AddSingleton<ITelemetryInitializer, MyTelemetryInitializer>();
                    services.AddApplicationInsightsTelemetryWorkerService(options =>
                    {
                        options.InstrumentationKey = Common.Config.InstrumentationKey;
                    });
                })
                .UseOrleans((context, siloBuilder) =>
                {
                    siloBuilder
#if DEBUG
                        .UseLocalhostClustering()
#else
                        .UseAzureStorageClustering(options =>
                        {
                            options.ConnectionString = simpleClusterAzureStorageConnection;
                        })
#endif
                        // Configure ClusterId and ServiceId
                        .Configure<ClusterOptions>(options =>
                        {
                            options.ClusterId = "Orleans.Security.Test";
                            options.ServiceId = "ServiceId1";
                        })
#if !DEBUG
                        .ConfigureEndpoints(Dns.GetHostName(), siloPort: 11111, gatewayPort: 30000)
#endif
                        .ConfigureApplicationParts(parts =>
                            parts.AddApplicationPart(typeof(UserGrain).Assembly).WithReferences())
                        .ConfigureServices(services =>
                        {
                            services.AddOrleansClusteringAuthorization(identityServer4Info,
                                config =>
                                {
                                    config.ConfigureAuthorizationOptions = AuthorizationConfig.ConfigureOptions;
                                    config.TracingEnabled = true;
                                    config.ConfigureSecurityOptions = options =>
                                    {
                                        //For not production environments only!
                                        options.RequireHttps = false;
                                    };
                                });
                        });
                })
                // Configure logging with any logging framework that supports Microsoft.Extensions.Logging.
                // In this particular case it logs using the Microsoft.Extensions.Logging.Console package.
                .ConfigureLogging(loggingBuilder =>
                {
                    loggingBuilder.AddConsole();
                    loggingBuilder.AddApplicationInsights(Common.Config.InstrumentationKey);
                });

            var host = builder.Build();
            await host.StartAsync();
            return host;
        }
    }
}