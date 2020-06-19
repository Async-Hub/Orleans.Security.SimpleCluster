using System;
using System.IdentityModel.Tokens.Jwt;
using System.Net.Http;
using IdentityModel.Client;
using Microsoft.ApplicationInsights.Extensibility;
using Microsoft.ApplicationInsights.SnapshotCollector;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using static Common.HttpClientExtensions;

namespace WebClient
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
            services.AddSnapshotCollector((configuration) =>
                _configuration.Bind(nameof(SnapshotCollectorConfiguration), configuration));

            services.AddControllersWithViews();
            services.AddHttpClient();
            services.AddSingleton<ITelemetryInitializer, MyTelemetryInitializer>();

            services.AddSingleton<IDiscoveryCache>(r =>
            {
                var factory = r.GetRequiredService<IHttpClientFactory>();

                return new DiscoveryCache(Common.Config.IdentityServerUrl,
                    () => factory.CreateClient());
            });

            services.AddAuthentication(options =>
                {
                    options.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
                    options.DefaultChallengeScheme = OpenIdConnectDefaults.AuthenticationScheme;
                })
                .AddCookie()
                .AddOpenIdConnect(options =>
                {
                    options.GetClaimsFromUserInfoEndpoint = true;
                    options.SignInScheme = CookieAuthenticationDefaults.AuthenticationScheme;

                    options.Authority = Common.Config.IdentityServerUrl;
                    options.ClientId = "WebClient";
                    options.ClientSecret = "pckJ#MH-9f9K?+^Bzx&4";
                    options.RequireHttpsMetadata = false;

                    options.ResponseType = "code id_token";
                    options.SaveTokens = true;

                    options.Scope.Add("Api1");
                    options.Scope.Add("Cluster");
                    options.Scope.Add("Api1.Read");
                    options.Scope.Add("Api1.Write");

                    options.Scope.Add("offline_access");

                    var isNonProductionEnvironment = _env.IsDevelopment() || _env.IsStaging();
                    options.BackchannelHttpHandler = CreateHttpClientHandler(true);
                });

            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            services.AddControllersWithViews();
            services.AddApplicationInsightsTelemetry();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseAuthentication();

            app.UseStaticFiles();
            app.UseCookiePolicy();

            app.UseRouting();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Home}/{action=Index}/{id?}");
            });
        }
    }
}
