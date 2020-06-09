using System;
using System.Net.Http;
using System.Threading.Tasks;
using Common;
using IdentityModel.Client;

namespace NativeClient
{
    internal class Program
    {
        private static async Task Main(string[] args)
        {
            Console.WriteLine("Please press 's' to start.");

            if(Console.ReadKey().Key == ConsoleKey.S)
            {
                var browser = new SystemBrowser(5010);
                var loginResult = await Login.Start(browser);

                if (loginResult.IsError)
                {
                    Console.WriteLine(loginResult.IsError);
                }
                else
                {
                    Console.WriteLine($"Identity Token: {loginResult.IdentityToken}");
                    Console.WriteLine($"Access Token: {loginResult.AccessToken}");

                    //var userProfile = await TryGetUserProfile(loginResult.AccessToken);
                    //Console.WriteLine(userProfile);
                }
                
            }
        }

        private static async Task<string> TryGetUserProfile(string accessToken)
        {
            if (string.IsNullOrWhiteSpace(accessToken))
            {
                throw  new ArgumentException();
            }

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

            return result;
        }
    }
}
