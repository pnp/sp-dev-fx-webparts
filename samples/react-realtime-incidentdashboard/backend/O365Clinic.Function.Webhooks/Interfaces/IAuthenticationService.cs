using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace O365Clinic.Function.Webhooks.Interfaces
{
    public interface IAuthenticationService
    {
        Task<string> GetAccessTokenAsync(string[] scopes);
    }
}
