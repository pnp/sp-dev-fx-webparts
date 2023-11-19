
using O365Clinic.Function.Webhooks.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace O365Clinic.Function.Webhooks
{
    public interface ISharePointService
    {
        /// <summary>
        /// Get Incidents
        /// </summary>
        /// <param name="siteUrl"></param>
        /// <returns></returns>
        //Task<List<IncidentItem>> GetTickets(string siteUrl);
        Task GetListRecentChanges(string siteUrl, string cardPath);

    }
}