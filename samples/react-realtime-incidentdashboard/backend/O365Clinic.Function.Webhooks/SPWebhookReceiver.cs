using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Microsoft.WindowsAzure.Storage.Queue;
using O365Clinic.Function.Webhooks.Model;
using System.Text;
using Azure.Storage.Queues;
using O365Clinic.Function.Webhooks.Models;
using System.Collections.Generic;
using O365Clinic.Function.Webhooks.Services;
using O365Clinic.Function.Webhooks.Interfaces;
using Microsoft.AspNetCore.Mvc.Filters;

namespace O365Clinic.Function.Webhooks
{
    public class SPWebhookReceiver
    {
      
        private readonly AzureFunctionSettings _configSettings;
                
        public SPWebhookReceiver(
            ILoggerFactory loggerFactory,
            AzureFunctionSettings settings           
            )
        {            
            _configSettings = settings;            
        }

        [FunctionName("SPWebhookReceiver")]
        public async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", "post", Route = null)] HttpRequest req,
            [Queue("o365c-webhookqueue", Connection = "AzureWebJobsStorage")] QueueClient outputQueue, ILogger log, ExecutionContext execution)
        {
            log.LogInformation($"Webhook was triggered!");
                       

            // Grab the validationToken URL parameter
            string validationToken = req.Query["validationtoken"];

            // If a validation token is present, we need to respond within 5 seconds by
            // returning the given validation token. This only happens when a new
            // webhook is being added
            if (validationToken != null)
            {
                log.LogInformation($"Validation token {validationToken} received");
                return new OkObjectResult(validationToken);
            }

            log.LogInformation($"SharePoint triggered our webhook...great :-)");
            var content = await new StreamReader(req.Body).ReadToEndAsync();
            log.LogInformation($"Received following payload: {content}");

            var notifications = JsonConvert.DeserializeObject<ResponseModel<NotificationModel>>(content).Value;
            log.LogInformation($"Found {notifications.Count} notifications");

            if (notifications.Count > 0)
            {
                log.LogInformation($"Processing notifications...");
                foreach (var notification in notifications)
                {
                    // add message to the queue
                    string message = JsonConvert.SerializeObject(notification);
                    log.LogInformation($"Before adding a message to the queue. Message content: {message}");                                        
                    await outputQueue.SendMessageAsync(message);
                    log.LogInformation($"Message added :-)");
                }
            }

            // if we get here we assume the request was well received
            return new OkObjectResult($"Added to queue");
        }
    }
}
