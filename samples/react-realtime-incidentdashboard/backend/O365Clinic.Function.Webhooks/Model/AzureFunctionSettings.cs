using System.Security.Cryptography.X509Certificates;

namespace O365Clinic.Function.Webhooks.Models
{ 
    public class AzureFunctionSettings
    {        
        public string TenantId { get; set; }

        public string TenantBaseUrl { get; set; }
        public string ClientId { get; set; }            
        public string ClientSecret { get; set; }
        public string CertificateThumbprint { get; set; }
        public string CertificateName { get; set; }
        public string SiteUrl { get; set; }
        public string WebhookUrl { get; set; }        

    }
}
