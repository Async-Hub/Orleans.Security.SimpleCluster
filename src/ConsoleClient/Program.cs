using System;
using System.Net.Http;
using System.Threading.Tasks;
using IdentityModel.Client;

namespace ConsoleClient
{
    internal static class Program
    {
        private static async Task Main(string[] args)
        {
            Console.Title = "ConsoleClient";
            var telemetryClient = TelemetryInitializer.CreateTelemetryClient();

            Console.WriteLine("Please press 's' to start.");
            telemetryClient.TrackTrace("Hello World!");

            while (Console.ReadKey().Key == ConsoleKey.S)
            {
                try
                {
                    var accessToken = await TokenProvider.RetrieveToken(Common.Config.IdentityServerUrl);
                    Console.WriteLine($"AccessToken: {accessToken}");

                    var httpClientHandler = Common.HttpClientExtensions.CreateHttpClientHandler(true);
                    var httpClient = new HttpClient(httpClientHandler)
                    {
                        BaseAddress = new Uri(Common.Config.ApiUrl),
                    };
                    httpClient.SetBearerToken(accessToken);

                    // Call API
                    // Emulate an issue.
                    var userId = "Alice";
                    var response = await httpClient.GetAsync($"/api/user/{userId}");
                    if (!response.IsSuccessStatusCode)
                    {
                        Console.WriteLine(response.StatusCode);
                        telemetryClient.TrackEvent(response.ReasonPhrase);
                    }
                    else
                    {
                        var content = await response.Content.ReadAsStringAsync();
                        Console.WriteLine(content);
                    }
                }
                catch (Exception e)
                {
                    Console.WriteLine(e);
                    telemetryClient.TrackException(e);
                }
            }

            telemetryClient.Flush();
        }
    }
}
