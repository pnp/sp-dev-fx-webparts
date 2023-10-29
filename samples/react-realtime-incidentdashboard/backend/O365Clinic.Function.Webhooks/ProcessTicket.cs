using System;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Host;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using O365Clinic.Function.Webhooks.Models;
using System.Threading.Tasks;
using Microsoft.SharePoint.Client;
using System.Collections.Generic;
using System.IO;
using O365Clinic.Function.Webhooks.Helpers;

namespace O365Clinic.Function.Webhooks
{
    public class ProcessTicket
    {
        private readonly AzureFunctionSettings configSettings;
        private readonly ISharePointService sharePointService;

        public ProcessTicket(AzureFunctionSettings settings, ISharePointService sharePointService)
        {
            configSettings = settings;
            this.sharePointService = sharePointService;
        }

        [FunctionName("ProcessTicket")]
        public void Run([QueueTrigger("o365c-webhookqueue", Connection = "AzureWebJobsStorage")] string myQueueItem, ILogger log, ExecutionContext executionContext)
        {
            log.LogInformation($"C# Queue trigger function processed: {myQueueItem}");
                        
            var cardPath = Path.Combine(executionContext.FunctionAppDirectory, "Cards", "Incident.json");
            log.LogInformation($"Cards directory: {cardPath}");
            //string cardsDir = FunctionHelper.GetFilesDirectory(executionContext);

            var data = (JObject)JsonConvert.DeserializeObject(myQueueItem);

            var notificationResource = data["resource"].Value<string>();
                        
            var siteUrl = configSettings.TenantBaseUrl + data["siteUrl"].Value<string>();

            log.LogInformation($"List siteUrl: {siteUrl}");

            sharePointService.GetListRecentChanges(siteUrl, cardPath).GetAwaiter().GetResult();

            log.LogInformation($"notificationResource: {notificationResource}");
        }
    }
}
