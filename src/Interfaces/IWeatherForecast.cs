using System.Collections.Generic;
using System.Threading.Tasks;
using Orleans;

namespace GrainsInterfaces
{
    public interface IWeatherForecastGrain : IGrainWithStringKey
    {
        Task<IEnumerable<WeatherForecast>> Get();
    }
}
