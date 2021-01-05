import { IHierarchyService } from '../interfaces';
import { ServiceKey, ServiceScope } from '@microsoft/sp-core-library';
import { PageContext } from '@microsoft/sp-page-context';
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
import { IHierarchyItem } from '../interfaces/IHierarchyItem';
import { sp } from "@pnp/sp/presets/all";

export class HierarchyService implements IHierarchyService {
  public static readonly serviceKey: ServiceKey<IHierarchyService> = ServiceKey.create<IHierarchyService>('datacenter:hierarchyService', HierarchyService);

  private _spHttpClient: SPHttpClient;
  private _pageContext: PageContext;
  private _currentWebUrl: string;

  constructor(serviceScope: ServiceScope) {
    serviceScope.whenFinished(() => {
      this._spHttpClient = serviceScope.consume(SPHttpClient.serviceKey);
      this._pageContext = serviceScope.consume(PageContext.serviceKey);
      this._currentWebUrl = this._pageContext.web.absoluteUrl;
    });
  }

  public getHierarchyInfo(listName: string): Promise<IHierarchyItem[]> {
    return sp.web.lists.getByTitle(listName)
      .items
      .select('Title,Id,URL,Parent/Id,Parent/Title')
      .expand('Parent')
      .get()
      .then((items: IHierarchyItem[]) => {
        return Promise.resolve(items);
      }).catch((error) => Promise.reject(error));
  }
}
