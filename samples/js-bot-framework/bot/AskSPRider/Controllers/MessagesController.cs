using AskSPRider.Forms;
using Microsoft.Bot.Builder.Dialogs;
using Microsoft.Bot.Builder.FormFlow;
using Microsoft.Bot.Connector;
using System;
using System.Net;
using System.Net.Http;
using System.ServiceModel.Channels;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;

namespace AskSPRider
{
    [BotAuthentication]
    public class MessagesController : ApiController
    {      
        internal static IDialog<SiteRequestOrder> BuildSiteRequestDialog()
        {
            return Chain.From(() => FormDialog.FromForm(SiteRequestOrder.BuildForm));            
        }
        
        [ResponseType(typeof(void))]
        public virtual async Task<HttpResponseMessage> Post([FromBody] Activity activity)
        {
            await Conversation.SendAsync(activity, BuildSiteRequestDialog);
            return new HttpResponseMessage(System.Net.HttpStatusCode.Accepted);
        }        
    }
}