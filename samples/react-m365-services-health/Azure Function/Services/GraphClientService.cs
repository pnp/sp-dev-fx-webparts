using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Azure.Identity;
using M365ServiceHealth.Models;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.Graph;
namespace M365ServiceHealth.Services
{
    public class GraphClientService : IGraphClientService
    {
        private readonly IConfiguration _config;
        private readonly ILogger _logger;
        private GraphServiceClient? _appGraphClient;

        public GraphClientService(IConfiguration config, ILoggerFactory loggerFactory)
        {
            _config = config;
            _logger = loggerFactory.CreateLogger<GraphClientService>();
        }

        public GraphServiceClient? GetUserGraphClient(string userAssertion)
        {

            AzureEntraSettings azureSettings = _config.GetSection("AzureAd").Get<AzureEntraSettings>();
            var tenantId = azureSettings?.TenantId;
            var clientId = azureSettings?.ClientId;
            var clientSecret = azureSettings?.ClientSecret;

            if (string.IsNullOrEmpty(tenantId) ||
                string.IsNullOrEmpty(clientId) ||
                string.IsNullOrEmpty(clientSecret))
            {
                string message= "Required settings missing: 'tenantId', 'clientId', and 'clientSecret'.";
                _logger.LogError(message);
                return null;
            }

            var onBehalfOfCredential = new OnBehalfOfCredential(
                tenantId, clientId, clientSecret, userAssertion);

            return new GraphServiceClient(onBehalfOfCredential);
        }

        public GraphServiceClient? GetAppGraphClient()
        {
            if (_appGraphClient == null)
            {

                AzureEntraSettings azureSettings = _config.GetSection("AzureAd").Get<AzureEntraSettings>();
                var tenantId = azureSettings?.TenantId;
                var clientId = azureSettings?.ClientId;
                var clientSecret = azureSettings?.ClientSecret;

                if (string.IsNullOrEmpty(tenantId) ||
                    string.IsNullOrEmpty(clientId) ||
                    string.IsNullOrEmpty(clientSecret))
                {
                    _logger.LogError("Required settings missing: 'tenantId', 'clientId', and 'clientSecret'.");
                    return null;
                }
                var options = new TokenCredentialOptions
                {
                    AuthorityHost = AzureAuthorityHosts.AzurePublicCloud
                };
                var clientSecretCredential = new ClientSecretCredential(
                    tenantId, clientId, clientSecret,options);

                _appGraphClient = new GraphServiceClient(clientSecretCredential);
            }

            return _appGraphClient;
        }
    }
}
