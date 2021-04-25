import { sp } from '@pnp/sp';
import '@pnp/sp/webs';
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/views";
import "@pnp/sp/fields";
import IListService from "./IListService";
import { ICamlQuery } from "@pnp/sp/lists";
import { ICamlQueryXml } from '../model/ICamlQueryXml';
import XMLParser from 'react-xml-parser';
import { IWeb, Web } from '@pnp/sp/webs';
import { SharePointType } from '../model/ISharePointFieldTypes';
import IResult from '../model/IResult';
import { intersection, isEmpty } from '@microsoft/sp-lodash-subset';
import { ListField, SiteList } from '../model/IListConfigProps';
import { IListSearchListQuery } from '../model/IMapQuery';
import GraphService from './GraphService';


export interface QueryHelperEntity {
  viewFields: string[];
  expandFields: string[];
}


export default class ListService implements IListService {
  private web: IWeb;
  private baseUrl: string;
  private static SharePointOnlineAudienceOOTBFieldName = "OData__ModernAudienceTargetUserField";
  public static MAX_TOP: number = 5000;

  constructor(siteUrl: string, useCache: boolean, cacheTime?: number, cacheType?: "session" | "local") {
    sp.setup({
      defaultCachingStore: useCache ? cacheType : undefined,
      defaultCachingTimeoutSeconds: useCache ? (cacheTime * 60) : undefined,
      sp: {
        headers: {
          Accept: 'application/json;odata=nometadata'
        },
        baseUrl: siteUrl
      },
    });
    this.web = Web(siteUrl);
    this.baseUrl = siteUrl;
  }

