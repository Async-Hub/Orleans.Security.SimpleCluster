using System.IdentityModel.Tokens.Jwt;
using Api.Orleans;
using IdentityServer4.AccessTokenValidation;
using Microsoft.ApplicationInsights.Extensibility;
using Microsoft.ApplicationInsights.SnapshotCollector;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Orleans;
using Orleans.Security;
using static Common.HttpClientExtensions;

namespace Api
{
    public class Startup
    {
        private readonly IWebHostEnvironment _env;
        private readonly IConfiguration _configuration;

        public Startup(IWebHostEnvironment env, IConfiguration configuration)
        {
            _env = env;
            _configuration = configuration;
            JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Clear();
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            //Azure Application Insights
            services.AddSnapshotCollector((configuration) =>
                _configuration.Bind(nameof(SnapshotCollectorConfiguration), configuration));
            services.AddSingleton<ITelemetryInitializer, MyTelemetryInitializer>();
            services.AddApplicationInsightsTelemetry();

            //IdentityServer4 credentials. Do not use this for production!
            var apiIdentityServer4Info = new IdentityServer4Info(Common.Config.IdentityServerUrl,
                "Api1", @"TFGB=?Gf3UvH+Uqfu_5p", "Orleans");
            var clusterIdentityServer4Info = new IdentityServer4Info(Common.Config.IdentityServerUrl,
                "Orleans", "@3x3g*RLez$TNU!_7!QW", "Orleans");

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddIdentityServerAuthentication(JwtBearerDefaults.AuthenticationScheme, options =>
                {
                    options.SupportedTokens = SupportedTokens.Both;
                    options.Authority = apiIdentityServer4Info.Url;
                    options.RequireHttpsMetadata = false;
                    options.ApiName = apiIdentityServer4Info.ClientId;
                    options.ApiSecret = apiIdentityServer4Info.ClientSecret;
                    options.SaveToken = true;
                    
                    //if (_env.IsDevelopment() || _env.IsStaging())
                    //{
                    //    options.JwtBackChannelHandler = CreateHttpClientHandler(true);
                    //}

                    options.JwtBackChannelHandler = CreateHttpClientHandler(true);
                    options.IntrospectionBackChannelHandler = CreateHttpClientHandler(true);
                    options.IntrospectionDiscoveryHandler = CreateHttpClientHandler(true);
                });

            services.AddControllers();
            services.TryAddSingleton<IHttpContextAccessor, HttpContextAccessor>();

            // ReSharper disable once RedundantTypeArgumentsOfMethod
            services.AddSingleton<IClusterClient>(serviceProvider =>
            {
                OrleansClusterClientProvider.StartClientWithRetries(out var client,
                    serviceProvider.GetService<IHttpContextAccessor>(), 
                    serviceProvider.GetService<ILogger>(),
                    clusterIdentityServer4Info);

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

            app.UseHttpsRedirection();

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
