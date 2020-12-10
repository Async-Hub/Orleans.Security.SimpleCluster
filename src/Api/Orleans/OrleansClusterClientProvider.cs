using System;
using System.Threading.Tasks;
using GrainsInterfaces;
using Microsoft.ApplicationInsights;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Orleans;
using Orleans.Configuration;
using Orleans.Hosting;
using Orleans.Runtime;
using Orleans.Security;
using Orleans.Security.Client;

namespace Api.Orleans
{
    // ReSharper disable once ClassNeverInstantiated.Global
    public class OrleansClusterClientProvider
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly ILogger _logger;
        private readonly IdentityServer4Info _identityServer4Info;
        private static IClusterClient _client;

        private static readonly int _initializeAttemptsBeforeFailing = 5;

        private static string _simpleClusterAzureStorageConnection;
        private readonly TelemetryClient _telemetryClient;

        public OrleansClusterClientProvider(
            IHttpContextAccessor httpContextAccessor, ILogger logger,
            IdentityServer4Info identityServer4Info,
            string simpleClusterAzureStorageConnection, TelemetryClient telemetryClient)
        {
            _httpContextAccessor = httpContextAccessor;
            _logger = logger;
            _identityServer4Info = identityServer4Info;
            _simpleClusterAzureStorageConnection = simpleClusterAzureStorageConnection;
            _telemetryClient = telemetryClient;
        }

        private IClusterClient Build()
        {
            var builder = new ClientBuilder()
#if DEBUG
                .UseLocalhostClustering()
#else
                .UseAzureStorageClustering(options =>
                {
                    options.ConnectionString = _simpleClusterAzureStorageConnection;
                })
#endif
                .Configure<ClusterOptions>(options =>
                {
                    options.ClusterId = "Orleans.Security.Test";
                    options.ServiceId = "ServiceId1";
                })
                .AddOutgoingGrainCallFilter<ApplicationInsightsGrainCallFilter>()
                .ConfigureApplicationParts(parts => 
                    parts.AddApplicationPart(typeof(IUserGrain).Assembly).WithReferences())
                .ConfigureLogging(logging => logging.AddConsole())
                .ConfigureServices(services =>
                {
                    services.AddOrleansClusteringAuthorization(_identityServer4Info,
                        config =>
                        {
                            config.ConfigureAuthorizationOptions = AuthorizationConfig.ConfigureOptions;
                            config.ConfigureAccessTokenVerifierOptions = options =>
                            {
                                options.InMemoryCacheEnabled = true;
                            };
                            config.ConfigureSecurityOptions = options =>
                            {
                                //For not production environments only!
                                options.RequireHttps = false;
                            };

                            config.TracingEnabled = true;
                        });

                    services.AddSingleton<Func<IHttpContextAccessor>>(serviceProvider => () => _httpContextAccessor);
                    services.AddSingleton<TelemetryClient>(serviceProvider => _telemetryClient);
                    services.AddScoped<IAccessTokenProvider, AspNetCoreAccessTokenProvider>();
                });

            return builder.Build();
        }

        private IClusterClient TryToConnect()
        {
            var attempt = 0;

            while (true)
            {
                try
                {
                    var client = Build();
                    client.Connect().Wait();

                    _logger.LogInformation("Api Client successfully connect to Silo host");

                    return client;
                }
                catch (AggregateException ex)
                {
                    if (ex.InnerException is SiloUnavailableException)
                    {
                        attempt++;
                        _logger.LogError(ex, ex.Message);

                        if (attempt > _initializeAttemptsBeforeFailing)
                        {
                            throw;
                        }

                        Task.Delay(TimeSpan.FromSeconds(1));
                    }

                    _logger.LogError(ex, ex.Message);
                }
            }
        }

        public void StartClientWithRetries(out IClusterClient client)
        {
            if (_client != null && _client.IsInitialized)
            {
                client = _client;
            }

            _client = TryToConnect();
            client = _client;
        }
    }
}