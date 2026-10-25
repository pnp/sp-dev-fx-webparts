import { spfi, SPFI, SPFx, PrincipalSource, PrincipalType } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/sites";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/fields";
import "@pnp/sp/security";
import "@pnp/sp/site-groups/web";
import "@pnp/sp/site-users/web";
import "@pnp/sp/sputilities";
import "@pnp/sp/views";
import { AddFieldOptions } from "@pnp/sp/fields";
import { PermissionKind } from "@pnp/sp/security";
import type { IWeb } from "@pnp/sp/webs";
import type { WebPartContext } from "@microsoft/sp-webpart-base";
import { PageTrustError, toUserMessage } from "../errors";
import type { IPersonIdentity } from "../logic/trustStatus";
import {
  buildOpenRequestsViewUrl,
  countOpenReviewItems,
  pageKeyFromUrl,
  planOpenCount,
  strictOpenCountPlan,
  type IOpenCountPlan,
  type IOpenRequestItem
} from "../logic/openRequests";
import {
  addOnlyBasePermissions,
  addOnlyRoleConflictMessage,
  addOnlyRoleDescription,
  addOnlyRoleName,
  assignmentIncludesRole,
  inheritedRoleDefinitionsMessage,
  isAddOnlyRole,
  managePermissionsMessage,
  missingVisitorsGroupMessage,
  parsePermissionMask,
  roleNotVisibleMessage,
  rootManagePermissionsMessage,
  visitorAddOnlyRoleId,
  visitorsCanFlagFromAssignments,
  type IPrincipalAssignment,
  type IRolePermissionSource
} from "../logic/visitorAccess";
import {
  isInheritedRoleDefinitionFailure,
  isMissingRoleError,
  isMissingVisitorsGroupFailure,
  isPermissionDenied,
  pageTrustErrorWithCause,
  readSharePointError,
  roleIdFromAddResponse,
  roleNameFilter,
  sameWebUrl,
  shouldCreateRoleOnRootWeb,
  visitorFlagFailureMessage,
  visitorFlagStopFailureMessage,
  pageTrustFailureLine,
  visitorFlagStage
} from "../logic/visitorFlag";
import { assignPageOwner, clearAssignedPageOwner, type OwnerColumnResult } from "../logic/pageOwner";
import { productName } from "../logic/productName";
import {
  flaggedByField,
  flaggedBySchemaXml,
  lastConfirmedField,
  lastConfirmedSchemaXml,
  noteField,
  noteMaxLength,
  noteSchemaXml,
  pageLibraryTemplate,
  pageKeyField,
  pageKeySchemaXml,
  pageLinkField,
  pageLinkSchemaXml,
  pageOwnerField,
  pageOwnerSchemaXml,
  pageTitleField,
  pageTitleSchemaXml,
  reviewListTitle,
  statusField,
  statusNew,
  statusSchemaXml
} from "../schema";

export interface IPersonOption {
  id?: number;
  loginName: string;
  displayName: string;
  email?: string;
}

export interface IPageTrustLoadRequest {
  pageListId?: string;
  pageItemId?: number;
  webAbsoluteUrl: string;
  currentUser: IPersonIdentity;
}

export interface IPageTrustSnapshot {
  placedOnPage: boolean;
  pageListId?: string;
  pageItemId?: number;
  pageTitle?: string;
  pageUrl?: string;
  columnsReady: boolean;
  listReady: boolean;
  pageKeyReady: boolean;
  reviewListDefaultViewUrl?: string;
  visitorsCanFlag: boolean;
  columnProblem?: string;
  canManageWeb: boolean;
  canEditPage: boolean;
  currentUser: IPersonIdentity;
  author?: IPersonIdentity;
  pageOwner?: IPersonIdentity;
  lastConfirmed?: string;
}

export interface IFlagRequest {
  pageUrl: string;
  pageTitle: string;
  note: string;
  flaggedById?: number;
  flaggedByLogin?: string;
}

export interface IOpenRequestQuery {
  pageUrl: string;
  webAbsoluteUrl: string;
  pageKeyReady: boolean;
  defaultViewUrl?: string;
}

export interface IOpenRequestSummary {
  count: number;
  viewUrl?: string;
}

interface IFieldLite {
  InternalName: string;
  TypeAsString: string;
}

interface ILookupUser {
  Id?: number;
  Title?: string;
  EMail?: string;
}

interface IPageItem {
  Id: number;
  Title?: string;
  FileRef?: string;
  Author?: ILookupUser;
  PageOwner?: ILookupUser;
  LastConfirmed?: string;
}

