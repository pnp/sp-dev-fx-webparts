using System;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Azure.WebJobs.Host;
using Microsoft.SharePoint.Client;
using OfficeDevPnP.Core.Framework.Provisioning.Model;
using OfficeDevPnP.Core.Framework.Provisioning.Providers.Xml;
using ProvisioningApp.Models;
using ProvisioningApp.Utils;

namespace ProvisioningApp.Functions
{
  public static class ApplyProvisioningTemplate
  {
    [FunctionName("ApplyProvisioningTemplate")]
    public static async Task<HttpResponseMessage> Run([HttpTrigger(AuthorizationLevel.Function, "post", Route = null)]HttpRequestMessage req, TraceWriter log, ExecutionContext context)
    {
      log.Info("C# HTTP trigger function processed a request.");

      try
      {
        var requestBody = await req.Content.ReadAsAsync<ApplyProvisioningInfo>();

        if (requestBody == null)
          return req.CreateResponse(HttpStatusCode.BadRequest);

        var ctx = Helper.GetADAppOnlyContext(requestBody.WebUrl, context.FunctionAppDirectory);
        using (ctx)
        {
          Web web = ctx.Web;
          ctx.Load(web, w => w.Title);
          ctx.ExecuteQueryRetry();

          // Configure the XML file system provider
          XMLTemplateProvider provider =
          new XMLFileSystemTemplateProvider(Path.GetTempPath(), "");

          byte[] byteArray = Encoding.ASCII.GetBytes(requestBody.Template);
          MemoryStream stream = new MemoryStream(byteArray);

          // Load the template from the XML stored copy
          ProvisioningTemplate template = provider.GetTemplate(stream);

          // We can also use Apply-PnPProvisioningTemplate
          web.ApplyProvisioningTemplate(template);
        }

        return req.CreateErrorResponse(HttpStatusCode.OK, "Done!");

      }
      catch (Exception ex)
      {
        return req.CreateErrorResponse(System.Net.HttpStatusCode.InternalServerError, ex.Message);
      }

    }
  }
}
