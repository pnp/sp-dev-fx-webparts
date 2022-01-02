import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  PropertyPaneTextField,
  PropertyPaneDropdown,
  IPropertyPaneDropdownOption,
  PropertyPaneToggle,
  IPropertyPaneConfiguration,
  PropertyPaneDynamicFieldSet,
  PropertyPaneDynamicField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart, IWebPartPropertiesMetadata } from '@microsoft/sp-webpart-base';
import { PropertyFieldCollectionData, CustomCollectionFieldType } from '@pnp/spfx-property-controls/lib/PropertyFieldCollectionData';
import { IListSearchProps } from './components/IListSearchProps';
import ListSearch from './components/ListSearch';
import * as strings from 'ListSearchWebPartStrings';
import { IMappingFieldData, IListData, IDetailListFieldData, ICompleteModalData, IRedirectData, ICustomOption, SitesLists, SiteList, ListsFields, ListField, SitesFields } from './model/IListConfigProps';
import { IPropertyFieldSite, PropertyFieldSitePicker, } from '@pnp/spfx-property-controls/lib/PropertyFieldSitePicker';
import { PropertyFieldNumber } from '@pnp/spfx-property-controls/lib/PropertyFieldNumber';
import { Placeholder } from "@pnp/spfx-controls-react/lib/Placeholder";
import { DisplayMode } from '@microsoft/sp-core-library';
import { EmptyPropertyPane } from './custompropertyPane/EmptyPropertyPane';
import { ThemeProvider, ThemeChangedEventArgs, IReadonlyTheme, DynamicProperty } from '@microsoft/sp-component-base';
import { PropertyFieldMultiSelect } from '@pnp/spfx-property-controls/lib/PropertyFieldMultiSelect';
import { IDropdownOption } from 'office-ui-fabric-react/lib/components/Dropdown';
import CustomCollectionDataField from './custompropertyPane/CustomCollectionDataField';
import ListService from './services/ListService';
import { IDynamicDataCallables, IDynamicDataPropertyDefinition } from '@microsoft/sp-dynamic-data';
import { IDynamicItem } from './model/IDynamicItem';
import { PropertyPaneWebPartInformation } from '@pnp/spfx-property-controls/lib/PropertyPaneWebPartInformation';
import { SharePointFieldTypes, SharePointType } from './model/ISharePointFieldTypes';
import { IModalType } from './model/IModalType';
import { find, has } from '@microsoft/sp-lodash-subset';



export interface IListSearchWebPartProps {
  ListName: string;
  detailListFieldsCollectionData: Array<IDetailListFieldData>;
  mappingFieldsCollectionData: Array<IMappingFieldData>;
  listsCollectionData: Array<IListData>;
  ShowListName: boolean;
  ShowFileIcon: boolean;
  ListNameTitle: string;
  ShowSiteTitle: boolean;
  SiteNameTitle: string;
  SiteNamePropertyToShow: string;
  sites: IPropertyFieldSite[];
  GeneralFilter: boolean;
  GeneralFilterPlaceHolderText: string;
  IndividualColumnFilter: boolean;
  IndividualFilterPosition: string[];
  ShowClearAllFilters: boolean;
  ClearAllFiltersBtnColor: string;
  ClearAllFiltersBtnText: string;
  SiteNameSearcheable: boolean;
  ShowItemCount: boolean;
  ItemCountText: string;
  ItemLimit: number;
  ShowPagination: boolean;
  ItemsInPage: number;
  UseCache: boolean;
  minutesToCache: number;
  onClickSelectedOption: string;
  clickEnabled: boolean;
  ModalType: IModalType;
  completeModalFields: Array<ICompleteModalData>;
  redirectData: Array<IRedirectData>;
  onRedirectIdQuery: string;
  onClickNumberOfClicksOption: string;
  groupByField: string;
  groupByFieldType: SharePointType;
  groupedByField: boolean;
  CacheType: "session" | "local";
  initialQueryEnabled: boolean;
  initialQueryOption: "simpleText" | "dynamicData";
  dynamicQueryText: DynamicProperty<string>;
  initialQueryText: string;
  title: string;
}

export default class ListSearchWebPart extends BaseClientSideWebPart<IListSearchWebPartProps> implements IDynamicDataCallables {
  private _themeProvider: ThemeProvider;
  private _themeVariant: IReadonlyTheme | undefined;
  private selectedItem: IDynamicItem;
  private sitesLists: SitesLists = {};
  private ListsFields: SitesFields = {};

  constructor(props) {
    super();
    this.saveSiteCollectionLists = this.saveSiteCollectionLists.bind(this);
    this.saveSiteCollectionListsFields = this.saveSiteCollectionListsFields.bind(this);
    this.setNewListFields = this.setNewListFields.bind(this);
    this.handleSourceSiteChange = this.handleSourceSiteChange.bind(this);
    this.updateFieldType = this.updateFieldType.bind(this);
    this.onMappingColumnChanged = this.onMappingColumnChanged.bind(this);
  }

  protected async onInit(): Promise<void> {
    // Consume the new ThemeProvider service
    this._themeProvider = this.context.serviceScope.consume(ThemeProvider.serviceKey);

    // If it exists, get the theme variant
    this._themeVariant = this._themeProvider.tryGetTheme();

    // Register a handler to be notified if the theme variant changes
    this._themeProvider.themeChangedEvent.add(this, this._handleThemeChangedEvent);

    this.context.dynamicDataSourceManager.initializeSource(this);
    this.selectedItem = { webUrl: '', listId: '', itemId: -1 };
    return super.onInit();
  }

  protected get propertiesMetadata(): IWebPartPropertiesMetadata {
    return {
      // Specify the web part properties data type to allow the address
      // information to be serialized by the SharePoint Framework.
      'dynamicQueryText': {
        dynamicPropertyType: 'string'
      }
    };
  }

  public getPropertyDefinitions(): ReadonlyArray<IDynamicDataPropertyDefinition> {
    return [
      {
        id: 'selectedItem',
        title: 'Selected Item'
      }
    ];
  }