interface IFieldSpec {
  name: string;
  type: string;
  schemaXml: string;
}

const pageFieldSpecs: IFieldSpec[] = [
  { name: pageOwnerField, type: "User", schemaXml: pageOwnerSchemaXml },
  { name: lastConfirmedField, type: "DateTime", schemaXml: lastConfirmedSchemaXml }
];

const reviewFieldSpecs: IFieldSpec[] = [
  { name: pageTitleField, type: "Text", schemaXml: pageTitleSchemaXml },
  { name: pageLinkField, type: "Note", schemaXml: pageLinkSchemaXml },
  { name: flaggedByField, type: "User", schemaXml: flaggedBySchemaXml },
  { name: noteField, type: "Note", schemaXml: noteSchemaXml },
  { name: statusField, type: "Choice", schemaXml: statusSchemaXml }
];

const pageKeySpec: IFieldSpec = { name: pageKeyField, type: "Text", schemaXml: pageKeySchemaXml };

interface IReviewListRef {
  id: string;
  defaultViewUrl?: string;
}

interface IPageKeyRow {
  Id: number;
  PageLink?: unknown;
}

interface IRoleDefinitionRow {
  Id?: number;
  BasePermissions?: IRolePermissionSource;
}

export class PageTrustService {
  public constructor(private readonly _sp: SPFI) {
  }

  public async load(request: IPageTrustLoadRequest): Promise<IPageTrustSnapshot> {
    const snapshot: IPageTrustSnapshot = {
      placedOnPage: false,
      columnsReady: false,
      listReady: false,
      pageKeyReady: false,
      visitorsCanFlag: false,
      canManageWeb: false,
      canEditPage: false,
      currentUser: request.currentUser
    };

    try {
      snapshot.canManageWeb = await this._hasWebPermission(PermissionKind.ManageWeb);
      const reviewList = await this._reviewList();
      const reviewListId = reviewList && reviewList.id;
      snapshot.reviewListDefaultViewUrl = reviewList && reviewList.defaultViewUrl;
      snapshot.listReady = await this._listHasFields(reviewListId, reviewFieldSpecs);
      snapshot.pageKeyReady = await this._safePageKeyReady(reviewListId);
      if (snapshot.canManageWeb && reviewListId && snapshot.listReady) {
        snapshot.visitorsCanFlag = await this._safeVisitorsCanFlag(reviewListId);
      }

      if (!request.pageListId || request.pageItemId === undefined) {
        return snapshot;
      }

      const pageList = await this._sp.web.lists.getById(request.pageListId).select("Id", "BaseTemplate")();
      if (pageList.BaseTemplate !== pageLibraryTemplate) {
        return snapshot;
      }

      snapshot.placedOnPage = true;
      snapshot.pageListId = request.pageListId;
      snapshot.pageItemId = request.pageItemId;
      snapshot.canEditPage = await this._hasItemPermission(request.pageListId, request.pageItemId, PermissionKind.EditListItems);

      const columnCheck = await this._inspectFields(request.pageListId, pageFieldSpecs);
      snapshot.columnsReady = columnCheck.ready;
      snapshot.columnProblem = columnCheck.problem;
      if (!columnCheck.ready) {
        return snapshot;
      }

      const item = await this._sp.web.lists.getById(request.pageListId).items.getById(request.pageItemId)
        .select(
          "Id",
          "Title",
          "FileRef",
          "Author/Id",
          "Author/Title",
          "Author/EMail",
          "PageOwner/Id",
          "PageOwner/Title",
          "PageOwner/EMail",
          "LastConfirmed"
        )
        .expand("Author", "PageOwner")() as IPageItem;

      snapshot.pageTitle = item.Title && item.Title.trim() ? item.Title.trim() : "Untitled page";
      snapshot.pageUrl = this._pageUrl(request.webAbsoluteUrl, item.FileRef);
      snapshot.author = this._toPerson(item.Author);
      snapshot.pageOwner = this._toPerson(item.PageOwner);
      snapshot.lastConfirmed = item.LastConfirmed;
      return snapshot;
    } catch (error) {
      throw new PageTrustError(toUserMessage(error, `${productName} couldn't load this page.`));
    }
  }

