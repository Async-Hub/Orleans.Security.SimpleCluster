using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Net.Http;
using System.Threading.Tasks;
using Common;
using IdentityModel.Client;
using Microsoft.ApplicationInsights;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace WebClient.Controllers
{
    public class HomeController : Controller
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly ILogger<HomeController> _logger;
        private readonly TelemetryClient _telemetryClient;

        public HomeController(IHttpContextAccessor httpContextAccessor, 
            ILogger<HomeController> logger, TelemetryClient telemetryClient)
        {
            _httpContextAccessor = httpContextAccessor;
            _logger = logger;
            _telemetryClient = telemetryClient;
        }

        public IActionResult Index()
        {
            return View();
        }

        [Authorize]
        public async Task<IActionResult> UserProfile()
        {
            var accessToken = await _httpContextAccessor.HttpContext.GetTokenAsync("access_token");
            _logger.LogInformation(new EventId(LogEvents.AccessTokenRetrieved),
                $"Access Token: successfully retrieved.");
            
            var httpClient = new HttpClient(HttpClientExtensions.CreateHttpClientHandler(true));
            httpClient.SetBearerToken(accessToken);

            string result;

            var response = await httpClient.GetAsync($"{Common.Config.ApiUrl}/api/User/Alice");
            if (response.IsSuccessStatusCode)
            {
                result = await response.Content.ReadAsStringAsync();
            }
            else
            {
                result = response.ReasonPhrase;
            }

            ViewBag.Response = result;

            return View();
        }

        public async Task<IActionResult> Slow()
        {
            await Task.Delay(10000);
            _telemetryClient.TrackEvent("Very slow process completed.",
                new Dictionary<string, string>()
                    {{"EventId", LogEvents.VerySlowProcessCompleted.ToString()}});

            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }
    }
}
