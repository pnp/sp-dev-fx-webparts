
using Azure.Identity;
using M365ServiceHealth.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.Graph;
using Microsoft.Graph.Models;
using Azure.Core.Serialization;


namespace M365ServiceHealth.Function
{

    public class M365ServiceHealth
    {
        private readonly ILogger _logger;
        private readonly IGraphClientService _graphClientService;
        private readonly ITokenValidationService _tokenAcquisition;
        private readonly IConfiguration _configuration;
        private readonly JsonObjectSerializer _jsonSerializer;
        public M365ServiceHealth(ILoggerFactory loggerFactory, IConfiguration configuration,ITokenValidationService tokenValidationService,IGraphClientService graphClientService, JsonObjectSerializer jsonSerializer)
        {
            _logger = loggerFactory.CreateLogger<M365ServiceHealth>();
            _graphClientService = graphClientService;
            _tokenAcquisition = tokenValidationService;
            _configuration = configuration;
            _jsonSerializer = jsonSerializer;
        }
        [Authorize]

        [Function("M365ServiceHealth")]
        public async Task<HttpResponseData> Run([HttpTrigger(AuthorizationLevel.Anonymous, "get", "post")] HttpRequestData req)
        {
            _logger.LogInformation("M365ServiceHealth azure function processing started");
            HttpResponseData response = req.CreateResponse();            

            bool runAsApplicationPermission = _configuration.GetValue<bool>("RunAsApplicationPermission");
            string bearerToken = String.Empty;
            try 
            {
                 bearerToken = await _tokenAcquisition
                    .ValidateAuthorizationHeaderAsync(req);
            } 
            catch (Exception ex)
            {
                response.StatusCode = System.Net.HttpStatusCode.BadRequest;
                response.WriteString(ex.Message + " Required settings missing or not valid: 'tenantId', 'clientId', and 'clientSecret'.");
                return response;
            }
           
            // Use the options for serialization within this function
            if(bearerToken == null)
            {
                response.StatusCode = System.Net.HttpStatusCode.BadRequest;
                response.WriteString("Required settings missing or not valid: 'tenantId', 'clientId', and 'clientSecret'.");
                return response;
            }
            if (runAsApplicationPermission == true)
            {
                var graphClientAppPermission = _graphClientService.GetAppGraphClient();

                if (graphClientAppPermission != null)
                {
                    try
                    {
                        ServiceHealthCollectionResponse result = await graphClientAppPermission.Admin.ServiceAnnouncement.HealthOverviews.GetAsync((requestConfiguration) =>
                        {
                            requestConfiguration.QueryParameters.Expand = new string[] { "issues" };
                        });

                       
                        await response.WriteAsJsonAsync(result.Value, _jsonSerializer);
                        return response;
                    }
                    // Catch CAE exception from Graph SDK
                    catch (ServiceException svcex) when (svcex.Message.Contains("Continuous access evaluation resulted in claims challenge"))
                    {

                        Console.WriteLine($"{svcex}");
                       
                        response.StatusCode = System.Net.HttpStatusCode.BadRequest;
                        response.WriteString(svcex.Message);
                        return response;
                    }
                }
               
                response.StatusCode = System.Net.HttpStatusCode.BadRequest;
                response.WriteString("Required settings missing or not valid: 'tenantId', 'clientId', and 'clientSecret'.");
                return response;
            } else
            {
             

                var options = new OnBehalfOfCredentialOptions
                {
                    AuthorityHost = AzureAuthorityHosts.AzurePublicCloud,
                };
                string incomingToken = bearerToken.Replace("Bearer ", "");
                var graphClient = _graphClientService.GetAppGraphClient();
                if (graphClient != null)
                {
                    try
                    {
                        ServiceHealthCollectionResponse result = await graphClient.Admin.ServiceAnnouncement.HealthOverviews.GetAsync((requestConfiguration) =>
                        {
                            requestConfiguration.QueryParameters.Expand = new string[] { "issues" };
                        });
                        response.StatusCode = System.Net.HttpStatusCode.OK;
                        await response.WriteAsJsonAsync(result.Value, _jsonSerializer);
                        return response;
                        //return new OkObjectResult(_jsonSerializer.Serialize(result));
                    }
                    // Catch CAE exception from Graph SDK
                    catch (ServiceException svcex) when (svcex.Message.Contains("Continuous access evaluation resulted in claims challenge"))
                    {

                        Console.WriteLine($"{svcex}");
                        response.StatusCode=System.Net.HttpStatusCode.BadRequest;
                        response.WriteString($"{svcex.Message}");   
                        return response;
                        
                    }
                }
                response.StatusCode = System.Net.HttpStatusCode.BadRequest;
                response.WriteString("Required settings missing: 'tenantId', 'clientId', and 'clientSecret'.");
                return response;
                
            }
        }
    }
}
