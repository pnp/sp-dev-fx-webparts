import {
  sortBy,
  uniqBy
} from "lodash";
import moment from "moment";

import { sp,  } from "@pnp/sp";
import { IFieldInfo } from "../entities";
import { IListInfo } from "../entities";


// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useList = () => {
  // Run on useList hook

  // Get List Columns
  const getListColumns = async (listId: string): Promise<IFieldInfo[]> => {
    const _listColumnsResults: IFieldInfo[] = await sp.web.lists
      .getById(listId)
      .fields.filter("Hidden eq false")
      .get();

    const _wColumns: IFieldInfo[] = uniqBy(
      sortBy(_listColumnsResults, "Title"),
      "Title"
    );
    return _wColumns;
  };

  const getField = async (listId: string, field: string): Promise<any> => {
    const _field: IFieldInfo = await sp.web.lists
      .getById(listId)
      .fields.getByInternalNameOrTitle(field)
      .get();

    const fieldType = _field.TypeAsString;
    const fieldScope = _field.Scope;
    return { fieldType, fieldScope };
  }

  const getGroupHeaders =  async (
    listId: string,
    groupByField: string  ): Promise<any[]> => {
    const _viewXml = `<View Scope='Recursive'>
    <Query>
        <GroupBy Collapse="TRUE">
            <FieldRef Name="${groupByField}"/>
        </GroupBy>
    </Query>
    <RowLimit>1000</RowLimit>
</View>`;

    const _groupHeadersResults = await sp.web.lists
      .getById(listId)
      .renderListDataAsStream({ ViewXml: _viewXml });

    //console.log("groups", _groupHeadersResults.Row);
    return uniqBy(_groupHeadersResults.Row, groupByField);
  }

  const getGroupItems =  async (
    listId: string,
    groupByField: string,
    groupFieldValue: string  ): Promise<any[]> => {
    const _field: any = await getField(listId, groupByField);

    switch (_field.fieldType) {
      case "DateTime":
        groupFieldValue =
          groupFieldValue != "Unassigned"
            ? moment(groupFieldValue).format("YYYY-MM-DD")
            : "Unassigned";
        break;
      case "AllDayEvent":
        groupFieldValue = groupFieldValue === "No" ? "0" : "1";
        break;
      default:
        break;
    }

    let _viewXml = `<View Scope='Recursive'>
           <Query>
            <OrderBy>
               <FieldRef Name="${groupByField}" Ascending="FALSE"></FieldRef>
            </OrderBy>
           </Query>
           </View>`;

    if (groupFieldValue != "Unassigned") {
      _viewXml = `<View Scope='Recursive'>
          <Query>
              <OrderBy>
                <FieldRef Name="${groupByField}" Ascending="FALSE"></FieldRef>
              </OrderBy>
           <Where>
            <Eq>
              <FieldRef Name="${groupByField}"></FieldRef>
              <Value Type="${_field.fieldType}" IncludeTimeValue="FALSE">${groupFieldValue}</Value>
           </Eq>
          </Where>
          </Query>
       </View>`;
    }

    if (groupFieldValue === "Unassigned") {
      _viewXml = `<View Scope='Recursive'>
        <Query>
            <OrderBy>
              <FieldRef Name="${groupByField}" Ascending="FALSE"></FieldRef>
            </OrderBy>
         <Where>
          <IsNull>
            <FieldRef Name="${groupByField}"></FieldRef>
         </IsNull>
        </Where>
        </Query>
     </View>`;
    }

    const _groupItemsResults = await sp.web.lists
      .getById(listId)
      .renderListDataAsStream({ ViewXml: _viewXml });

    console.log("items", _groupItemsResults.Row);
    return _groupItemsResults.Row;
  }

  // Get Lists
  const getLists =  async (baseTemplate: number): Promise<IListInfo[]> => {
    let _filter  = "Hidden eq false and ";
    if (baseTemplate === 0) {
      _filter = _filter + " BaseType ne 1";
    } else {
      _filter = _filter + " BaseType eq 1";
    }
    const _lists: IListInfo[] = await sp.web.lists.filter(_filter).get();

    console.log("lists", _lists);
    return _lists;
  }

  // Return functions
  return {
    getListColumns,
    getLists,
    getGroupItems,
    getGroupHeaders,
    getField,
  };
};