  public getPropertyValue(propertyId: string): IDynamicItem {
    switch (propertyId) {
      case 'selectedItem':
        return this.selectedItem;
    }

    throw new Error('Unsupported property id');
  }

  private onSelectedItem = (selectedItem: IDynamicItem): void => {
    this.selectedItem = selectedItem;
    // notify that the value has changed
    this.context.dynamicDataSourceManager.notifyPropertyChanged('selectedItem');
  }

  protected async onPropertyPaneConfigurationStart() {
    await this.loadCollectionData();
  }

  private _handleThemeChangedEvent(args: ThemeChangedEventArgs): void {
    this._themeVariant = args.theme;
    this.render();
  }

  private async loadCollectionData() {
    let sitesListsInfo: Promise<any> = this.loadSitesLists();
    let listsFieldsInfo: Promise<any> = this.loadListsFields();
    await Promise.all([sitesListsInfo, listsFieldsInfo]);
  }

  private async loadSitesLists() {
    let listsDataPromises: Promise<Array<SiteList>>[] = [];
    let sites: string[] = [];
    this.properties.sites.map((item, index, array) => {
      if (array.indexOf(item) == index) {
        let service: ListService = new ListService(item.url, false);
        listsDataPromises.push(service.getSiteListsTitle());
        sites.push(item.url);
      }
    });
    let listData = await Promise.all(listsDataPromises);

    listData.map((lists, index) => {
      this.saveSiteCollectionLists(sites[index], lists);
    });
  }

  private async loadListsFields() {
    if (this.properties.listsCollectionData && this.properties.listsCollectionData.length > 0) {
      let siteStructure = {};
      this.properties.listsCollectionData.map(option => {
        if (!siteStructure[option.SiteCollectionSource]) {
          siteStructure[option.SiteCollectionSource] = [];
        }
        siteStructure[option.SiteCollectionSource].push(option.ListSourceField);
      });

      let listsDataPromises: Promise<any>[] = [];
      let lists: string[] = [];
      let sites: string[] = [];

      Object.keys(siteStructure).map(site => {
        let service: ListService = new ListService(site, false);
        siteStructure[site].map((list: string) => {
          listsDataPromises.push(service.getListFields(list));
          lists.push(list);
          sites.push(site);
        });
      });

      let listData = await Promise.all(listsDataPromises);

      listData.map((fields, index) => {
        this.saveSiteCollectionListsFields(sites[index], lists[index], fields);
      });
    }
  }

  private OrderfieldsCollectionData() {
    if (this.properties.listsCollectionData && this.properties.mappingFieldsCollectionData) {
      this.properties.mappingFieldsCollectionData = this.properties.mappingFieldsCollectionData.map(element => {
        element.Order = this.properties.listsCollectionData.find(source => source.ListSourceField === element.ListSourceField && source.SiteCollectionSource === element.SiteCollectionSource).sortIdx;
        return element;
      });
    }
  }

  public render(): void {
    let renderElement = null;

    let isEditMode: boolean = this.displayMode === DisplayMode.Edit;
    if (!this.isConfig()) {
      const placeholder: React.ReactElement<any> = React.createElement(
        Placeholder,
        {
          iconName: 'Edit',
          iconText: 'Configure List Search webpart properties',
          description: 'You need to complete the configuration of the webpart',
          buttonLabel: 'Configure',
          onConfigure: () => this.context.propertyPane.open(),
          hideButton: !isEditMode,
        }
      );
      renderElement = placeholder;
    }
    else {
      if (this.properties.clickEnabled) {
        this.setSelectedOnClickOption(this.properties.onClickSelectedOption);
      }
      let sercheableFields = this.properties.detailListFieldsCollectionData.filter(fieldData => { if (fieldData.Searcheable) return fieldData.ColumnTitle; });

      if (this.properties.ShowListName && this.properties.detailListFieldsCollectionData.find(field => field.IsListTitle)) {
        this.properties.ListNameTitle = this.properties.detailListFieldsCollectionData.find(field => field.IsListTitle).ColumnTitle;
      }

      if (this.properties.ShowSiteTitle && this.properties.detailListFieldsCollectionData.find(field => field.IsSiteTitle)) {
        this.properties.SiteNameTitle = this.properties.detailListFieldsCollectionData.find(field => field.IsSiteTitle).ColumnTitle;
      }

      let queryText: string = "";
      if (this.properties.initialQueryEnabled) {
        queryText = this.properties.initialQueryOption === "simpleText" ? this.properties.initialQueryText : this.properties.dynamicQueryText.tryGetValue();
      }

      const element: React.ReactElement<IListSearchProps> = React.createElement(
        ListSearch,
        {
          Sites: this.properties.sites,
          detailListFieldsCollectionData: this.properties.detailListFieldsCollectionData,
          mappingFieldsCollectionData: this.properties.mappingFieldsCollectionData.sort((prev, next) => prev.Order - next.Order),
          listsCollectionData: this.properties.listsCollectionData.sort(),
          ShowListName: this.properties.ShowListName,
          ShowFileIcon: this.properties.ShowFileIcon,
          ListNameTitle: this.properties.ListNameTitle,
          ShowSite: this.properties.ShowSiteTitle,
          SiteNameTitle: this.properties.SiteNameTitle,
          SiteNamePropertyToShow: this.properties.SiteNamePropertyToShow,
          Context: this.context,
          GeneralFilter: this.properties.GeneralFilter,
          GeneralFilterPlaceHolderText: this.properties.GeneralFilterPlaceHolderText,
          ShowClearAllFilters: this.properties.ShowClearAllFilters,
          ClearAllFiltersBtnColor: this.properties.ClearAllFiltersBtnColor,
          ClearAllFiltersBtnText: this.properties.ClearAllFiltersBtnText,
          GeneralSearcheableFields: sercheableFields,
          IndividualColumnFilter: this.properties.IndividualColumnFilter,
          IndividualFilterPosition: this.properties.IndividualFilterPosition,
          ShowItemCount: this.properties.ShowItemCount,
          ItemCountText: this.properties.ItemCountText,
          ItemLimit: this.properties.ItemLimit,
          ShowPagination: this.properties.ShowPagination,
          ItemsInPage: this.properties.ItemsInPage,
          themeVariant: this._themeVariant,
          UseCache: this.properties.UseCache,
          minutesToCache: this.properties.minutesToCache,
          clickEnabled: this.properties.clickEnabled,
          ModalType: this.properties.ModalType,
          completeModalFields: this.properties.completeModalFields,
          redirectData: this.properties.redirectData,
          onRedirectIdQuery: this.properties.onRedirectIdQuery,
          onSelectedItem: this.onSelectedItem.bind(this),
          oneClickOption: this.properties.onClickNumberOfClicksOption == "oneClick",
          groupByField: this.properties.groupByField,
          AnyCamlQuery: (this.properties.listsCollectionData.findIndex(listConfig => !this.isEmpty(listConfig.Query) || !this.isEmpty(listConfig.ListView)) > -1),
          groupByFieldType: this.properties.groupByFieldType,
          CacheType: this.properties.CacheType,
          generalFilterText: queryText,
          title: this.properties.title,
          updateTitle: (value: string) => {
            this.properties.title = value;
          },
          displayMode: this.displayMode,
        }
      );
      renderElement = element;
    }


    ReactDom.render(renderElement, this.domElement);
  }

