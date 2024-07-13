using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using SampleConsumeFunc.Model;
using SampleConsumeFunc.Services;
using System.Text;
using System.Text.Json;

namespace SampleConsumeFunc
{
  public class SiteFunction
  {
    private readonly ITokenValidationService _tokenValidationService;
    private readonly IGraphService _graphClientService;
    private readonly ILogger<SiteFunction> _logger;
    private readonly IConfiguration _config;

    public SiteFunction(ITokenValidationService tokenValidationService, IGraphService graphClientService, ILogger<SiteFunction> logger, IConfiguration config)
    {
      _tokenValidationService = tokenValidationService;
      _graphClientService = graphClientService;
      _logger = logger;
      _config = config;
    }

    [Function("SiteFunction")]
    public async Task<IActionResult> Run([HttpTrigger(AuthorizationLevel.Function, "get", "post")] HttpRequestData req)
    {
      _logger.LogInformation("C# HTTP trigger function processed a request.");

      var bearerToken = await _tokenValidationService
          .ValidateAuthorizationHeaderAsync(req);
      
      string siteUrl = req.Query["URL"];
      string siteDescreption = req.Query["Descreption"];

      // For a potential POST
      //string bodyContents;
      //using (Stream receiveStream = req.Body)
      //{
      //  using (StreamReader readStream = new StreamReader(receiveStream, Encoding.UTF8))
      //  {
      //    bodyContents = readStream.ReadToEndAsync().Result;
      //  }
      //}
      //var body = JsonSerializer.Deserialize<Request>(bodyContents);
      //_logger.LogInformation($"URL: {body.URL}");
      //_logger.LogInformation($"URL: {body.Descreption}");
      //string siteUrl = body.URL;
      //string siteDescreption = body.Descreption;

      bool siteDescreptionUpdated = await _graphClientService.UpdateSiteDescreption(bearerToken, siteUrl, siteDescreption);
      return siteDescreptionUpdated ? new OkObjectResult("") : new BadRequestResult();
    }
  }
}