  public async setup(pageListId: string): Promise<string> {
    try {
      const pageList = await this._sp.web.lists.getById(pageListId).select("Id", "BaseTemplate")();
      if (pageList.BaseTemplate !== pageLibraryTemplate) {
        throw new PageTrustError(`${productName} can only be set up from a modern site page.`);
      }

      await this._ensureFields(pageListId, pageFieldSpecs);
      const reviewListId = await this._ensureReviewList();
      await this._ensureFields(reviewListId, reviewFieldSpecs);
      await this._ensureFields(reviewListId, [pageKeySpec]);
      const indexWarning = await this._ensurePageKeyIndexed(reviewListId);
      const backfillWarning = await this._backfillPageKeys(reviewListId);
      const viewWarning = await this._addFieldsToDefaultView(pageListId, [pageOwnerField, lastConfirmedField]);
      const listViewWarning = await this._addFieldsToDefaultView(
        reviewListId,
        [pageTitleField, pageLinkField, pageKeyField, flaggedByField, noteField, statusField]
      );
      const warnings: string[] = [];
      if (viewWarning || listViewWarning) {
        warnings.push("A default view could not be updated, but the columns and the list exist.");
      }
      if (indexWarning) {
        warnings.push(indexWarning);
      }
      if (backfillWarning) {
        warnings.push(backfillWarning);
      }
      if (warnings.length === 0) {
        return `${productName} is set up.`;
      }
      return `${productName} is set up. ${warnings.join(" ")}`;
    } catch (error) {
      throw new PageTrustError(toUserMessage(error, `${productName} couldn't be set up.`));
    }
  }

  public async confirm(pageListId: string, pageItemId: number, isoDate: string): Promise<void> {
    try {
      await this._sp.web.lists.getById(pageListId).items.getById(pageItemId).update({
        LastConfirmed: `${isoDate}T00:00:00Z`
      });
    } catch (error) {
      throw new PageTrustError(toUserMessage(error, "The confirmation couldn't be saved."));
    }
  }

  public setPageOwner(pageListId: string, pageItemId: number, person: IPersonOption): Promise<OwnerColumnResult> {
    // Site Pages is checked out while the property pane is open. items.update
    // hits that file lock, so the write goes through validateUpdateListItem.
    return assignPageOwner(
      person,
      (loginName: string) => this._sp.web.ensureUser(loginName),
      (fieldName: string, fieldValue: string) => this._writeOwnerField(pageListId, pageItemId, fieldName, fieldValue)
    );
  }

  public clearPageOwner(pageListId: string, pageItemId: number): Promise<OwnerColumnResult> {
    return clearAssignedPageOwner(
      (fieldName: string, fieldValue: string) => this._writeOwnerField(pageListId, pageItemId, fieldName, fieldValue)
    );
  }

  public async searchPeople(query: string): Promise<IPersonOption[]> {
    const trimmed = query.trim();
    if (trimmed.length < 2) {
      return [];
    }
    try {
      const results = await this._sp.utility.searchPrincipals(
        trimmed,
        PrincipalType.User,
        PrincipalSource.All,
        "",
        8
      );
      const people: IPersonOption[] = [];
      for (let index = 0; index < results.length; index++) {
        const person = results[index];
        if (!person.LoginName || person.PrincipalType !== PrincipalType.User) {
          continue;
        }
        people.push({
          id: person.PrincipalId > 0 ? person.PrincipalId : undefined,
          loginName: person.LoginName,
          displayName: person.DisplayName || person.Email || person.LoginName,
          email: person.Email || undefined
        });
      }
      return people;
    } catch (error) {
      console.error(pageTrustFailureLine("search people", error));
      throw new PageTrustError(toUserMessage(error, "People search didn't work. Try again."));
    }
  }

  public async flagPage(request: IFlagRequest): Promise<void> {
    const reviewList = await this._reviewList();
    if (!reviewList) {
      throw new PageTrustError(`A site owner needs to finish ${productName} setup before a page can be flagged.`);
    }
    try {
      const userId = request.flaggedById && request.flaggedById > 0
        ? request.flaggedById
        : await this._resolveUserId({
          loginName: request.flaggedByLogin || "",
          displayName: ""
        });
      const title = this._truncate(request.pageTitle || "Untitled page", 255);
      const note = request.note.trim().substring(0, noteMaxLength);
      const item: {
        Title: string;
        PageTitle: string;
        PageLink: string;
        FlaggedById: number;
        Note: string;
        Status: string;
        PageKey?: string;
      } = {
        Title: title,
        PageTitle: title,
        PageLink: request.pageUrl,
        FlaggedById: userId,
        Note: note,
        Status: statusNew
      };
      const pageKeyReady = await this._listHasFields(reviewList.id, [pageKeySpec]);
      const pageKey = pageKeyReady ? pageKeyFromUrl(request.pageUrl) : undefined;
      if (pageKey) {
        item.PageKey = pageKey;
      }
      await this._sp.web.lists.getById(reviewList.id).items.add(item);
    } catch (error) {
      throw new PageTrustError(toUserMessage(error, "The review request couldn't be saved."));
    }
  }

