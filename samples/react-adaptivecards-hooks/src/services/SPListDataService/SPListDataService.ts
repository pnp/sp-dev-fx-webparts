import * as React from "react";
import { WebPartContext } from "@microsoft/sp-webpart-base";

// Used to retrieve SharePoint items
import { sp } from '@pnp/sp';
import '@pnp/sp/webs';
import '@pnp/sp/lists';
import "@pnp/sp/views";

import { ICardServiceState, cardServiceReducer } from "../CardService/CardServiceReducer";

export const useSPListDataService = (spContext: WebPartContext) => {
  const initialState: ICardServiceState = { type: 'status', isLoading: false, isError: false };

  const [listServiceState, dispatch] = React.useReducer(cardServiceReducer, initialState);

  const fetchData = async (listId: string, viewId: string) => {
    sp.setup({
      spfxContext: spContext
    });

    // Get the list
    const list = await sp.web.lists.getById(listId);
    const view:any = await list.getView(viewId);
    const _viewSchema = view.HtmlSchemaXml;

    // Get the data as returned by the view
    const { Row: data } = await list.renderListDataAsStream({
      ViewXml: _viewSchema
    });

    dispatch({ type: 'success_data', results: { data: JSON.stringify(data) } });
  };

  const getListItems = async (listId: string, viewId: string) => {
    dispatch({ type: 'request_data' });
    await fetchData(listId, viewId);

    return () => {
      // clean up (equivalent to finally/dispose)
    };
  };

  // return the items that consumers need
  return { listServiceState, getListItems };
};
