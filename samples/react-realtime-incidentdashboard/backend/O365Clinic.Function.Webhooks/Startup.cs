using Microsoft.Azure.Functions.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using O365Clinic.Function.Webhooks.Interfaces;
using O365Clinic.Function.Webhooks.Models;
using O365Clinic.Function.Webhooks.Services;
using System;
using System.Linq;
using System.Security.Cryptography.X509Certificates;


[assembly: FunctionsStartup(typeof(O365Clinic.Function.Webhooks.Startup))]

namespace O365Clinic.Function.Webhooks
{
    public class Startup : FunctionsStartup
    {
        public override void Configure(IFunctionsHostBuilder builder)
        {

            var config = builder.GetContext().Configuration;
            var azureFunctionSettings = new AzureFunctionSettings();
            config.Bind(azureFunctionSettings);

            // Add our configuration class
            builder.Services.AddSingleton(options => { return azureFunctionSettings; });
            builder.Services.AddSingleton<ISharePointService, SharePointService>();
            builder.Services.AddSingleton<INotificationService, NotificationService>();
            builder.Services.AddSingleton<IGraphService, GraphService>();

            ////Register the code page provider
            //Encoding.RegisterProvider(CodePagesEncodingProvider.Instance);


            //// Add and configure PnP Core SDK
            //builder.Services.AddPnPCore(options =>
            //{

            //    // Load the certificate to use
            //    X509Certificate2 cert = LoadCertificate(azureFunctionSettings);

            //    // Disable telemetry because of mixed versions on AppInsights dependencies
            //    options.DisableTelemetry = true;

            //    // Configure an authentication provider with certificate (Required for app only)
            //    var authProvider = new X509CertificateAuthenticationProvider(
            //        azureFunctionSettings.ClientId,
            //        azureFunctionSettings.TenantId,
            //        cert
            //        );

            //    // And set it as default
            //    options.DefaultAuthenticationProvider = authProvider;

            //    // Add a default configuration with the site configured in app settings
            //    options.Sites.Add("Default",
            //           new PnPCoreSiteOptions
            //           {
            //               SiteUrl = azureFunctionSettings.SiteUrl,
            //               AuthenticationProvider = authProvider
            //           });
            //});

        }

        private static X509Certificate2 LoadCertificate(AzureFunctionSettings azureFunctionSettings)
        {
            // Will only be populated correctly when running in the Azure Function host
            string certBase64Encoded = Environment.GetEnvironmentVariable("CertificateFromKeyVault", EnvironmentVariableTarget.Process);

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
                var certificateCollection = store.Certificates.Find(X509FindType.FindByThumbprint, azureFunctionSettings.CertificateThumbprint, false);
                store.Close();

                return certificateCollection.First();
            }
        }
    }
}
