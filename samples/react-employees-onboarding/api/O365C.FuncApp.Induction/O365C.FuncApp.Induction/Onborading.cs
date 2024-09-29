using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using O365C.FuncApp.Induction.Models;
using O365C.FuncApp.Induction.Services;
using O365C.FuncApp.OnBoarding.Models;

namespace O365C.FuncApp.Induction
{
    public class Onborading
    {
        private readonly ILogger<Onborading> _logger;
        private readonly AzureFunctionSettings _azureFunctionSettings;
        private readonly ISharePointService _sharePointService;
        private readonly IGraphService _graphService;

        public Onborading(ILogger<Onborading> logger, AzureFunctionSettings azureFunctionSettings, ISharePointService sharePointService, IGraphService graphService)
        {
            _logger = logger;
            _azureFunctionSettings = azureFunctionSettings;
            _sharePointService = sharePointService;
            _graphService = graphService;
        }

        [Function("Onborading")]
        public async Task<IActionResult> RunAsync([HttpTrigger(AuthorizationLevel.Anonymous, "get", "post")] HttpRequest req)
        {
            _logger.LogInformation("C# HTTP trigger function processed a request.");

            string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
            if (string.IsNullOrEmpty(requestBody))
            {
                return new BadRequestObjectResult("Please pass a valid request body");
            }
             try
            {
                List<RequestDetail> requestDetail = JsonConvert.DeserializeObject<List<RequestDetail>>(requestBody);
                if(requestDetail == null)
                {
                    return new BadRequestObjectResult("Invalid JSON in request body");
                }
                var result = await _graphService.UserOnboarding(requestDetail);
                return new OkObjectResult(result);
            }
            catch (JsonReaderException)
            {
                return new BadRequestObjectResult("Invalid JSON in request body");
            }
            catch (Exception ex)
            {
                // Log the exception here
                return new StatusCodeResult(StatusCodes.Status500InternalServerError);
            }

            //return new OkObjectResult("Welcome to Azure Functions!");
        }
    }
}
