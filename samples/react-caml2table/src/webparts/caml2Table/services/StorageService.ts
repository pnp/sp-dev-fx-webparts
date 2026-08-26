import { ISavedQuery } from '../models/ISavedQuery';

/**
 * Interface for raw query data from storage
 */
interface IStoredQueryData {
  id: string;
  name: string;
  listId: string;
  listName: string;
  query: string;
  lastUsed: string; // Date stored as string
}

/**
 * Service to handle saving and retrieving queries from browser storage
 */
export class StorageService {
  private static readonly STORAGE_KEY = 'caml2table_saved_queries';
  
  /**
   * Save a query to local storage
   */
  public static saveQuery(query: ISavedQuery): void {
    const queries = this.getQueries();
    queries.push(query);
    this.saveQueries(queries);
  }
  
  /**
   * Update an existing query
   */
  public static updateQuery(updatedQuery: ISavedQuery): void {
    const queries = this.getQueries();
    const index = queries.findIndex(q => q.id === updatedQuery.id);
    
    if (index !== -1) {
      queries[index] = updatedQuery;
      this.saveQueries(queries);
    }
  }
  
  /**
   * Delete a query by ID
   */
  public static deleteQuery(id: string): void {
    const queries = this.getQueries().filter(q => q.id !== id);
    this.saveQueries(queries);
  }
  
  /**
   * Get all saved queries
   */
  public static getQueries(): ISavedQuery[] {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      if (!data) {
        return [];
      }
      
      const queries = JSON.parse(data) as IStoredQueryData[];
      
      // Convert string dates back to Date objects
      return queries.map(q => ({
        ...q,
        lastUsed: new Date(q.lastUsed)
      }));
    } catch (error) {
      console.error('Error retrieving saved queries:', error);
      return [];
    }
  }
  
  /**
   * Save queries to local storage
   */
  private static saveQueries(queries: ISavedQuery[]): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(queries));
    } catch (error) {
      console.error('Error saving queries:', error);
    }
  }
  
  /**
   * Clear all saved queries
   */
  public static clearQueries(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }
}