  public async getOpenRequests(query: IOpenRequestQuery): Promise<IOpenRequestSummary> {
    const viewUrl = buildOpenRequestsViewUrl({
      webAbsoluteUrl: query.webAbsoluteUrl,
      defaultViewUrl: query.defaultViewUrl,
      pageUrl: query.pageUrl,
      pageKeyReady: query.pageKeyReady
    });
    const reviewList = await this._reviewList();
    if (!reviewList) {
      return { count: 0, viewUrl };
    }
    const plan = planOpenCount(query.pageKeyReady, query.pageUrl);
    try {
      const rows = await this._loadOpenRows(reviewList.id, plan);
      return { count: countOpenReviewItems(rows, query.pageUrl), viewUrl };
    } catch (firstError) {
      const strict = query.pageKeyReady ? strictOpenCountPlan(query.pageUrl) : undefined;
      if (!strict) {
        throw new PageTrustError(toUserMessage(firstError, "Open review requests couldn't be counted."));
      }
      try {
        const rows = await this._loadOpenRows(reviewList.id, strict);
        return { count: countOpenReviewItems(rows, query.pageUrl), viewUrl };
      } catch (error) {
        throw new PageTrustError(toUserMessage(error, "Open review requests couldn't be counted."));
      }
    }
  }

  public async letVisitorsFlag(): Promise<void> {
    let stage: string = visitorFlagStage.managePermissions;
    let inheritanceBroken = false;
    try {
      const canManagePermissions = await this._hasWebPermission(PermissionKind.ManagePermissions);
      if (!canManagePermissions) {
        throw new PageTrustError(managePermissionsMessage);
      }
      stage = "read review list";
      const reviewList = await this._reviewList();
      if (!reviewList) {
        throw new PageTrustError(`Set up ${productName} before letting visitors flag pages.`);
      }
      stage = visitorFlagStage.visitorsGroup;
      const visitorId = await this._visitorGroupId();
      stage = visitorFlagStage.roleDefinition;
      const roleId = await this._ensureAddOnlyRole();
      stage = visitorFlagStage.breakInheritance;
      inheritanceBroken = await this._ensureUniqueListPermissions(reviewList.id);
      stage = visitorFlagStage.roleAssignment;
      await this._ensureVisitorAssignment(reviewList.id, visitorId, roleId);
    } catch (error) {
      console.error(pageTrustFailureLine(stage, error));
      throw new PageTrustError(this._visitorFlagMessage(stage, error, inheritanceBroken));
    }
  }

  /**
   * Removes the Visitors group's Page Trust - Add only role on Page Review Requests.
   * Other unique permissions on that list stay. resetRoleInheritance is not used,
   * because breaking inheritance copied the list's previous assignments and those
   * must not be discarded.
   */
  public async stopVisitorsFlag(): Promise<void> {
    let stage: string = visitorFlagStage.managePermissions;
    try {
      const canManagePermissions = await this._hasWebPermission(PermissionKind.ManagePermissions);
      if (!canManagePermissions) {
        throw new PageTrustError(managePermissionsMessage);
      }
      stage = "read review list";
      const reviewList = await this._reviewList();
      if (!reviewList) {
        throw new PageTrustError(`Set up ${productName} before changing visitor flagging.`);
      }
      stage = visitorFlagStage.visitorsGroup;
      const visitorId = await this._visitorGroupId();
      stage = visitorFlagStage.roleDefinition;
      const namedRoleId = await this._readAddOnlyRole(this._sp.web);
      const assignments = await this._readRoleAssignments(reviewList.id);
      const roleId = namedRoleId || visitorAddOnlyRoleId(assignments, visitorId);
      if (!roleId || !assignmentIncludesRole(assignments, visitorId, roleId)) {
        return;
      }
      stage = visitorFlagStage.removeRoleAssignment;
      try {
        await this._sp.web.lists.getById(reviewList.id).roleAssignments.remove(visitorId, roleId);
      } catch (error) {
        const again = await this._readRoleAssignments(reviewList.id);
        if (!assignmentIncludesRole(again, visitorId, roleId)) {
          return;
        }
        throw error;
      }
    } catch (error) {
      console.error(pageTrustFailureLine(stage, error));
      if (error instanceof PageTrustError) {
        throw new PageTrustError(visitorFlagStopFailureMessage(stage, error.message, false));
      }
      throw new PageTrustError(visitorFlagStopFailureMessage(stage, readSharePointError(error).message, true));
    }
  }

