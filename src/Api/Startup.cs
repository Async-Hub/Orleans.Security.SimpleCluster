using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Net.Http;
using Api.Orleans;
using Common;
using IdentityModel.AspNetCore.OAuth2Introspection;
using IdentityModel.Client;
using IdentityServer4.AccessTokenValidation;
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
using Microsoft.VisualBasic;
using Orleans;
using Orleans.Security;
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
            var apiIdentityServer4Info = new IdentityServer4Info(Common.Config.IdentityServerUrl,
                "Api1", @"TFGB=?Gf3UvH+Uqfu_5p", "Cluster");
            var clusterIdentityServer4Info = new IdentityServer4Info(Common.Config.IdentityServerUrl,
                "Cluster", "@3x3g*RLez$TNU!_7!QW", "Cluster");

            // Read Azure Storage connection string.
            var simpleClusterAzureStorageConnection =
                Environment.GetEnvironmentVariable(EnvironmentVariables.SimpleClusterAzureStorageConnection);

            services.AddAuthentication(IdentityServerAuthenticationDefaults.AuthenticationScheme)
                .AddIdentityServerAuthentication(IdentityServerAuthenticationDefaults.AuthenticationScheme,
                    jwtBearerOptions =>
                    {
                        jwtBearerOptions.Authority = apiIdentityServer4Info.Url;
                        jwtBearerOptions.RequireHttpsMetadata = false;
                        jwtBearerOptions.SaveToken = true;
                        jwtBearerOptions.TokenValidationParameters = new TokenValidationParameters()
                        {
                            ValidateAudience = true,
                            ValidAudiences = new List<string>(){ "Api1","Cluster" }
                        };

                        //if (_env.IsDevelopment() || _env.IsStaging())
                        //{
                        //    options.JwtBackChannelHandler = CreateHttpClientHandler(true);
                        //}

                        jwtBearerOptions.BackchannelHttpHandler = CreateHttpClientHandler(true);
                    },
                    oAuth2IntrospectionOptions =>
                    {
                        oAuth2IntrospectionOptions.Authority = apiIdentityServer4Info.Url;
                        oAuth2IntrospectionOptions.ClientId = apiIdentityServer4Info.ClientId;
                        oAuth2IntrospectionOptions.ClientSecret = apiIdentityServer4Info.ClientSecret;
                        oAuth2IntrospectionOptions.SaveToken = true;
                        // Do not use this for production!
                        oAuth2IntrospectionOptions.DiscoveryPolicy.RequireHttps = false;
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
                    logger, clusterIdentityServer4Info, simpleClusterAzureStorageConnection,
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
