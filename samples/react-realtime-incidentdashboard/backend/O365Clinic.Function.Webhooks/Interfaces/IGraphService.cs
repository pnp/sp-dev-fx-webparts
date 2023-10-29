using Microsoft.Graph.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace O365Clinic.Function.Webhooks.Interfaces
{
    public interface IGraphService
    {
        Task<UserCollectionResponse> GetUsersAsync();
        Task<ChatMessage> SendMessageToChannel();

    }
    
        
}
