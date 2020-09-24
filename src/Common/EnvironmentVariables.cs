namespace Common
{
    public static class EnvironmentVariables
    {
        public static string SimpleClusterAzureStorageConnection => 
            "SIMPLE_CLUSTER_AZURE_STORAGE_CONNECTION";

        public static string SimpleClusterApiServerUrl =>
            "SIMPLE_CLUSTER_API_SERVER_URL";

        public static string SimpleClusterIdentityServerUrl =>
            "SIMPLE_CLUSTER_IDENTITY_SERVER_URL";

        public static string SimpleClusterWebClientServerUrl =>
            "SIMPLE_CLUSTER_WEB_CLIENT_SERVER_URL";

        public static string SimpleClusterInstrumentationKey =>
            "SIMPLE_CLUSTER_INSTRUMENTATION_KEY";
    }
}
