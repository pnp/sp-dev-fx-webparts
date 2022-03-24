import { useReducer, useEffect, useState } from 'react';
import { PermissionKind, spfi, SPFx } from '@pnp/sp/presets/all';
import { ErrorHelper, LogHelper, ListTitles, PageFields } from '@src/utilities';
import { Action } from "./action";
import { GetRequest } from './getRequest';
import { IPage } from '@src/models/IPage';
import { WebPartContext } from '@microsoft/sp-webpart-base';

// state that we track
interface PagesState {
  parentPageColumnExists: boolean;
  userCanManagePages: boolean;
  ancestorPages: IPage[];
  childrenPages: IPage[];
  getRequest: GetRequest;
}

// api accessable to those outside
interface PageApi {
  state: PagesState;
  addParentPageField: () => void;
}

/*
* Setup actions, action types and our reducer
*/
interface PageTreePayloadAction extends Action {
  payload: {
    childgrenPages: IPage[],
    ancestorPages: IPage[]
  };
}
interface ParentPageColumnExistAction extends Action {
  payload: boolean;
}
interface CanUserManagePagesAction extends Action {
  payload: boolean;
}

class ActionTypes {
  public static readonly CAN_USER_MANAGE_PAGES: string = "CAN_USER_MANAGE_PAGES";
  public static readonly PARENT_PAGE_COLUMN_EXISTS: string = "PARENT_PAGE_COLUMN_EXISTS";
  public static readonly GET_PAGES: string = "GET_PAGES";
  public static readonly GET_PAGES_LOADING: string = "GET_PAGES_LOADING";
  public static readonly GET_PAGES_ERRORED: string = "GET_PAGES_ERRORED";
}

function pagesReducer(state: PagesState, action: Action): PagesState {
  //First establish the type of the payload
  switch (action.type) {
    case ActionTypes.GET_PAGES_LOADING:
      return { ...state, getRequest: { isLoading: true, hasError: false, errorMessage: "" } };
    case ActionTypes.GET_PAGES:
      var arrayAction: PageTreePayloadAction = action as PageTreePayloadAction;
      return {
        ...state,
        childrenPages: arrayAction.payload.childgrenPages,
        ancestorPages: arrayAction.payload.ancestorPages,
        getRequest: { isLoading: false, hasError: false, errorMessage: "" }
      };
    case ActionTypes.GET_PAGES_ERRORED:
      return {
        ...state,
        getRequest: {
          isLoading: false,
          hasError: true,
          errorMessage: "Get Pages Failure"
        }
      };
    case ActionTypes.PARENT_PAGE_COLUMN_EXISTS:
      var parentPageColumnExistAction: ParentPageColumnExistAction = action as ParentPageColumnExistAction;
      return {
        ...state,
        parentPageColumnExists: parentPageColumnExistAction.payload
      };
    case ActionTypes.CAN_USER_MANAGE_PAGES:
      var canUserManagePagesAction: CanUserManagePagesAction = action as CanUserManagePagesAction;
      return {
        ...state,
        userCanManagePages: canUserManagePagesAction.payload
      };
    default:
      throw new Error();
  }
}

