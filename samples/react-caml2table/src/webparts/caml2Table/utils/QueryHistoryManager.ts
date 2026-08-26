/**
 * Class for managing query history
 */
export class QueryHistoryManager {
    private static readonly STORAGE_KEY = 'caml2table_query_history';
    private static readonly MAX_HISTORY_SIZE = 20;
  
    /**
     * Add a query to history
     */
    public static addToHistory(query: string): void {
      const history = this.getHistory();
      
      // Only add if different from the last entry
      if (history.length === 0 || history[history.length - 1] !== query) {
        history.push(query);
        
        // Limit history size
        if (history.length > this.MAX_HISTORY_SIZE) {
          history.shift();
        }
        
        this.saveHistory(history);
      }
    }
  
    /**
     * Get the query history
     */
    public static getHistory(): string[] {
      try {
        const historyData = sessionStorage.getItem(this.STORAGE_KEY);
        if (!historyData) {
          return [];
        }
        
        return JSON.parse(historyData) as string[];
      } catch (error) {
        console.error('Error retrieving query history:', error);
        return [];
      }
    }
  
    /**
     * Save the query history
     */
    private static saveHistory(history: string[]): void {
      try {
        sessionStorage.setItem(this.STORAGE_KEY, JSON.stringify(history));
      } catch (error) {
        console.error('Error saving query history:', error);
      }
    }
  
    /**
     * Clear the query history
     */
    public static clearHistory(): void {
      sessionStorage.removeItem(this.STORAGE_KEY);
    }
  }