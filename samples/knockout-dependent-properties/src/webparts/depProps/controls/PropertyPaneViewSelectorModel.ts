import {
  IWebPartContext
} from '@microsoft/sp-webpart-base';
import { IDataHelper } from '../data-helpers/DataHelperBase';
import { DataHelpersFactory } from '../data-helpers/DataHelpersFactory';
import { ISPList, ISPView } from '../common/SPEntities';

/**
 * ViewSelector component model
 */
export class PropertyPaneViewSelectorModel {
  /**
   * data helper
   */
  private _dataHelper: IDataHelper;

  /**
   * ctor
   */
  constructor(_context: IWebPartContext) {
    this._dataHelper = DataHelpersFactory.createDataHelper(_context);
  }

  /**
   * Get lists collection
   */
  public getLists(): Promise<ISPList[]> {
    return this._dataHelper.getLists();
  }

  /**
   * Get views collection
   */
  public getViews(listId: string): Promise<ISPView[]> {
    return this._dataHelper.getViews(listId);
  }
}