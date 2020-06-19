using System;
using System.Diagnostics;
using System.Net.Http;
using System.Threading.Tasks;
using Common;
using IdentityModel.Client;
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

        public HomeController(IHttpContextAccessor httpContextAccessor, ILogger<HomeController> logger)
        {
            _httpContextAccessor = httpContextAccessor;
            _logger = logger;
        }

        public IActionResult Index()
        {
            return View();
        }

        [Authorize]
        public async Task<IActionResult> UserProfile()
        {
            var accessToken = await _httpContextAccessor.HttpContext.GetTokenAsync("access_token");
            _logger.LogInformation($"Access Token: {accessToken}");

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

            return View();
        }
    }
}
