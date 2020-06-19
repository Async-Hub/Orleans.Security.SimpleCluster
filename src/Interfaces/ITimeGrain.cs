using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Orleans;

namespace GrainsInterfaces
{
    public interface ITimeGrain : IGrainWithGuidKey
    {
        Task<string> GetCurrentTime();
    }
}
