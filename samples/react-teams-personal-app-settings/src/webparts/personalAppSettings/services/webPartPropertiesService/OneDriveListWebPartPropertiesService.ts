import { IWebPartPropertiesService } from './IWebPartPropertiesService';
import { IListItem } from '../../common/IListItem';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import * as strings from 'PersonalAppSettingsWebPartStrings';

const PropertiesColumnName = 'WPProperties';
const WebPartUniqueKeyColumnName = 'WPKey';
const MySiteGraphIdStorageKey = 'MySiteId';
const SettingsListIdStorageKey = 'ettingsListId';
const PropertiesListTitle = 'WPProperties';

/**
 * IWebPartPropertiesService implementation to store properties in personal OneDrive
 */
export class OneDriveListWebPartPropertiesService<T> implements IWebPartPropertiesService<T> {
  // cached properties
  private _properties: T | null;

  /**
   * @param _context WebPartContext
   */
  public constructor(private _context: WebPartContext) {}

  /**
   * Gets properties for the web part base on unique key (Properties OneDrive list can contain properties of multiple web parts).
   * @param webPartKey The key of the web part to get properties for.
   */
  public async getProperties(webPartKey: string): Promise<T | null> {
    if (!this._properties) {
      // if there are no cached properties, we're getting them from the OneDrive
      const listItem = await this._getPropertiesListItem(webPartKey, true);

      // checking if there are any previously saved properties
      if (listItem) {
        this._properties = JSON.parse(listItem.fields![PropertiesColumnName]);
      }
    }
    return this._properties;
  }

  /**
   * Sets properties for the web part base on unique key (Properties OneDrive list can contain properties of multiple web parts).
   * @param webPartKey The key of the web part to get properties for.
   */
  public async setProperties(webPartKey: string, properties: T): Promise<void> {
    // getting list id
    const listId = await this._getSettingListId();

    if (!listId) {
      // no list found
      throw Error(strings.PropertiesListNotCreatedError);
    }

    // updating internal cache
    this._properties = JSON.parse(JSON.stringify(properties));

    // converting properties object to a string
    const propertiesStr = JSON.stringify(properties);

    // getting graph site id (<tenant,site-id,web-id>) to work with
    const graphSiteId = await this._getMySiteGraphId();

    // getting graph client
    const graphClient = await this._context.msGraphClientFactory.getClient();

    // checking if there are previously saved properties
    const existingItem = await this._getPropertiesListItem(webPartKey, true);
    if (existingItem) {
      //
      // updaging properties
      //
      const itemId = existingItem.id;
      let fields: any = {};
      fields[PropertiesColumnName] = propertiesStr;
      const updateItemResponse = await graphClient.api(`/sites/${graphSiteId}/lists/${listId}/items/${itemId}/fields`).version('v1.0').patch(fields);

      if (updateItemResponse.error) {
        throw new Error(strings.PropertiesNotSavedError);
      }
    }
    else {
      //
      // saving properties for the first time
      //
      let fields: any = {};
      fields[WebPartUniqueKeyColumnName] = webPartKey;
      fields.Title = webPartKey;
      fields[PropertiesColumnName] = propertiesStr;
      const createItemResponse = await graphClient.api(`/sites/${graphSiteId}/lists/${listId}/items`).version('v1.0').post({
        fields: fields
      });

      if (createItemResponse.error) {
        throw new Error(strings.PropertiesNotSavedError);
      }
    }
  }

  /**
   * Gets list item with previously saved properties
   * @param webPartKey web part unique key
   * @param expandFields flag to expand fields
   */
  private async _getPropertiesListItem(webPartKey: string, expandFields: boolean): Promise<IListItem | null | undefined> {
    const listId = await this._getSettingListId();
    if (!listId) {
      throw Error(strings.PropertiesListNotCreatedError);
    }

    const graphSiteId = await this._getMySiteGraphId();

    const graphClient = await this._context.msGraphClientFactory.getClient();

    let expandQuery = '';
    if (expandFields) {
      expandQuery = `&expand=fields`;
    }

    const existingItemResponse = await graphClient.api(`/sites/${graphSiteId}/lists/${listId}/items?select=id${expandQuery}`).version('v1.0').get();
    if (existingItemResponse.value && existingItemResponse.value.length && expandFields) {
      return existingItemResponse.value.filter(v => v.fields[WebPartUniqueKeyColumnName] === webPartKey)[0];
    }

    return null;
  }

  /**
   * Gets MS Graph site ID for current user's OneDrive site
   */
  private async _getMySiteGraphId(): Promise<string> {
    // we can cache the ID in the localStorage as it will never change for current user
    let graphSiteId = window.localStorage.getItem(MySiteGraphIdStorageKey);
    if (!graphSiteId) {

      const graphClient = await this._context.msGraphClientFactory.getClient();
      const currentDomain = location.hostname;
      const oneDriveDomain = `${currentDomain.split('.')[0]}-my.sharepoint.com`;

      const sharepointIdsResponse = await graphClient.api('/me/drive/root?$select=sharepointIds').version('v1.0').get();
      const sharepointIds = sharepointIdsResponse.sharepointIds;

      graphSiteId = `${oneDriveDomain},${sharepointIds.siteId},${sharepointIds.webId}`;

      window.localStorage.setItem(MySiteGraphIdStorageKey, graphSiteId);
    }

    return graphSiteId;
  }

  /**
   * Gets settings list id
   */
  private async _getSettingListId(): Promise<string | null> {
    // we can cache the ID in the localStorage as it will never change
    let listId = window.localStorage.getItem(SettingsListIdStorageKey);
    if (!listId) {
      const graphSiteId = await this._getMySiteGraphId();

      const graphClient = await this._context.msGraphClientFactory.getClient();
      const listsResponse = await graphClient.api(`/sites/${graphSiteId}/lists?$filter=displayName eq '${PropertiesListTitle}'`).version('v1.0').get();

      if (listsResponse.value && listsResponse.value.length) {
        listId = listsResponse.value[0].id;
        window.localStorage.setItem(SettingsListIdStorageKey, listId!);
      }
      else {
        // creating the list if it hasn't been created before
        try {
          const createListResponse = await graphClient.api(`/sites/${graphSiteId}/lists`).version('v1.0').post({
            displayName: PropertiesListTitle,
            columns: [{
              name: WebPartUniqueKeyColumnName,
              text: {}
            }, {
              name: PropertiesColumnName,
              text: {
                allowMultipleLines: true,
                maxLength: 1000000000,
                textType: 'plain'
              }
            }],
            list: {
              hidden: true,
              template: 'genericList'
            }
          });

          listId = createListResponse.id;
          window.localStorage.setItem(SettingsListIdStorageKey, listId!);
        }
        catch (error) {
          if (error.statusCode === 403 || error.accessCode === 'accessDenied') {
            throw Error(strings.SiteManagePermissionsNotProvisioned);
          }
        }
      }

    }

    return listId;
  }
}
