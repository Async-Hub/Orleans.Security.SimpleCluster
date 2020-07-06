using System;
using System.Threading.Tasks;
using GrainsInterfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Orleans;

namespace Api.Controllers
{
    [ApiController, Authorize]
    [Route("api/[controller]/{userName}")]
    public class SecretController : Controller
    {
        private readonly IClusterClient _clusterClient;
        private readonly ILogger<SecretController> _logger;

        public SecretController(IClusterClient clusterClient, 
            ILogger<SecretController> logger)
        {
            _clusterClient = clusterClient;
            _logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult<string>> Get(string userName)
        {
            var grain = _clusterClient.GetGrain<IUserGrain>(userName);

            try
            {
                return await grain.TakeSecret();
            }
            // For Application Insights Snapshot debugger.
            // Do not use for production cases.
            catch
            {
                throw  new InvalidOperationException("Can't access secrets.");
            }
        }
    }
}
