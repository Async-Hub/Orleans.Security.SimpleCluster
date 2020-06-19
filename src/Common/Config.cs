using System;

namespace Common
{
    public static class Config
    {
        public static string InstrumentationKey => "b7b2c7ef";

        public static string NativeClientUrl => "http://127.0.0.1:5010";

        public static string ApiUrl => "https://localhost:5002";
        public static string IdentityServerUrl => "https://localhost:5001";
        public static string WebClientUrl => "https://localhost:5004";
    }
}
