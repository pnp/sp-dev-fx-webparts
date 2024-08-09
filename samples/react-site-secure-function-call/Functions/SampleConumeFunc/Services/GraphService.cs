using Azure.Core;
using Azure.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.Graph;
using Microsoft.Graph.Models;
using Microsoft.Graph.Sites.Item;

namespace SampleConsumeFunc.Services
{
  public class GraphService : IGraphService
  {
    private readonly IConfiguration _config;
    private readonly ILogger _logger;
    private GraphServiceClient? _appGraphClient;

    public GraphService(IConfiguration config, ILogger<GraphService> logger)
    {
      _config = config;
      _logger = logger;
    }

    public async Task<bool> UpdateSiteDescreption(string userAssertion, string siteUrl, string newSiteDescreption)
    {
      _appGraphClient = GetUserGraphClient(userAssertion);
      Uri uri = new Uri(siteUrl);
      string domain = uri.Host;
      var path = uri.LocalPath;
      var site = await _appGraphClient.Sites[$"{domain}:{path}"].GetAsync();

      var newSite = new Site
      {
        Description = newSiteDescreption
      };

      try
      {
        await _appGraphClient.Sites[site.Id].PatchAsync(newSite);
      }
      catch (Microsoft.Graph.Models.ODataErrors.ODataError ex)
      {
        _logger.LogError(ex.Message);
      }

      return true;
    }

    public GraphServiceClient? GetUserGraphClient(string userAssertion)
    {
      var tenantId = _config["tenantId"];
      var clientId = _config["clientId"];
      var clientSecret = _config["clientSecret"];
      var scopes = new[] { "https://graph.microsoft.com/.default" };

      if (string.IsNullOrEmpty(tenantId) ||
          string.IsNullOrEmpty(clientId) ||
          string.IsNullOrEmpty(clientSecret))
      {
        _logger.LogError("Required settings missing: 'tenantId', 'clientId', or 'clientSecret'.");
        return null;
      }

      var onBehalfOfCredential = new OnBehalfOfCredential(
          tenantId, clientId, clientSecret, userAssertion);
      
      return new GraphServiceClient(onBehalfOfCredential, scopes);
    }
  }
}
