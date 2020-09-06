using Microsoft.SharePoint.Client;
using OfficeDevPnP.Core;
using System;
using System.Configuration;
using System.Net.Http;
using System.Web.Http;

namespace pnp.api.elevatedprivileges.Controllers {
    public class ItemsController : ApiController {
        // POST api/values
        public HttpResponseMessage Post([FromBody]dynamic data) {
            try {
                AuthenticationManager authMgr = new AuthenticationManager();
                using (ClientContext ctx = authMgr.GetAppOnlyAuthenticatedContext(
                    ConfigurationManager.AppSettings["siteUrl"],
                    ConfigurationManager.AppSettings["clientId"],
                    ConfigurationManager.AppSettings["clientSecret"])) {
                    var list = ctx.Web.Lists.GetByTitle(ConfigurationManager.AppSettings["listName"]);
                    var item = list.AddItem(new ListItemCreationInformation());
                    item["Title"] = data.title.ToString();
                    item.Update();
                    ctx.ExecuteQuery();
                    return new HttpResponseMessage(System.Net.HttpStatusCode.Created);
                }
            }
            catch {
                return new HttpResponseMessage(System.Net.HttpStatusCode.InternalServerError);
            }
        }
    }
}
