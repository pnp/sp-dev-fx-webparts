using Google.Protobuf.Collections;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using O365C.FuncApp.Induction;
using O365C.FuncApp.Induction.Models;

using PnP.Core.Model;
using PnP.Core.Model.SharePoint;
using PnP.Core.QueryModel;
using PnP.Core.Services;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace O365C.FuncApp.Induction.Services
{
    public interface ISharePointService
    {
        Task AddListItemAsync(LogInfo logInfo);

    }
    public class SharePointService : ISharePointService
    {
        private readonly AzureFunctionSettings _azureFunctionSettings;
        private readonly IPnPContextFactory _pnpContextFactory;
        private readonly ILogger logger;

        public SharePointService(
            IPnPContextFactory pnpContextFactory,
            ILoggerFactory loggerFactory,
            AzureFunctionSettings azureFunctionSettings
            )
        {
            logger = loggerFactory.CreateLogger<SharePointService>();
            _pnpContextFactory = pnpContextFactory;
            _azureFunctionSettings = azureFunctionSettings;
        }

        public async Task AddListItemAsync(LogInfo logInfo)
        {
            try
            {
                using (var context = await _pnpContextFactory.CreateAsync(new Uri(_azureFunctionSettings.SiteUrl)))
                {
                    // Get the list
                    var list = context.Web.Lists.GetByTitle("Onboarding");

                    //// Check if the item already exists (use the caml query ) if so update it else create a new one. 
                    //StringBuilder camlQuery = new StringBuilder();
                    //camlQuery.Append("<View>");
                    //camlQuery.Append("<Query><Where>");
                    //camlQuery.Append("<Eq><FieldRef Name='Email' /><Value Type='Text'>" + logInfo.Email + "</Value></Eq>");
                    //camlQuery.Append("</Where></Query>");
                    //camlQuery.Append("<RowLimit>1</RowLimit>");
                    //camlQuery.Append("</View>");

                    //// Load the list items
                    //list.LoadItemsByCamlQuery(new CamlQueryOptions()
                    //{
                    //    ViewXml = camlQuery.ToString(),
                    //    DatesInUtc = true
                    //});
                    //await context.ExecuteAsync();

                    //var listItem = list.Items.AsRequested().FirstOrDefault();

                    //if (listItem != null && listItem.Count > 0)
                    //{
                    //    // Update the item
                    //    listItem.Values["Title"] = logInfo.Name;
                    //    listItem.Values["Department"] = logInfo.Department;
                    //    listItem.Values["TeamMembership"] = logInfo.TeamMembership;
                    //    listItem.Values["Notification"] = logInfo.Notification;
                    //    listItem.Values["CompletedOn"] = logInfo.CompletedOn;
                    //    await listItem.UpdateAsync();
                    //    await context.ExecuteAsync();
                    //}
                    
                        // Create a new item
                        await list.Items.AddAsync(new Dictionary<string, object>()
                        {
                            { "Title", logInfo.Name },
                            { "Email", logInfo.Email },
                            { "Department", logInfo.Department },
                            { "TeamMembership", logInfo.TeamMembership },
                            { "Notification", logInfo.Notification },
                            { "ProcessedOn", logInfo.ProcessedOn },
                            { "CompletedOn", logInfo.CompletedOn }
                        });
                        await context.ExecuteAsync();


                    




                }

            }
            catch (Exception ex)
            {
                logger.LogError(ex, "Error in AddItemsToList in Onboarding List");
            }
        }

    }
}
