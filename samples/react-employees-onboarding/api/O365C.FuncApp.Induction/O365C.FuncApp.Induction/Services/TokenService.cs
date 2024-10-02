using Azure.Core;
using Azure.Identity;
using Microsoft.Extensions.Configuration;
using O365C.FuncApp.Induction;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace O365C.FuncApp.Induction.Services
{
    public interface ITokenService
    {
        Task<string> GetAccessTokenAsync();
    }
    public class TokenService: ITokenService
    {

        private readonly AzureFunctionSettings _azureFunctionSettings;

        private readonly TokenCredential _tokenCredential;

        public TokenService(AzureFunctionSettings azureFunctionSettings)
        {
            _azureFunctionSettings = azureFunctionSettings;
            // Create TokenCredential using client secret
            _tokenCredential = new ClientSecretCredential(_azureFunctionSettings.TenantId, _azureFunctionSettings.ClientId, _azureFunctionSettings.ClientSecret);
        }

        public async Task<string> GetAccessTokenAsync()
        {
            // Use _tokenCredential to get access token
            var tokenRequestContext = new TokenRequestContext(new[] { "https://graph.microsoft.com/.default" });
            var accessToken = await _tokenCredential.GetTokenAsync(tokenRequestContext, default);
            return accessToken.Token;
        }

    }
}
