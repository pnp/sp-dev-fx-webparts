import { WebPartContext } from '@microsoft/sp-webpart-base';
import { spfi, SPFI, SPFx } from '@pnp/sp';
import '@pnp/sp/webs';
import '@pnp/sp/lists';
import '@pnp/sp/items';
import '@pnp/sp/fields';
import { IContentBlockItem, IListInfo } from '../models/IContentBlockItem';

interface IFieldInfo {
  InternalName: string;
}

interface IAddResult {
  data?: {
    Id?: number;
    ID?: number;
  };
  Id?: number;
  ID?: number;
}

export class SPService {
  private sp: SPFI;

  constructor(context: WebPartContext) {
    this.sp = spfi().using(SPFx(context));
  }

  /**
   * Get all non-hidden custom lists
   */
  public async getLists(): Promise<IListInfo[]> {
    try {
      const lists = await this.sp.web.lists
        .filter("Hidden eq false and BaseTemplate eq 100")
        .select('Id', 'Title')
        .orderBy('Title')();

      return lists.map(list => ({
        Id: list.Id,
        Title: list.Title
      }));
    } catch (error) {
      console.error('Error fetching lists:', error);
      return [];
    }
  }

  /**
   * Get ALL items (for manager view)
   */
  public async getAllItems(listId: string): Promise<IContentBlockItem[]> {
    try {
      const items = await this.sp.web.lists
        .getById(listId)
        .items
        .select('Id', 'Title', 'Description', 'Title2', 'Description2', 'Active', 'SortOrder')
        .top(5000)();

      return items
        .map(item => ({
          Id: item.Id,
          Title: item.Title || '',
          Description: item.Description || '',
          Title2: item.Title2 || '',
          Description2: item.Description2 || '',
          Active: item.Active !== undefined ? item.Active : true,
          SortOrder: item.SortOrder !== undefined && item.SortOrder !== null ? item.SortOrder : 0
        }))
        .sort((a, b) => (a.SortOrder ?? 0) - (b.SortOrder ?? 0) || a.Title.localeCompare(b.Title));
    } catch (error) {
      console.error('Error fetching list items:', error);
      return [];
    }
  }

  /**
   * Get ONLY Active items sorted (for read-only display)
   */
  public async getActiveItems(listId: string): Promise<IContentBlockItem[]> {
    const all = await this.getAllItems(listId);
    return all.filter(i => i.Active);
  }

  /**
   * Add a new item
   */
  public async addListItem(listId: string, item: Partial<IContentBlockItem>): Promise<IContentBlockItem> {
    try {
      const itemData: Record<string, unknown> = {
        Title: item.Title || '',
        Description: item.Description || '',
        Title2: item.Title2 || '',
        Description2: item.Description2 || '',
        Active: item.Active !== undefined ? item.Active : true,
        SortOrder: item.SortOrder ?? 0
      };

      const result = await this.sp.web.lists.getById(listId).items.add(itemData) as IAddResult;
      const newItemId = result?.data?.Id ?? result?.data?.ID ?? result?.Id ?? result?.ID;
      
      if (!newItemId) {
        throw new Error('Unable to determine new item ID from add result.');
      }

      const addedItem = await this.sp.web.lists
        .getById(listId)
        .items
        .getById(newItemId)
        .select('Id', 'Title', 'Description', 'Title2', 'Description2', 'Active', 'SortOrder')();

      return {
        Id: addedItem.Id,
        Title: addedItem.Title || '',
        Description: addedItem.Description || '',
        Title2: addedItem.Title2 || '',
        Description2: addedItem.Description2 || '',
        Active: addedItem.Active !== undefined ? addedItem.Active : true,
        SortOrder: addedItem.SortOrder ?? 0
      };
    } catch (error) {
      console.error('Error adding list item:', error);
      throw error;
    }
  }

  /**
   * Update item
   */
  public async updateListItem(listId: string, item: IContentBlockItem): Promise<void> {
    try {
      const itemData: Record<string, unknown> = {
        Title: item.Title || '',
        Description: item.Description || '',
        Title2: item.Title2 || '',
        Description2: item.Description2 || '',
        Active: item.Active,
        SortOrder: item.SortOrder ?? 0
      };

      await this.sp.web.lists
        .getById(listId)
        .items
        .getById(item.Id!)
        .update(itemData);
    } catch (error) {
      console.error('Error updating list item:', error);
      throw error;
    }
  }

  /**
   * Batch update sort orders
   */
  public async batchUpdateSortOrders(listId: string, items: Array<{ id: number; sortOrder: number }>): Promise<void> {
    try {
      const promises = items.map(item =>
        this.sp.web.lists
          .getById(listId)
          .items
          .getById(item.id)
          .update({ SortOrder: item.sortOrder })
      );
      await Promise.all(promises);
    } catch (error) {
      console.error('Error batch updating sort orders:', error);
      throw error;
    }
  }

  /**
   * Delete item
   */
  public async deleteListItem(listId: string, itemId: number): Promise<void> {
    try {
      await this.sp.web.lists
        .getById(listId)
        .items
        .getById(itemId)
        .delete();
    } catch (error) {
      console.error('Error deleting list item:', error);
      throw error;
    }
  }

  /**
   * Check if list has required columns
   */
  public async validateListStructure(listId: string): Promise<{ isValid: boolean; missingColumns: string[] }> {
    try {
      const fields = await this.sp.web.lists
        .getById(listId)
        .fields
        .select('InternalName')();

      const fieldNames = (fields as IFieldInfo[]).map(f => f.InternalName);
      const requiredFields = ['Title', 'Description', 'Title2', 'Description2'];
      const missingColumns = requiredFields.filter(field => !fieldNames.includes(field));

      return {
        isValid: missingColumns.length === 0,
        missingColumns
      };
    } catch (error) {
      console.error('Error validating list structure:', error);
      return { isValid: false, missingColumns: [] };
    }
  }

  /**
   * Ensure Active and SortOrder fields exist
   */
  public async ensureColumns(listId: string): Promise<void> {
    try {
      const fields = await this.sp.web.lists
        .getById(listId)
        .fields
        .select('InternalName')();

      const fieldNames = (fields as IFieldInfo[]).map(f => f.InternalName);

      if (!fieldNames.includes('Active')) {
        await this.sp.web.lists.getById(listId).fields.addBoolean('Active', {
          Description: 'Whether this content block is active'
        });

        try {
          await this.sp.web.lists
            .getById(listId)
            .fields
            .getByInternalNameOrTitle('Active')
            .update({ DefaultValue: '1' });
        } catch (err) {
          console.warn('Could not set default value for Active field:', err);
        }
      }

      if (!fieldNames.includes('SortOrder')) {
        await this.sp.web.lists.getById(listId).fields.addNumber('SortOrder', {
          Description: 'Sort order for this content block',
          MinimumValue: 0
        });

        try {
          await this.sp.web.lists
            .getById(listId)
            .fields
            .getByInternalNameOrTitle('SortOrder')
            .update({ DefaultValue: '0' });
        } catch (err) {
          console.warn('Could not set default value for SortOrder field:', err);
        }
      }
    } catch (error) {
      console.error('Error ensuring columns:', error);
    }
  }
}
