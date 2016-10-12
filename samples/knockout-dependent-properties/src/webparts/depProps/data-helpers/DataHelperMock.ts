import { ISPList, ISPView } from '../common/SPEntities';
import { IDataHelper } from './DataHelperBase';

/**
 * MOCK data helper. Gets data from hardcoded values
 */
export class DataHelperMock implements IDataHelper {
  /**
   * hardcoded collection of lists
   */
  private static _lists: ISPList[] = [{ Title: 'Test 1', Id: '1' }, { Title: 'Test 2', Id: '2' }, { Title: 'Test 3', Id: '3' }];
  /**
   * hardcoded collection of views
   */
  private static _views: ISPView[] = [{ Title: 'All Items', Id: '1', ListId: '1' }, { Title: 'Demo', Id: '2', ListId: '1' }, { Title: 'All Items', Id: '1', ListId: '2' }, { Title: 'All Items', Id: '1', ListId: '3' }];

  /**
   * API to get lists from the source
   */
  public getLists(): Promise<ISPList[]> {
    return new Promise<ISPList[]>((resolve) => {
      resolve(DataHelperMock._lists); // returning all the lists
    });
  }

  /**
   * API to get views from the source
   */
  public getViews(listId: string): Promise<ISPView[]> {
    return new Promise<ISPView[]>((resolve) => {
      // filtering views based on list id
      const result: ISPView[] = DataHelperMock._views.filter((value, index, array) => {
        return value.ListId === listId;
      });
      resolve(result);
    });
  }
}