using IdentityModel.Client;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Net.Http;
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
            services.AddControllersWithViews();
            services.AddHttpClient();

            services.AddSingleton<IDiscoveryCache>(serviceProvider =>
            {
                var factory = serviceProvider.GetRequiredService<IHttpClientFactory>();

                return new DiscoveryCache(Common.Config.IdentityServerUrl,
                    () => factory.CreateClient());
            });

            services.AddHttpClient("api", client =>
            {
                client.BaseAddress = new Uri(Common.Config.ApiUrl);
            });

            services.AddAuthentication(options =>
            {
                options.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = OpenIdConnectDefaults.AuthenticationScheme;
            })
                .AddCookie()
                .AddOpenIdConnect(options =>
                {
                    // For development environments only. Do not use for production.
                    options.RequireHttpsMetadata = false;

                    options.GetClaimsFromUserInfoEndpoint = true;
                    options.SignInScheme = CookieAuthenticationDefaults.AuthenticationScheme;

                    options.Authority = Common.Config.IdentityServerUrl;
                    options.ClientId = "WebClient";
                    options.ClientSecret = "pckJ#MH-9f9K?+^Bzx&4";

                    options.ResponseType = "code";
                    options.UsePkce = true;
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

            app.UseEndpoints(endpoints => { endpoints.MapDefaultControllerRoute(); });
        }
    }
}