  private isEmpty(str: string) {
    return (!str || 0 === str.length);
  }

  private isConfig(): boolean {
    return this.properties.sites && this.properties.sites.length > 0 && this.properties.mappingFieldsCollectionData && this.properties.mappingFieldsCollectionData.length > 0 &&
      this.properties.listsCollectionData && this.properties.listsCollectionData.length > 0 && this.properties.detailListFieldsCollectionData && this.properties.detailListFieldsCollectionData.length > 0;
  }

  protected get dataVersion(): Version {
    return Version.parse(this.context.manifest.version);
  }

  protected get disableReactivePropertyChanges(): boolean {
    return true;
  }

  protected async onPropertyPaneFieldChanged(propertyPath: string, oldValue: any, newValue: any) {
    super.onPropertyPaneFieldChanged(propertyPath, oldValue, newValue);
    switch (propertyPath) {
      case "listsCollectionData":
        {
          this.properties.completeModalFields = this.properties.completeModalFields && this.properties.completeModalFields.filter(modalField => {
            return newValue.filter((option: IListData) => option.SiteCollectionSource === modalField.SiteCollectionSource && option.ListSourceField === modalField.ListSourceField).length > 0;
          });

          this.properties.redirectData = this.properties.redirectData && this.properties.redirectData.filter(modalField => {
            return newValue.filter((option: IListData) => option.SiteCollectionSource === modalField.SiteCollectionSource && option.ListSourceField === modalField.ListSourceField).length > 0;
          });

          this.properties.mappingFieldsCollectionData = this.properties.mappingFieldsCollectionData && this.properties.mappingFieldsCollectionData.filter(modalField => {
            return newValue.filter((option: IListData) => option.SiteCollectionSource === modalField.SiteCollectionSource && option.ListSourceField === modalField.ListSourceField).length > 0;
          });

          this.OrderfieldsCollectionData();

          break;
        }
      case "ShowListName":
        {
          if (!newValue) {
            this.properties.ListNameTitle = '';
            this.properties.detailListFieldsCollectionData = this.properties.detailListFieldsCollectionData.filter(field => !field.IsListTitle);
          }
          else {
            if (this.properties.detailListFieldsCollectionData == undefined) {
              this.properties.detailListFieldsCollectionData = [];
            }
            if (!this.properties.detailListFieldsCollectionData.some(field => field.IsListTitle)) {
              this.properties.detailListFieldsCollectionData.push(IDetailListFieldData.CreateListColumn(0, 0, true));
            }
          }
          break;
        }
      case "ShowSiteTitle":
        {
          if (!newValue) {
            this.properties.SiteNameTitle = '';
            this.properties.detailListFieldsCollectionData = this.properties.detailListFieldsCollectionData.filter(field => !field.IsSiteTitle);
          }
          else {
            if (this.properties.detailListFieldsCollectionData == undefined) {
              this.properties.detailListFieldsCollectionData = [];
            }
            if (!this.properties.detailListFieldsCollectionData.some(field => field.IsSiteTitle)) {
              this.properties.detailListFieldsCollectionData.push(IDetailListFieldData.CreateSiteColumn(0, 0, true));
            }
          }
          break;
        }
      case "ShowFileIcon":
        {
          if (!newValue) {
            this.properties.detailListFieldsCollectionData = this.properties.detailListFieldsCollectionData.filter(field => !field.IsFileIcon);
          }
          else {
            if (this.properties.detailListFieldsCollectionData == undefined) {
              this.properties.detailListFieldsCollectionData = [];
            }
            if (!this.properties.detailListFieldsCollectionData.some(field => field.IsFileIcon)) {
              this.properties.detailListFieldsCollectionData.push(IDetailListFieldData.CreateFileColumn());
            }
          }
          break;
        }
      case "displayFieldsCollectionData":
        {
          if (newValue && newValue.length > 0) {
            this.properties.ShowSiteTitle = newValue.some(field => field.IsSiteTitle);
            this.properties.ShowListName = newValue.some(field => field.IsListTitle);
          }
          break;
        }
      case "sites":
        {
          if (newValue && oldValue) {
            if (newValue.length > 0 && oldValue.length < newValue.length) {
              await newValue.map(async site => {
                if (oldValue.indexOf(site) < 0) {
                  let service: ListService = new ListService(site.url, false);
                  let lists: Array<SiteList> = await service.getSiteListsTitle();
                  this.saveSiteCollectionLists(site.url, lists);
                }
              });
            }
            else {
              let difference = oldValue.filter(x => newValue.indexOf(x) === -1);

              difference.map(site => {
                this.properties.listsCollectionData = this.properties.listsCollectionData.filter(item => item.SiteCollectionSource != site.url);
                this.properties.mappingFieldsCollectionData = this.properties.mappingFieldsCollectionData.filter(item => item.SiteCollectionSource != site.url);
              });
            }
          }
          break;
        }
      case "onClickSelectedOption":
        {
          this.setSelectedOnClickOption(newValue);
          break;
        }
      case "clickEnabled":
        {
          if (newValue) {
            this.properties.onClickSelectedOption = "simpleModal";
            this.setSelectedOnClickOption("simpleModal");
          }
          break;
        }
      case "fieldCollectionData":
        {
          if (newValue) {
            this.OrderfieldsCollectionData();
          }
          break;
        }
      case "groupByField":
        {
          if (newValue) {
            this.properties.ShowPagination = false;
            this.context.propertyPane.refresh();
          }
          break;
        }
      case "groupedByField":
        {
          if (newValue) {
            this.properties.ShowPagination = false;
            this.properties.groupByField = "";
            this.context.propertyPane.refresh();
          }
          else {
            this.properties.groupByField = "";
            this.context.propertyPane.refresh();
          }
          break;
        }
      case "ShowPagination":
        {
          if (newValue) {
            this.properties.groupedByField = false;
            this.properties.groupByField = "";
            this.context.propertyPane.refresh();
          }
          break;
        }
    }
  }

