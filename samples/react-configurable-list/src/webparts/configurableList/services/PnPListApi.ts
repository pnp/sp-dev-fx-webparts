import { WebPartContext } from '@microsoft/sp-webpart-base';
import { spfi, SPFI, SPFx } from '@pnp/sp';
import '@pnp/sp/fields';
import '@pnp/sp/items';
import '@pnp/sp/lists';
import '@pnp/sp/webs';
import { IListDataApi, IListQuery, ISharePointField } from '../models/ListModels';

export class PnPListApi implements IListDataApi {
  private readonly sp: SPFI;

  public constructor(context: WebPartContext) {
    // Keep the SPFx context adapter in one module so pure tests do not load PnPjs.
    this.sp = spfi().using(SPFx(context));
  }

  public getFields(listTitle: string): Promise<ISharePointField[]> {
    return this.sp.web.lists.getByTitle(listTitle).fields
      .filter('Hidden eq false and ReadOnlyField eq false')
      .select('Id', 'Title', 'InternalName', 'EntityPropertyName', 'TypeAsString', 'AllowMultipleValues')();
  }

  public getItems(listTitle: string, query: IListQuery): Promise<Record<string, unknown>[]> {
    let request = this.sp.web.lists.getByTitle(listTitle).items
      .select(...query.select)
      .orderBy(query.orderBy, query.ascending)
      .top(query.top)
      .skip(query.skip);
    if (query.expand.length) {
      request = request.expand(...query.expand);
    }
    if (query.filter) {
      request = request.filter(query.filter);
    }
    return request() as Promise<Record<string, unknown>[]>;
  }
}
