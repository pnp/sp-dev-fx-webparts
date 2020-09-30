import { sp, Site } from "@pnp/sp";
import { combine } from "@pnp/common";



export class SiteCollectionCatalogHelper {


  public static async  getSiteCollectionCatalogList(): Promise<SiteCatalogApps[]> {

    let resultData = new Array<SiteCatalogApps>();

    var tenantAppCatalogWeb = await sp.getTenantAppCatalogWeb();

    let siteCollectionAppCatalogs = await tenantAppCatalogWeb.lists.getByTitle("Site Collection App Catalogs").items.get();

    let data = await Promise.all(siteCollectionAppCatalogs.map(async siteCollCatalog => {

      let siteUrl = siteCollCatalog["SiteCollectionUrl"];

      let tmpSite = new Site(siteUrl);
      let tmpCatalog = await tmpSite.rootWeb.getSiteCollectionAppCatalog(siteUrl);
      let apps = await tmpCatalog.get();

      let tmpWeb = (await (await tmpSite.getRootWeb()).select("Title").get());


      if (apps.length == 0) {
        let tmpApp = new SiteCatalogApps();
        tmpApp = this.MapAppProps(tmpWeb, siteUrl, null, true);

        resultData.push(tmpApp);
      } else {
        apps.forEach(app => {
          let tmpApp = new SiteCatalogApps();
          tmpApp = this.MapAppProps(tmpWeb, siteUrl, app, false);
          resultData.push(tmpApp);
        });
      }
    }));

    return await resultData;
  }

  public static MapAppProps(tmpWeb: any, siteUrl: string, app: any, IsEmpty: boolean): SiteCatalogApps {
    var tmpApp: SiteCatalogApps = new SiteCatalogApps();

    if (IsEmpty) {
      tmpApp.SiteTitle = tmpWeb["Title"];
      tmpApp.SiteURL = combine(siteUrl, "/AppCatalog/");
      tmpApp.AppTitle = "There are no apps Available ";
      tmpApp.AppCatalogVersion = "-";
      tmpApp.Deployed = "-";
      tmpApp.InstalledVersion = "-";
      tmpApp.IsEnabled = "-";
      tmpApp.IsClientSideSolution = "-";
      tmpApp.NoApps = true;
    } else {
      tmpApp.SiteTitle = tmpWeb["Title"];
      tmpApp.SiteURL = combine(siteUrl, "/AppCatalog/");
      tmpApp.AppTitle = app["Title"];
      tmpApp.AppCatalogVersion = app["AppCatalogVersion"];
      tmpApp.Deployed = String(app["Deployed"]);
      tmpApp.InstalledVersion = app["InstalledVersion"];
      tmpApp.IsEnabled = String(app["IsEnabled"]);
      tmpApp.IsClientSideSolution = String(app["IsClientSideSolution"]);
      tmpApp.NoApps = false;
    }
    return tmpApp;
  }
}

export class SiteCatalogApps {
  public SiteTitle: string;
  public SiteURL: string;
  public AppTitle: string;
  public AppCatalogVersion: string;
  public Deployed: string;
  public InstalledVersion: string;
  public IsEnabled: string;
  public IsClientSideSolution: string;
  public NoApps: boolean;
}

