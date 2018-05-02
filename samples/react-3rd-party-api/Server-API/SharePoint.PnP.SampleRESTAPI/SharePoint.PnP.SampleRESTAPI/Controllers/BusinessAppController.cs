using SharePoint.PnP.SampleRESTAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace SharePoint.PnP.SampleRESTAPI.Controllers
{
  [Authorize]
  public class BusinessAppController : ApiController
  {
    /// <summary>
    /// This action just makes the echo of the request and provides the current
    /// username in the response, together with the date and time of the request
    /// </summary>
    /// <param name="request">The request with the text to echo</param>
    /// <returns>The response with the echo, the username, and the date and time of the request</returns>
    [HttpPost]
    [Route("api/BusinessAction")]
    public BusinessResponse BusinessAction(BusinessRequest request)
    {
      BusinessResponse response = new BusinessResponse();
      response.Echo = request.TextToEcho;
      response.RequestDate = DateTime.Now;

      if (System.Threading.Thread.CurrentPrincipal != null &&
        System.Threading.Thread.CurrentPrincipal.Identity != null &&
        System.Threading.Thread.CurrentPrincipal.Identity.IsAuthenticated)
      {
        response.Username = System.Threading.Thread.CurrentPrincipal.Identity.Name;
      }

      return (response);
    }
  }
}
