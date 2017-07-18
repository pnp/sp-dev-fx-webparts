using AskSPRider.Models;
using Microsoft.SharePoint.Client;
using OfficeDevPnP.Core;
using System;

namespace AskSPRider.Helper
{
    public class ProcessRequest
    {
        public static string createSubSite(SiteRequest siteRequest)
        {
            try
            {
                var o365SecurePassword = Common.getSecureString(Configuration.strO365AdminPassword);
                var O365Context = new AuthenticationManager().GetSharePointOnlineAuthenticatedContextTenant(siteRequest.ParentSiteUrl, Configuration.strO365AdminId, o365SecurePassword);
                O365Context.Load(O365Context.Web);
                O365Context.ExecuteQuery();

                WebCreationInformation wci = new WebCreationInformation();
                wci.Url = siteRequest.URLName;
                wci.Title = siteRequest.Title;
                wci.Description = siteRequest.Description;                
                wci.WebTemplate = siteRequest.Template;
                wci.UseSamePermissionsAsParentSite = true;
                wci.Language = 1033;

                Web subSite = O365Context.Site.RootWeb.Webs.Add(wci);                
                O365Context.Load(subSite, w => w.AllProperties, w => w.Title, w => w.Url);
                O365Context.ExecuteQuery();

                return "Sub-Site : "+ subSite.Title + " created successfully. This is your sub-site URL: " + subSite.Url;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public static bool checkSiteStatus(string strO365Siteurl)
        {
            try
            {
                var o365SecurePassword = Common.getSecureString(Configuration.strO365AdminPassword);
                var O365Context = new AuthenticationManager().GetSharePointOnlineAuthenticatedContextTenant(strO365Siteurl, Configuration.strO365AdminId, o365SecurePassword);
                O365Context.Load(O365Context.Web, w => w.Title);
                O365Context.ExecuteQuery();

                if (String.IsNullOrEmpty(O365Context.Web.Title))
                    return false;
                else
                    return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }
    }
}