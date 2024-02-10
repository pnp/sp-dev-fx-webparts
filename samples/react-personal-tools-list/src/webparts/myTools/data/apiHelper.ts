import { WebPartContext } from "@microsoft/sp-webpart-base";
import { SPFx, spfi } from "@pnp/sp";
import { ITool } from "../models";
import { getSP } from "./pnpjs-config";

export const getUsersTools = async (
  context: WebPartContext,
  currentUserMail: string
): Promise<Array<ITool> | undefined> => {
  const sp = getSP(context);
  const requestRes = await sp.web.lists
    .getByTitle("PersonalTools")
    .items();
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
  context: WebPartContext
): Promise<Array<ITool>> => {
  const sp = spfi().using(SPFx(context));
  const requestRes = await sp.web.lists.getByTitle("AvailableTools").items();
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
  currentUserMail: string
): Promise<boolean> => {

  const sp = spfi().using(SPFx(context));
  const requestRes = await sp.web.lists
    .getByTitle("PersonalTools")
    .items();
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
    const update = await sp.web.lists
      .getByTitle("PersonalTools")
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
    const addItem = await sp.web.lists
      .getByTitle("PersonalTools")
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
