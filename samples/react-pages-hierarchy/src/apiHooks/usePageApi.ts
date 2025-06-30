import { useReducer, useEffect, useState } from 'react';
import { PermissionKind, spfi, SPFx } from '@pnp/sp/presets/all';
import { ErrorHelper, LogHelper, PageFields } from '@src/utilities';
import { Action } from "./action";
import { GetRequest } from './getRequest';
import { IPage } from '@src/models/IPage';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { INavLink } from '@fluentui/react';

// state that we track
interface PagesState {
  parentPageColumnExists: boolean;
  userCanManagePages: boolean;
  ancestorPages: IPage[];
  childrenPages: IPage[];
  tree?: INavLink;
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
    ancestorPages: IPage[],
    tree: INavLink
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
      // eslint-disable-next-line no-case-declarations
      const arrayAction: PageTreePayloadAction = action as PageTreePayloadAction;
      return {
        ...state,
        childrenPages: arrayAction.payload.childgrenPages,
        ancestorPages: arrayAction.payload.ancestorPages,
        tree: arrayAction.payload.tree,
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
      return {
        ...state,
        parentPageColumnExists: (action as ParentPageColumnExistAction).payload
      };
    case ActionTypes.CAN_USER_MANAGE_PAGES:
      return {
        ...state,
        userCanManagePages: (action as CanUserManagePagesAction).payload
      };
    default:
      throw new Error();
  }
}

export function usePageApi(currentPageId: number, pageEditFinished: boolean, context: WebPartContext, treeTop?: number, treeExpandTo?: number): PageApi {
  const [pagesState, pagesDispatch] = useReducer(pagesReducer, {
    parentPageColumnExists: true,
    userCanManagePages: false,
    // eslint-disable-next-line no-empty-pattern
    ancestorPages: [] = [],
    // eslint-disable-next-line no-empty-pattern
    childrenPages: [] = [],
    getRequest: { isLoading: false, hasError: false, errorMessage: "" },
    tree: null
  });
  const [spLibGuid, setSpLibGuid] = useState<string>();

  const sp = spfi().using(SPFx(context));

  // currentPageId is a dependency only because it can change when on the workbench, otherwise it really wouldn't change while on a page
  useEffect(() => {
    LogHelper.verbose('usePageApi', 'useEffect', `[currentPageId, ${currentPageId}, pageEditFinished: ${pageEditFinished} ]`);

    if (currentPageId && !!spLibGuid) {
      checkIfParentPageExists().catch(console.error);
      getPagesAsync().catch(console.error);
    }

  }, [currentPageId, pageEditFinished, spLibGuid]);

  async function getSitePagesLibraryGuid(): Promise<void> {
    LogHelper.verbose('usePageApi', 'getSitePagesLibrary', ``);

    const lib = await sp.web.lists.ensureSitePagesLibrary();
    const libData = await lib();
    await setSpLibGuid(libData.Id);
  }

  async function getPagesAsync(): Promise<void> {
    LogHelper.verbose('usePageApi', 'getPagesAsync', ``);

    // check local storage first and return these and then refresh it in the background

    // dispatch the LOADING action
    pagesDispatch({ type: ActionTypes.GET_PAGES_LOADING });

    // add select and order by later.  Order by ID?
    const pages: IPage[] = [];
    const items = await sp.web.lists.getById(spLibGuid).items
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
      for (const item of items) {
        pages.push(mapPage(item));
      }
    }

    const ancestorPages: IPage[] = buildPageAncestors(pages, currentPageId).reverse();
    const childrenPages: IPage[] = buildPageChildren(pages, currentPageId);
    const treeLink: INavLink = buildHierarchy(pages, currentPageId);

    // dispatch the GET_ALL action
    pagesDispatch({
      type: ActionTypes.GET_PAGES,
      payload: { childgrenPages: childrenPages, ancestorPages: ancestorPages, tree: treeLink },
    } as PageTreePayloadAction);
  }

  async function checkIfParentPageExists(): Promise<void> {
    LogHelper.verbose('usePageApi', 'parentPageExists', ``);

    const parentPage = await sp.web.lists.getById(spLibGuid).fields
      .getByInternalNameOrTitle(PageFields.PARENTPAGELOOKUP)()
      .catch(e => {
        // swallow the exception we'll handle below
      });

    if (parentPage) {
      // dispatch the action
      pagesDispatch({ type: ActionTypes.PARENT_PAGE_COLUMN_EXISTS, payload: true } as ParentPageColumnExistAction);
    }
    else {
      canCurrentUserManageSitePages().catch(console.error);
      // dispatch the action
      pagesDispatch({ type: ActionTypes.PARENT_PAGE_COLUMN_EXISTS, payload: false } as ParentPageColumnExistAction);
    }
  }

  async function canCurrentUserManageSitePages(): Promise<void> {
    const canManagePages = await sp.web.lists.getById(spLibGuid)
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

    const list = await sp.web.lists.getById(spLibGuid)();

    const lookup = sp.web.lists.getById(spLibGuid).fields
      .addLookup(PageFields.PARENTPAGELOOKUP, { LookupListId: list.Id, LookupFieldName: PageFields.TITLE })
      .catch(e => {
        return null;
        ErrorHelper.handleHttpError('canUserUpdateSitePages', e);
      });

    await sp.web.lists.getById(spLibGuid).fields
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function mapPage(item: any): IPage {
    const page: IPage = {
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

  function buildHierarchy(allPages: IPage[], pageId: number): INavLink {
    function recurse(id: number, l: number, ancestorPages: IPage[]): INavLink {
      const item: IPage = allPages.filter(i => i.id === id)[0];

      let links: INavLink[] = [];
      links = links.concat(allPages.filter(i => i.parentPageId === id).map(it => recurse(it.id, l ? l + 1 : l, ancestorPages)));

      return { name: item.title, url: item.url, key: item.id.toString(), links: links, isExpanded: treeExpandTo ? (treeExpandTo >= l) : (ancestorPages.find(f => f.id === id) ? true : false) };
    }

    const ancestorPages: IPage[] = buildPageAncestors(allPages, pageId).reverse();

    return recurse(treeTop ? treeTop : ancestorPages[0].id, treeExpandTo ? 1 : treeExpandTo, ancestorPages);
  }

  const addParentPageField = (): void => {
    addParentPageFieldToSitePages().catch(console.error);
  };

  useEffect(() => {
    getSitePagesLibraryGuid().catch(console.error);
  }, []);

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
      tree: pagesState.tree
    },
    addParentPageField
  };
}