  private async _safePageKeyReady(listId: string | undefined): Promise<boolean> {
    if (!listId) {
      return false;
    }
    try {
      return await this._listHasFields(listId, [pageKeySpec]);
    } catch {
      return false;
    }
  }

  private async _safeVisitorsCanFlag(listId: string): Promise<boolean> {
    try {
      return await this._visitorsCanFlag(listId);
    } catch {
      return false;
    }
  }

  private async _visitorsCanFlag(listId: string): Promise<boolean> {
    const list = await this._sp.web.lists.getById(listId).select("HasUniqueRoleAssignments")() as { HasUniqueRoleAssignments?: boolean };
    if (!list.HasUniqueRoleAssignments) {
      return false;
    }
    const visitorId = await this._visitorGroupId();
    const assignments = await this._readRoleAssignments(listId);
    return visitorsCanFlagFromAssignments(assignments, visitorId);
  }

  private _visitorFlagMessage(stage: string, error: unknown, inheritanceBroken: boolean): string {
    if (error instanceof PageTrustError) {
      return visitorFlagFailureMessage(stage, error.message, inheritanceBroken, false);
    }
    return visitorFlagFailureMessage(stage, readSharePointError(error).message, inheritanceBroken, true);
  }

  private async _visitorGroupId(): Promise<number> {
    try {
      const group = await this._sp.web.associatedVisitorGroup.select("Id")();
      const groupId = roleIdFromAddResponse(group);
      if (!groupId) {
        throw new PageTrustError(missingVisitorsGroupMessage);
      }
      return groupId;
    } catch (error) {
      if (error instanceof PageTrustError) {
        throw error;
      }
      const detail = readSharePointError(error);
      if (isPermissionDenied(detail.status)) {
        throw error;
      }
      if (isMissingVisitorsGroupFailure(detail.status, detail.message)) {
        throw pageTrustErrorWithCause(missingVisitorsGroupMessage, error);
      }
      throw error;
    }
  }

  private async _ensureAddOnlyRole(): Promise<number> {
    const visible = await this._readAddOnlyRole(this._sp.web);
    if (visible) {
      return visible;
    }
    const target = await this._webForNewRoleDefinition();
    try {
      return await this._createAndResolveRole(target.web, target.movedToRoot);
    } catch (error) {
      const recovered = await this._readAddOnlyRole(this._sp.web);
      if (recovered) {
        return recovered;
      }
      if (!target.isRoot && isInheritedRoleDefinitionFailure(readSharePointError(error).message)) {
        return this._createRoleOnRoot();
      }
      if (target.movedToRoot && isPermissionDenied(readSharePointError(error).status)) {
        throw pageTrustErrorWithCause(rootManagePermissionsMessage, error);
      }
      if (isInheritedRoleDefinitionFailure(readSharePointError(error).message)) {
        throw pageTrustErrorWithCause(inheritedRoleDefinitionsMessage, error);
      }
      throw error;
    }
  }

  private async _createRoleOnRoot(): Promise<number> {
    try {
      return await this._createAndResolveRole(this._sp.site.rootWeb, true);
    } catch (error) {
      const recovered = await this._readAddOnlyRole(this._sp.web);
      if (recovered) {
        return recovered;
      }
      if (isPermissionDenied(readSharePointError(error).status)) {
        throw pageTrustErrorWithCause(rootManagePermissionsMessage, error);
      }
      if (isInheritedRoleDefinitionFailure(readSharePointError(error).message)) {
        throw pageTrustErrorWithCause(inheritedRoleDefinitionsMessage, error);
      }
      throw error;
    }
  }

  private async _createAndResolveRole(web: IWeb, createdOnRoot: boolean): Promise<number> {
    const createdId = await this._createAddOnlyRole(web);
    const onThisWeb = await this._readAddOnlyRole(this._sp.web);
    if (onThisWeb) {
      return onThisWeb;
    }
    if (!createdOnRoot) {
      return createdId;
    }
    throw new PageTrustError(roleNotVisibleMessage);
  }

