import { WebPartContext } from '@microsoft/sp-webpart-base';
import { spfi, SPFI, SPFx } from '@pnp/sp';
import '@pnp/sp/webs';
import '@pnp/sp/lists';
import '@pnp/sp/items';
import '@pnp/sp/fields';
import { IQuickLink, IListInfo } from '../models/IQuickLink';

interface IFieldInfo {
  InternalName: string;
}

export class SPService {
  private sp: SPFI;

  constructor(context: WebPartContext) {
    this.sp = spfi().using(SPFx(context));
  }

  /**
   * Get all lists in the current site
   */
  public async getLists(): Promise<IListInfo[]> {
    try {
      const lists = await this.sp.web.lists
        .filter("Hidden eq false and BaseTemplate eq 100")
        .select('Id', 'Title')
        .orderBy('Title')();

      return lists.map(list => ({
        id: list.Id,
        title: list.Title
      }));
    } catch (_error) {
      console.error('Error fetching lists:', _error);
      return [];
    }
  }

  /**
   * Get items from a specific list
   */
  public async getListItems(listId: string): Promise<IQuickLink[]> {
    try {
      const items = await this.sp.web.lists
        .getById(listId)
        .items
        .select('Id', 'Title', 'URL', 'IconName', 'Description', 'SortOrder', 'OpenInNewWindow')
        .orderBy('SortOrder', true)
        .orderBy('Title')();

      return items.map(item => ({
        id: item.Id.toString(),
        title: item.Title,
        url: item.URL?.Url || item.URL || '',
        iconName: item.IconName || 'Link',
        description: item.Description || '',
        sortOrder: item.SortOrder || 0,
        openInNewWindow: item.OpenInNewWindow !== false // Default to true
      }));
    } catch (_error) {
      console.error('Error fetching list items:', _error);
      return [];
    }
  }

  /**
   * Add a new item to the list
   */
  public async addListItem(listId: string, link: Partial<IQuickLink>): Promise<IQuickLink> {
    try {
      const itemData: Record<string, unknown> = {
        Title: link.title,
        URL: { Url: link.url, Description: link.title },
        IconName: link.iconName || 'Link',
        Description: link.description || '',
        SortOrder: link.sortOrder || 0,
        OpenInNewWindow: link.openInNewWindow !== false
      };

      const result = await this.sp.web.lists.getById(listId).items.add(itemData);
      const newItemId = result?.Id || result?.ID;

      const addedItem = await this.sp.web.lists
        .getById(listId)
        .items
        .getById(newItemId)
        .select('Id', 'Title', 'URL', 'IconName', 'Description', 'SortOrder', 'OpenInNewWindow')();

      return {
        id: addedItem.Id.toString(),
        title: addedItem.Title,
        url: addedItem.URL?.Url || '',
        iconName: addedItem.IconName || 'Link',
        description: addedItem.Description || '',
        sortOrder: addedItem.SortOrder || 0,
        openInNewWindow: addedItem.OpenInNewWindow !== false
      };
    } catch (_error) {
      console.error('Error adding list item:', _error);
      throw _error;
    }
  }

  /**
   * Update an existing list item
   */
  public async updateListItem(listId: string, link: IQuickLink): Promise<void> {
    try {
      const itemData: Record<string, unknown> = {
        Title: link.title,
        URL: { Url: link.url, Description: link.title },
        IconName: link.iconName || 'Link',
        Description: link.description || '',
        SortOrder: link.sortOrder || 0,
        OpenInNewWindow: link.openInNewWindow !== false
      };

      await this.sp.web.lists
        .getById(listId)
        .items
        .getById(parseInt(link.id))
        .update(itemData);
    } catch (_error) {
      console.error('Error updating list item:', _error);
      throw _error;
    }
  }

  /**
   * Delete a list item
   */
  public async deleteListItem(listId: string, itemId: string): Promise<void> {
    try {
      await this.sp.web.lists
        .getById(listId)
        .items
        .getById(parseInt(itemId))
        .delete();
    } catch (_error) {
      console.error('Error deleting list item:', _error);
      throw _error;
    }
  }

  /**
   * Check if a list has the required columns
   */
  public async validateListStructure(listId: string): Promise<{ isValid: boolean; missingColumns: string[] }> {
    try {
      const fields = await this.sp.web.lists
        .getById(listId)
        .fields
        .select('InternalName')();

      const fieldNames = (fields as IFieldInfo[]).map(f => f.InternalName);
      const requiredFields = ['Title', 'URL', 'IconName', 'Description', 'SortOrder', 'OpenInNewWindow'];
      const missingColumns = requiredFields.filter(field => fieldNames.indexOf(field) === -1);

      return {
        isValid: missingColumns.length === 0,
        missingColumns
      };
    } catch (_error) {
      console.error('Error validating list structure:', _error);
      return { isValid: false, missingColumns: [] };
    }
  }
}