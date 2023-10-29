using Microsoft.SharePoint.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace O365Clinic.Function.Webhooks.Models
{
    public class IncidentItem
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public string Priority { get; set; }
        public string Status { get; set; }
        public string AssignedTo { get; set; }
        public string DateReported { get; set; }
        public string IssueSource { get; set; }
        public string IssueLoggedBy { get; set; }
        public string Images { get; set; }

    }
}
