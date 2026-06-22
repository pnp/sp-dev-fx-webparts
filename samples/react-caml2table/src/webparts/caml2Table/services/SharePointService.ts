import { SPFI } from "@pnp/sp";
import { ICamlQuery } from "@pnp/sp/lists";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/fields";
import { IFieldInfo } from "../models/IFieldInfo";
import { IQueryResult } from "../models/IQueryResult";

/**
 * Service to handle all SharePoint interactions
 */
export class SharePointService {
  private sp: SPFI;

  /**
   * Initialize the service with SP instance
   */
  constructor(sp: SPFI) {
    this.sp = sp;
  }

  /**
   * Get list information by ID
   */
  public async getListInfo(listId: string): Promise<{ Title: string }> {
    try {
      return await this.sp.web.lists.getById(listId).select('Title')();
    } catch (error) {
      console.error('Error getting list info:', error);
      throw error;
    }
  }

  /**
   * Get all fields for a list
   */
  public async getListFields(listId: string): Promise<IFieldInfo[]> {
    try {
      const fields = await this.sp.web.lists.getById(listId).fields
        .filter("Hidden eq false and ReadOnlyField eq false")
        .select("InternalName", "Title", "TypeAsString")();
      
      return fields as IFieldInfo[];
    } catch (error) {
      console.error('Error getting list fields:', error);
      throw error;
    }
  }

  /**
   * Execute a CAML query against a list
   */
  public async executeQuery(listId: string, query: string): Promise<IQueryResult[]> {
    try {
      console.log('Executing query with PnPjs...');
      const camlQuery: ICamlQuery = { ViewXml: query };
      const results = await this.sp.web.lists.getById(listId).getItemsByCAMLQuery(camlQuery);
      
      return results as IQueryResult[];
    } catch (error) {
      console.error('Error executing CAML query:', error);
      throw error;
    }
  }

  /**
   * Get the total item count in a list
   */
  public async getListItemCount(listId: string): Promise<number> {
    try {
      const listInfo = await this.sp.web.lists.getById(listId).select('ItemCount')();
      return listInfo.ItemCount;
    } catch (error) {
      console.error('Error getting list item count:', error);
      throw error;
    }
  }

  /**
   * Export query results to CSV
   */
  public exportResultsToCSV(results: IQueryResult[], listName: string): void {
    if (!results || results.length === 0) return;
    
    // Get headers that don't start with odata or _
    const headers = Object.keys(results[0])
      .filter(key => !key.toLowerCase().startsWith('odata') && !key.toLowerCase().startsWith('_'));
    
    // Create CSV content
    const csvContent = [
      headers.join(','),
      ...results.map(item => 
        headers.map(header => {
          const value = item[header];
          // Handle different value types
          if (value === null || value === undefined) return '';
          if (typeof value === 'string') return `"${value.replace(/"/g, '""')}"`;
          return value;
        }).join(',')
      )
    ].join('\n');
    
    // Create download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `${listName || 'list'}_export_${new Date().toISOString().slice(0,10)}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}