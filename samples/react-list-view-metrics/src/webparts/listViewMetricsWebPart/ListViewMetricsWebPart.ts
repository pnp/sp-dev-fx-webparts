// React & libs (external)
import * as React from "react";
import * as ReactDom from "react-dom";
import * as _ from "lodash";

// SPFx (platform)
import { Version } from "@microsoft/sp-core-library";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import { IReadonlyTheme } from "@microsoft/sp-component-base";
import { type IPropertyPaneConfiguration } from "@microsoft/sp-property-pane";

// Local (components/services/utils)
import ListViewMetrics from "./components/ListViewMetrics";
import { IListViewMetricsProps } from "./components/IListViewMetricsProps";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { SharePointService } from "./services/SharePointService";
import { Utils } from "./utils/Utils";
import { PropertyPaneConfigurationHelper } from "./propertyPane/PropertyPaneConfiguration";
import { IListViewMetricsWebPartProps } from "./IListViewMetricsWebPartProps";

// Strings (localization)
import * as strings from "ListViewMetricsWebPartStrings";

type SelectExpand = string | string[] | undefined;

const isAllFields = (v: SelectExpand) =>
  typeof v === "string" && v.trim() === "*";

const toArray = (v: SelectExpand): string[] =>
  v
    ? Array.isArray(v)
      ? v
      : v.split(",").map(s => s.trim()).filter(Boolean)
    : [];

// For deriving columns when not using a list view
const normalizeSelectedFieldNames = (select: SelectExpand): string[] => {
  if (!select || isAllFields(select)) return [];
  const arr = toArray(select);
  // Collapse lookups like "Author/Title" -> "Author"
  return arr.map(s => s.split("/")[0]);
};

export default class ListViewMetricsWebPart extends BaseClientSideWebPart<IListViewMetricsWebPartProps> {
  private _sp!: SharePointService;

  private _spListFields: any[] | undefined;
  private _spListViewFields: any[] | undefined;
  private _spViewItems: any[] | undefined;

  private _curUserName!: string;
  private _curUserEmail!: string;
  private _curUserLoginName!: string;

  private _isLoading = false;
  private _loadingMessage = "";
  private _error = "";

  public render(): void {
    const element: React.ReactElement<IListViewMetricsProps> = React.createElement(ListViewMetrics, {
      title: this.properties.title,
      displayMode: this.displayMode,
      metricsCollection: this.properties.metricsCollection,
      viewItems: this._spViewItems,
      listViewFields: this._spListViewFields,
      designConfigurations: {
        viewDesign: this.properties.viewDesign,
        cardBoxShadow: this.properties.cardBoxShadow,
        cardFlexBoxValue: this.properties.cardFlexBoxValue,
        cardBoxRadius: this.properties.cardBoxRadius,
        cardDefaultBackgroundColor: this.properties.cardDefaultBackgroundColor,
        containerWidth: this.properties.containerWidth,
        iconFontSize: this.properties.iconFontSize,
        iconFontColor: this.properties.iconFontColor,
        headerFontSize: this.properties.headerFontSize,
        headerFontWeight: this.properties.headerFontWeight,
        headerFontColor: this.properties.headerFontColor,
        bodyFontSize: this.properties.bodyFontSize,
        bodyFontWeight: this.properties.bodyFontWeight,
        bodyFontColor: this.properties.bodyFontColor,
        targetFontSize: this.properties.targetFontSize,
        targetFontWeight: this.properties.targetFontWeight,
        targetEffectiveFontColor: this.properties.targetEffectiveFontColor,
        targetInEffectiveFontColor: this.properties.targetInEffectiveFontColor,
        showNumberAnimation: this.properties.showNumberAnimation,
        animationTimeLength: this.properties.animationTimeLength,
        cardMarginTop: this.properties.cardMarginTop,
        cardMarginBottom: this.properties.cardMarginBottom,
      },
      updateProperty: (value: string) => {
        this.properties.title = value;
        this.render();
      },
      isLoading: this._isLoading,
      loadingMessage: this._loadingMessage,
      error: this._error,
    });

    const wrappedElement = React.createElement(ErrorBoundary, { children: element });
    ReactDom.render(wrappedElement, this.domElement);
  }

  protected async onInit(): Promise<void> {
    this._sp = new SharePointService(this.context);

    // Cache current user context for placeholder replacement in filters
    this._curUserName = this.context.pageContext.user.displayName;
    this._curUserEmail = this.context.pageContext.user.email;
    this._curUserLoginName = this.context.pageContext.user.loginName;

    await this.onLoadInformation(true);
    return Promise.resolve();
  }

  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (!currentTheme) return;
    const { semanticColors } = currentTheme;
    if (!semanticColors) return;

