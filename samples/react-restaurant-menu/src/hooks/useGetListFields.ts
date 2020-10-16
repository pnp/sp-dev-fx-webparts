import { sp  } from "@pnp/sp";

import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/fields/list";
import { IFieldInfo } from "@pnp/sp/fields/types";
import { Web, IWeb } from "@pnp/sp/webs";

export const useGetListFields = async  (webUrl:string,listId:string): Promise<IFieldInfo[]> => {
  const list =   Web(webUrl).lists.getById(listId);
  const  _fields:IFieldInfo[] = await list.fields();
  console.log('fields',_fields);
return _fields;
};
