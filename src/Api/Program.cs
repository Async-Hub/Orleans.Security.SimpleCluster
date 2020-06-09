using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore;
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

        public static IHostBuilder CreateHostBuilder(string[] args) =>
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
                                builder.AddApplicationInsights("20d4b612-e229-4ba7");

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