    this.domElement.style.setProperty("--bodyText", semanticColors.bodyText || null);
    this.domElement.style.setProperty("--link", semanticColors.link || null);
    this.domElement.style.setProperty("--linkHovered", semanticColors.linkHovered || null);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse("1.0");
  }

  public async onLoadInformation(isOnInit: boolean): Promise<void> {
    if (!(this.properties.spSites && this.properties.spListId)) return;

    try {
      this._isLoading = true;
      // Localized loading messages
      this._loadingMessage = isOnInit ? strings.LoadingListFields : strings.LoadingData;
      this._error = "";
      this.render();

      // Load list fields only once (or when list changes)
      if (isOnInit) {
        this._spListFields = await this._sp.getListFields(
          this.properties.spSites[0].url as string,
          this.properties.spListId
        );
      }

      // Build safe query params for the service
      const queryParams = {
        // Keep '*' as signal for "all fields" (service will skip .select())
        select: (this.properties.customFilterSelectParams?.trim() || "*") as SelectExpand,
        expand: this.properties.customFilterExpandParams as SelectExpand,
        filter:
          this.properties.customFilterQueryFilterParams &&
          Utils.replaceQueryPlaceholders(
            this.properties.customFilterQueryFilterParams,
            this._curUserName,
            this._curUserLoginName,
            this._curUserEmail
          ),
      };

      const viewGuid =
        this.properties.spViewType === "listView" && this.properties.spViewId
          ? this.properties.spViewId
          : undefined;

      if (this.properties.spViewType === "listView") {
        // Use the list view (CAML path); service returns FieldValuesAsText
        const items = await this._sp.getSharePointItems(
          this.properties.spSites[0].url as string,
          this.properties.spListId,
          viewGuid,
          queryParams
        );

        // Map FieldValuesAsText keys (decode _xNNNN_ → unicode)
        this._spViewItems = (items ?? []).map(item => {
          if (_.isObject(item) && item.FieldValuesAsText) {
            const decoded = _.mapKeys(item.FieldValuesAsText, (_v, k) =>
              k.replace(/_x([0-9A-Fa-f]{4})_/g, (_m, hex) =>
                String.fromCharCode(parseInt(hex, 16))
              )
            );
            return decoded;
          }
          return item;
        });

        // Respect the view's field order/selection
        const viewFields = await this._sp.getViewFields(
          this.properties.spSites[0].url as string,
          this.properties.spListId,
          this.properties.spViewId as string
        );

        if (viewFields) {
          const normalized = viewFields.map(col => (col === "LinkTitle" ? "Title" : col));
          this._spListViewFields = _
            .filter(this._spListFields, f => _.includes(normalized, f.InternalName))
            .sort((a, b) => a.Title.localeCompare(b.Title));
        }
      } else {
        // REST path (always getAll); service applies select/expand/filter if provided
        this._spViewItems = await this._sp.getSharePointItems(
          this.properties.spSites[0].url as string,
          this.properties.spListId,
          viewGuid,
          queryParams
        );

        // Derive columns: prefer first item; otherwise fall back to select (when not '*')
        const derivedFromFirst =
          this._spViewItems && this._spViewItems.length > 0 && _.isObject(this._spViewItems[0])
            ? Object.keys(this._spViewItems[0])
            : normalizeSelectedFieldNames(queryParams.select);

        this._spListViewFields =
          derivedFromFirst.length > 0
            ? _
                .filter(this._spListFields, f => _.includes(derivedFromFirst, f.InternalName))
                .sort((a, b) => a.Title.localeCompare(b.Title))
            : this._spListFields;
      }
    } catch (error) {
      // Prefix is localized; we append the actual error for context
      this._error = `${strings.Error_LoadDataPrefix} ${(error as Error).message || error}`;
    } finally {
      this._isLoading = false;
      this._loadingMessage = "";
      this.render();
    }
  }

  protected async onPropertyPaneFieldChanged(
    propertyPath: string,
    oldValue: any,
    newValue: any
  ): Promise<void> {
    if (propertyPath === "spListId" && oldValue !== newValue) {
      // List changed → refresh fields and reset state
      if (this.properties.spSites && this.properties.spListId) {
        this._spListFields = await this._sp.getListFields(
          this.properties.spSites[0].url as string,
          this.properties.spListId
        );
      }
      this.properties.metricsCollection = [];
      this.properties.spViewId = undefined;
      this._spViewItems = [];
      this._spListViewFields = [];
      this.context.propertyPane.refresh();
      this.render();
    }

    if (
      (propertyPath === "spViewId" ||
        propertyPath === "customFilterSelectParams" ||
        propertyPath === "customFilterExpandParams" ||
        propertyPath === "customFilterQueryFilterParams") &&
      oldValue !== newValue
    ) {
      // Query/view changed → reload data
      await this.onLoadInformation(false);
      this.properties.metricsCollection = [];
      this.context.propertyPane.refresh();
      this.render();
    }
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return PropertyPaneConfigurationHelper.getConfiguration(
      this.properties,
      this._spListViewFields,
      this.onPropertyPaneFieldChanged.bind(this),
      this.context
    );
  }
}
