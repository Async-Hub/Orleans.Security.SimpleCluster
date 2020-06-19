using Microsoft.AspNetCore.Hosting;
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
                .ConfigureLogging(logging =>
                {
                    logging.AddApplicationInsights();
                })
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder
                        .ConfigureLogging(
                            builder =>
                            {
                                // Providing an instrumentation key here is required if you're using
                                // standalone package Microsoft.Extensions.Logging.ApplicationInsights
                                // or if you want to capture logs from early in the application startup 
                                // pipeline from Startup.cs or Program.cs itself.
                                builder.AddApplicationInsights(Common.Config.InstrumentationKey);

                                // Adding the filter below to ensure logs of all severity from Program.cs
                                // is sent to ApplicationInsights.
                                builder
                                    .AddFilter<Microsoft.Extensions.Logging.ApplicationInsights.
                                            ApplicationInsightsLoggerProvider>
                                        (typeof(Program).FullName, LogLevel.Trace);
                            })
                        .UseStartup<Startup>();
                });
    }
}