  private setSelectedOnClickOption(newValue: string) {
    switch (newValue) {
      case "simpleModal":
        {
          this.properties.ModalType = IModalType.Simple;
          break;
        }
      case "completeModal":
        {
          this.properties.ModalType = IModalType.Complete;
          this.properties.redirectData = undefined;
          break;
        }
      case "redirect":
        {
          this.properties.ModalType = IModalType.Redirect;
          this.properties.completeModalFields = undefined;
          break;
        }
      case "dynamicData":
        {
          this.properties.ModalType = IModalType.DynamicData;
          this.properties.redirectData = undefined;
          this.properties.completeModalFields = undefined;
          break;
        }
      case "documentIframePreview":
        {
          this.properties.ModalType = IModalType.DocumentIframePreview;
          this.properties.redirectData = undefined;
          this.properties.completeModalFields = undefined;
          break;
        }
      case "documentNewTabPreview":
        {
          this.properties.ModalType = IModalType.DocumentNewTabPreview;
          this.properties.redirectData = undefined;
          this.properties.completeModalFields = undefined;
          break;
        }
    }
  }

  private getDistinctSiteCollectionSourceOptions(): IDropdownOption[] {
    let options: IDropdownOption[] = [];
    let siteOptions = this.properties.listsCollectionData && this.properties.listsCollectionData.map(option => option.SiteCollectionSource);
    if (siteOptions) {
      siteOptions.map((item, index, array) => {
        if (array.indexOf(item) == index) {
          options.push({
            key: item,
            text: item
          });
        }
      });
    }

    return options;
  }