export function usePageApi(currentPageId: number, pageEditFinished: boolean, context: WebPartContext): PageApi {
  const [pagesState, pagesDispatch] = useReducer(pagesReducer, {
    parentPageColumnExists: true,
    userCanManagePages: false,
    ancestorPages: [] = [],
    childrenPages: [] = [],
    getRequest: { isLoading: false, hasError: false, errorMessage: "" },
  });

  const sp = spfi().using(SPFx(context));

  // currentPageId is a dependency only because it can change when on the workbench, otherwise it really wouldn't change while on a page
  useEffect(() => {
    LogHelper.verbose('usePageApi', 'useEffect', `[currentPageId, ${currentPageId}, pageEditFinished: ${pageEditFinished} ]`);

    if (currentPageId) {
      checkIfParentPageExists();
      getPagesAsync();
    }

  }, [currentPageId, pageEditFinished]);

  async function getPagesAsync() {
    LogHelper.verbose('usePageApi', 'getPagesAsync', ``);

    // check local storage first and return these and then refresh it in the background

    // dispatch the LOADING action
    pagesDispatch({ type: ActionTypes.GET_PAGES_LOADING });

    // add select and order by later.  Order by ID?
    let pages: IPage[] = [];
    let items = await sp.web.lists.getByTitle(ListTitles.SITEPAGES).items
      .select(
        PageFields.ID,
        PageFields.TITLE,
        PageFields.FILEREF,
        PageFields.PARENTPAGELOOKUP,
        PageFields.PARENTPAGELOOKUP_ID,
        PageFields.PARENTPAGELOOKUP_TITLE,
      )
      .expand(
        PageFields.PARENTPAGELOOKUP
      )
      .top(5000)
      .orderBy(PageFields.TITLE, true)()
      .catch(e => {
        ErrorHelper.handleHttpError('getPages', e);
        pagesDispatch({ type: ActionTypes.GET_PAGES_ERRORED });
      });

    if (items) {
      for (let item of items) {
        pages.push(mapPage(item));
      }
    }

    const ancestorPages: IPage[] = buildPageAncestors(pages, currentPageId).reverse();
    const childrenPages: IPage[] = buildPageChildren(pages, currentPageId);

    // dispatch the GET_ALL action
    pagesDispatch({
      type: ActionTypes.GET_PAGES,
      payload: { childgrenPages: childrenPages, ancestorPages: ancestorPages },
    } as PageTreePayloadAction);
  }

  async function checkIfParentPageExists() {
    LogHelper.verbose('usePageApi', 'parentPageExists', ``);

    let parentPage = await sp.web.lists.getByTitle(ListTitles.SITEPAGES).fields
      .getByInternalNameOrTitle(PageFields.PARENTPAGELOOKUP)()
      .catch(e => {
        // swallow the exception we'll handle below
      });

    if (parentPage) {
      // dispatch the action
      pagesDispatch({ type: ActionTypes.PARENT_PAGE_COLUMN_EXISTS, payload: true } as ParentPageColumnExistAction);
    }
    else {
      canCurrentUserManageSitePages();
      // dispatch the action
      pagesDispatch({ type: ActionTypes.PARENT_PAGE_COLUMN_EXISTS, payload: false } as ParentPageColumnExistAction);
    }
  }

  async function canCurrentUserManageSitePages(): Promise<void> {
    let canManagePages = await sp.web.lists.getByTitle(ListTitles.SITEPAGES)
      .currentUserHasPermissions(PermissionKind.ManageLists)
      .catch(e => {
        ErrorHelper.handleHttpError('canUserUpdateSitePages', e);
        return false;
      });

    // dispatch the action
    pagesDispatch({ type: ActionTypes.CAN_USER_MANAGE_PAGES, payload: canManagePages } as CanUserManagePagesAction);
  }

  async function addParentPageFieldToSitePages(): Promise<void> {
    LogHelper.verbose('usePageApi', 'addParentPageFieldToSitePages', ``);

    let list = await sp.web.lists.getByTitle(ListTitles.SITEPAGES)();

    let lookup = await sp.web.lists.getByTitle(ListTitles.SITEPAGES).fields
      .addLookup(PageFields.PARENTPAGELOOKUP, { LookupListId: list.Id, LookupFieldName: PageFields.TITLE })
      .catch(e => {
        return null;
        ErrorHelper.handleHttpError('canUserUpdateSitePages', e);
      });

    await sp.web.lists.getByTitle(ListTitles.SITEPAGES).fields
      .getByInternalNameOrTitle(PageFields.PARENTPAGELOOKUP)
      .update({ Title: PageFields.PARENTPAGELOOKUP_DISPLAYNAME })
      .catch(e => {
        ErrorHelper.handleHttpError('canUserUpdateSitePages', e);
      });

    if (lookup) {
      // dispatch the action
      pagesDispatch({ type: ActionTypes.PARENT_PAGE_COLUMN_EXISTS, payload: true } as ParentPageColumnExistAction);
    }
  }

  // map a SharePoint List Item to an IPage
  function mapPage(item: any): IPage {
    let page: IPage = {
      id: item.ID,
      title: item.Title,
      etag: item['odata.etag'] ? item['odata.etag'] : new Date().toISOString(),
      url: item[PageFields.FILEREF],
      parentPageId: item[PageFields.PARENTPAGELOOKUP] ? item[PageFields.PARENTPAGELOOKUP].ID : null
    };

    return page;
  }

  function buildPageAncestors(allPages: IPage[], pageId: number, ancestorPages: IPage[] = []): IPage[] {

    // get all ancestor pages
    if (pageId) {
      const currentPage = allPages.find(f => f.id === pageId);
      if (currentPage) {
        ancestorPages.push(currentPage);
        buildPageAncestors(allPages, currentPage.parentPageId, ancestorPages);
      }
    }

    return ancestorPages;
  }

  // get all children page
  function buildPageChildren(allPages: IPage[], pageId: number): IPage[] {

    let childPages: IPage[] = [];

    if (pageId) {
      childPages = allPages.filter(f => f.parentPageId === pageId);
    }

    return childPages;
  }

  const addParentPageField = () => {
    addParentPageFieldToSitePages();
  };

  return {
    state: {
      parentPageColumnExists: pagesState.parentPageColumnExists,
      userCanManagePages: pagesState.userCanManagePages,
      ancestorPages: pagesState.ancestorPages,
      childrenPages: pagesState.childrenPages,
      getRequest: {
        isLoading: pagesState.getRequest.isLoading,
        hasError: pagesState.getRequest.hasError,
        errorMessage: pagesState.getRequest.errorMessage
      },
    },
    addParentPageField
  };
}
