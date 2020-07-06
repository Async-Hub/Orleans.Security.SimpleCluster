using System.IO;
using Common;
using Microsoft.ApplicationInsights.Extensibility;
using Microsoft.ApplicationInsights.SnapshotCollector;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace Api
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateHostBuilder(args).Build().Run();

            var host = CreateHostBuilder(args).Build();
            var logger = host.Services.GetRequiredService<ILogger<Program>>();
            
            // This will be picked up by AI
            logger.LogInformation("From Api. Running the api host now..");
            host.Run();
        }

        private static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureServices(services =>
                {
                    var config = new ConfigurationBuilder()
                        .SetBasePath(Directory.GetCurrentDirectory())
                        .AddJsonFile("appsettings.json", optional: true)
                        .Build();

                    // ApplicationInsights
                    services.AddSingleton<ITelemetryInitializer, MyTelemetryInitializer>();
                    services.AddSnapshotCollector((configuration) =>
                        config.Bind(nameof(SnapshotCollectorConfiguration), configuration));
                    services.AddApplicationInsightsTelemetry();
                })
                .ConfigureLogging(builder =>
                {
                    // Providing an instrumentation key here is required if you're using
                    // standalone package Microsoft.Extensions.Logging.ApplicationInsights
                    // or if you want to capture logs from early in the application startup
                    // pipeline from Startup.cs or Program.cs itself.
                    builder.AddApplicationInsights(Config.InstrumentationKey);

                    // Optional: Apply filters to control what logs are sent to Application Insights.
                    // The following configures LogLevel Information or above to be sent to
                    // Application Insights for all categories.
                    builder.AddFilter<Microsoft.Extensions.Logging.ApplicationInsights.ApplicationInsightsLoggerProvider>
                        ("", LogLevel.Trace);
                })
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}