  public async getListItems(listQueryOptions: IListSearchListQuery, listPropertyName: string, sitePropertyName: string, sitePropertyValue: string, rowLimit: number, graphService?: GraphService): Promise<Array<IResult>> {
    try {
      let camlQuery: boolean = false;
      let items: any = undefined;
      let queryConfig: QueryHelperEntity = this.GetViewFieldsWithId(listQueryOptions, !isEmpty(listQueryOptions.camlQuery) || !isEmpty(listQueryOptions.viewName), false);
      if (listQueryOptions.camlQuery) {
        let query = this.getCamlQueryWithViewFieldsAndRowLimit(listQueryOptions.camlQuery, queryConfig, rowLimit);
        items = await this.getListItemsByCamlQuery(listQueryOptions.list.Id, query, queryConfig);
      }
      else {
        if (listQueryOptions.viewName) {
          let viewInfo: any = await this.web.lists.getById(listQueryOptions.list.Id).views.getByTitle(listQueryOptions.viewName).select("ViewQuery").get();
          let query = this.getCamlQueryWithViewFieldsAndRowLimit(`<View><Query>${viewInfo.ViewQuery}</Query></View>`, queryConfig, rowLimit);
          items = await this.getListItemsByCamlQuery(listQueryOptions.list.Id, query, queryConfig);
        }
        else {
          items = await sp.web.lists.getById(listQueryOptions.list.Id).items
            .select(queryConfig.viewFields.join(','))
            .top(rowLimit || ListService.MAX_TOP)
            .expand(queryConfig.expandFields.join(',')).usingCaching().get();
        }
      }

      if (listQueryOptions.audienceEnabled && graphService) {
        let userGroups: string[] = await graphService.getTransitiveMemberOf();
        items = this.getAudienceItems(items, userGroups);
      }

      let mappedItems = items.map((i: IResult) => {
        i.FileExtension = this.GetFileExtension(i.FileLeafRef);
        i.SiteUrl = this.baseUrl;
        i.ListName = listQueryOptions.list.Title;
        i.List = listQueryOptions.list;

        listQueryOptions.fields.map(field => {
          i = this.GetItemValue(i, field, camlQuery);
        });

        if (listPropertyName) {
          i[listPropertyName] = listQueryOptions.list.Title;
        }
        if (sitePropertyName) {
          i[sitePropertyName] = sitePropertyValue;
        }
        return i;
      });
      return mappedItems;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async getListItemById(listQueryOptions: IListSearchListQuery, itemId: number): Promise<any> {
    try {
      let queryConfig: QueryHelperEntity = this.GetViewFieldsWithId(listQueryOptions, false, true);
      return this.web.lists.getById(listQueryOptions.list.Id).items.getById(itemId).select(queryConfig.viewFields.join(',')).expand(queryConfig.expandFields.join(',')).usingCaching().get();
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async getSiteListsTitle(): Promise<Array<SiteList>> {
    try {
      return this.web.lists.filter('Hidden eq false').select('Title,Id').get();
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async getListFields(listId: string): Promise<Array<ListField>> {
    try {
      return this.web.lists.getById(listId).fields.select('EntityPropertyName,Title,InternalName,TypeAsString').get();
    } catch (error) {
      return Promise.reject(error);
    }
  }

  private getAudienceItems(itemsToFilter: IResult[], userGroups: string[]) {
    let results: IResult[] = [];
    userGroups && itemsToFilter.map(item => {
      let itemAudiencesIds: string[] = item.OData__ModernAudienceTargetUserField && item.OData__ModernAudienceTargetUserField.map(audience => { return audience.Name.split("|")[2]; });
      if (itemAudiencesIds) {
        let matches: string[] = intersection(itemAudiencesIds, userGroups);
        if (matches && matches.length > 0) {
          results.push(item);
        }
      }
      else {
        results.push(item);
      }
    });

    return results;
  }

  private GetViewFieldsWithId(listQueryOptions: IListSearchListQuery, isCamlQuery: boolean, isItemId: boolean): QueryHelperEntity {
    let result: QueryHelperEntity = { expandFields: [], viewFields: ['ServerUrl', 'FileLeafRef', 'Id', 'UniqueId'] };
    let hasToAddFieldsAsText: boolean = false;
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

  private GetItemValue(item: any, field: any, fromCamlQuery: boolean): any {
    switch (field.fieldType) {
      case SharePointType.Lookup:
      case SharePointType.LookupMulti:
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
            let taxonomyValues = item["TaxCatchAll"];
            let taxonomyTerm = taxonomyValues.find(t => t.ID === item[field.originalField].WssId);
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

  private async getListItemsByCamlQuery(listId: string, camlQuery: string, queryConfig: QueryHelperEntity): Promise<Array<any>> {
    try {
      const caml: ICamlQuery = {
        ViewXml: camlQuery,
      };
      return this.web.lists.getById(listId).usingCaching().getItemsByCAMLQuery(caml, queryConfig.expandFields.join(','));
    } catch (error) {
      return Promise.reject(error);
    }
  }

  private getCamlQueryWithViewFieldsAndRowLimit(camlQuery: string, queryConfig: QueryHelperEntity, rowLimit: number): string {
    try {
      let XmlParser = new XMLParser();
      let xml: ICamlQueryXml = XmlParser.parseFromString(camlQuery);

      let rowLimitXml: ICamlQueryXml = { name: "RowLimit", value: rowLimit ? rowLimit.toString() : "0", attributes: undefined, children: [] };

      let viewFieldsChildren: ICamlQueryXml[] = queryConfig.viewFields.map(viewField => {
        return { name: "FieldRef", attributes: { Name: viewField }, value: "", children: [] };
      });
      let viewFieldsXml: ICamlQueryXml = { name: "ViewFields", value: "", children: viewFieldsChildren, attributes: undefined };

      let queryXml: ICamlQueryXml;
      xml.children.map(child => {
        if (child.name == "Query") {
          queryXml = child;
        }

        if (child.name == "RowLimit") { //If the user set a camlquery with row limit or the view has row limit, it is not override
          rowLimitXml = child;
        }
      });

      if (queryXml) {
        xml.children = [viewFieldsXml, rowLimitXml, queryXml];
      }

      let result: string = XmlParser.toString(xml);
      return result.replace("</RowLimit></RowLimit>", "</RowLimit>");
    } catch (error) {
      return `getCamlQueryWithViewFieldsAndRowLimit -> ${error.message}`;
    }

  }

  private GetFileExtension(filename: string): string {
    var re = /(?:\.([^.]+))?$/;
    return re.exec(filename)[1] ? re.exec(filename)[1].toLowerCase() : undefined;
  }
}
