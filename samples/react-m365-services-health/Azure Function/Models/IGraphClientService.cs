using Microsoft.Graph;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace M365ServiceHealth.Models
{
    public interface IGraphClientService
    {
        public GraphServiceClient? GetUserGraphClient(string userAssertion);
        public GraphServiceClient? GetAppGraphClient();
    }
}
