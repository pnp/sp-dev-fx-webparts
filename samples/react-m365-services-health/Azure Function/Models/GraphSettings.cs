using Microsoft.Graph.Admin.Edge.InternetExplorerMode.SiteLists.Item.Publish;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace M365ServiceHealth.Models
{
    public class GraphSettings
    {
        public string? BaseUrl { get; set; }
        public string? Scopes { get;set; }
    }
}
