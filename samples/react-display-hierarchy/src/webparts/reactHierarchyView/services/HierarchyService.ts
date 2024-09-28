import { ServiceKey, ServiceScope } from '@microsoft/sp-core-library';
import { PageContext } from '@microsoft/sp-page-context';
import { IHierarchyService } from '../interfaces';
import { ISPHierarchyItem } from '../interfaces/IHierarchyItem';
import { SPFI, spfi, SPFx as spSPFx } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";

export class HierarchyService implements IHierarchyService {
  public static readonly serviceKey: ServiceKey<IHierarchyService> = ServiceKey.create<IHierarchyService>('datacenter:hierarchyService', HierarchyService);

  private _sp: SPFI;

  constructor(serviceScope: ServiceScope) {
    serviceScope.whenFinished(() => {
      const pageContext = serviceScope.consume(PageContext.serviceKey);
      this._sp = spfi().using(spSPFx({ pageContext }));
    });
  }

  public getHierarchyInfo(listName: string): Promise<ISPHierarchyItem[]> {
    return this._sp.web.lists.getByTitle(listName)
      .items
      .select("Title", "Id", "URL", "Parent/Id", "Parent/Title")
      .expand("Parent")()
      .then((items: ISPHierarchyItem[]) => {
        return Promise.resolve(items);
      }).catch((error) => Promise.reject(error));
  }
}
