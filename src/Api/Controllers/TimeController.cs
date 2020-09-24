using System;
using System.Threading.Tasks;
using GrainsInterfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Orleans;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TimeController : Controller
    {
        private readonly IClusterClient _clusterClient;

        public TimeController(IClusterClient clusterClient)
        {
            _clusterClient = clusterClient;
        }

        [HttpGet]
        public async Task<ActionResult<string>> GetTime()
        {
            var grain = _clusterClient.GetGrain<ITimeGrain>(Guid.Empty);

            return await grain.GetCurrentTime();
        }
    }
}