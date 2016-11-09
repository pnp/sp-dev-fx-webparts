import * as SP from '../typings/SP';

/**
 * Data Helpers interface
 */
export interface IDataHelper {
  /**
   * API to get lists from the source
   */
  getLists(): Promise<ISPList[]>;
  /**
   * API to get views from the source
   */
  getViews(listId: string): Promise<ISPView[]>;
}