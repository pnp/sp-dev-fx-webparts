
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Primitives;
using Newtonsoft.Json.Linq;
using O365Clinic.Function.Webhooks.Interfaces;
using O365Clinic.Function.Webhooks.Models;
using System;
using System.Collections.Generic;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Web;
using System.Security.Policy;

using System.Linq;
using O365Clinic.Function.Webhooks.Helpers;
using Microsoft.SharePoint.Client;
using ChangeToken = Microsoft.SharePoint.Client.ChangeToken;
using O365Clinic.Function.Webhooks.Mapper;

namespace O365Clinic.Function.Webhooks.Services
{
    public class SharePointService : ISharePointService
    {
        private readonly AzureFunctionSettings _configSettings;
        private readonly INotificationService _notificationService;
        private readonly ILogger logger;

        public SharePointService(
            ILoggerFactory loggerFactory,
            AzureFunctionSettings settings,
            INotificationService notificationService             
            )
        {
            logger = loggerFactory.CreateLogger<SharePointService>();
            _configSettings = settings;
            _notificationService = notificationService;
        }

        public async Task GetListRecentChanges(string siteUrl, string cardPath)
        {
            logger.LogInformation("Gettinng list recent changes...");
            string result = string.Empty;
            using (SPAuthenticationManager authenticationManager = new SPAuthenticationManager())
            using (var clientContext = authenticationManager.GetContext(siteUrl, _configSettings.ClientId, _configSettings.TenantId, _configSettings.CertificateThumbprint, _configSettings.TenantBaseUrl))
            {
                logger.LogInformation("SP Context initialized");
                try
                {
                    Web web = clientContext.Web;
                    List list = web.Lists.GetByTitle("Tickets");
                    clientContext.Load(list);
                    await clientContext.ExecuteQueryAsync();

                    var listId = list.Id.ToString();
                    var duration = "5";

                    ChangeToken changeTokenStart = new ChangeToken();
                    changeTokenStart.StringValue = string.Format("1;3;{0};{1};-1", listId, DateTime.Now.AddMinutes(Convert.ToInt32(duration) * -1).ToUniversalTime().Ticks.ToString());
                    ChangeToken changeTokenEnd = new ChangeToken();
                    changeTokenEnd.StringValue = string.Format("1;3;{0};{1};-1", listId, DateTime.Now.ToUniversalTime().Ticks.ToString());
                    ChangeQuery changeTokenQuery = new ChangeQuery(false, false);
                    changeTokenQuery.Item = true;
                    changeTokenQuery.Add = true;
                    changeTokenQuery.Update = true;
                    changeTokenQuery.ChangeTokenStart = changeTokenStart;
                    changeTokenQuery.ChangeTokenEnd = changeTokenEnd;

                    var changes = list.GetChanges(changeTokenQuery);
                    clientContext.Load(changes);
                    await clientContext.ExecuteQueryAsync();

                    logger.LogInformation("Total Changes: " + changes.Count);


                    if (changes.Count > 0)
                    {
                        foreach (var change in changes)
                        {
                            if (change is ChangeItem)
                            {
                                var item = (ChangeItem)change;
                                var itemId = item.ItemId;
                                var listItem = list.GetItemById(itemId);
                                clientContext.Load(listItem);
                                clientContext.Load(listItem, li => li["Title"], li => li["Description"], li => li["Status"], li => li["Priority"], li => li["IssueSource"], li => li["Issueloggedby"]);
                                await clientContext.ExecuteQueryAsync();

                                if (listItem != null)
                                {
                                    IncidentItem incidentItem = IncidentMapper.MapIncidents(listItem);
                                    
                                    if (incidentItem.Priority.Equals("Critical", StringComparison.OrdinalIgnoreCase))
                                    {
                                        var itemDisplayUrl = _configSettings.TenantBaseUrl + listItem["FileDirRef"].ToString() + "/"+ "DispForm.aspx?ID=" + listItem["ID"];
                                        logger.LogInformation("Critical ticket found");
                                        logger.LogInformation("Posting notification to IT Support Channel in Teams");                                        
                                        await _notificationService.SendNotificationToChannel(_configSettings.WebhookUrl, incidentItem, itemDisplayUrl, cardPath);
                                        logger.LogInformation("Notification sent successfully");


                                    }
                                }
                            }
                        }
                    }
                    result = changes.Count.ToString();


                }
                catch (Exception ex)
                {
                    throw;
                }               


            }
        }



        public async Task<string> GetWebTitle(string siteUrl)
        {
            List<IncidentItem> incidentItems = new List<IncidentItem>();
            string result = string.Empty;
            using (SPAuthenticationManager authenticationManager = new SPAuthenticationManager())
            using (var context = authenticationManager.GetContext(siteUrl, _configSettings.ClientId, _configSettings.TenantId, _configSettings.CertificateThumbprint, _configSettings.TenantBaseUrl))
            {
                context.Load(context.Web, p => p.Title);
                await context.ExecuteQueryAsync();
                result = context.Web.Title;
            }
            return result;
        }

    }
}
