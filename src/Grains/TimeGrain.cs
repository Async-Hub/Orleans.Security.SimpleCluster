using System;
using System.Threading.Tasks;
using GrainsInterfaces;
using Orleans;
using Orleans.Concurrency;

namespace Grains
{
    [StatelessWorker]
    public class TimeGrain : Grain, ITimeGrain
    {
        private readonly Random _random;

        public TimeGrain()
        {
            _random = new Random();
        }

        public async Task<string> GetCurrentTime()
        {
            if (RandomNumber(1, 5) == 3)
            {
                await Task.Delay(3000);
                return DateTime.Now.ToLongTimeString();
            }

            return DateTime.Now.ToLongTimeString();
        }

        private int RandomNumber(int min, int max)
        {
            return _random.Next(min, max);
        }
    }
}