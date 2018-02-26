using System;
using System.Collections.Generic;
using System.Configuration;
using System.Globalization;
using System.IdentityModel.Claims;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.Cookies;
using Microsoft.Owin.Security.OpenIdConnect;
using Microsoft.IdentityModel.Clients.ActiveDirectory;
using Owin;
using SharePoint.PnP.SampleRESTAPI.Models;
using Microsoft.Owin.Security.ActiveDirectory;
using System.IdentityModel.Tokens;

namespace SharePoint.PnP.SampleRESTAPI
{
  public partial class Startup
  {
    private static string clientId = ConfigurationManager.AppSettings["ida:ClientId"];
    private static string appKey = ConfigurationManager.AppSettings["ida:ClientSecret"];
    private static string aadInstance = ConfigurationManager.AppSettings["ida:AADInstance"];
    private static string tenantId = ConfigurationManager.AppSettings["ida:TenantId"];
    private static string postLogoutRedirectUri = ConfigurationManager.AppSettings["ida:PostLogoutRedirectUri"];

    public static readonly string Authority = aadInstance + tenantId;

    // This is the resource ID of the AAD Graph API.  We'll need this to request a token to call the Graph API.
    string graphResourceId = "https://graph.windows.net";

    public void ConfigureAuth(IAppBuilder app)
    {
      app.UseWindowsAzureActiveDirectoryBearerAuthentication(
          new WindowsAzureActiveDirectoryBearerAuthenticationOptions
          {
            Tenant = ConfigurationManager.AppSettings["ida:Domain"],
            TokenValidationParameters = new TokenValidationParameters
            {
              ValidAudience = ConfigurationManager.AppSettings["ida:Audience"]
            },
          });

      app.SetDefaultSignInAsAuthenticationType(CookieAuthenticationDefaults.AuthenticationType);

      app.UseCookieAuthentication(new CookieAuthenticationOptions());

      app.UseOpenIdConnectAuthentication(
          new OpenIdConnectAuthenticationOptions
          {
            ClientId = clientId,
            Authority = Authority,
            PostLogoutRedirectUri = postLogoutRedirectUri,

            Notifications = new OpenIdConnectAuthenticationNotifications()
            {
              // If there is a code in the OpenID Connect response, redeem it for an access token and refresh token, and store those away.
              AuthorizationCodeReceived = (context) =>
              {
                var code = context.Code;
                ClientCredential credential = new ClientCredential(clientId, appKey);
                string signedInUserID = context.AuthenticationTicket.Identity.FindFirst(ClaimTypes.NameIdentifier).Value;
                Microsoft.IdentityModel.Clients.ActiveDirectory.AuthenticationContext authContext =
                  new Microsoft.IdentityModel.Clients.ActiveDirectory.AuthenticationContext(Authority, new MemoryADALCache(signedInUserID));
                  AuthenticationResult result = authContext.AcquireTokenByAuthorizationCode(
                     code, new Uri(HttpContext.Current.Request.Url.GetLeftPart(UriPartial.Path)), credential, graphResourceId);

                return Task.FromResult(0);
              }
            }
          });
    }
  }
}
