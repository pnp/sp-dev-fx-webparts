using Microsoft.SharePoint.News.DataModel;
using O365Clinic.Function.Webhooks.Helpers;
using O365Clinic.Function.Webhooks.Interfaces;
using O365Clinic.Function.Webhooks.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace O365Clinic.Function.Webhooks.Services
{
    public class NotificationService : INotificationService
    {
        public async Task SendNotificationToChannel(string webhookUrl, IncidentItem incidentItem, string itemDisplayUrl, string cardPath)
        {
            string cardJson = GetConnectorCardJson(incidentItem, itemDisplayUrl, cardPath);
            await PostCardAsync(webhookUrl, cardJson);
        }
        private async Task PostCardAsync(string webhookUrl, string cardJson)
        {
            //prepare the http POST
            HttpClient client = new HttpClient();
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            var content = new StringContent(cardJson, System.Text.Encoding.UTF8, "application/json");
            using (var response = await client.PostAsync(webhookUrl, content))
            {
                // Check response.IsSuccessStatusCode and take appropriate action if needed.
            }
        }

        public string GetConnectorCardJson(IncidentItem incidentItem, string itemDisplayUrl, string cardPath)
        {

            var filePath = cardPath;
            var adaptiveCardJson = File.ReadAllText(filePath);
            var cardData = new
            {
                
                Title = incidentItem.Title,
                Description = incidentItem.Description,
                Priority = incidentItem.Priority,
                DateReported = incidentItem.DateReported,
                Issueloggedby = incidentItem.IssueLoggedBy,
                ItemDisplayUrl = itemDisplayUrl,                
            };
            var taskCard = AdaptiveCardHelper.BindAdaptiveCardData(adaptiveCardJson, cardData);

            return taskCard;


        }
    }
}
