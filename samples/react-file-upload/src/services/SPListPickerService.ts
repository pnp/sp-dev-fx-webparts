import { SPHttpClientResponse } from '@microsoft/sp-http';
import { SPHttpClient } from '@microsoft/sp-http';
import { Environment, EnvironmentType } from '@microsoft/sp-core-library';
import { IWebPartContext } from '@microsoft/sp-webpart-base';
import { ISPLists, IPropertyFieldListPickerHostProps } from '../propertyFields/listPicker/IPropertyFieldListPickerHost';
import { PropertyFieldListPickerOrderBy } from '../propertyFields/listPicker/IPropertyFieldListPicker';
import SPListPickerMockHttpClient from './SPListPickerMockService';

/**
 * Service implementation to get list & list items from current SharePoint site
 */
export default class SPListPickerService {

  private context: IWebPartContext;
  private props: IPropertyFieldListPickerHostProps;

  /**
   * Service constructor
   */
  constructor(_props: IPropertyFieldListPickerHostProps, pageContext: IWebPartContext) {
    this.props = _props;
    this.context = pageContext;
  }

  /**
   * Gets the collection of libs in the current SharePoint site
   */
  public getLibs(): Promise<ISPLists> {
    if (Environment.type === EnvironmentType.Local) {
      // If the running environment is local, load the data from the mock
      return this.getLibsFromMock();
    }
    else {
      // If the running environment is SharePoint, request the lists REST service
      let queryUrl: string = `${this.context.pageContext.web.absoluteUrl}/_api/lists?$select=Title,id,BaseTemplate`;
      // Check if the orderBy property is provided
      if (this.props.orderBy !== null) {
        queryUrl += '&$orderby=';
        switch (this.props.orderBy) {
          case PropertyFieldListPickerOrderBy.Id:
            queryUrl += 'Id';
            break;
          case PropertyFieldListPickerOrderBy.Title:
            queryUrl += 'Title';
            break;
        }
      }
      // Check if the list have get filtered based on the list base template type
      if (this.props.baseTemplate !== null && this.props.baseTemplate) {
        queryUrl += '&$filter=BaseTemplate%20eq%20';
        queryUrl += this.props.baseTemplate;
        // Check if you also want to exclude hidden list in the list
        if (this.props.includeHidden === false) {
          queryUrl += '%20and%20Hidden%20eq%20false';
        }
      } else {
        if (this.props.includeHidden === false) {
          queryUrl += '&$filter=Hidden%20eq%20false';
        }
      }
      return this.context.spHttpClient.get(queryUrl, SPHttpClient.configurations.v1).then((response: SPHttpClientResponse) => {
        return response.json();
      }) as Promise<ISPLists>;
    }
  }

  /**
   * Returns 3 fake SharePoint lists for the Mock mode
   */
  private getLibsFromMock(): Promise<ISPLists> {
    return SPListPickerMockHttpClient.getLists(this.context.pageContext.web.absoluteUrl).then(() => {
      const listData: ISPLists = {
        value:
        [
          { Title: 'Mock List One', Id: '6770c83b-29e8-494b-87b6-468a2066bcc6', BaseTemplate: '109' },
          { Title: 'Mock List Two', Id: '2ece98f2-cc5e-48ff-8145-badf5009754c', BaseTemplate: '109' },
          { Title: 'Mock List Three', Id: 'bd5dbd33-0e8d-4e12-b289-b276e5ef79c2', BaseTemplate: '109' }
        ]
      };
      return listData;
    }) as Promise<ISPLists>;
  }
}
