import { WebPartContext } from '@microsoft/sp-webpart-base';
import { spfi, SPFx, SPFI } from '@pnp/sp';
import '@pnp/sp/webs';
import '@pnp/sp/lists';
import '@pnp/sp/items';
import { IQuickLink } from '../models/IQuickLink';

interface IListItem {
  Id: number;
  Title: string;
  LinkUrl?: { Url: string; Description: string };
  IconName?: string;
  SortOrder?: number;
  OpenIn?: string;
  IsActive?: boolean;
  IsHeader?: boolean;
  ParentLinkId?: { Id: number };
}

export class SPService {
  private sp: SPFI;

  constructor(context: WebPartContext) {
    this.sp = spfi().using(SPFx(context));
  }

  /** Get all custom lists */
  public async getLists(): Promise<Array<{ id: string; title: string }>> {
    const lists = await this.sp.web.lists
      .filter("Hidden eq false and BaseTemplate eq 100")
      .select('Id', 'Title')
      .orderBy('Title')();
    return lists.map(l => ({ id: l.Id, title: l.Title }));
  }

  /** Get list items and build hierarchy */
  public async getItemsTree(listId: string, includeInactive = true): Promise<IQuickLink[]> {
    const items = await this.sp.web.lists.getById(listId).items
      .select(
        'Id',
        'Title',
        'LinkUrl',
        'IconName',
        'SortOrder',
        'OpenIn',
        'IsActive',
        'IsHeader',
        'ParentLinkId/Id'
      )
      .expand('ParentLinkId')
      .top(5000)();

    const flat: IQuickLink[] = items.map((it: IListItem) => ({
  id: String(it.Id),
  title: it.Title,
  url: it.LinkUrl?.Url,
  iconName: it.IconName || 'Link',
  sortOrder: it.SortOrder || 0,
  openWith: (it.OpenIn as 'Same Window' | 'New Tab') || 'New Tab',
  active: it.IsActive !== false,
  isHeader: it.IsHeader === true,
  parentId: it.ParentLinkId?.Id ? String(it.ParentLinkId.Id) : undefined,
  children: []
}));


    const filtered = includeInactive ? flat : flat.filter(i => i.active);
    const map = new Map(filtered.map(i => [i.id, i]));
    const roots: IQuickLink[] = [];

    for (const item of filtered) {
      if (item.parentId && map.has(item.parentId)) {
        map.get(item.parentId)!.children!.push(item);
      } else {
        roots.push(item);
      }
    }

    const sortTree = (arr: IQuickLink[]): void => {
      arr.sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0) || a.title.localeCompare(b.title));
      arr.forEach(c => {
        if (c.children) {
          sortTree(c.children);
        }
      });
    };
    sortTree(roots);

    return roots;
  }

  /** Add a new item */
  public async addItem(listId: string, link: Partial<IQuickLink>): Promise<void> {
    await this.sp.web.lists.getById(listId).items.add({
      Title: link.title,
      LinkUrl: link.url ? { Url: link.url, Description: link.title } : undefined,
      IconName: link.iconName,
      SortOrder: link.sortOrder,
      OpenIn: link.openWith,
      IsActive: link.active,
      IsHeader: link.isHeader,
      ParentLinkIdId: link.parentId ? parseInt(link.parentId, 10) : undefined
    });
  }

  /** Update an existing item */
  public async updateItem(listId: string, link: IQuickLink): Promise<void> {
    await this.sp.web.lists.getById(listId).items.getById(parseInt(link.id)).update({
      Title: link.title,
      LinkUrl: link.url ? { Url: link.url, Description: link.title } : undefined,
      IconName: link.iconName,
      SortOrder: link.sortOrder,
      OpenIn: link.openWith,
      IsActive: link.active,
      IsHeader: link.isHeader,
      ParentLinkIdId: link.parentId ? parseInt(link.parentId, 10) : undefined
    });
  }

  /** Delete item */
  public async deleteItem(listId: string, id: string): Promise<void> {
    await this.sp.web.lists.getById(listId).items.getById(parseInt(id)).delete();
  }
}