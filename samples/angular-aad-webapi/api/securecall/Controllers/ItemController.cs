using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace securecall.Controllers
{
    public class ItemController : ApiController
    {
        [Authorize]
        [EnableCors("*", "*", "*")]
        public HttpResponseMessage Get()
        {
            return Request.CreateResponse(HttpStatusCode.OK, "Successful Call");
        }
    }
}
