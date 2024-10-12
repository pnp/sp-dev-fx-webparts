import { spfi, SPFI, SPFx } from "@pnp/sp";
import { AssignFrom } from "@pnp/core";
import { InjectHeaders, Caching } from "@pnp/queryable";
import { dateAdd } from "@pnp/core";
import '@pnp/sp/webs';
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/views";
import "@pnp/sp/fields";
import { ICamlQuery } from "@pnp/sp/lists";
import XMLParser, { XMLElement } from 'react-xml-parser';
import { SharePointType } from '../model/ISharePointFieldTypes';
import IResult from '../model/IResult';
import { intersection, isEmpty } from '@microsoft/sp-lodash-subset';
import { ListField, SiteList } from '../model/IListConfigProps';
import { IListSearchListQuery, IListSearchListQueryItem } from '../model/IMapQuery';
import GraphService from './GraphService';
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { getKeyValue, setKeyValue } from "../utils/ObjectUtils";

export interface QueryHelperEntity {
  viewFields: string[];
  expandFields: string[];
}
export default class ListService {
  private static sourceSP: SPFI;
  private baseUrl: string;
  private _sp: SPFI;
  private static SharePointOnlineAudienceOOTBFieldName = "OData__ModernAudienceTargetUserField";
  public static MAX_TOP = 5000;

  private GetSourceSP(context: WebPartContext, useCache: boolean, cacheTime?: number, cacheType?: "session" | "local") {
    if (!ListService.sourceSP) {
      ListService.sourceSP = spfi().using(SPFx(context)).using(InjectHeaders(
        {
          Accept: 'application/json;odata=nometadata'
        }
      ));

      if (useCache) {
        ListService.sourceSP.using((Caching({
          store: cacheType,
          expireFunc: () => dateAdd(new Date, "minute", cacheTime)
        })));
      }
    }
  }

  constructor(context: WebPartContext, siteUrl: string, useCache: boolean, cacheTime?: number, cacheType?: "session" | "local") {
    this.GetSourceSP(context, useCache, cacheTime, cacheType);
    this.baseUrl = siteUrl;
    this._sp = spfi(siteUrl).using(AssignFrom(ListService.sourceSP.web));
  }

