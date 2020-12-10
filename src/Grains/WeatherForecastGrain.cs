using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GrainsInterfaces;
using Orleans;

namespace Grains
{
    public class WeatherForecastGrain : Grain, IWeatherForecastGrain
    {
        private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        public Task<IEnumerable<WeatherForecast>> Get()
        {
            var rng = new Random();
            var result = Enumerable.Range(1, 10).Select(index => new WeatherForecast
                {
                    Date = DateTime.Now.AddDays(index),
                    TemperatureC = rng.Next(-20, 55),
                    Summary = Summaries[rng.Next(Summaries.Length)]
                })
                .ToList();

            return Task.FromResult(result.AsEnumerable());
        }
    }
}
