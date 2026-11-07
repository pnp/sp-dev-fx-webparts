import * as React from "react";
import * as ReactDom from "react-dom";
import { DisplayMode, Version } from "@microsoft/sp-core-library";
import { ThemeProvider, type IReadonlyTheme } from "@microsoft/sp-component-base";
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField
} from "@microsoft/sp-property-pane";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import { webLightTheme, type Theme } from "@fluentui/react-components";

import * as strings from "PageTrustStripWebPartStrings";
import { PageTrustStrip } from "./components/PageTrustStrip";
import { PageTrustStripErrorBoundary } from "./components/PageTrustStripErrorBoundary";
import type { IPageTrustStripProps } from "./components/IPageTrustStripProps";
import {
  canUserConfirm,
  formatDisplayDate,
  getTrustStatus,
  normalizeReviewPeriodDays,
  todayIso,
  type IPersonIdentity
} from "./logic/trustStatus";
import { PropertyPanePageOwner } from "./propertyPane/PropertyPanePageOwner";
import { PropertyPaneVisitorFlag } from "./propertyPane/PropertyPaneVisitorFlag";
import { pageTrustFailureLine } from "./logic/visitorFlag";
import {
  effectivePageOwner,
  ownerClearedConfirmation,
  ownerColumnNeedsSync,
  ownerColumnSyncClear,
  ownerColumnSyncPending,
  ownerSavedConfirmation,
  type IStoredPageOwner
} from "./logic/pageOwner";
import { productName } from "./logic/productName";
import { isSchemaLostError } from "./logic/schemaCache";
import {
  createPageTrustService,
  type IPersonOption,
  type IPageTrustSnapshot,
  type PageTrustService
} from "./services/PageTrustService";
import { readPageLocation } from "./pageLocation";
import {
  duplicateNoteForInstance,
  registerStripInstance,
  stripRegistryKey,
  subscribeStripRegistry,
  unregisterStripInstance
} from "./logic/duplicateStrip";
import { toFluentTheme } from "./theme";
import { PAGE_TRUST_LOAD_TIMEOUT_MESSAGE, PAGE_TRUST_LOAD_TIMEOUT_MS, withTimeout } from "./withTimeout";

export interface IPageTrustStripWebPartProps {
  reviewPeriodDays: string | number;
  /** Persisted with the page. The Site Pages column is updated when the file is not locked. */
  ownerId?: number;
  ownerLoginName?: string;
  ownerEmail?: string;
  ownerDisplayName?: string;
  /** "pending" writes the column. "clear" empties it. Empty means the column matches. */
  ownerColumnSync?: string;
}

interface ILegacyPageContext {
  userId?: number;
}

export default class PageTrustStripWebPart extends BaseClientSideWebPart<IPageTrustStripWebPartProps> {
  private _theme: Theme = webLightTheme;
  private _loading: boolean = true;
  private _loadError: string | undefined = undefined;
  private _snapshot: IPageTrustSnapshot | undefined = undefined;
  private _service: PageTrustService | undefined = undefined;
  private _loadGeneration: number = 0;
  private _recovery: number = 0;
  private _disposed: boolean = false;
  private _openRequestCount: number | undefined = undefined;
  private _openRequestsUrl: string | undefined = undefined;
  private _stripIsExtra: boolean = false;
  private _registeredPageKey: string | undefined = undefined;
  private _unsubscribeRegistry: (() => void) | undefined = undefined;
  private _visitorFlagError: string | undefined = undefined;
  private _visitorFlagSuccess: string | undefined = undefined;
  private _visitorFlagOverride: boolean | undefined = undefined;
  private _ownerPaneMessage: string | undefined = undefined;
  private _ownerPaneError: string | undefined = undefined;

  private readonly _searchPeople = (query: string): Promise<IPersonOption[]> => {
    if (!this._service) {
      return Promise.reject(new Error(`${productName} is not ready.`));
    }
    return this._service.searchPeople(query);
  };

