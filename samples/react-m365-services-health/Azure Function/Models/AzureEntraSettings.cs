using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace M365ServiceHealth.Models
{
    public class AzureEntraSettings
    {
        public string? Instance { get; set; }
        public string? TenantId {  get; set; }
        public string? ClientId { get; set; }
        public string? ClientSecret { get; set;}
        public string? Audience { get; set; }

    }
}
