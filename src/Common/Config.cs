using System;

namespace Common
{
    public static class Config
    {
        public static string InstrumentationKey => Resolver.InstrKey ?? "da702040-864c-4824";

        public static string NativeClientUrl => "http://127.0.0.1:5010";

        public static string ApiUrl => Resolver.ApiServerUrl ?? "http://localhost:5002";
        public static string IdentityServerUrl => Resolver.IdsServerUrl ?? "http://localhost:5000";
        public static string WebClientUrl => Resolver.WebServerUrl ?? "http://localhost:5004";

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
