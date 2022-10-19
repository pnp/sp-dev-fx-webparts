/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @microsoft/spfx/no-async-await */
/* eslint-disable @typescript-eslint/typedef */
import '@pnp/sp/appcatalog';
import '@pnp/sp/webs';

import * as React from 'react';

import { SPFI } from '@pnp/sp';
import {
  IList,
  IListEnsureResult,
} from '@pnp/sp/lists';

import {
  CHAT_KEY_ID,
  SUPPORT_LIST,
} from '../constants';
import {
  GlobalStateContext,
  IGlobalStateContext,
  IState,
} from '../globalStateProvider';
import { IChatModeratorInfo } from '../models/IChatModeratorInfo';
import { IParticipant } from '../models/IParticipant';
import { IUserIdentity } from '../models/IUserIdentity';
import {
  getFromLocalStorage,
  saveToLocalStorage,
} from './localStorage';
import { getSP } from './pnpjsConfig';

export const useUtils = ()   => {

  const { GlobalState  } = React.useContext<IGlobalStateContext>(GlobalStateContext);
  const { context  } = GlobalState || ({} as IState);
  const sp: SPFI =  React.useMemo(() => getSP(), []);

  const addListPermissions = React.useCallback(async (list: IList): Promise<void> => {
    await list.breakRoleInheritance(true);
    if (!sp) return;
    const visitorGroup = await sp.web.associatedVisitorGroup();
    const defs = await sp.web.roleDefinitions();
    await list.roleAssignments.add(visitorGroup.Id, defs.find((item) => item.Name === "Contribute").Id);
  }, [sp]);

  const addListFields = React.useCallback(async (list: IList): Promise<void> => {
    const moderatorFieldAddResult = await list.fields.addMultilineText("moderatorInfo", {
      NumberOfLines: 1000,
      RichText: false,
      RestrictedMode: false,
      AppendOnly: false,
      AllowHyperlink: false,
      Group: "Chat Room Group",
    });
    await moderatorFieldAddResult.field.update({ Title: "Moderator Info" });

    const participantsFieldAddResult = await list.fields.addMultilineText("Participants", {
      NumberOfLines: 1000,
      RichText: false,
      RestrictedMode: false,
      AppendOnly: false,
      AllowHyperlink: false,
      Group: "Chat Room Group",
    });
    await participantsFieldAddResult.field.update({ Title: "Participants" });

    const totalParticipantsFieldAddResult = await list.fields.addText("total participants", {
      Required: false,
      Description: "total participants",
      MaxLength: 255,
      Group: "Chat Room Group",
    });
    await totalParticipantsFieldAddResult.field.update({ Title: "Total Participants" });

    const pageUrlFieldAddResult = await list.fields.addText("Page", {
      Required: false,
      Description: "Page",
      MaxLength: 255,
      Group: "Chat Room Group",
    });
    await pageUrlFieldAddResult.field.update({ Title: "Page" });

    await list.fields.getByInternalNameOrTitle("Title").update({ Title: "ThreadId" });
  }, []);

  const createChatSupportList = React.useCallback(
    async (): Promise<IList> => {
      if (!sp) return;
      let ensureResult: IListEnsureResult;
      try {
        ensureResult = await sp.web.lists.ensure(SUPPORT_LIST, "Room Chat support List", 100, true);
        const { list } = ensureResult || undefined;
        const webId = context.pageContext.legacyPageContext.webId;
        if (ensureResult.created) {
          // if we've got the list
          // we need to add the custom fields to the list
          if (list) {
            await addListFields(list);
            // add a role assignment
            await addListPermissions(list);
            saveToLocalStorage(webId, 'RoomChat cfg list Exists' )
          }
        }
      } catch (error) {

        console.log(error);
      }
      return ensureResult?.list || undefined;
    },
    [addListFields, addListPermissions, context, sp]
  );

  const checkIfSupportListExists = React.useCallback(async (): Promise<boolean> => {
    if (!context) return false;
    const webId =  context.pageContext.legacyPageContext.webId;
    const storageValue = getFromLocalStorage(webId) || undefined;
    return storageValue !== undefined && storageValue !== "";
  }, [context]);

  const getThreadInformationFromSupportList = React.useCallback(async (instanceId: string): Promise<
    IChatModeratorInfo
  > => {
    if (!sp)  return undefined;

      const item = await sp.web.lists
        .getByTitle(SUPPORT_LIST)
        .items.top(1)
        .filter(`Title eq '${instanceId}${CHAT_KEY_ID}'`)
        .select("moderatorInfo")();
      const moderatorInfo = item[0]?.moderatorInfo || undefined;
      console.log("moderatorInfo)", moderatorInfo);
      return moderatorInfo ? JSON.parse(moderatorInfo) : undefined;

  }, [sp]);

  const saveThreadInformationToSupportList = React.useCallback(
    async (instanceId: string, chatInfo: IChatModeratorInfo): Promise<void> => {

      if (!sp)  return undefined;
      await sp.web.lists
        .getByTitle(SUPPORT_LIST)
        .items.add({ Title: `${instanceId}${CHAT_KEY_ID}`, moderatorInfo: JSON.stringify(chatInfo) });
    },
    [sp]
  );

  const getChatParticipantsFromSupportList = React.useCallback(async (instanceId: string): Promise<IParticipant[]> => {
    if (!sp)  return undefined;
    //const listExists: boolean = await checkIfSupportListExists();
    const item = await sp.web.lists
      .getByTitle(SUPPORT_LIST)
      .items.top(1)
      .filter(`Title eq '${instanceId}${CHAT_KEY_ID}'`)
      .select("Participants")();
    return item[0]?.Participants ? (JSON.parse(item[0]?.Participants) as IParticipant[]) : [];
  }, [sp]);

  const saveChatParticipantToSupportList = React.useCallback(
    async (instanceId: string, userInfo: IUserIdentity): Promise<void> => {
      if (!sp)  return undefined;

      const items = await sp.web.lists
        .getByTitle(SUPPORT_LIST)
        .items.top(1)
        .filter(`Title eq '${instanceId}${CHAT_KEY_ID}'`)
        .select("Participants, Id")();
      if (items.length) {
        const savedList: IParticipant[] = JSON.parse(items[0].Participants) ?? [];

        savedList?.push({ userInfo: userInfo });
        await sp.web.lists
          .getByTitle(SUPPORT_LIST)
          .items.getById(items[0].Id)
          .update({
            Participants: JSON.stringify(savedList),
          });
      }
    },
    [sp]
  );

  const getChatParticipantFromSupportList = React.useCallback(
    async (instanceId: string, userId: string): Promise<IUserIdentity> =>
      getChatParticipantsFromSupportList(instanceId).then(
        (participants) =>
          new Promise((resolve) => {
            const userInfo = participants.filter((item) => item.userInfo.userId === userId)[0]?.userInfo ?? undefined;
            return resolve(userInfo);
          })
      ),
    [getChatParticipantsFromSupportList]
  );

  const removeChatParticipantFromSupportList = React.useCallback(
    async (instanceId: string, userId: string): Promise<void> => {
      if (!sp)  return undefined;
      const savedList: IParticipant[] = (await getChatParticipantsFromSupportList(instanceId)) || [];
      const newList: IParticipant[] = savedList.filter((item) => item.userInfo.userId !== userId) ?? [];
      const items = await sp.web.lists
        .getByTitle(SUPPORT_LIST)
        .items.top(1)
        .filter(`Title eq '${instanceId}${CHAT_KEY_ID}'`)
        .select("Participants, Id")();
      await sp.web.lists
        .getByTitle(SUPPORT_LIST)
        .items.getById(items[0].Id)
        .update({
          Participants: JSON.stringify(newList),
        });
    },
    [getChatParticipantsFromSupportList, sp]
  );

  const deleteTreadInfoFromSupportList = React.useCallback(async (page: string): Promise<void> => {
    if (!sp)  return undefined;
    const items = await sp.web.lists
      .getByTitle(SUPPORT_LIST)
      .items.filter(`Page eq '${page}'`)
      .select("Participants, Id")();
    if (items.length) {
      await sp.web.lists.getByTitle(SUPPORT_LIST).items.getById(items[0].Id).delete();
    }
  }, [sp]);

  return {
    createChatSupportList,
    deleteTreadInfoFromSupportList,
    getChatParticipantFromSupportList,
    saveChatParticipantToSupportList,
    removeChatParticipantFromSupportList,
    getChatParticipantsFromSupportList,
    getThreadInformationFromSupportList,
    saveThreadInformationToSupportList,
    checkIfSupportListExists,
  };
};
