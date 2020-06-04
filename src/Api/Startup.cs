using Api.Orleans;
using IdentityServer4.AccessTokenValidation;
using Microsoft.ApplicationInsights.Extensibility;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.Extensions.Hosting;
using Orleans;
using Orleans.Security;

namespace Api
{
    internal class MyTelemetryInitializer : ITelemetryInitializer
    {
        private readonly string _roleName;

        public MyTelemetryInitializer()
        {
            _roleName = "Cluster Api";
        }

        public void Initialize(Microsoft.ApplicationInsights.Channel.ITelemetry telemetry)
        {
            telemetry.Context.Cloud.RoleName = _roleName;
            telemetry.Context.Cloud.RoleInstance = _roleName;
        }
    }

    public class Startup
    {
        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddSingleton<ITelemetryInitializer, MyTelemetryInitializer>();
            var apiIdentityServer4Info = new IdentityServer4Info("https://localhost:5001",
                "Api1", @"TFGB=?Gf3UvH+Uqfu_5p", "Orleans");

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddIdentityServerAuthentication(options =>
                {
                    options.SupportedTokens = SupportedTokens.Both;
                    options.Authority = apiIdentityServer4Info.Url;
                    options.ApiName = apiIdentityServer4Info.ClientId;
                    options.ApiSecret = apiIdentityServer4Info.ClientSecret;
                    options.SaveToken = true;
                });

            services.AddControllers();
            services.TryAddSingleton<IHttpContextAccessor, HttpContextAccessor>();

            var clusterIdentityServer4Info = new IdentityServer4Info("https://localhost:5001",
                "Orleans", "@3x3g*RLez$TNU!_7!QW", "Orleans");
            // ReSharper disable once RedundantTypeArgumentsOfMethod
            services.AddSingleton<IClusterClient>(serviceProvider =>
            {
                OrleansClusterClientProvider.StartClientWithRetries(out var client,
                    serviceProvider.GetService<IHttpContextAccessor>(), clusterIdentityServer4Info);

                return client;
            });
            services.AddApplicationInsightsTelemetry();
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
