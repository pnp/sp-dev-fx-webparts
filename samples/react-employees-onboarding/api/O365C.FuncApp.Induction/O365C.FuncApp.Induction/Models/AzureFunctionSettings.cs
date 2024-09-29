using System.Security.Cryptography.X509Certificates;

namespace O365C.FuncApp.Induction 
{ 
    public class AzureFunctionSettings
    {        
        public string TenantId { get; set; }        
        public string ClientId { get; set; }            
        public string ClientSecret { get; set; }
        public string SiteUrl { get; set; }
        public string Base64EncodedCert { get; set; }
        public string CertificateThumbprint { get; set; }
    }
}
