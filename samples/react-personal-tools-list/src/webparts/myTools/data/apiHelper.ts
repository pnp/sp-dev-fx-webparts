import { WebPartContext } from "@microsoft/sp-webpart-base";
import { ITool } from "../models";
import { getSP } from "./pnpjs-config";
import { IWeb, Web } from '@pnp/sp/presets/all';

type ListDefintion = {
  siteUrl?: string;
  list?: { id: string, title: string, url: string };
}

const getSourceWeb = async (context: WebPartContext, siteUrl: string): Promise<IWeb> => {
  const sp = getSP(context);
  const { WebFullUrl } = await sp.web.getContextInfo(siteUrl);
  const sourceWeb = Web([sp.web, decodeURI(WebFullUrl)]);
  return sourceWeb;
}

export const getUsersTools = async (
  context: WebPartContext,
  currentUserMail: string,
  personalToolsList: ListDefintion,
): Promise<Array<ITool> | undefined> => {
  const sourceWeb = await getSourceWeb(context, personalToolsList?.siteUrl ?? '');
  const sourceList = sourceWeb.lists.getById(personalToolsList?.list?.id ?? '');
  const requestRes = await sourceList.items();

  const userTools = requestRes.filter(
    (userTools) => userTools.tool_username === currentUserMail
  );

  if (userTools.length === 1) {
    const tools = JSON.parse(userTools[0].tool_usertools);
    return tools;
  } else {
    return undefined;
  }
};

export const getSelectableTools = async (
  context: WebPartContext,
  availableToolsList: ListDefintion,
): Promise<Array<ITool>> => {
  const sourceWeb = await getSourceWeb(context, availableToolsList?.siteUrl ?? '');
  const sourceList = sourceWeb.lists.getById(availableToolsList?.list?.id ?? '');
  const requestRes = await sourceList.items();

  const tools = requestRes.map((tool) => {
    return {
      toolName: tool.tool_name,
      toolUrl: tool.tool_url,
      key: tool.ID,
    } as ITool;
  });
  return tools;
};

export const updateUsersTools = async (
  context: WebPartContext,
  userTools: Array<ITool>,
  currentUserMail: string,
  personalToolsList?: ListDefintion,
): Promise<boolean> => {
  const sourceWeb = await getSourceWeb(context, personalToolsList?.siteUrl ?? '');
  const sourceList = sourceWeb.lists.getById(personalToolsList?.list?.id ?? '');
  const requestRes = await sourceList.items();

  const tmpTools = requestRes.filter(
    (userTools) => userTools.tool_username === currentUserMail
  );
  //create object to be added or updated
  const toolString = JSON.stringify(userTools);
  const userToolsObject = {
    Title: currentUserMail,
    tool_usertools: toolString,
    tool_username: currentUserMail,
  };
  if (tmpTools.length === 1) {
    const update = await sourceList
      .items.getById(tmpTools[0].ID)
      .update(userToolsObject)
      .then((res) => {
        return true;
      })
      .catch((error) => {
        console.log(error);
        return false;
      });
    return update;
  } else if (tmpTools.length === 0) {
    const addItem = await sourceList
      .items.add(userToolsObject)
      .then((res) => {
        return true;
      })
      .catch((error) => {
        console.log(error);
        return false;
      });
    return addItem;
  }
  return false;
};
