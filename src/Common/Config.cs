using System;

namespace Common
{
    public static class Config
    {
        public static string InstrumentationKey => Resolver.InstrKey ?? "77819706-f7c4-41be-8b56";

        public static string NativeClientUrl => "http://127.0.0.1:5010";

        public static string ApiUrl => Resolver.ApiServerUrl ?? "https://localhost:5002";
        public static string IdentityServerUrl => Resolver.IdsServerUrl ?? "https://localhost:5001";
        public static string WebClientUrl => Resolver.WebServerUrl ?? "https://localhost:5004";

        //public static string ApiUrl => "http://api.appi.asynchub.org";
        //public static string IdentityServerUrl => "https://identity.appi.asynchub.org";
        //public static string WebClientUrl => "http://webclient.appi.asynchub.org";

        private static class Resolver
        {
            public static string ApiServerUrl => 
                Environment.GetEnvironmentVariable(EnvironmentVariables.SimpleClusterApiServerUrl);

            public static string IdsServerUrl =>
                Environment.GetEnvironmentVariable(EnvironmentVariables.SimpleClusterIdentityServerUrl);

            public static string WebServerUrl =>
                Environment.GetEnvironmentVariable(EnvironmentVariables.SimpleClusterWebClientServerUrl);

            public static string InstrKey =>
                Environment.GetEnvironmentVariable(EnvironmentVariables.SimpleClusterInstrumentationKey);
        }
    }
}
