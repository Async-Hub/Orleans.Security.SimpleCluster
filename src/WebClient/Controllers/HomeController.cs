using System.Collections.Generic;
using System.Threading.Tasks;
using Common;
using Microsoft.ApplicationInsights;
using Microsoft.AspNetCore.Mvc;

namespace WebClient.Controllers
{
    public class HomeController : Controller
    {
        private readonly TelemetryClient _telemetryClient;

        public HomeController(TelemetryClient telemetryClient)
        {
            _telemetryClient = telemetryClient;
        }

        public IActionResult Index()
        {
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
    }
}
