using Microsoft.Azure.Functions.Worker;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using O365C.FuncApp.Induction;
using O365C.FuncApp.Induction.Services;
using PnP.Core.Auth.Services.Builder.Configuration;
using PnP.Core.Services.Builder.Configuration;
using System.Security.Cryptography.X509Certificates;


AzureFunctionSettings azureFunctionSettings = null;

var host = new HostBuilder()
    .ConfigureFunctionsWebApplication()
    .ConfigureServices((context, services) =>
    {
        services.AddApplicationInsightsTelemetryWorkerService();
        services.ConfigureFunctionsApplicationInsights();

        // Add our global configuration instance
        services.AddSingleton(options =>
        {
            var configuration = context.Configuration;
            azureFunctionSettings = new AzureFunctionSettings();
            configuration.Bind(azureFunctionSettings);
            return configuration;
        });

        // Add our configuration class                
        services.AddSingleton(options => { return azureFunctionSettings; });


        // Add and configure PnP Core SDK
        services.AddPnPCore(options =>
        {
            // Add the base site url
            options.Sites.Add("Default", new PnPCoreSiteOptions
            {
                SiteUrl = azureFunctionSettings.SiteUrl
            });
        });
        services.AddPnPCoreAuthentication(options =>
        {
            // Load the certificate to use
            X509Certificate2 cert = LoadCertificate(azureFunctionSettings);

            // Configure certificate based auth
            options.Credentials.Configurations.Add("CertAuth", new PnPCoreAuthenticationCredentialConfigurationOptions
            {
                ClientId = azureFunctionSettings.ClientId,
                TenantId = azureFunctionSettings.TenantId,
                X509Certificate = new PnPCoreAuthenticationX509CertificateOptions
                {
                    Certificate = cert,
                }
            });

            // Connect this auth method to the configured site
            options.Sites.Add("Default", new PnPCoreAuthenticationSiteOptions
            {
                AuthenticationProviderName = "CertAuth",
            });

            options.Credentials.DefaultConfiguration = "CertAuth";
        });

        // Add services
        services.AddSingleton<IGraphService, GraphService>();
        services.AddSingleton<ITokenService, TokenService>();
        services.AddSingleton<ISharePointService, SharePointService>();

    })
    .Build();

host.Run();

X509Certificate2 LoadCertificate(AzureFunctionSettings? azureFunctionSettings)
{
    // Will only be populated correctly when running in the Azure Function host    
    string certBase64Encoded = Environment.GetEnvironmentVariable("Base64EncodedCert")?.ToString() ?? string.Empty;

    if (!string.IsNullOrEmpty(certBase64Encoded))
    {
        // Azure Function flow
        return new X509Certificate2(Convert.FromBase64String(certBase64Encoded),
                                    "pBGO8A1tQLBdPsI",
                                    X509KeyStorageFlags.Exportable |
                                    X509KeyStorageFlags.MachineKeySet |
                                    X509KeyStorageFlags.EphemeralKeySet);
    }
    else
    {
        // Local flow
        var store = new X509Store(StoreName.My, StoreLocation.CurrentUser);
        store.Open(OpenFlags.ReadOnly | OpenFlags.OpenExistingOnly);
        var thumbprint = azureFunctionSettings?.CertificateThumbprint ?? "defaultThumbprint";
        var certificateCollection = store.Certificates.Find(X509FindType.FindByThumbprint, thumbprint, false);
        store.Close();

        return certificateCollection.First();
    }
}
