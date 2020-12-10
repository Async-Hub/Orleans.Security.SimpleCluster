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

        public static string SimpleClusterSiloHostName =>
            "SIMPLE_CLUSTER_SILO_HOST_NAME";

        public static string SimpleClusterSiloHostSiloPort =>
            "SIMPLE_CLUSTER_SILO_HOST_SILO_PORT";

        public static string SimpleClusterSiloHostGatewayPort =>
            "SIMPLE_CLUSTER_SILO_HOST_GATEWAY_PORT";
    }
}
