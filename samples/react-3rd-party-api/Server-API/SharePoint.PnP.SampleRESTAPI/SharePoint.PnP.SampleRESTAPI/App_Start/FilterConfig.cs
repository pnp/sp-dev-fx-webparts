using System.Web;
using System.Web.Mvc;

namespace SharePoint.PnP.SampleRESTAPI
{
  public class FilterConfig
  {
    public static void RegisterGlobalFilters(GlobalFilterCollection filters)
    {
      filters.Add(new HandleErrorAttribute());
    }
  }
}