  private async _webForNewRoleDefinition(): Promise<{ web: IWeb; isRoot: boolean; movedToRoot: boolean }> {
    const current = await this._sp.web.select("HasUniqueRoleAssignments", "Url")() as { HasUniqueRoleAssignments?: boolean; Url?: string };
    let rootUrl: string | undefined;
    try {
      const root = await this._sp.site.rootWeb.select("Url")() as { Url?: string };
      rootUrl = root.Url;
    } catch {
      rootUrl = undefined;
    }
    const isRoot = sameWebUrl(current.Url, rootUrl);
    if (shouldCreateRoleOnRootWeb(current.HasUniqueRoleAssignments, isRoot)) {
      return { web: this._sp.site.rootWeb, isRoot: true, movedToRoot: true };
    }
    return { web: this._sp.web, isRoot, movedToRoot: false };
  }

  private async _createAddOnlyRole(web: IWeb): Promise<number> {
    const mask = addOnlyBasePermissions();
    try {
      const created = await web.roleDefinitions.add(
        addOnlyRoleName,
        addOnlyRoleDescription,
        180,
        { Low: mask.low, High: mask.high }
      );
      const createdId = roleIdFromAddResponse(created);
      if (createdId) {
        return createdId;
      }
    } catch (error) {
      const again = await this._readAddOnlyRole(web);
      if (again) {
        return again;
      }
      throw error;
    }
    const reread = await this._readAddOnlyRole(web);
    if (reread) {
      return reread;
    }
    throw new PageTrustError(`${productName} couldn't read the id of the Page Trust - Add only permission level after creating it.`);
  }

  private async _readAddOnlyRole(web: IWeb): Promise<number | undefined> {
    try {
      const rows = await web.roleDefinitions
        .filter(roleNameFilter(addOnlyRoleName))
        .select("Id", "Name", "BasePermissions")
        .top(1)() as IRoleDefinitionRow[];
      return this._roleFromRow(rows.length > 0 ? rows[0] : undefined);
    } catch (error) {
      if (error instanceof PageTrustError) {
        throw error;
      }
      if (isPermissionDenied(readSharePointError(error).status)) {
        throw error;
      }
      return this._readAddOnlyRoleByName(web);
    }
  }

  private async _readAddOnlyRoleByName(web: IWeb): Promise<number | undefined> {
    try {
      const existing = await web.roleDefinitions.getByName(addOnlyRoleName)
        .select("Id", "Name", "BasePermissions")() as IRoleDefinitionRow;
      return this._roleFromRow(existing);
    } catch (error) {
      if (error instanceof PageTrustError) {
        throw error;
      }
      if (isMissingRoleError(error)) {
        return undefined;
      }
      throw error;
    }
  }

  private _roleFromRow(row: IRoleDefinitionRow | undefined): number | undefined {
    if (!row) {
      return undefined;
    }
    if (!isAddOnlyRole(parsePermissionMask(row.BasePermissions))) {
      throw new PageTrustError(addOnlyRoleConflictMessage);
    }
    const id = roleIdFromAddResponse(row);
    if (!id) {
      throw new PageTrustError(`${productName} found the Page Trust - Add only permission level, but SharePoint did not return its id.`);
    }
    return id;
  }

  private async _ensureUniqueListPermissions(listId: string): Promise<boolean> {
    const list = await this._sp.web.lists.getById(listId).select("HasUniqueRoleAssignments")() as { HasUniqueRoleAssignments?: boolean };
    if (list.HasUniqueRoleAssignments) {
      return true;
    }
    await this._sp.web.lists.getById(listId).breakRoleInheritance(true, false);
    return true;
  }

  private async _ensureVisitorAssignment(listId: string, visitorId: number, roleId: number): Promise<void> {
    const assignments = await this._readRoleAssignments(listId);
    if (assignmentIncludesRole(assignments, visitorId, roleId)) {
      return;
    }
    try {
      await this._sp.web.lists.getById(listId).roleAssignments.add(visitorId, roleId);
    } catch (error) {
      const again = await this._readRoleAssignments(listId);
      if (assignmentIncludesRole(again, visitorId, roleId)) {
        return;
      }
      throw error;
    }
  }

  private async _readRoleAssignments(listId: string): Promise<IPrincipalAssignment[]> {
    return this._sp.web.lists.getById(listId).roleAssignments
      .expand("RoleDefinitionBindings")
      .select("PrincipalId", "RoleDefinitionBindings/Id", "RoleDefinitionBindings/Name", "RoleDefinitionBindings/BasePermissions")() as Promise<IPrincipalAssignment[]>;
  }

