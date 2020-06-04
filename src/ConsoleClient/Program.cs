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
            var telemetryClient = TelemetryInitializer.CreateTelemetryClient();

            Console.WriteLine("Please press 's' to start.");
            telemetryClient.TrackTrace("Hello World!");

            while (Console.ReadKey().Key == ConsoleKey.S)
            {
                try
                {
                    var accessToken = await TokenProvider.RetrieveToken("https://localhost:5001");
                    Console.WriteLine($"AccessToken: {accessToken}");

                    var httpClient = new HttpClient
                    {
                        BaseAddress = new Uri("https://localhost:5002")
                    };
                    httpClient.SetBearerToken(accessToken);

                    // Call API
                    // Emulate an issue.
                    const int userId = 1;
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
