using Microsoft.Identity.Client;
using Microsoft.SharePoint.Client;
using System;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;


namespace O365Clinic.Function.Webhooks.Helpers
{
    public class SPAuthenticationManager: IDisposable
    {
        private bool disposedValue;
        public ClientContext GetContext(string siteUrl, string clientId, string tenantId, string certificateThumbprint, string tenantBaseUrl)
        {
            string accessToken = EnsureAccessTokenAsync(clientId, tenantId, certificateThumbprint, tenantBaseUrl).GetAwaiter().GetResult();
            ClientContext clientContext = new ClientContext(siteUrl);
            clientContext.ExecutingWebRequest +=
               delegate (object oSender, WebRequestEventArgs webRequestEventArgs)
               {
                   webRequestEventArgs.WebRequestExecutor.RequestHeaders["Authorization"] =
                       "Bearer " + accessToken;
               };
            return clientContext;         
        }

        public async Task<string> EnsureAccessTokenAsync(string clientId, string tenantId, string certificateThumbprint, string tenantBaseUrl)
        {
            X509Certificate2 certificate = LoadCertificate(certificateThumbprint);
            var scopes = new string[] { $"{tenantBaseUrl}/.default" };

            IConfidentialClientApplication clientApp = ConfidentialClientApplicationBuilder
                                           .Create(clientId)
                                           .WithCertificate(certificate)
                                           .WithTenantId(tenantId)
                                           .Build();

            AuthenticationResult authResult = await clientApp.AcquireTokenForClient(scopes).ExecuteAsync();
            string accessToken = authResult.AccessToken;
            return accessToken;
        }
               

        private X509Certificate2 LoadCertificate(string certificateThumbprint)
        {
            // Will only be populated correctly when running in the Azure Function host
            string certBase64Encoded = Environment.GetEnvironmentVariable("CertificateBase64Encoded", EnvironmentVariableTarget.Process);

            if (!string.IsNullOrEmpty(certBase64Encoded))
            {
                // Azure Function flow
                return new X509Certificate2(Convert.FromBase64String(certBase64Encoded),
                                            "",
                                            X509KeyStorageFlags.Exportable |
                                            X509KeyStorageFlags.MachineKeySet |
                                            X509KeyStorageFlags.EphemeralKeySet);
            }
            else
            {
                // Local flow
                var store = new X509Store(StoreName.My, StoreLocation.CurrentUser);
                store.Open(OpenFlags.ReadOnly | OpenFlags.OpenExistingOnly);
                var certificateCollection = store.Certificates.Find(X509FindType.FindByThumbprint, certificateThumbprint, false);
                store.Close();

                return certificateCollection.First();
            }
        }

        public void Dispose()
        {
            // Do not change this code. Put cleanup code in 'Dispose(bool disposing)' method            
            GC.SuppressFinalize(this);
        }
    }
}
