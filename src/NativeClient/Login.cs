using System.Threading.Tasks;
using Common;
using IdentityModel.OidcClient;
using IdentityModel.OidcClient.Browser;

namespace NativeClient
{
    public class Login
    {
        public static async Task<LoginResult> Start(IBrowser browser)
        {
            //Do not use this in production environment.
            var handler = HttpClientExtensions.CreateHttpClientHandler(true);

            var options = new OidcClientOptions
            {
                Authority = Config.IdentityServerUrl,
                BackchannelHandler = handler,
                Browser = browser,
                ClientId = "NativeClient",
                ClientSecret = "KHG+TZ8aaVx2h3^!vJ65",
                FilterClaims = false,
                Flow = OidcClientOptions.AuthenticationFlow.AuthorizationCode,
                LoadProfile = true,
                Scope = "openid profile Api1 Orleans",
                RedirectUri = Config.NativeClientUrl,
                RefreshTokenInnerHttpHandler = handler,
                ResponseMode = OidcClientOptions.AuthorizeResponseMode.Redirect
            };

            var client = new OidcClient(options);
            
            return await client.LoginAsync(new LoginRequest());
        }
    }
}