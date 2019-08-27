using Microsoft.SharePoint.Client;
using OfficeDevPnP.Core;
using System;
using ProvisioningApp.Constants;

namespace ProvisioningApp.Utils
{
  public static class Helper
  {
    public static ClientContext GetADAppOnlyContext(string siteUrl, string appDirectory)
    {
      var authMgr = new AuthenticationManager();

      string certificateName = Environment.GetEnvironmentVariable(Configs.certificatePathKey);
      string password = Environment.GetEnvironmentVariable(Configs.passwordKey);
      string clientId = Environment.GetEnvironmentVariable(Configs.clientIdKey);
      string tenant = Environment.GetEnvironmentVariable(Configs.tenantKey);
      string certificatePath = $"{appDirectory}\\Cert\\{certificateName}";

      if (string.IsNullOrEmpty(clientId))
        throw new ArgumentException($"Missing required environment variable '{Configs.clientIdKey}'");

      if (string.IsNullOrEmpty(certificateName))
        throw new ArgumentException($"Missing required environment variable '{Configs.certificatePathKey}'");

      if (string.IsNullOrEmpty(password))
        throw new ArgumentException($"Missing required environment variable '{Configs.passwordKey}'");

      if (string.IsNullOrEmpty(tenant))
        throw new ArgumentException($"Missing required environment variable '{Configs.tenantKey}'");

      return authMgr.GetAzureADAppOnlyAuthenticatedContext(siteUrl, clientId, tenant, certificatePath, password);
    }
  }
}