  private getCustomsOptions(): Array<ICustomOption> {
    return [{ Key: "SiteUrl", Option: "Site information", CustomData: "String" }, { Key: "ListName", Option: "List Name", CustomData: "String" }];
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {

    let SiteTitleOptions: IPropertyPaneDropdownOption[] = [];
    SiteTitleOptions.push({ key: "id", text: "Id" });
    SiteTitleOptions.push({ key: "title", text: "Title" });
    SiteTitleOptions.push({ key: "url", text: "Url" });

    let emptyProperty = new EmptyPropertyPane();

    let SiteNamePropertyToShowPropertyPane = this.properties.ShowSiteTitle ? PropertyPaneDropdown('SiteNamePropertyToShow', {
      label: strings.GeneralFieldsPropertiesSiteProperty,
      disabled: !this.properties.ShowSiteTitle,
      options: SiteTitleOptions
    }) : emptyProperty;

    let GeneralFilterPlaceHolderPropertyPane = this.properties.GeneralFilter ? PropertyPaneTextField('GeneralFilterPlaceHolderText', {
      label: strings.FilterPropertiesGeneralFilterPlaceHolder,
    }) : emptyProperty;

    let GeneralFilterInitialQueryEnabled = this.properties.GeneralFilter ? PropertyPaneToggle('initialQueryEnabled', {
      label: strings.GeneralFilterInitialQueryEnabled,
      checked: this.properties.initialQueryEnabled,
    }) : emptyProperty;

    let GeneralFilterInitialQueryOption = this.properties.initialQueryEnabled ? PropertyPaneDropdown('initialQueryOption', {
      label: strings.GeneralFilterInitialQueryOption,
      options:
        [
          {
            key: "simpleText", text: "Text"
          },
          {
            key: "dynamicData", text: "Dynamic data"
          }
        ]
    }) : emptyProperty;

    let GeneralFilterInitialQueryText = this.properties.initialQueryEnabled && this.properties.initialQueryOption === "simpleText" ? PropertyPaneTextField('initialQueryText', {
      label: strings.GeneralFilterInitialQueryTextValue,
    }) : emptyProperty;


    let GeneralFilterConnection = this.properties.initialQueryEnabled && this.properties.initialQueryOption === "dynamicData" && this.properties.GeneralFilter ? PropertyPaneDynamicFieldSet({
      label: strings.GeneralFilterConnection,
      fields: [
        PropertyPaneDynamicField('dynamicQueryText', {
          label: strings.InitialSearchText
        })
      ]
    }) : emptyProperty;

    let IndividualFilterPositionPropertyPane = this.properties.IndividualColumnFilter ? PropertyFieldMultiSelect('IndividualFilterPosition', {
      key: 'multiSelect',
      label: strings.FilterPropertiesIndividualFilterPostion,
      options: [
        {
          key: "header",
          text: "Header"
        },
        {
          key: "footer",
          text: "Footer"
        },
      ],
      selectedKeys: this.properties.IndividualFilterPosition
    }) : emptyProperty;

    let ClearAlFiltersBtnTextPropertyPane = this.properties.ShowClearAllFilters ? PropertyPaneTextField('ClearAllFiltersBtnText', {
      label: strings.FilterPropertiesClearAllBtnText,
    }) : emptyProperty;

    let clearAllFiltersBtnColorOptions: IPropertyPaneDropdownOption[] = [];
    clearAllFiltersBtnColorOptions.push({ key: "white", text: "White" });
    clearAllFiltersBtnColorOptions.push({ key: "theme", text: "Theme" });
    let ClearAlFiltersBtnColorPropertyPane = this.properties.ShowClearAllFilters ? PropertyPaneDropdown('ClearAllFiltersBtnColor', {
      label: strings.FilterPropertiesClearAllBtnColor,
      options: clearAllFiltersBtnColorOptions
    }) : emptyProperty;

    let ItemCountTextFieldPropertyPane = this.properties.ShowItemCount ? PropertyPaneTextField('ItemCountText', {
      label: strings.GeneralPropertiesItemCountText,
      placeholder: strings.GeneralPropertiesItemCountPlaceholder
    }) : emptyProperty;

    let ItemsInPagePropertyPane = this.properties.ShowPagination && !this.properties.groupedByField ? PropertyFieldNumber("ItemsInPage", {
      key: "ItemsInPage",
      label: strings.GeneralPropertiesItemPerPage,
      value: this.properties.ItemsInPage || null,
      onGetErrorMessage: (value: number) => {
        if (!value) {
          return "If pagination are enabled, items per page are required";
        }
        if (value < 0) {
          return 'Only positive values are allowed';
        }
        return '';
      }
    }) : emptyProperty;

    let groupByFieldPropertyPane = this.properties.groupedByField ? PropertyPaneDropdown('groupByField', {
      label: strings.GroupFieldOptionsToSelect,
      selectedKey: this.properties.groupByField,
      options: this.properties.detailListFieldsCollectionData.filter(field => !field.IsFileIcon).map(field => {
        return { key: field.ColumnTitle, text: field.ColumnTitle };
      }),
    }) : emptyProperty;

    let cacheTimePropertyPane = this.properties.UseCache ? PropertyFieldNumber("minutesToCache", {
      key: "minutesToCache",
      label: strings.MinutesToCacheData,
      value: this.properties.minutesToCache || null,
    }) : emptyProperty;

    let CacheTypePropertyPane = this.properties.UseCache ? PropertyPaneDropdown('CacheType', {
      label: strings.LblCacheType,
      selectedKey: "local",
      options: [{ key: "local", text: "Local" }, { key: "session", text: "Session" }]
    }) : emptyProperty;

    let onclickEventOptionPropertyPane = this.properties.clickEnabled ? PropertyPaneDropdown('onClickSelectedOption', {
      label: strings.OnClickOptionsToSelect,
      selectedKey: this.properties.onClickSelectedOption || "simpleModal",
      options: [
        {
          key: "simpleModal",
          text: strings.OnClickSimpleModalText
        },
        {
          key: "completeModal",
          text: strings.OnClickCompleteModalText
        },
        {
          key: "redirect",
          text: strings.OnClickRedirectText
        },
        {
          key: "dynamicData",
          text: strings.OnClickDynamicText
        },
        {
          key: "documentIframePreview",
          text: strings.OnDocumentIframePreviewText
        },
        {
          key: "documentNewTabPreview",
          text: strings.OnDocumentNewTabPreviewText
        }
      ],
    }) : emptyProperty;

    let onClickNumberOfClicksOptionPropertyPane = this.properties.clickEnabled ? PropertyPaneDropdown('onClickNumberOfClicksOption', {
      label: strings.OnClickNumberOfClickOptionsToSelect,
      selectedKey: this.properties.onClickNumberOfClicksOption || "twoClicks",
      options: [
        {
          key: "oneClick",
          text: strings.OneClickTriggerText
        },
        {
          key: "twoClicks",
          text: strings.TwoClickTriggerText
        }
      ],
    }) : emptyProperty;

    let onClickCompleteModalPropertyPane = this.properties.clickEnabled && this.properties.ModalType === IModalType.Complete ? PropertyFieldCollectionData("completeModalFields", {
      key: "completeModalFields",
      label: strings.CompleteModalFieldSelector,
      panelHeader: strings.CompleteModalHeaderSelector,
      manageBtnLabel: strings.CompleteModalButton,
      enableSorting: true,
      value: this.properties.completeModalFields,
      fields: [
        {
          id: "SiteCollectionSource",
          title: strings.CompleteModalFieldsSiteCollection,
          type: CustomCollectionFieldType.dropdown,
          options: this.getDistinctSiteCollectionSourceOptions(),
          required: true
        },
        {
          id: "ListSourceField",
          title: strings.CompleteModalFieldsList,
          type: CustomCollectionFieldType.custom,
          required: true,
          onCustomRender: (field, value, onUpdate, item, itemId, onError) => {
            return (
              CustomCollectionDataField.getListPickerBySiteOptions(this.properties.listsCollectionData, field, item, onUpdate)
            );
          }
        },
        {
          id: "SourceField",
          title: strings.CompleteModalFieldsListField,
          type: CustomCollectionFieldType.custom,
          required: true,
          onCustomRender: (field, value, onUpdate, item: ICompleteModalData, itemId, onError) => {
            if (item.SiteCollectionSource && item.ListSourceField) {
              return (
                CustomCollectionDataField.getFieldPickerByList(this.ListsFields[item.SiteCollectionSource][item.ListSourceField], field, item, onUpdate, this.updateFieldType, this.getCustomsOptions())
              );
            }
          }
        },
        {
          id: "TargetField",
          title: strings.CompleteModalFieldsTargetField,
          type: CustomCollectionFieldType.string,
          required: true
        },
        {
          id: "SPFieldType",
          title: strings.CollectionDataFieldsRenderType,
          type: CustomCollectionFieldType.custom,
          required: true,
          onCustomRender: (field, value, onUpdate, item, itemId, onError) => {
            if (item.SiteCollectionSource && item.ListSourceField && item.SourceField) {
              return (
                CustomCollectionDataField.getPickerByStringOptions(this.GetRenderOptionsByType(item.SPFieldType), field, item, onUpdate, undefined)
              );
            }
          }
        }
      ]
    }) : emptyProperty;

    let onclickRedirectPropertyPane = this.properties.clickEnabled && this.properties.ModalType === IModalType.Redirect ? PropertyFieldCollectionData("redirectData", {
      key: "redirectData",
      label: strings.redirectDataFieldSelector,
      panelHeader: strings.redirectDataHeaderSelector,
      manageBtnLabel: strings.redirectDataButton,
      value: this.properties.redirectData,
      fields: [
        {
          id: "SiteCollectionSource",
          title: strings.redirectDataFieldsSiteCollection,
          type: CustomCollectionFieldType.dropdown,
          options: this.getDistinctSiteCollectionSourceOptions(),
          required: true
        },
        {
          id: "ListSourceField",
          title: strings.redirectDataFieldsList,
          type: CustomCollectionFieldType.custom,
          required: true,
          onCustomRender: (field, value, onUpdate, item, itemId, onError) => {
            return (
              CustomCollectionDataField.getListPickerBySiteOptions(this.properties.listsCollectionData, field, item, onUpdate)
            );
          }
        },
        {
          id: "Url",
          title: strings.redirectDataUrl,
          type: CustomCollectionFieldType.string,
          required: true
        }
      ]
    }) : emptyProperty;

    let onClickRedirectIdQueryParamProperyPane = this.properties.clickEnabled && this.properties.ModalType === IModalType.Redirect ? PropertyPaneTextField('onRedirectIdQuery', {
      label: strings.OnclickRedirectIdText,
    }) : emptyProperty;

    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          displayGroupsAsAccordion: true,
          groups: [
            {
              groupName: strings.SourceSelectorGroup,
              isCollapsed: true,
              groupFields: [
                PropertyFieldSitePicker('sites', {
                  label: strings.SitesSelector,
                  initialSites: this.properties.sites || [],
                  context: this.context,
                  multiSelect: true,
                  onPropertyChange: (propertyPath, oldValue, newValue) => this.onPropertyPaneFieldChanged(propertyPath, oldValue, newValue),
                  properties: this.properties,
                  key: 'sitesFieldId',
                }),
                PropertyFieldCollectionData("listsCollectionData", {
                  key: "listsCollectionData",
                  label: strings.ListSelector,
                  panelHeader: strings.ListSelectorPanelHeader,
                  manageBtnLabel: strings.ListSelectorLabel,
                  enableSorting: true,
                  value: this.properties.listsCollectionData,
                  fields: [
                    {
                      id: "SiteCollectionSource",
                      title: strings.CollectionDataSiteCollectionTitle,
                      type: CustomCollectionFieldType.custom,
                      onCustomRender: (field, value, onUpdate, item, itemId, onError) => {
                        let sites = this.properties.sites.map(site => { return site.url; });
                        return (
                          CustomCollectionDataField.getPickerByStringOptions(sites, field, item, onUpdate, this.handleSourceSiteChange)
                        );
                      },
                      required: true,
                    },
                    {
                      id: "ListSourceField",
                      title: strings.CollectionDataListTitle,
                      type: CustomCollectionFieldType.custom,
                      required: true,
                      onCustomRender: (field, value, onUpdate, item, itemId, onError) => {
                        if (item.SiteCollectionSource) {
                          return (
                            CustomCollectionDataField.getListPicker(this.sitesLists[item.SiteCollectionSource], field, item, onUpdate, this.setNewListFields)
                          );
                        }
                      }
                    },
                    {
                      id: "ListView",
                      title: strings.CollectionDataListViewNameTitle,
                      type: CustomCollectionFieldType.string,

                    },
                    {
                      id: "Query",
                      title: strings.CollectionDataListCamlQueryTitle,
                      placeholder: strings.CollectionDataListCamlQueryPlaceHolder,
                      type: CustomCollectionFieldType.string,
                    },
                    {
                      id: "AudienceEnabled",
                      title: strings.ModerAudienceEnabledTitle,
                      type: CustomCollectionFieldType.boolean,
                    }
                  ],
                  disabled: !this.properties.sites || this.properties.sites.length == 0,
                })
              ]
            },
            {
              groupName: strings.DisplayFieldsPropertiesGroup,
              isCollapsed: true,
              groupFields: [
                PropertyPaneToggle('ShowFileIcon', {
                  label: strings.GeneralFieldsPropertiesShowFileIcon,
                  disabled: !this.properties.sites || this.properties.sites.length == 0,
                  checked: !!this.properties.sites && this.properties.sites.length > 0 && this.properties.ShowFileIcon,
                }),
                PropertyPaneToggle('ShowListName', {
                  label: strings.GeneralFieldsPropertiesShowListName,
                  disabled: !this.properties.sites || this.properties.sites.length == 0,
                  checked: !!this.properties.sites && this.properties.sites.length > 0 && this.properties.ShowListName,
                }),
                PropertyPaneToggle('ShowSiteTitle', {
                  label: strings.GeneralFieldsPropertiesShowSiteInformation,
                  disabled: !this.properties.sites || this.properties.sites.length == 0,
                  checked: !!this.properties.sites && this.properties.sites.length > 0 && this.properties.ShowSiteTitle
                }),
                SiteNamePropertyToShowPropertyPane,
                PropertyFieldCollectionData("detailListFieldsCollectionData", {
                  enableSorting: true,
                  key: "detailListFieldsCollectionData",
                  label: strings.CollectionDataFieldTitle,
                  panelHeader: strings.CollectionDataFieldHeader,
                  manageBtnLabel: strings.CollectionDataFieldsButton,
                  value: this.properties.detailListFieldsCollectionData,
                  fields: [
                    {

                      id: "ColumnTitle",
                      title: strings.detailListFieldsColumnTitle,
                      type: CustomCollectionFieldType.string,
                      required: true,
                    },
                    {
                      id: "MinColumnWidth",
                      title: strings.detailListFieldsColumnMinWidth,
                      type: CustomCollectionFieldType.number,
                    },
                    {
                      id: "MaxColumnWidth",
                      title: strings.detailListFieldsColumnMaxWidth,
                      type: CustomCollectionFieldType.number,
                    },
                    {
                      id: "IsSiteTitle",
                      title: strings.detailListFieldsIsSiteColumn,
                      type: CustomCollectionFieldType.custom,
                      onCustomRender: (field, value, onUpdate, item, itemId, onError) => {
                        return (
                          CustomCollectionDataField.getDisabledCheckBoxField(field, item, onUpdate)
                        );
                      }
                    },
                    {
                      id: "IsListTitle",
                      title: strings.detailListFieldsIsListColumn,
                      type: CustomCollectionFieldType.custom,
                      onCustomRender: (field, value, onUpdate, item, itemId, onError) => {
                        return (
                          CustomCollectionDataField.getDisabledCheckBoxField(field, item, onUpdate)
                        );
                      }
                    },
                    {
                      id: "IsFileIcon",
                      title: strings.detailListFieldsIsFileIconColumn,
                      type: CustomCollectionFieldType.custom,
                      onCustomRender: (field, value, onUpdate, item, itemId, onError) => {
                        return (
                          CustomCollectionDataField.getDisabledCheckBoxField(field, item, onUpdate)
                        );
                      }
                    },
                    {
                      id: "Searcheable",
                      title: strings.CollectionDataFieldsSearchable,
                      type: CustomCollectionFieldType.boolean,
                      defaultValue: true
                    }
                  ],
                })
              ]
            },
            {
              groupName: strings.CollectionDataFieldsProperties,
              isCollapsed: true,
              groupFields: [
                PropertyFieldCollectionData("mappingFieldsCollectionData", {
                  key: "mappingFieldsCollectionData",
                  label: strings.CollectionDataFieldsToRetreive,
                  panelHeader: strings.CollectionDataFieldsHeader,
                  manageBtnLabel: strings.CollectionDataFieldsSelectBtn,
                  value: this.properties.mappingFieldsCollectionData,
                  fields: [
                    {
                      id: "SiteCollectionSource",
                      title: strings.CollectionDataFieldsSiteCollection,
                      type: CustomCollectionFieldType.dropdown,
                      options: this.getDistinctSiteCollectionSourceOptions(),
                      required: true
                    },
                    {
                      id: "ListSourceField",
                      title: strings.CollectionDataFieldsList,
                      type: CustomCollectionFieldType.custom,
                      required: true,
                      onCustomRender: (field, value, onUpdate, item: IMappingFieldData, itemId, onError) => {
                        return (
                          CustomCollectionDataField.getListPickerBySiteOptions(this.properties.listsCollectionData, field, item, onUpdate, this.UpdateListNameById)
                        );
                      }
                    },
                    {
                      id: "SourceField",
                      title: strings.CollectionDataFieldsListField,
                      type: CustomCollectionFieldType.custom,
                      required: true,
                      onCustomRender: (field, value, onUpdate, item: IMappingFieldData, itemId, onError) => {
                        if (item.SiteCollectionSource && item.ListSourceField) {
                          return (
                            CustomCollectionDataField.getFieldPickerByList(this.ListsFields[item.SiteCollectionSource][item.ListSourceField], field, item, onUpdate, this.updateFieldType)
                          );
                        }
                      }
                    },
                    {
                      id: "TargetField",
                      title: strings.CollectionDataFieldsTargetField,
                      type: CustomCollectionFieldType.custom,
                      required: true,
                      onCustomRender: (field, value, onUpdate, item: IMappingFieldData, itemId, onError) => {
                        if (item.SiteCollectionSource && item.ListSourceField && item.SourceField) {
                          return (
                            CustomCollectionDataField.getPickerByStringOptions(this.properties.detailListFieldsCollectionData.filter(column => IDetailListFieldData.IsGeneralColumn(column)).map(option => { return option.ColumnTitle; }), field, item, onUpdate, this.onMappingColumnChanged, onError)
                          );
                        }
                      }
                    },
                    {
                      id: "SPFieldType",
                      title: strings.CollectionDataFieldsRenderType,
                      type: CustomCollectionFieldType.custom,
                      required: true,
                      onCustomRender: (field, value, onUpdate, item, itemId, onError) => {
                        if (item.SiteCollectionSource && item.ListSourceField && item.SourceField) {
                          return (
                            CustomCollectionDataField.getPickerByStringOptions(this.GetRenderOptionsByType(item.SPFieldType), field, item, onUpdate, undefined)
                          );
                        }
                      }
                    },
                  ],
                  disabled: !this.properties.sites || this.properties.sites.length == 0 || !this.properties.detailListFieldsCollectionData || this.properties.detailListFieldsCollectionData.length == 0
                })]
            }
          ]
        },
        {
          header: {
            description: strings.FieldPropertiesGroup
          },
          displayGroupsAsAccordion: true,
          groups: [
            {
              groupName: strings.GeneralPropertiesGroup,
              isCollapsed: true,
              groupFields: [
                PropertyPaneToggle('ShowItemCount', {
                  label: strings.GeneralPropertiesShowItemCount,
                }),
                ItemCountTextFieldPropertyPane,
                PropertyFieldNumber("ItemLimit", {
                  key: "ItemLimit",
                  label: strings.GeneralPropertiesRowLimitLabel,
                  description: strings.GeneralPropertiesRowLimitDescription,
                  value: this.properties.ItemLimit || null,
                }),
                PropertyPaneToggle('ShowPagination', {
                  label: strings.GeneralPropertiesShowPagination,
                  checked: this.properties.ShowPagination && !this.properties.groupedByField,
                }),
                ItemsInPagePropertyPane,
                PropertyPaneToggle('groupedByField', {
                  label: strings.GeneralPropertiesGroupByField,
                  checked: this.properties.detailListFieldsCollectionData && this.properties.detailListFieldsCollectionData.length > 0 && this.properties.groupedByField && !this.properties.ShowPagination,
                  disabled: !(this.properties.detailListFieldsCollectionData && this.properties.detailListFieldsCollectionData.length)
                }),
                groupByFieldPropertyPane,
              ]
            },
            {
              groupName: strings.OnClickPropertiesGroup,
              isCollapsed: true,
              groupFields: [
                PropertyPaneToggle('clickEnabled', {
                  label: strings.OnClickEvent,
                }),
                onClickNumberOfClicksOptionPropertyPane,
                onclickEventOptionPropertyPane,
                onClickCompleteModalPropertyPane,
                onclickRedirectPropertyPane,
                onClickRedirectIdQueryParamProperyPane
              ]
            },

          ]
        },
        {
          header: {
            description: strings.FilterPropertiesGroup
          },
          displayGroupsAsAccordion: true,
          groups: [
            {
              groupName: strings.FilterPropertiesGroupName,
              isCollapsed: true,
              groupFields: [
                PropertyPaneToggle('GeneralFilter', {
                  label: strings.FilterPropertiesGeneralFilter,
                  checked: this.properties.GeneralFilter
                }),
                GeneralFilterInitialQueryEnabled,
                GeneralFilterInitialQueryOption,
                GeneralFilterInitialQueryText,
                GeneralFilterConnection,
                GeneralFilterPlaceHolderPropertyPane,
                PropertyPaneToggle('IndividualColumnFilter', {
                  label: strings.FilterPropertiesIndividualFilter,
                  checked: this.properties.IndividualColumnFilter
                }),
                IndividualFilterPositionPropertyPane,
                PropertyPaneToggle('ShowClearAllFilters', {
                  label: strings.FilterPropertiesClearAllBtn,
                  checked: this.properties.ShowClearAllFilters
                }),
                ClearAlFiltersBtnColorPropertyPane,
                ClearAlFiltersBtnTextPropertyPane
              ],
            },
            {
              groupName: strings.StoragePropertiesGroupName,
              isCollapsed: true,
              groupFields: [
                PropertyPaneToggle('UseCache', {
                  label: strings.UseLocalStorage,
                  checked: this.properties.UseCache
                }),
                CacheTypePropertyPane,
                cacheTimePropertyPane
              ],
            }
          ]
        },
        {
          header: {
            description: strings.InformationPropertiesGroupName
          },
          groups: [
            {
              groupName: strings.AboutPropertiesGroupName,
              groupFields: [
                PropertyPaneWebPartInformation({
                  description: `Version:  ${this.dataVersion}`,
                  key: 'webPartInfoId'
                })
              ],
            }
          ]
        }
      ]
    };

  }

  private GetRenderOptionsByType(SPFieldType: string): string[] {
    let result = [SPFieldType];
    switch (SPFieldType) {
      case SharePointType.Text:
      case SharePointType.Note:
      case SharePointType.NoteFullHtml:
        {
          result = [SharePointType.Text, SharePointType.Note, SharePointType.NoteFullHtml];
          break;
        }
      case SharePointType.Url:
      case SharePointType.Image:
        {
          result = [SharePointType.Url, SharePointType.Image];
          break;
        }
      case SharePointType.User:
      case SharePointType.UserEmail:
      case SharePointType.UserName:
        {
          result = [SharePointType.UserEmail, SharePointType.UserName, SharePointType.User];
          break;
        }
      case SharePointType.DateTime:
      case SharePointType.Date:
      case SharePointType.DateLongMonth:
        {
          result = [SharePointType.Date, SharePointType.DateTime, SharePointType.DateLongMonth];
          break;
        }
    }

    return result;
  }

  private onMappingColumnChanged(item: IMappingFieldData, fieldId: string, option: any, updateFunction: any, errorFunction: any) {
    let errorMsg: string = "";
    let alreadyMapped = this.properties.mappingFieldsCollectionData && this.properties.mappingFieldsCollectionData.filter(element => element.TargetField === option.key);
    if (alreadyMapped && alreadyMapped.length > 0) {
      let sameType = alreadyMapped.filter(element => element.SPFieldType == item.SPFieldType);
      if (sameType && sameType.length === alreadyMapped.length) {
        let sameOrigin = alreadyMapped.filter(element => element.SiteCollectionSource == item.SiteCollectionSource && element.ListSourceField == item.ListSourceField);
        if (sameOrigin && sameOrigin.length > 0) {
          errorMsg = strings.LblErrorSameColumn;
        }
      }
      else {
        errorMsg = strings.LblErrorDiferentRender;
      }
    }
    updateFunction(fieldId, option.key);
    errorFunction(fieldId, errorMsg);
  }

  private saveSiteCollectionLists(site: string, Lists: SiteList[]) {
    this.sitesLists[site] = Lists;
  }

  private saveSiteCollectionListsFields(site: string, listId: string, fields: ListField[]) {
    if (this.ListsFields[site] == undefined) {
      this.ListsFields[site] = [];
    }
    this.ListsFields[site][listId] = fields;
  }

  private async setNewListFields(row: IListData, fieldId: string, option: IDropdownOption, updateFunction: any, errorFunction: any) {
    updateFunction(fieldId, option.key);
    row.ListSourceFieldName = option.text;
    if (this.ListsFields[row.SiteCollectionSource] == undefined) {
      this.ListsFields[row.SiteCollectionSource] = [];
    }
    let service: ListService = new ListService(row.SiteCollectionSource, false);
    let fields: ListField[] = await service.getListFields(option.key.toString());
    this.ListsFields[row.SiteCollectionSource][option.key] = fields;
  }

  private updateFieldType(row: any, fieldId: string, option: any, updateFunction: (fieldId: string, value: any) => void) {
    updateFunction(fieldId, option.key);
    row.SPFieldType = SharePointFieldTypes.GetSPFieldTypeByString(option.FieldType);
  }

  private handleSourceSiteChange(row: IListData, fieldId: string, option: IDropdownOption, updateFunction: any, errorFunction: any) {
    updateFunction(fieldId, option.key);
    if (row && this.properties.listsCollectionData) {
      let savedValue = this.properties.listsCollectionData.find(element => element.uniqueId === row.uniqueId);
      if (savedValue && savedValue.SiteCollectionSource != option.key) {
        row.ListSourceField = undefined;
      }
    }
  }

  private UpdateListNameById(row: IMappingFieldData, fieldId: string, option: IDropdownOption, updateFunction: (fieldId: string, value: any) => void, errorFunction: any) {
    updateFunction(fieldId, option.key);
    row.ListSourceFieldName = option.text;
  }
}