  private async _loadOpenRows(listId: string, plan: IOpenCountPlan): Promise<IOpenRequestItem[]> {
    const query = this._sp.web.lists.getById(listId).items.filter(plan.filter).top(5000);
    if (plan.selectFields.indexOf(pageKeyField) >= 0) {
      return query.select("Id", "PageKey", "PageLink")() as Promise<IOpenRequestItem[]>;
    }
    return query.select("Id", "PageLink")() as Promise<IOpenRequestItem[]>;
  }

  private async _ensurePageKeyIndexed(listId: string): Promise<string | undefined> {
    try {
      const field = await this._sp.web.lists.getById(listId).fields.getByInternalNameOrTitle(pageKeyField)
        .select("InternalName", "Indexed", "TypeAsString")();
      if (field.Indexed) {
        return undefined;
      }
      await this._sp.web.lists.getById(listId).fields.getByInternalNameOrTitle(pageKeyField).update({
        Indexed: true
      }, "SP.FieldText");
      return undefined;
    } catch {
      return "The Page key column could not be indexed. Open counts still work on smaller lists.";
    }
  }

  private async _backfillPageKeys(listId: string): Promise<string | undefined> {
    try {
      let failed = false;
      for (let round = 0; round < 5; round++) {
        const rows = await this._sp.web.lists.getById(listId).items
          .filter("PageKey eq null")
          .select("Id", "PageLink")
          .top(100)() as IPageKeyRow[];
        if (rows.length === 0) {
          break;
        }
        let wrote = 0;
        for (let index = 0; index < rows.length; index++) {
          const row = rows[index];
          const link = typeof row.PageLink === "string" ? row.PageLink : undefined;
          const key = pageKeyFromUrl(link);
          if (!key || !row.Id) {
            continue;
          }
          try {
            await this._sp.web.lists.getById(listId).items.getById(row.Id).update({ PageKey: key });
            wrote += 1;
          } catch {
            failed = true;
          }
        }
        if (wrote === 0 || rows.length < 100) {
          break;
        }
      }
      if (failed) {
        return "Older review requests could not all be tagged with a page key. Open counts still include them by the page link.";
      }
      return undefined;
    } catch {
      return "Older review requests could not all be tagged with a page key. Open counts still include them by the page link.";
    }
  }

  private async _hasWebPermission(kind: PermissionKind): Promise<boolean> {
    const permissions = await this._sp.web.getCurrentUserEffectivePermissions();
    return this._sp.web.hasPermissions(permissions, kind);
  }

  private async _hasItemPermission(listId: string, itemId: number, kind: PermissionKind): Promise<boolean> {
    const permissions = await this._sp.web.lists.getById(listId).items.getById(itemId).getCurrentUserEffectivePermissions();
    return this._sp.web.hasPermissions(permissions, kind);
  }

  private async _reviewList(): Promise<IReviewListRef | undefined> {
    const lists = await this._sp.web.lists
      .filter(`Title eq '${reviewListTitle}'`)
      .select("Id", "DefaultViewUrl")
      .top(1)();
    if (lists.length === 0) {
      return undefined;
    }
    return {
      id: lists[0].Id,
      defaultViewUrl: lists[0].DefaultViewUrl
    };
  }

  private async _ensureReviewList(): Promise<string> {
    const existing = await this._reviewList();
    if (existing) {
      return existing.id;
    }
    const created = await this._sp.web.lists.add(
      reviewListTitle,
      `Requests from people who flagged a page as looking out of date. ${productName} does not send email.`,
      100,
      false
    );
    return created.Id;
  }

  private async _listHasFields(listId: string | undefined, specs: IFieldSpec[]): Promise<boolean> {
    if (!listId) {
      return false;
    }
    const check = await this._inspectFields(listId, specs);
    return check.ready;
  }

  private async _inspectFields(listId: string, specs: IFieldSpec[]): Promise<{ ready: boolean; problem?: string }> {
    const names: string[] = [];
    for (let index = 0; index < specs.length; index++) {
      names.push(specs[index].name);
    }
    const fields = await this._fieldsByName(listId, names);
    const problems: string[] = [];
    let missing = false;
    for (let index = 0; index < specs.length; index++) {
      const spec = specs[index];
      const field = this._findField(fields, spec.name);
      if (!field) {
        missing = true;
        continue;
      }
      if (field.TypeAsString !== spec.type) {
        problems.push(`${spec.name} is a ${field.TypeAsString} column, not ${spec.type}.`);
      }
    }
    if (problems.length > 0) {
      return {
        ready: false,
        problem: `${productName} found a column it can't use. ${problems.join(" ")} A site owner needs to rename or remove it before setup can finish.`
      };
    }
    return { ready: !missing };
  }

