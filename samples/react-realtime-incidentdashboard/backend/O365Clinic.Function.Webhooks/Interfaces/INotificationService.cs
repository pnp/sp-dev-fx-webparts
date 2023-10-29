using Microsoft.Graph.Models;
using O365Clinic.Function.Webhooks.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace O365Clinic.Function.Webhooks.Interfaces
{
    public interface INotificationService
    {
        Task SendNotificationToChannel(string webhookUrl, IncidentItem incidentItem, string itemDisplayUrl, string cardPath);

    }
    
        
}
