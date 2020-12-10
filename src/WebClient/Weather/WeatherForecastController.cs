using System.Collections.Generic;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace WebClient.Weather
{
    public class WeatherForecastController : Controller
    {
        private readonly ILogger<WeatherForecastController> _logger;
        private readonly HttpClient _httpClient;

        public WeatherForecastController(ILogger<WeatherForecastController> logger,
            IHttpClientFactory clientFactory)
        {
            _logger = logger;
            _httpClient = clientFactory.CreateClient("api");
        }

        [HttpGet]
        public async Task<ViewResult> Index()
        {
            var response = await _httpClient.GetAsync($"/api/weather");

            var forecasts = new List<WeatherForecast>();

            // ReSharper disable once InvertIf
            if (response.IsSuccessStatusCode)
            {
                var jsonString = await response.Content.ReadAsStringAsync();
                forecasts =
                    JsonSerializer.Deserialize<List<WeatherForecast>>(jsonString, new JsonSerializerOptions
                    {
                        PropertyNameCaseInsensitive = true
                    });
            }

            return View("~/Weather/WeatherForecast.cshtml", forecasts);
        }
    }
}
