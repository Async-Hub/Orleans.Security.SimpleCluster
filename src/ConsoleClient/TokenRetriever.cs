using System;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using IdentityModel.Client;

namespace ConsoleClient
{
    internal static class TokenProvider
    {
        internal static async Task<string> RetrieveToken(string url)
        {
            var httpClientHandler = Common.HttpClientExtensions.CreateHttpClientHandler(true);
            var discoveryClient = new HttpClient(httpClientHandler)
            {
                BaseAddress = new Uri(url)
            };

            var discoveryResponse = await discoveryClient.GetDiscoveryDocumentAsync();

            if (discoveryResponse.IsError)
            {
                throw new Exception(discoveryResponse.Error);
            }

            httpClientHandler = Common.HttpClientExtensions.CreateHttpClientHandler(true);
            var httpClient = new HttpClient(httpClientHandler);

            var passwordTokenRequest = new PasswordTokenRequest()
            {
                ClientId = "ConsoleClient",
                ClientSecret = "KHG+TZ8htVx2h3^!vJ65",
                Address = discoveryResponse.TokenEndpoint,
                UserName = "Alice",
                Password = "Pass123$",
                Scope = "Api1 Api1.Read Api1.Write Cluster"
            };

            var tokenResponse = await httpClient.RequestPasswordTokenAsync(passwordTokenRequest);

            if (tokenResponse.IsError)
            {
                throw new Exception(tokenResponse.Error);
            }

            return tokenResponse.AccessToken;
        }
    }
}
