using System;
using System.Collections.Generic;
using System.Text;
using OfficeDevPnP.Core.Framework.Provisioning.Model;
namespace ProvisioningApp.Models
{
  public class LoadProvisioningInfo
  {
    public string WebUrl { get; set; }

    public Handlers Handlers { get; set; }
      
  }
}
