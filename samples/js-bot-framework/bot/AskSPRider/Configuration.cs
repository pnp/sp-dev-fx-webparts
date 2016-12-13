using System.Web.Configuration;

namespace AskSPRider
{
    public class Configuration
    {
        public static string strO365AdminId = WebConfigurationManager.AppSettings["O365AdminId"];
        public static string strO365AdminPassword = WebConfigurationManager.AppSettings["O365AdminPassword"];
    }
}