  public async getListItems(listQueryOptions: IListSearchListQuery, listPropertyName: string, sitePropertyName: string, sitePropertyValue: string, rowLimit: number, graphService?: GraphService): Promise<Array<IResult>> {
    try {
      const camlQuery = false;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let items: any = undefined;
      const queryConfig: QueryHelperEntity = this.GetViewFieldsWithId(listQueryOptions, !isEmpty(listQueryOptions.camlQuery) || !isEmpty(listQueryOptions.viewName), false);
      if (listQueryOptions.camlQuery) {
        const query = this.getCamlQueryWithViewFieldsAndRowLimit(listQueryOptions.camlQuery, queryConfig, rowLimit);
        items = await this.getListItemsByCamlQuery(listQueryOptions.list.Id, query, queryConfig);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        items = items.map((m: { FieldValuesAsText: any; }) => m.FieldValuesAsText);
      }
      else {
        if (listQueryOptions.viewName) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const viewInfo: any = await this._sp.web.lists.getById(listQueryOptions.list.Id).views.getByTitle(listQueryOptions.viewName).select("ViewQuery")();
          const query = this.getCamlQueryWithViewFieldsAndRowLimit(`<View><Query>${viewInfo.ViewQuery}</Query></View>`, queryConfig, rowLimit);
          items = await this.getListItemsByCamlQuery(listQueryOptions.list.Id, query, queryConfig);
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          items = items.map((m: { FieldValuesAsText: any; }) => m.FieldValuesAsText);
        }
        else {
          items = await this._sp.web.lists.getById(listQueryOptions.list.Id).items
            .select(queryConfig.viewFields.join(','))
            .top(rowLimit || ListService.MAX_TOP)
            .expand(queryConfig.expandFields.join(','))();
        }
      }

      if (listQueryOptions.audienceEnabled && graphService) {
        const userGroups: string[] = await graphService.getTransitiveMemberOf();
        items = this.getAudienceItems(items, userGroups);
      }

      const mappedItems = items.map((i: IResult) => {
        i.FileExtension = this.GetFileExtension(i.FileLeafRef);
        i.SiteUrl = this.baseUrl;
        i.ListName = listQueryOptions.list.Title;
        i.List = listQueryOptions.list;

        listQueryOptions.fields.map(field => {
          i = this.GetItemValue(i, field, camlQuery);
        });

        if (listPropertyName) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          setKeyValue(i, listPropertyName as any, listQueryOptions.list.Title);
        }
        if (sitePropertyName) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          setKeyValue(i, sitePropertyName as any, sitePropertyValue);
        }
        return i;
      });
      return mappedItems;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async getListItemById(listQueryOptions: IListSearchListQuery, itemId: number): Promise<any> {
    try {
      const queryConfig: QueryHelperEntity = this.GetViewFieldsWithId(listQueryOptions, false, true);
      return this._sp.web.lists.getById(listQueryOptions.list.Id).items.getById(itemId).select(queryConfig.viewFields.join(',')).expand(queryConfig.expandFields.join(','))();
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async getSiteListsTitle(): Promise<Array<SiteList>> {
    try {
      return this._sp.web.lists.filter('Hidden eq false').select('Title,Id')();
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async getListFields(listId: string): Promise<Array<ListField>> {
    try {
      return this._sp.web.lists.getById(listId).fields.select('EntityPropertyName,Title,InternalName,TypeAsString')();
    } catch (error) {
      return Promise.reject(error);
    }
  }

  private getAudienceItems(itemsToFilter: IResult[], userGroups: string[]) {
    const results: IResult[] = [];
    if (userGroups) {
      itemsToFilter.map(item => {
        const itemAudiencesIds: string[] = item.OData__ModernAudienceTargetUserField && item.OData__ModernAudienceTargetUserField.map(audience => { return audience.Name.split("|")[2]; });
        if (itemAudiencesIds) {
          const matches: string[] = intersection(itemAudiencesIds, userGroups);
          if (matches && matches.length > 0) {
            results.push(item);
          }
        }
        else {
          results.push(item);
        }
      });
    }

    return results;
  }

  private GetViewFieldsWithId(listQueryOptions: IListSearchListQuery, isCamlQuery: boolean, isItemId: boolean): QueryHelperEntity {
    const result: QueryHelperEntity = { expandFields: [], viewFields: ['ServerUrl', 'FileLeafRef', 'Id', 'UniqueId'] };
    let hasToAddFieldsAsText = false;
    listQueryOptions.fields.map(field => {
      switch (field.fieldType) {
        case SharePointType.User:
        case SharePointType.UserEmail:
        case SharePointType.UserName:
        case SharePointType.UserMulti:
          if (isCamlQuery) {
            hasToAddFieldsAsText = true;
            result.viewFields.push(field.originalField);
          }
          else {
            result.viewFields.push(`${field.originalField}/Title`);
            result.viewFields.push(`${field.originalField}/Name`);
            result.expandFields.push(`${field.originalField}`);
          }
          break;
        case SharePointType.Lookup:
        case SharePointType.LookupMulti:
          if (isCamlQuery) {
            hasToAddFieldsAsText = true;
            result.viewFields.push(field.originalField);
          }
          else {
            result.viewFields.push(`${field.originalField}/Title`);
            result.expandFields.push(`${field.originalField}`);
          }
          break;
        case SharePointType.Taxonomy:
          if (isCamlQuery) {
            hasToAddFieldsAsText = true;
            result.viewFields.push(field.originalField);
          }
          else {
            if (!result.viewFields.find(e => e === "TaxCatchAll/Term")) {
              result.viewFields.push("TaxCatchAll/Term");
            }
            if (!result.viewFields.find(e => e === "TaxCatchAll/ID")) {
              result.viewFields.push("TaxCatchAll/ID");
            }
            result.viewFields.push(field.originalField);
            result.expandFields.push("TaxCatchAll");
          }
          break;
        default:
          {
            if (field.originalField != "ListName" && field.originalField != "SiteUrl") {
              result.viewFields.push(field.originalField);
            }
            break;
          }
      }
    });

    if (hasToAddFieldsAsText) {
      result.expandFields.push('FieldValuesAsText');
    }

    if (listQueryOptions.audienceEnabled && !isItemId) {
      result.expandFields.push(ListService.SharePointOnlineAudienceOOTBFieldName);
      result.viewFields.push(`${ListService.SharePointOnlineAudienceOOTBFieldName}/Name`);
    }

    return result;
  }

  private GetItemValue(item: IResult, field: IListSearchListQueryItem, fromCamlQuery: boolean): IResult {
    switch (field.fieldType) {
      case SharePointType.Lookup:
      case SharePointType.LookupMulti:
        if (fromCamlQuery) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          setKeyValue(item, field.newField as any, getKeyValue(item, `FieldValuesAsText.${field.originalField}` as any));
        }
        else {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          setKeyValue(item, field.newField as any, getKeyValue(item, field.originalField as any));
          if (field.newField !== field.originalField) {
            delete item[field.originalField];
          }
        }
        break;
      case SharePointType.User:
      case SharePointType.UserEmail:
      case SharePointType.UserName:
        {
          if (fromCamlQuery) {
            item[field.newField] = item['FieldValuesAsText'][field.originalField];
          }
          else {
            item[field.newField] = item[field.originalField];
            if (field.newField !== field.originalField) {
              delete item[field.originalField];
            }
          }
          break;
        }
      case SharePointType.UserMulti:
        {
          if (fromCamlQuery) {
            item[field.newField] = item['FieldValuesAsText'][field.originalField];
          }
          else {
            item[field.newField] = item[field.originalField];
            if (field.newField !== field.originalField) {
              delete item[field.originalField];
            }
          }
          break;
        }
      case SharePointType.Taxonomy:
        {
          if (fromCamlQuery) {
            item[field.newField] = item['FieldValuesAsText'][field.originalField];
          }
          else {
            const taxonomyValues = item["TaxCatchAll"];
            const taxonomyTerm = taxonomyValues.find((t: { ID: number; }) => t.ID === item[field.originalField].WssId);
            if (taxonomyTerm) {
              item[field.newField] = taxonomyTerm;
            }
          }
          break;
        }
      case SharePointType.Boolean:
        {
          if (item[field.originalField] != undefined) {
            item[field.newField] = item[field.originalField] ? "true" : "false";
          }
          else {
            item[field.newField] = item[field.originalField];
          }
          if (field.newField !== field.originalField) {
            delete item[field.originalField];
          }
          break;
        }
      default:
        {
          item[field.newField] = item[field.originalField];
          if (field.newField !== field.originalField) {
            delete item[field.originalField];
          }
          break;
        }
    }


    return item;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private async getListItemsByCamlQuery(listId: string, camlQuery: string, queryConfig: QueryHelperEntity): Promise<Array<any>> {
    try {
      const caml: ICamlQuery = {
        ViewXml: camlQuery,
      };
      return this._sp.web.lists.getById(listId).getItemsByCAMLQuery(caml, queryConfig.expandFields.join(','));
    } catch (error) {
      return Promise.reject(error);
    }
  }

  private getCamlQueryWithViewFieldsAndRowLimit(camlQuery: string, queryConfig: QueryHelperEntity, rowLimit: number): string {
    try {
      const XmlParser = new XMLParser();
      const xml: XMLElement = XmlParser.parseFromString(camlQuery);

      const rowLimitXml: XMLElement = { name: "RowLimit", value: rowLimit ? rowLimit.toString() : "0", attributes: undefined, children: [] };

      const viewFieldsChildren: XMLElement[] = queryConfig.viewFields.map(viewField => {
        return { name: "FieldRef", attributes: { Name: viewField }, value: "", children: [] };
      });
      const viewFieldsXml: XMLElement = { name: "ViewFields", value: "", children: viewFieldsChildren, attributes: undefined };

      let queryXml: XMLElement;
      xml.children.map(child => {
        if (child.name == "Query") {
          queryXml.value = child.value;
        }

        if (child.name == "RowLimit") { //If the user set a camlquery with row limit or the view has row limit, it is not override
          rowLimitXml.value = child.value;
        }
      });

      if (queryXml) {
        xml.children = [viewFieldsXml, rowLimitXml, queryXml];
      }

      const result: string = XmlParser.toString(xml);
      return result.replace("</RowLimit></RowLimit>", "</RowLimit>");
    } catch (error) {
      return `getCamlQueryWithViewFieldsAndRowLimit -> ${error.message}`;
    }

  }

  private GetFileExtension(filename: string): string {
    const re = /(?:\.([^.]+))?$/;
    return re.exec(filename)[1] ? re.exec(filename)[1].toLowerCase() : undefined;
  }
}
