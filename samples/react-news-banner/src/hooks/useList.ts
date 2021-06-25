/* tslint:disable */
import { Web } from "@pnp/sp";
import { IListItem, ISPList } from "./../entities";
import { sortBy, uniqBy } from "lodash";
import { ISelectedProperties } from "../entities";
import { ISPColumn } from "../entities";

type retrunFunctions = {
  getListColumns: (webUrl: string, listId: string) => Promise<ISPColumn[]>;
  getLists: (webUrl: string, baseTemplate: number) => Promise<ISPList[]>;
  getItems: (seletedProperties: ISelectedProperties) => Promise<IListItem[]>;
};

export const useList = (): retrunFunctions => {
  // Get List Columns
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getListColumns = async (
    webUrl: string,
    listId: string
  ): Promise<ISPColumn[]> => {
    const web = new Web(webUrl);
    const _listColumnsResults: ISPColumn[] = await web.lists
      .getById(listId)
      .fields.filter("Hidden eq false")
      .get();

    const _wColumns: ISPColumn[] = uniqBy(
      sortBy(_listColumnsResults, "Title"),
      "Title"
    );
    console.log(_wColumns);
    return _wColumns;
  };

  const getItems = async (
    seletedProperties: ISelectedProperties
  ): Promise<IListItem[]> => {
    const {
      dateFieldName,
      titleFieldName,
      descriptionFieldName,
      imageUrlFieldName,
      listId,
      numberItems,
      titleLink,
      sites,
    } = seletedProperties;
    const listItems: IListItem[] = [];
    if (!listId && !sites) return [];
    const web = new Web(sites[0].url);
    const sortField: string = dateFieldName ?? "Title";

    const _listResults = await web.lists
      .getById(listId)
      .items.orderBy(sortField, false)
      .top(numberItems ?? 3)
      .get();
    if (_listResults && _listResults.length) {
      for (const item of _listResults) {
        listItems.push({
          id: item.ID,
          title: item[titleFieldName],
          description: item[descriptionFieldName],
          imageUrl: item[imageUrlFieldName]?.Url,
          linkUrl: item[titleLink]?.Url,
          publishedDate: item[dateFieldName],
        });
      }
    }
    return listItems;
  };
  // Get Lists
  const getLists = async (
    webUrl: string,
    baseTemplate: number
  ): Promise<ISPList[]> => {
    let _filter = "Hidden eq false and ";
    if (baseTemplate === 0) {
      _filter = _filter + " BaseType ne 1";
    } else {
      _filter = _filter + " BaseType eq 1";
    }
    const web = new Web(webUrl);
    const _lists: ISPList[] = await web.lists.filter(_filter).get();

    console.log("lists", _lists);
    return _lists;
  };
  // Return functions
  return {
    getListColumns,
    getLists,
    getItems,
  };
};
