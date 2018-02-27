using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SharePoint.PnP.SampleRESTAPI.Models
{
  public class BusinessResponse
  {
    public String Username { get; set; }

    public DateTime RequestDate { get; set; }

    public String Echo { get; set; }
  }
}
