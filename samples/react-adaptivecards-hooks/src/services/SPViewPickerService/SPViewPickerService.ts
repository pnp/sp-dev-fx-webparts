import { SPHttpClientResponse } from '@microsoft/sp-http';
import { SPHttpClient } from '@microsoft/sp-http';
import { Environment, EnvironmentType } from '@microsoft/sp-core-library';
import { IWebPartContext } from '@microsoft/sp-webpart-base';
import { ISPView, IPropertyFieldViewPickerHostProps, PropertyFieldViewPickerOrderBy } from '../../controls/PropertyFieldViewPicker';
import { ISPViewPickerService } from './ISPViewPickerService';
import { ISPViews } from '../../controls/PropertyFieldViewPicker/ISPViews';

/**
 * Service implementation to get list & list items from current SharePoint site
 */
export class SPViewPickerService implements ISPViewPickerService {
  private context: IWebPartContext;
  private props: IPropertyFieldViewPickerHostProps;

  /**
   * Service constructor
   */
  constructor(_props: IPropertyFieldViewPickerHostProps, pageContext: IWebPartContext) {
    this.props = _props;
    this.context = pageContext;
  }

  /**
   * Gets the collection of view for a selected list
   */
  public async getViews(): Promise<ISPViews> {
    if (Environment.type === EnvironmentType.Local) {
      // If the running environment is local, load the data from the mock
      return this.getViewsFromMock();
    }
    else {
      if (this.props.listId === undefined || this.props.listId === "") {
        return this.getEmptyViews();
      }

      const webAbsoluteUrl = this.props.webAbsoluteUrl ? this.props.webAbsoluteUrl : this.context.pageContext.web.absoluteUrl;

      // If the running environment is SharePoint, request the lists REST service
      let queryUrl: string = `${webAbsoluteUrl}/_api/lists(guid'${this.props.listId}')/Views?$select=Title,Id`;

      // Check if the orderBy property is provided
      if (this.props.orderBy !== null) {
        queryUrl += '&$orderby=';
        switch (this.props.orderBy) {
          case PropertyFieldViewPickerOrderBy.Id:
            queryUrl += 'Id';
            break;
          case PropertyFieldViewPickerOrderBy.Title:
            queryUrl += 'Title';
            break;
        }

        // Adds an OData Filter to the list
        if (this.props.filter){
          queryUrl += `&$filter=${encodeURIComponent(this.props.filter)}`;
        }

        let response = await this.context.spHttpClient.get(queryUrl, SPHttpClient.configurations.v1);

        let views = (await response.json()) as ISPViews;

        // Check if onViewsRetrieved callback is defined
        if (this.props.onViewsRetrieved) {
          //Call onViewsRetrieved
          let lr = this.props.onViewsRetrieved(views.value);
          let output: ISPView[];

          //Conditional checking to see of PromiseLike object or array
          if (lr instanceof Array) {
            output = lr;
          } else {
            output = await lr;
          }

          views.value = output;
        }

        return views;
      }
    }
  }

  /**
   * Returns an empty view for when a list isn't selected
   */
  private getEmptyViews(): Promise<ISPViews> {
    return new Promise<ISPViews>((resolve) => {
      const listData: ISPViews = {
        value:[
        ]
      };

      resolve(listData);
    });
  }
  /**
   * Returns 3 fake SharePoint views for the Mock mode
   */
  private getViewsFromMock(): Promise<ISPViews> {
    return new Promise<ISPViews>((resolve) => {
      const listData: ISPViews = {
        value:[
          { Title: 'Mock View One', Id: '3bacd87b-b7df-439a-bb20-4d4d13523431' },
          { Title: 'Mock View Two', Id: '5e37c820-e2cb-49f7-93f5-14003c07788b' },
          { Title: 'Mock View Three', Id: '5fda7245-c4a7-403b-adc1-8bd8b481b4ee' }
        ]
      };

      resolve(listData);
    });
  }
}