  private readonly _selectOwner = (person: IPersonOption): Promise<void> => {
    this._applyStoredOwner({
      ownerId: person.id && person.id > 0 ? person.id : 0,
      ownerLoginName: person.loginName,
      ownerEmail: person.email || "",
      ownerDisplayName: person.displayName,
      ownerColumnSync: ownerColumnSyncPending
    });
    this._ownerPaneError = undefined;
    this._ownerPaneMessage = ownerSavedConfirmation(person.displayName, false);
    this.render();
    this._refreshPropertyPane();
    return this._syncOwnerColumn(false);
  };

  private readonly _clearOwner = (): Promise<void> => {
    this._applyStoredOwner({
      ownerId: 0,
      ownerLoginName: "",
      ownerEmail: "",
      ownerDisplayName: "",
      ownerColumnSync: ownerColumnSyncClear
    });
    this._ownerPaneError = undefined;
    this._ownerPaneMessage = ownerClearedConfirmation(false);
    this.render();
    this._refreshPropertyPane();
    return this._syncOwnerColumn(false);
  };

  private readonly _allowVisitors = (): Promise<void> => {
    this._visitorFlagError = undefined;
    this._visitorFlagSuccess = undefined;
    if (!this._service) {
      const error = new Error(`${productName} is not ready.`);
      console.error(pageTrustFailureLine("let visitors flag pages", error));
      this._visitorFlagError = error.message;
      this._refreshPropertyPane();
      return Promise.reject(error);
    }
    return this._service.letVisitorsFlag().then(() => {
      this._visitorFlagOverride = true;
      this._visitorFlagSuccess = "Visitors can now flag pages.";
      return this._load(true);
    }).catch((error: unknown) => {
      this._visitorFlagSuccess = undefined;
      this._visitorFlagError = error instanceof Error && error.message
        ? error.message
        : "Visitors couldn't be allowed to flag pages.";
      this._refreshPropertyPane();
      return Promise.reject(error instanceof Error ? error : new Error(this._visitorFlagError));
    });
  };

  private readonly _stopVisitors = (): Promise<void> => {
    this._visitorFlagError = undefined;
    this._visitorFlagSuccess = undefined;
    if (!this._service) {
      const error = new Error(`${productName} is not ready.`);
      console.error(pageTrustFailureLine("stop visitor flagging", error));
      this._visitorFlagError = error.message;
      this._refreshPropertyPane();
      return Promise.reject(error);
    }
    return this._service.stopVisitorsFlag().then(() => {
      this._visitorFlagOverride = false;
      this._visitorFlagSuccess = "Visitors can no longer flag pages.";
      return this._load(true);
    }).catch((error: unknown) => {
      this._visitorFlagSuccess = undefined;
      this._visitorFlagError = error instanceof Error && error.message
        ? error.message
        : "Visitor flagging couldn't be turned off.";
      this._refreshPropertyPane();
      return Promise.reject(error instanceof Error ? error : new Error(this._visitorFlagError));
    });
  };

  public render(): void {
    console.info("[PageTrustStrip] render.", {
      loading: this._loading,
      hasError: Boolean(this._loadError)
    });
    if (this._disposed) {
      return;
    }
    this._stripIsExtra = this._trackStripInstance();
    let root: HTMLElement;
    try {
      root = this.domElement;
    } catch (error) {
      console.error("[PageTrustStrip] Render failed.", error);
      return;
    }
    if (!root) {
      console.error("[PageTrustStrip] Render failed.", new Error("The web part has no DOM element."));
      return;
    }
    try {
      const element: React.ReactElement = React.createElement(
        PageTrustStripErrorBoundary,
        {
          recovery: this._recovery,
          onRetry: this._retryAfterRenderError
        },
        React.createElement(PageTrustStrip, this._buildProps())
      );
      ReactDom.render(element, root);
    } catch (error) {
      console.error("[PageTrustStrip] Render failed.", error);
      this._renderFallback(root, error);
    }
  }

