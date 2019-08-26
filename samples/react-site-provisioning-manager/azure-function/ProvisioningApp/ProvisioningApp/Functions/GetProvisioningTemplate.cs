using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using System.Xml.Linq;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Azure.WebJobs.Host;
using Microsoft.SharePoint.Client;
using OfficeDevPnP.Core;
using OfficeDevPnP.Core.Framework.Provisioning.Connectors;
using OfficeDevPnP.Core.Framework.Provisioning.Model;
using OfficeDevPnP.Core.Framework.Provisioning.ObjectHandlers;
using OfficeDevPnP.Core.Framework.Provisioning.Providers.Xml;
using ProvisioningApp.Models;
using ProvisioningApp.Constants;
using ProvisioningApp.Utils;
using System.IO;

namespace ProvisioningApp
{
  public static class GetProvisioningTemplate
  {
    [FunctionName("GetProvisioningTemplate")]
    public static async Task<HttpResponseMessage> Run([HttpTrigger(AuthorizationLevel.Function, "post", Route = null)]HttpRequestMessage req, TraceWriter log, ExecutionContext context)
    {
      log.Info("C# HTTP trigger function processed a request.");
      
      try
      {
        var requestBody = await req.Content.ReadAsAsync<LoadProvisioningInfo>();

        if (requestBody == null)
          return req.CreateResponse(System.Net.HttpStatusCode.BadRequest);
        
        GenerateProvisioningTemplate(requestBody,context.FunctionAppDirectory);
        log.Info("Template has been created");
        var xDocument = XDocument.Load($"{Path.GetTempPath()}\\{Configs.FileName}");
        // convert the xml into string
        string xml = xDocument.ToString();
        var result = new HttpResponseMessage(System.Net.HttpStatusCode.OK);
        result.Content = new ByteArrayContent(System.Text.Encoding.UTF8.GetBytes(xml));
        result.Content.Headers.ContentType = new MediaTypeHeaderValue("text/xml");
        
        return result;

      }
      catch (Exception ex)
      {
        return req.CreateErrorResponse(System.Net.HttpStatusCode.InternalServerError,ex.Message);
      }

    }

    private static void GenerateProvisioningTemplate(LoadProvisioningInfo info, string appDirectory)
    {
      var context =  Helper.GetADAppOnlyContext(info.WebUrl, appDirectory);

      using (context)
      {
        Web web = context.Web;
        context.Load(web, w => w.Title);
        context.ExecuteQueryRetry();
        ProvisioningTemplateCreationInformation ptci
                   = new ProvisioningTemplateCreationInformation(context.Web);
        
        // Create FileSystemConnector to store a temporary copy of the template 
        ptci.FileConnector = new FileSystemConnector(Path.GetTempPath(), "");
        ptci.PersistBrandingFiles = true;

        ptci.HandlersToProcess = info.Handlers;
        // Execute actual extraction of the template
        ProvisioningTemplate template = context.Web.GetProvisioningTemplate(ptci);

        // We can serialize this template to save and reuse it
        // Optional step 
        XMLTemplateProvider provider =
                new XMLFileSystemTemplateProvider(Path.GetTempPath(), "");
        provider.SaveAs(template, Configs.FileName);        
      }
    }

    

  }
}
