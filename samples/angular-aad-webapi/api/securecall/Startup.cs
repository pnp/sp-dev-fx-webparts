using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.Owin;
using Owin;
using System.Web.Http;
using Microsoft.Owin.Security.ActiveDirectory;
using System.IdentityModel.Tokens;
using System.Configuration;

[assembly: OwinStartup(typeof(securecall.Startup))]

namespace securecall
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            HttpConfiguration config = new HttpConfiguration();

            ConfigureAuthNew(app);

            WebApiConfig.Register(config);
            app.UseWebApi(config);
        }

        public void ConfigureAuthNew(IAppBuilder app)
        {
            app.UseWindowsAzureActiveDirectoryBearerAuthentication(
                new WindowsAzureActiveDirectoryBearerAuthenticationOptions
                {
                    TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidAudience = ConfigurationManager.AppSettings["Audience"]
                    },
                    Tenant = ConfigurationManager.AppSettings["Tenant"]
                });
        }
    }
}
