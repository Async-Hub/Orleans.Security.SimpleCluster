using System.Net.Http;

namespace Common
{
    public static class HttpClientExtensions
    {
        /// <summary>
        /// Creates an instance of HttpClientHandler.
        /// </summary>
        /// <param name="suppressValidation">Disable SSL certificate validation.</param>
        /// <returns></returns>
        public static HttpClientHandler CreateHttpClientHandler(bool suppressValidation = false)
        {
            var httpClientHandler = new HttpClientHandler
            {
                ClientCertificateOptions = ClientCertificateOption.Manual
            };

            if (suppressValidation)
            {
                httpClientHandler.ServerCertificateCustomValidationCallback +=
                    (sender, certificate, chain, sslPolicyErrors) =>
                    {
                        if (sslPolicyErrors != System.Net.Security.SslPolicyErrors.None)
                        {
                        }

                        return true;
                    };
            }

            return httpClientHandler;
        }
    }
}
