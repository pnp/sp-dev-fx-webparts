import { SPHttpClient } from '@microsoft/sp-http';
import { BaseComponentContext } from '@microsoft/sp-component-base';
import { IPropertyFieldListPickerHostProps, ISPList, ISPLists } from './IPropertyFieldListPickerHost';
import { PropertyFieldListPickerOrderBy } from './IPropertyFieldListPicker';


/**
 * Service implementation to get list & list items from current SharePoint site
 */
export default class SPListPickerService {
  private context: BaseComponentContext;
  private props: IPropertyFieldListPickerHostProps;

  /**
   * Service constructor
   */
  constructor(
    _props: IPropertyFieldListPickerHostProps,
    pageContext: BaseComponentContext
  ) {
    this.props = _props;
    this.context = pageContext;
  }

  /**
   * Gets the collection of libs in the current SharePoint site, or target site if specified by webRelativeUrl
   */
  public async getLibs(): Promise<ISPLists> {
    // use the web relative url if provided, otherwise default to current SharePoint site
    const webAbsoluteUrl = this.props.webAbsoluteUrl
      ? this.props.webAbsoluteUrl
      : this.context.pageContext.web.absoluteUrl;
    // If the running environment is SharePoint, request the lists REST service
    let queryUrl: string;
    if (this.props.contentTypeId) {
      queryUrl = `${webAbsoluteUrl}/_api/lists?$select=Title,id,BaseTemplate,RootFolder/ServerRelativeUrl,ContentTypes/StringId,ContentTypes/Name&$expand=RootFolder&$expand=ContentTypes`;
    } else {
      queryUrl = `${webAbsoluteUrl}/_api/lists?$select=Title,id,BaseTemplate,RootFolder/ServerRelativeUrl&$expand=RootFolder`;
    }
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

    // Adds an OData Filter to the list
    if (this.props.filter) {
      queryUrl += `&$filter=${encodeURIComponent(this.props.filter)}`;
    }
    // Check if the list have get filtered based on the list base template type
    else if ((this.props.baseTemplate !== null && this.props.baseTemplate) || Array.isArray(this.props.baseTemplate)) {
      if (Array.isArray(this.props.baseTemplate)) {
        queryUrl += '&$filter=(';
        queryUrl += this.props.baseTemplate.map(temp => `(BaseTemplate%20eq%20${temp})`).join('%20or%20');
        queryUrl += ')';
      } else {
        queryUrl += '&$filter=BaseTemplate%20eq%20';
        queryUrl += this.props.baseTemplate;
      }

      // Check if you also want to exclude hidden list in the list
      if (this.props.includeHidden === false) {
        queryUrl += '%20and%20Hidden%20eq%20false';
      }
    } else {
      if (this.props.includeHidden === false) {
        queryUrl += '&$filter=Hidden%20eq%20false';
      }
    }
    const response = await this.context.spHttpClient.get(
      queryUrl,
      SPHttpClient.configurations.v1
    );

    let lists = (await response.json()) as ISPLists;
    //remove unwanted contenttypes


    if (this.props.contentTypeId) {
      const testct = this.props.contentTypeId.toUpperCase();
      lists.value = lists.value.filter((l) => {
        for (const ct of l.ContentTypes) {
          const ctid: string = ct.StringId.toUpperCase();
          if (ctid.substring(0, testct.length) === testct) {
            return true;
          }
        }
        return false;
      });
    }

    // Check if onListsRetrieved callback is defined
    if (this.props.onListsRetrieved) {
      //Call onListsRetrieved
      const lr = this.props.onListsRetrieved(lists.value);
      let output: ISPList[];

      //Conditional checking to see of PromiseLike object or array
      if (lr instanceof Array) {
        output = lr;
      } else {
        output = await lr;
      }

      lists = {
        value: output,
      };
    }
    return lists;
  }
}