  private async _ensureFields(listId: string, specs: IFieldSpec[]): Promise<void> {
    const check = await this._inspectFields(listId, specs);
    if (check.problem) {
      throw new PageTrustError(check.problem);
    }
    if (check.ready) {
      return;
    }
    const names: string[] = [];
    for (let index = 0; index < specs.length; index++) {
      names.push(specs[index].name);
    }
    const fields = await this._fieldsByName(listId, names);
    for (let index = 0; index < specs.length; index++) {
      const spec = specs[index];
      if (!this._findField(fields, spec.name)) {
        await this._createField(listId, spec.schemaXml);
      }
    }
  }

  private async _createField(listId: string, schemaXml: string): Promise<void> {
    const options = (AddFieldOptions.AddFieldInternalNameHint |
      AddFieldOptions.AddToAllContentTypes |
      AddFieldOptions.AddFieldToDefaultView) as AddFieldOptions;
    await this._sp.web.lists.getById(listId).fields.createFieldAsXml({
      SchemaXml: schemaXml,
      Options: options
    });
  }

  private async _fieldsByName(listId: string, names: string[]): Promise<IFieldLite[]> {
    const clauses: string[] = [];
    for (let index = 0; index < names.length; index++) {
      clauses.push(`InternalName eq '${names[index]}'`);
    }
    return this._sp.web.lists.getById(listId).fields
      .select("InternalName", "TypeAsString")
      .filter(clauses.join(" or "))();
  }

  private _findField(fields: IFieldLite[], name: string): IFieldLite | undefined {
    for (let index = 0; index < fields.length; index++) {
      if (fields[index].InternalName === name) {
        return fields[index];
      }
    }
    return undefined;
  }

  private async _addFieldsToDefaultView(listId: string, names: string[]): Promise<string | undefined> {
    try {
      const view = this._sp.web.lists.getById(listId).defaultView;
      const current = await view.fields();
      const items = current.Items || [];
      for (let index = 0; index < names.length; index++) {
        if (items.indexOf(names[index]) < 0) {
          await view.fields.add(names[index]);
        }
      }
      return undefined;
    } catch (error) {
      return error instanceof Error ? error.name : "view";
    }
  }

  private async _resolveUserId(person: IPersonOption): Promise<number> {
    if (person.id && person.id > 0) {
      return person.id;
    }
    if (!person.loginName) {
      throw new PageTrustError("Choose a person before saving the page owner.");
    }
    const ensured = await this._sp.web.ensureUser(person.loginName);
    if (!ensured.Id) {
      throw new PageTrustError("That person couldn't be added to this site.");
    }
    return ensured.Id;
  }

  private _writeOwnerField(pageListId: string, pageItemId: number, fieldName: string, fieldValue: string): Promise<readonly { HasException?: boolean; ErrorMessage?: string; FieldName?: string }[]> {
    return this._sp.web.lists.getById(pageListId).items.getById(pageItemId).validateUpdateListItem([
      { FieldName: fieldName, FieldValue: fieldValue }
    ]);
  }

  private _toPerson(value: ILookupUser | undefined): IPersonIdentity | undefined {
    if (!value || !value.Title) {
      return undefined;
    }
    return {
      id: value.Id,
      displayName: value.Title,
      email: value.EMail
    };
  }

  private _pageUrl(webAbsoluteUrl: string, fileRef: string | undefined): string | undefined {
    if (!fileRef) {
      return undefined;
    }
    if (fileRef.indexOf("https://") === 0 || fileRef.indexOf("http://") === 0) {
      return fileRef;
    }
    let origin: string;
    try {
      origin = new URL(webAbsoluteUrl).origin;
    } catch (error) {
      if (!(error instanceof Error)) {
        throw error;
      }
      return undefined;
    }
    return origin + (fileRef.charAt(0) === "/" ? fileRef : `/${fileRef}`);
  }

  private _truncate(value: string, max: number): string {
    return value.length <= max ? value : value.substring(0, max);
  }
}

export function createPageTrustService(context: WebPartContext): PageTrustService {
  return new PageTrustService(spfi().using(SPFx(context)));
}
