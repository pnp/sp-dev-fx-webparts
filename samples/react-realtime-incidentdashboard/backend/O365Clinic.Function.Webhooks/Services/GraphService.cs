using Microsoft.Extensions.Logging;
using Microsoft.Graph.Models;
using O365Clinic.Function.Webhooks.Helpers;
using O365Clinic.Function.Webhooks.Interfaces;
using O365Clinic.Function.Webhooks.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace O365Clinic.Function.Webhooks.Services
{
   
    public class GraphService: IGraphService     
    {
        private readonly AzureFunctionSettings _configSettings;
        private readonly ILogger logger;

        public GraphService(
            ILoggerFactory loggerFactory,
            AzureFunctionSettings settings

            )
        {
            logger = loggerFactory.CreateLogger<GraphService>();
            _configSettings = settings;
        }

        public async Task<UserCollectionResponse> GetUsersAsync()
        {
            try
            {
                var graphClient = GraphAuthenticationManager.GetAuthenticatedGraphClient(_configSettings);

                var result = await graphClient.Users.GetAsync();

                return result;
            }
            catch (Exception)
            {                
                return null;
            }
          
        }
        public async Task<ChatMessage> SendMessageToChannel()
        {
            try
            {
                var graphClient = GraphAuthenticationManager.GetAuthenticatedGraphClient(_configSettings);

                var requestBody = new ChatMessage
                {
                    Body = new ItemBody
                    {
                        Content = "Hello World",
                    },
                };
                var result = await graphClient.Teams["cd76833a-7bf1-410f-ad41-6dac0b388540"].Channels["19:8d963euP_6rM_P_j8-s3RVcnU189W6Vv_qsPaUJcUIQ1@thread.tacv2"].Messages.PostAsync(requestBody);

                return result;
            }
            catch (Exception ex)
            {                
                return null;
            }

        }
    }

}
