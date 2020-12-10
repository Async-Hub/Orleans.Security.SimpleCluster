using System;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using Common;
using Grains;
using GrainsInterfaces;
using Microsoft.ApplicationInsights;
using Microsoft.ApplicationInsights.Extensibility;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Orleans;
using Orleans.Configuration;
using Orleans.Hosting;
using Orleans.Security;
using Orleans.Security.Clustering;

namespace SiloHost
{
    internal static class Program
    {
        private static TelemetryClient _telemetryClient;

        public static async Task Main(string[] args)
        {
            _telemetryClient = TelemetryInitializer.CreateTelemetryClient();
            try
            {
                Console.Title = "SiloHost";
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
                _telemetryClient.TrackException(ex);
                Console.WriteLine(ex);
            }

            _telemetryClient.Flush();
        }

        private static async Task<IHost> StartSilo(string simpleClusterAzureStorageConnection)
        {
            var identityServer4Info = new IdentityServer4Info(Common.Config.IdentityServerUrl,
                "Cluster", "@3x3g*RLez$TNU!_7!QW", "Cluster");

            var builder = new HostBuilder()
                .UseEnvironment(Environments.Staging)
                .ConfigureServices((hostContext, services) =>
                {
                    services.AddSingleton<ITelemetryInitializer>(serviceProvider => 
                        TelemetryInitializer.SiloHostTelemetryInitializer);

                    services.AddApplicationInsightsTelemetryWorkerService(options =>
                    {
                        options.InstrumentationKey = Config.InstrumentationKey;
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
                        .Configure<SiloOptions>(options => options.SiloName = Config.SiloHostName)
                        .Configure<ClusterMembershipOptions>(options =>
                        {
                            options.NumVotesForDeathDeclaration = 1;
                            options.TableRefreshTimeout = TimeSpan.FromSeconds(5);
                            options.DeathVoteExpirationTimeout = TimeSpan.FromSeconds(5);
                            options.IAmAliveTablePublishTimeout = TimeSpan.FromSeconds(3);
                        })
#endif
                        // Configure ClusterId and ServiceId
                        .Configure<ClusterOptions>(options =>
                        {
                            options.ClusterId = "Orleans.Security.Test";
                            options.ServiceId = "ServiceId1";
                        })
#if !DEBUG
                        .ConfigureEndpoints(Dns.GetHostName(), siloPort: 
                            Config.SiloHostSiloPort, gatewayPort: Config.SiloHostGatewayPort)
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
                });

            var host = builder.Build();
            var logger = host.Services.GetService<ILoggerFactory>().CreateLogger<ILogger>();
            HostInfo.Log(logger);

            await host.StartAsync();
            return host;
        }
    }
}