  protected onInit(): Promise<void> {
    console.info("[PageTrustStrip] onInit started.");
    // The host does not call render() until this promise resolves. Keep the
    // SharePoint calls off this path so the spinner can paint immediately.
    this._applyHostTheme();
    this._unsubscribeRegistry = subscribeStripRegistry(() => {
      if (!this._disposed) {
        this.render();
      }
    });
    try {
      this._service = createPageTrustService(this.context);
    } catch (error) {
      console.error("[PageTrustStrip] Couldn't create the SharePoint service.", error);
      this._loading = false;
      this._loadError = `${productName} couldn't connect to this site.`;
      console.info("[PageTrustStrip] load failed.", this._loadError);
      return Promise.resolve();
    }
    this._load(false).catch((error: unknown) => {
      console.error("[PageTrustStrip] Load failed.", error);
    });
    return Promise.resolve();
  }

  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (!currentTheme) {
      return;
    }
    try {
      this._theme = toFluentTheme(currentTheme);
    } catch (error) {
      console.error("[PageTrustStrip] Couldn't apply the page theme.", error);
      return;
    }
    // The host calls this during initialize, before onInit and the first render,
    // and calls render() itself after a later theme change. Rendering here
    // re-enters that setup and can leave the web part blank.
    if (this.renderedOnce) {
      this._refreshPropertyPane();
    }
  }

  protected onDispose(): void {
    this._disposed = true;
    this._loadGeneration += 1;
    if (this._unsubscribeRegistry) {
      this._unsubscribeRegistry();
      this._unsubscribeRegistry = undefined;
    }
    if (this._registeredPageKey) {
      unregisterStripInstance(this._registeredPageKey, this.context.instanceId);
      this._registeredPageKey = undefined;
    }
    try {
      ReactDom.unmountComponentAtNode(this.domElement);
    } catch (error) {
      console.error("[PageTrustStrip] Couldn't unmount the strip.", error);
    }
  }

  protected get dataVersion(): Version {
    return Version.parse("1.0");
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    const snapshot = this._snapshot;
    const columnsReady = !!(snapshot && snapshot.columnsReady);
    const placedOnPage = !!(snapshot && snapshot.placedOnPage);
    const disabled = !placedOnPage || !columnsReady;
    let disabledReason = "Choosing a person saves them as this page's owner.";
    if (!placedOnPage) {
      disabledReason = "Add this web part to a site page before choosing an owner.";
    } else if (!columnsReady) {
      disabledReason = snapshot && snapshot.columnProblem
        ? snapshot.columnProblem
        : `Set up ${productName} on the page before choosing an owner.`;
    }

    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.SettingsGroupName,
              groupFields: [
                PropertyPaneTextField("reviewPeriodDays", {
                  label: strings.ReviewPeriodLabel,
                  description: strings.ReviewPeriodDescription,
                  deferredValidationTime: 300,
                  onGetErrorMessage: (value: string): string => {
                    const numeric = Number(value);
                    if (!value || !value.trim() || !Number.isFinite(numeric) || Math.floor(numeric) !== numeric || numeric < 1 || numeric > 3650) {
                      return strings.ReviewPeriodError;
                    }
                    return "";
                  }
                }),
                PropertyPanePageOwner({
                  instanceId: this.context.instanceId,
                  theme: this._theme,
                  disabled,
                  disabledReason,
                  selected: this._selectedOwner(),
                  feedback: this._ownerPaneMessage,
                  feedbackError: this._ownerPaneError,
                  onSearch: this._searchPeople,
                  onSelect: this._selectOwner,
                  onClear: this._clearOwner
                })
              ]
            },
            {
              groupName: strings.VisitorsGroupName,
              groupFields: [
                PropertyPaneVisitorFlag({
                  instanceId: this.context.instanceId,
                  theme: this._theme,
                  canManage: !!(snapshot && snapshot.canManageWeb),
                  listReady: !!(snapshot && snapshot.listReady),
                  placedOnPage,
                  visitorsCanFlag: this._displayedVisitorsCanFlag(),
                  feedbackError: this._visitorFlagError,
                  feedbackSuccess: this._visitorFlagSuccess,
                  onAllow: this._allowVisitors,
                  onStop: this._stopVisitors
                })
              ]
            }
          ]
        }
      ]
    };
  }

  private _buildProps(): IPageTrustStripProps {
    const snapshot = this._snapshot;
    const reviewPeriodDays = normalizeReviewPeriodDays(this.properties.reviewPeriodDays);
    const placedOnPage = !!(snapshot && snapshot.placedOnPage);
    const columnsReady = !!(snapshot && snapshot.columnsReady);
    const effective = effectivePageOwner(this._storedOwner(), snapshot && snapshot.pageOwner);
    const ownerIsAuthorFallback = columnsReady && effective.isAuthorFallback;
    const owner = effective.person || (snapshot && snapshot.author);
    const trust = getTrustStatus(snapshot && snapshot.lastConfirmed, reviewPeriodDays, todayIso());
    const currentUser = this._currentUser();

    return {
      instanceId: this.context.instanceId,
      theme: this._theme,
      loading: this._loading,
      placedOnPage,
      loadError: this._loadError,
      columnsReady,
      listReady: !!(snapshot && snapshot.listReady),
      columnProblem: snapshot && snapshot.columnProblem,
      canManageWeb: !!(snapshot && snapshot.canManageWeb),
      canConfirm: canUserConfirm({
        columnsReady,
        canEditPage: !!(snapshot && snapshot.canEditPage),
        currentUser,
        pageOwner: effective.person,
        author: snapshot && snapshot.author
      }),
      ownerName: owner && owner.displayName,
      ownerIsAuthorFallback,
      lastConfirmedText: formatDisplayDate(snapshot && snapshot.lastConfirmed),
      reviewDueText: formatDisplayDate(trust.reviewDue),
      status: columnsReady ? trust.status : "unavailable",
      reviewPeriodDays,
      canSeeOpenRequests: this._canSeeOpenRequests(snapshot),
      openRequestCount: this._openRequestCount,
      openRequestsUrl: this._openRequestsUrl,
      duplicateNote: duplicateNoteForInstance(this.displayMode === DisplayMode.Edit, this._stripIsExtra),
      onRetry: (): void => {
        this._load(true).catch((error: unknown) => {
          console.error("[PageTrustStrip] Load failed.", error);
        });
      },
      onConfirm: (): Promise<void> => this._confirm(),
      onSetup: (): Promise<void> => this._setup(),
      onSubmitFlag: (note: string): Promise<void> => this._flag(note)
    };
  }

  private _currentUser(): IPersonIdentity {
    let id: number | undefined;
    try {
      const legacy = this.context.pageContext.legacyPageContext as ILegacyPageContext | undefined;
      if (legacy && typeof legacy.userId === "number" && Number.isFinite(legacy.userId) && legacy.userId > 0) {
        id = legacy.userId;
      }
    } catch (error) {
      console.error("[PageTrustStrip] Couldn't read the current user id.", error);
    }

    let displayName: string | undefined;
    let email: string | undefined;
    let loginName: string | undefined;
    try {
      const user = this.context.pageContext.user;
      if (user) {
        displayName = user.displayName || undefined;
        email = user.email || undefined;
        loginName = user.loginName || undefined;
      }
    } catch (error) {
      console.error("[PageTrustStrip] Couldn't read the current user.", error);
    }

    return { id, displayName, email, loginName };
  }

  private _selectedOwner(): IPersonOption | undefined {
    const effective = effectivePageOwner(this._storedOwner(), this._snapshot && this._snapshot.pageOwner);
    const owner = effective.person;
    if (!owner || !owner.displayName || effective.isAuthorFallback) {
      return undefined;
    }
    return {
      id: owner.id,
      loginName: owner.loginName || owner.email || "",
      displayName: owner.displayName,
      email: owner.email
    };
  }

  private _storedOwner(): IStoredPageOwner {
    return {
      ownerId: this.properties.ownerId,
      ownerLoginName: this.properties.ownerLoginName,
      ownerEmail: this.properties.ownerEmail,
      ownerDisplayName: this.properties.ownerDisplayName,
      ownerColumnSync: this.properties.ownerColumnSync
    };
  }

  private _applyStoredOwner(next: IStoredPageOwner): void {
    const previousLogin = this.properties.ownerLoginName;
    this.properties.ownerId = next.ownerId && next.ownerId > 0 ? next.ownerId : 0;
    this.properties.ownerLoginName = next.ownerLoginName || "";
    this.properties.ownerEmail = next.ownerEmail || "";
    this.properties.ownerDisplayName = next.ownerDisplayName || "";
    this.properties.ownerColumnSync = next.ownerColumnSync || "";
    this.onPropertyPaneFieldChanged("ownerLoginName", previousLogin, this.properties.ownerLoginName);
  }

  private _displayedVisitorsCanFlag(): boolean {
    if (this._visitorFlagOverride !== undefined) {
      return this._visitorFlagOverride;
    }
    return !!(this._snapshot && this._snapshot.visitorsCanFlag);
  }

  private _syncOwnerColumn(quiet: boolean): Promise<void> {
    const columnOwner = this._snapshot && this._snapshot.pageOwner;
    const action = ownerColumnNeedsSync(this._storedOwner(), columnOwner);
    if (!action) {
      return Promise.resolve();
    }
    if (action === "mark-synced") {
      this._markOwnerColumnSynced();
      return Promise.resolve();
    }
    if (quiet && this.displayMode !== DisplayMode.Read) {
      return Promise.resolve();
    }
    const listId = this._snapshot && this._snapshot.pageListId;
    const itemId = this._snapshot && this._snapshot.pageItemId;
    if (!this._service || !listId || itemId === undefined) {
      return Promise.resolve();
    }
    const write = action === "clear"
      ? this._service.clearPageOwner(listId, itemId)
      : this._service.setPageOwner(listId, itemId, {
        id: this.properties.ownerId,
        loginName: this.properties.ownerLoginName || this.properties.ownerEmail || "",
        displayName: this.properties.ownerDisplayName || "",
        email: this.properties.ownerEmail
      });
    return write.then((result) => {
      if (result === "locked") {
        console.info("[PageTrustStrip] page owner column sync deferred. HTTP 423. The page is locked for shared use.");
        if (!quiet) {
          this._ownerPaneError = undefined;
          this._ownerPaneMessage = action === "clear"
            ? ownerClearedConfirmation(true)
            : ownerSavedConfirmation(this.properties.ownerDisplayName || "The owner", true);
          this._refreshPropertyPane();
        }
        return;
      }
      this._markOwnerColumnSynced();
      if (!quiet) {
        this._ownerPaneError = undefined;
        this._ownerPaneMessage = action === "clear"
          ? ownerClearedConfirmation(false)
          : ownerSavedConfirmation(this.properties.ownerDisplayName || "The owner", false);
        this._refreshPropertyPane();
      }
    }).catch((error: unknown) => {
      if (!quiet) {
        this._ownerPaneError = error instanceof Error && error.message
          ? error.message
          : "The page owner couldn't be saved to the Page Owner column.";
        this._ownerPaneMessage = undefined;
        this._refreshPropertyPane();
      }
    });
  }

  private _markOwnerColumnSynced(): void {
    const previous = this.properties.ownerColumnSync;
    if (!previous) {
      return;
    }
    this.properties.ownerColumnSync = "";
    this.onPropertyPaneFieldChanged("ownerColumnSync", previous, "");
  }

  private readonly _retryAfterRenderError = (): void => {
    this._recovery += 1;
    this._load(true).catch((error: unknown) => {
      console.error("[PageTrustStrip] Load failed.", error);
    });
  };

  private _load(renderLoading: boolean): Promise<void> {
    const generation = ++this._loadGeneration;
    this._loading = true;
    this._loadError = undefined;
    if (renderLoading) {
      this.render();
    }
    let reloadSchema = false;

    return withTimeout(this._loadSnapshot(), PAGE_TRUST_LOAD_TIMEOUT_MS, PAGE_TRUST_LOAD_TIMEOUT_MESSAGE).then((snapshot) => {
      if (!this._isCurrentLoad(generation)) {
        return false;
      }
      this._snapshot = snapshot;
      this._loadError = undefined;
      return this._refreshOpenRequests(generation);
    }).then((schemaLost: boolean | undefined) => {
      if (!this._isCurrentLoad(generation)) {
        return;
      }
      if (schemaLost) {
        this._snapshot = undefined;
        this._openRequestCount = undefined;
        this._openRequestsUrl = undefined;
        reloadSchema = true;
      }
    }).catch((error: unknown) => {
      if (!this._isCurrentLoad(generation)) {
        return;
      }
      this._openRequestCount = undefined;
      this._openRequestsUrl = undefined;
      this._loadError = error instanceof Error && error.message
        ? error.message
        : `${productName} couldn't load this page.`;
      console.error("[PageTrustStrip] Load failed.", error);
    }).then(() => {
      if (!this._isCurrentLoad(generation)) {
        return;
      }
      if (reloadSchema) {
        this._load(false).catch((error: unknown) => {
          console.error("[PageTrustStrip] Load failed.", error);
        });
        return;
      }
      this._loading = false;
      if (this._loadError) {
        console.info("[PageTrustStrip] load failed.", this._loadError);
      } else {
        console.info("[PageTrustStrip] load finished.", {
          placedOnPage: Boolean(this._snapshot && this._snapshot.placedOnPage)
        });
      }
      this.render();
      this._refreshPropertyPane();
      if (this._visitorFlagOverride !== undefined && this._snapshot && this._visitorFlagOverride === this._snapshot.visitorsCanFlag) {
        this._visitorFlagOverride = undefined;
      }
      if (!this._loadError) {
        this._syncOwnerColumn(true).catch((error: unknown) => {
          console.error("[PageTrustStrip] page owner column sync failed.", error);
        });
      }
    });
  }

  private _loadSnapshot(): Promise<IPageTrustSnapshot> {
    if (!this._service) {
      return Promise.reject(new Error(`${productName} is not ready.`));
    }
    const location = readPageLocation(
      () => this.context.pageContext.list,
      () => this.context.pageContext.listItem
    );
    if (location.problem) {
      return Promise.reject(new Error(location.problem));
    }
    return this._service.load({
      pageListId: location.pageListId,
      pageItemId: location.pageItemId,
      webAbsoluteUrl: this._webAbsoluteUrl(),
      currentUser: this._currentUser()
    });
  }

  private _isCurrentLoad(generation: number): boolean {
    return !this._disposed && generation === this._loadGeneration;
  }

  private _webAbsoluteUrl(): string {
    try {
      const web = this.context.pageContext.web;
      return web && web.absoluteUrl ? web.absoluteUrl : "";
    } catch (error) {
      console.error("[PageTrustStrip] Couldn't read the site address.", error);
      return "";
    }
  }

  private _applyHostTheme(): void {
    try {
      const provider: ThemeProvider = this.context.serviceScope.consume(ThemeProvider.serviceKey);
      const theme = provider.tryGetTheme();
      if (theme) {
        this._theme = toFluentTheme(theme);
      }
    } catch (error) {
      console.error("[PageTrustStrip] Couldn't read the page theme.", error);
    }
  }

  private _refreshPropertyPane(): void {
    try {
      if (this.context.propertyPane.isPropertyPaneOpen()) {
        this.context.propertyPane.refresh();
      }
    } catch (error) {
      console.error("[PageTrustStrip] Couldn't refresh the property pane.", error);
    }
  }

  private _renderFallback(root: HTMLElement, error: unknown): void {
    const message = error instanceof Error && error.message
      ? error.message
      : "The strip couldn't be displayed.";
    try {
      const section = document.createElement("section");
      section.setAttribute("role", "alert");
      section.setAttribute("aria-label", "Page trust");
      section.style.boxSizing = "border-box";
      section.style.width = "100%";
      section.style.padding = "12px 16px";
      section.style.fontFamily = "Segoe UI, sans-serif";
      section.style.color = "#323130";
      section.style.backgroundColor = "#fde7e9";
      section.style.border = "1px solid #d13438";
      const paragraph = document.createElement("p");
      paragraph.style.margin = "0";
      paragraph.textContent = `${productName} hit a problem and could not show this banner. ${message}`;
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = "Try again";
      button.style.marginTop = "8px";
      button.style.font = "inherit";
      button.style.color = "#a4262c";
      button.style.background = "transparent";
      button.style.border = "none";
      button.style.padding = "0";
      button.style.textDecoration = "underline";
      button.style.cursor = "pointer";
      button.addEventListener("click", this._retryAfterRenderError);
      section.appendChild(paragraph);
      section.appendChild(button);
      while (root.firstChild) {
        root.removeChild(root.firstChild);
      }
      root.appendChild(section);
    } catch (fallbackError) {
      console.error("[PageTrustStrip] Render failed.", fallbackError);
    }
  }

  private async _confirm(): Promise<void> {
    const listId = this._snapshot && this._snapshot.pageListId;
    const itemId = this._snapshot && this._snapshot.pageItemId;
    if (!this._service || !listId || itemId === undefined) {
      throw new Error("This page can't be confirmed from here.");
    }
    await this._service.confirm(listId, itemId, todayIso());
    await this._load(true);
  }

  private async _setup(): Promise<void> {
    const listId = this._snapshot && this._snapshot.pageListId;
    if (!this._service || !listId) {
      throw new Error(`Open a modern site page before setting up ${productName}.`);
    }
    const message = await this._service.setup(listId, this._webAbsoluteUrl());
    console.info("[PageTrustStrip] setup finished.", message);
    await this._load(true);
  }

  private async _flag(note: string): Promise<void> {
    const snapshot = this._snapshot;
    if (!this._service || !snapshot || !snapshot.pageUrl) {
      throw new Error("This page can't be flagged from here.");
    }
    if (!snapshot.listReady) {
      throw new Error(`A site owner needs to finish ${productName} setup before a page can be flagged.`);
    }
    const currentUser = this._currentUser();
    try {
      await this._service.flagPage({
        pageUrl: snapshot.pageUrl,
        pageTitle: snapshot.pageTitle || "Untitled page",
        note,
        flaggedById: currentUser.id,
        flaggedByLogin: currentUser.loginName
      });
    } catch (error) {
      if (isSchemaLostError(error)) {
        await this._load(true);
      }
      throw error;
    }
    try {
      await this._refreshOpenRequests(this._loadGeneration);
      this.render();
    } catch (error) {
      console.error("[PageTrustStrip] Couldn't count open review requests.", error);
    }
  }

  private _canSeeOpenRequests(snapshot: IPageTrustSnapshot | undefined): boolean {
    if (!snapshot || !snapshot.listReady || !snapshot.pageUrl) {
      return false;
    }
    return canUserConfirm({
      columnsReady: snapshot.columnsReady,
      canEditPage: snapshot.canEditPage,
      currentUser: snapshot.currentUser,
      pageOwner: effectivePageOwner(this._storedOwner(), snapshot.pageOwner).person || snapshot.pageOwner,
      author: snapshot.author
    });
  }

  private _refreshOpenRequests(generation: number): Promise<boolean> {
    this._openRequestCount = undefined;
    this._openRequestsUrl = undefined;
    const snapshot = this._snapshot;
    if (!this._service || !snapshot || !this._canSeeOpenRequests(snapshot) || !snapshot.pageUrl) {
      return Promise.resolve(false);
    }
    return this._service.getOpenRequests({
      pageUrl: snapshot.pageUrl,
      webAbsoluteUrl: this._webAbsoluteUrl(),
      pageKeyReady: snapshot.pageKeyReady,
      defaultViewUrl: snapshot.reviewListDefaultViewUrl
    }).then((summary) => {
      if (!this._isCurrentLoad(generation)) {
        return false;
      }
      this._openRequestCount = summary.count;
      this._openRequestsUrl = summary.viewUrl;
      return false;
    }).catch((error: unknown) => {
      if (!this._isCurrentLoad(generation)) {
        return false;
      }
      this._openRequestCount = undefined;
      this._openRequestsUrl = undefined;
      if (isSchemaLostError(error)) {
        console.info("[PageTrustStrip] schema cache cleared.", error.message);
        return true;
      }
      console.error("[PageTrustStrip] Couldn't count open review requests.", error);
      return false;
    });
  }

  private _trackStripInstance(): boolean {
    const location = readPageLocation(
      () => this.context.pageContext.list,
      () => this.context.pageContext.listItem
    );
    const pageKey = stripRegistryKey(location.pageListId, location.pageItemId);
    if (this._registeredPageKey && this._registeredPageKey !== pageKey) {
      unregisterStripInstance(this._registeredPageKey, this.context.instanceId);
    }
    this._registeredPageKey = pageKey;
    return registerStripInstance(pageKey, this.context.instanceId);
  }
}
