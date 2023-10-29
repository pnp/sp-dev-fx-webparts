using Microsoft.SharePoint.Client;
using O365Clinic.Function.Webhooks.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace O365Clinic.Function.Webhooks.Mapper
{
    public static class IncidentMapper
    {
        public static IncidentItem MapIncidents(ListItem listItem)
        {
            List<IncidentItem> result = new List<IncidentItem>
            {
                new IncidentItem
                {
                    Title = !string.IsNullOrEmpty(listItem["Title"].ToString()) ? listItem["Title"].ToString() : string.Empty,
                    Description = !string.IsNullOrEmpty(listItem["Description"].ToString()) ? listItem["Description"].ToString() : string.Empty,
                    Status = !string.IsNullOrEmpty(listItem["Status"].ToString()) ? listItem["Status"].ToString() : string.Empty,
                    Priority = !string.IsNullOrEmpty(listItem["Priority"].ToString()) ? listItem["Priority"].ToString() : string.Empty,
                    DateReported = !string.IsNullOrEmpty(listItem["DateReported"].ToString()) ? listItem["DateReported"].ToString() : string.Empty,
                    IssueSource = listItem["IssueSource"] != null ? (listItem["IssueSource"] as FieldUrlValue).Url.ToString() : string.Empty,
                    IssueLoggedBy = listItem["Issueloggedby"] != null ? (listItem["Issueloggedby"] as FieldUserValue).Email : string.Empty,
                }
            };

            return result.FirstOrDefault();

        }
    }
}
