using Api.Orleans;
using Common;
using IdentityModel.AspNetCore.AccessTokenValidation;
using IdentityModel.AspNetCore.OAuth2Introspection;
using Microsoft.ApplicationInsights;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using Orleans;
using Orleans.Security;
using System;
using System.IdentityModel.Tokens.Jwt;
using static Common.HttpClientExtensions;

namespace Api
{
    public class Startup
    {
        private readonly IWebHostEnvironment _env;
        private readonly IConfiguration _configuration;

        public Startup(IWebHostEnvironment env, 
            IConfiguration configuration)
        {
            _env = env;
            _configuration = configuration;
            JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Clear();
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            //IdentityServer4 credentials. Do not use this for production!
            var apiIdentityServer4Info = new IdentityServer4Info(Config.IdentityServerUrl,
                "Api1", @"TFGB=?Gf3UvH+Uqfu_5p", "Cluster");
            var clusterIdentityServer4Info = new IdentityServer4Info(Config.IdentityServerUrl,
                "Cluster", "@3x3g*RLez$TNU!_7!QW", "Cluster");

            // Read Azure Storage connection string.
            var simpleClusterAzureStorageConnection =
                Environment.GetEnvironmentVariable(EnvironmentVariables.SimpleClusterAzureStorageConnection);

            services.AddAuthentication("token")
                // JWT tokens
                .AddJwtBearer("token", options =>
                {
                    // For development environments only. Do not use for production.
                    options.RequireHttpsMetadata = false;

                    options.Authority = apiIdentityServer4Info.Url;
                    options.Audience = "Api1";
                    options.TokenValidationParameters.ValidTypes = new[] { "at+jwt" };
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateAudience = false
                    };
                    // if token does not contain a dot, it is a reference token
                    // https://leastprivilege.com/2020/07/06/flexible-access-token-validation-in-asp-net-core/
                    options.ForwardDefaultSelector = Selector.ForwardReferenceToken("introspection");
                })

                // reference tokens
                .AddOAuth2Introspection("introspection", options =>
                {
                    options.Authority = apiIdentityServer4Info.Url;
                    // For development environments only. Do not use for production.
                    options.DiscoveryPolicy.RequireHttps = false;
                    options.ClientId = apiIdentityServer4Info.ClientId;
                    options.ClientSecret = apiIdentityServer4Info.ClientSecret;
                });

            services.AddControllers();
            services.TryAddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            services.AddHttpClient(OAuth2IntrospectionDefaults.BackChannelHttpClientName)
                .ConfigurePrimaryHttpMessageHandler(() => CreateHttpClientHandler(true));

            // ReSharper disable once RedundantTypeArgumentsOfMethod
            services.AddSingleton<IClusterClient>(serviceProvider =>
            {
                var logger = serviceProvider.GetRequiredService<ILogger<IClusterClient>>();
                var telemetryClient = serviceProvider.GetRequiredService<TelemetryClient>();

                var provider = new OrleansClusterClientProvider(
                    serviceProvider.GetService<IHttpContextAccessor>(),
                    logger, apiIdentityServer4Info, simpleClusterAzureStorageConnection,
                    telemetryClient);

                provider.StartClientWithRetries(out var client);

                return client;
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            //app.UseHttpsRedirection();

            app.UseAuthentication();
            app.UseRouting();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
