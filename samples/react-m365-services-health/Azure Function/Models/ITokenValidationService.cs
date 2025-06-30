using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Azure.Functions.Worker.Http;

namespace M365ServiceHealth.Models
{
    public interface ITokenValidationService
    {
        public Task<string?> ValidateAuthorizationHeaderAsync(
            HttpRequestData request);
    }
}
