import { WebPartContext } from '@microsoft/sp-webpart-base';
import { spfi, SPFI, SPFx } from '@pnp/sp';
import '@pnp/sp/webs';
import '@pnp/sp/lists';
import '@pnp/sp/items';
import '@pnp/sp/fields';
import { IProjectItem, IListInfo } from '../models/IProjectItem';

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
   * Get all lists in the current site
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
   * Get items from a specific list
   */
  public async getListItems(listId: string): Promise<IProjectItem[]> {
    try {
      const items = await this.sp.web.lists
        .getById(listId)
        .items
        .select('Id', 'Title', 'Description', 'Active', 'SortOrder')
        .top(5000)
        .orderBy('SortOrder', true)();

      return items.map(item => ({
        Id: item.Id,
        Title: item.Title || '',
        Description: item.Description || '',
        Active: item.Active !== undefined ? item.Active : true,
        SortOrder: item.SortOrder || 0
      }));
    } catch (error) {
      console.error('Error fetching list items:', error);
      return [];
    }
  }

  /**
   * Add a new item to the list
   */
  public async addListItem(listId: string, item: Partial<IProjectItem>): Promise<IProjectItem> {
    try {
      const itemData: Record<string, unknown> = {
        Title: item.Title,
        Description: item.Description || '',
        Active: item.Active !== undefined ? item.Active : true,
        SortOrder: item.SortOrder || 0
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
        .select('Id', 'Title', 'Description', 'Active', 'SortOrder')();

      return {
        Id: addedItem.Id,
        Title: addedItem.Title,
        Description: addedItem.Description || '',
        Active: addedItem.Active !== undefined ? addedItem.Active : true,
        SortOrder: addedItem.SortOrder || 0
      };
    } catch (error) {
      console.error('Error adding list item:', error);
      throw error;
    }
  }

  /**
   * Update an existing list item
   */
  public async updateListItem(listId: string, item: IProjectItem): Promise<void> {
    try {
      const itemData: Record<string, unknown> = {
        Title: item.Title,
        Description: item.Description || '',
        Active: item.Active !== undefined ? item.Active : true,
        SortOrder: item.SortOrder || 0
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
  public async batchUpdateSortOrders(listId: string, items: Array<{id: number, sortOrder: number}>): Promise<void> {
    try {
      // Update items one by one since batching might not be available
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
   * Delete a list item
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
   * Check if a list has the required columns
   */
  public async validateListStructure(listId: string): Promise<{ isValid: boolean; missingColumns: string[] }> {
    try {
      const fields = await this.sp.web.lists
        .getById(listId)
        .fields
        .select('InternalName')();

      const fieldNames = (fields as IFieldInfo[]).map(f => f.InternalName);
      const requiredFields = ['Title', 'Description'];
      const missingColumns = requiredFields.filter(field => fieldNames.indexOf(field) === -1);

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
   * Ensure Active and SortOrder columns exist in the list
   */
  public async ensureColumns(listId: string): Promise<void> {
    try {
      const fields = await this.sp.web.lists
        .getById(listId)
        .fields
        .select('InternalName')();

      const fieldNames = (fields as IFieldInfo[]).map(f => f.InternalName);

      // Add Active column if it doesn't exist
      if (fieldNames.indexOf('Active') === -1) {
        await this.sp.web.lists.getById(listId).fields.addBoolean('Active', {
          Description: 'Whether this project is active or inactive'
        });
        
        // Set default value separately
        try {
          await this.sp.web.lists
            .getById(listId)
            .fields
            .getByInternalNameOrTitle('Active')
            .update({
              DefaultValue: '1'
            });
        } catch (err) {
          console.warn('Could not set default value for Active field:', err);
        }
      }

      // Add SortOrder column if it doesn't exist
      if (fieldNames.indexOf('SortOrder') === -1) {
        await this.sp.web.lists.getById(listId).fields.addNumber('SortOrder', {
          MinimumValue: 0,
          Description: 'Sort order for this project'
        });
        
        // Set default value separately
        try {
          await this.sp.web.lists
            .getById(listId)
            .fields
            .getByInternalNameOrTitle('SortOrder')
            .update({
              DefaultValue: '0'
            });
        } catch (err) {
          console.warn('Could not set default value for SortOrder field:', err);
        }
      }
    } catch (error) {
      console.error('Error ensuring columns:', error);
    }
  }
}