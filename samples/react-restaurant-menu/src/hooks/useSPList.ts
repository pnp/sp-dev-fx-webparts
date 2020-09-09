import { sp } from "@pnp/sp";

import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/fields/list";
import { IFieldInfo, IField } from "@pnp/sp/fields/types";
import { Web } from "@pnp/sp/webs";
import "@pnp/sp/items";

import moment from "moment";
import { IMenuFields } from "../entities.ts/IMenuFields";
export const useGetListFields = async (
  webUrl: string,
  listId: string
): Promise<IFieldInfo[]> => {
  const list = Web(webUrl).lists.getById(listId);
  const _fields: IFieldInfo[] = await list.fields();
  return _fields;
};

export const useGetFieldProperties = async (
  webUrl: string,
  listId: string,
  fieldInternalName: string
): Promise<IField> => {
  const list = Web(webUrl).lists.getById(listId);
  const _field: IField = await list.fields.getByInternalNameOrTitle(
    fieldInternalName
  );
  return _field;
};

export const useGetListItems = async (
  webUrl: string,
  listId: string,
  fields: IMenuFields
): Promise<any[]> => {

  const dataIni = moment().isoWeekday(1).utc(); // monday
  const dataEnd = moment().isoWeekday(7).utc(); // friday

  try {
    const listItemsReturn: any[] = await Web(webUrl)
      .lists.getById(listId)
      .usingCaching()
      .getItemsByCAMLQuery({
        ViewXml: `<View><Query><Where><And><Geq><FieldRef Name="${
          fields.dateFieldName
        }" /><Value IncludeTimeValue="false" Type="DateTime">${dataIni.toISOString()}</Value></Geq><Leq><FieldRef Name="Date" /><Value IncludeTimeValue="false" Type="DateTime">${dataEnd.toISOString()}</Value></Leq></And></Where></Query></View>`,
      });

    return listItemsReturn;
  } catch (error) {
    console.log(error);
    return [];
  }
};

