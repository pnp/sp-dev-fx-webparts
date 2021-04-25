import * as React from 'react';
import styles from '../ListSearchWebPart.module.scss';
import * as strings from 'ListSearchWebPartStrings';
import ListService from '../services/ListService';
import IGroupedItems, { IListSearchState, IColumnFilter } from './IListSearchState';
import { IListSearchProps } from './IListSearchProps';
import {
  IColumn,
  IDetailsFooterProps,
  IDetailsRowBaseProps,
  DetailsRow,
  SelectionMode,
  IGroup,
  DetailsHeader,
  DetailsListLayoutMode,
} from 'office-ui-fabric-react/lib/DetailsList';
import {
  getTheme,
  IconButton,
  MessageBar,
  MessageBarType,
  ShimmeredDetailsList
} from 'office-ui-fabric-react';
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';
import Pagination from "react-js-pagination";
import { IReadonlyTheme } from '@microsoft/sp-component-base';
import { IIconProps } from 'office-ui-fabric-react/lib/Icon';
import { DefaultButton, PrimaryButton } from 'office-ui-fabric-react';
import { Icon, ITheme } from 'office-ui-fabric-react';
import { Shimmer } from 'office-ui-fabric-react/lib/Shimmer';
import { Modal } from 'office-ui-fabric-react/lib/Modal';
import { Log } from '@microsoft/sp-core-library';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import { SharePointType } from '../model/ISharePointFieldTypes';
import { Persona, PersonaSize } from 'office-ui-fabric-react/lib/Persona';
import { Facepile, OverflowButtonType, IFacepilePersona } from 'office-ui-fabric-react/lib/Facepile';
import StringUtils from '../services/Utils';
import { Image, IImageProps, ImageFit } from 'office-ui-fabric-react/lib/Image';
import { Link } from 'office-ui-fabric-react';
import { FileTypeIcon, ApplicationType, IconType, ImageSize } from "@pnp/spfx-controls-react/lib/FileTypeIcon";
import IUserField from '../model/IUserField';
import IUrlField from '../model/IUrlField';
import { IFrameDialog } from "@pnp/spfx-controls-react/lib/IFrameDialog";
import { IModalType } from '../model/IModalType';
import { find, groupBy, isEmpty } from '@microsoft/sp-lodash-subset';
import IResult from '../model/IResult';
import { IListSearchListQuery, IMapQuery } from '../model/IMapQuery';
import { WebPartTitle } from "@pnp/spfx-controls-react/lib/WebPartTitle";
import GraphService from '../services/GraphService';


const LOG_SOURCE = "IListdSearchWebPart";
const filterIcon: IIconProps = { iconName: 'Filter' };

export default class IListdSearchWebPart extends React.Component<IListSearchProps, IListSearchState> {
  private groups: IGroup[];
  private keymapQuerys: IMapQuery = {};
  private _graphService: GraphService;

  constructor(props: IListSearchProps, state: IListSearchState) {
    super(props);
    this.state = {
      activePage: 1,
      items: null,
      filterItems: null,
      isLoading: true,
      errorMsg: "",
      errorHeader: "",
      columnFilters: [],
      generalFilter: this.props.generalFilterText,
      isModalHidden: true,
      isModalLoading: false,
      selectedItem: null,
      completeModalItemData: null,
      columns: this.AddColumnsToDisplay(),
      groupedItems: []
    };
    this.GetJSXElementByType = this.GetJSXElementByType.bind(this);
    this._renderItemColumn = this._renderItemColumn.bind(this);
    this._graphService = new GraphService(this.props.Context);

  }

  public componentDidUpdate(prevProps: Readonly<IListSearchProps>, prevState: Readonly<IListSearchState>, snapshot?: any): void {
    if (prevProps != this.props) {
      this.setState({ items: null, filterItems: null, isLoading: true, columns: [] });
      this.getData();
    }
  }

  public componentDidMount() {
    this.getData();
  }

  public componentDidCatch(error, info) {
    Log.warn(LOG_SOURCE, `Component throw exception ${info}`, this.props.Context.serviceScope);
    this.SetError(error, "ComponentDidCatch");
  }

  private SetError(error: any, methodName: string) {
    Log.warn(LOG_SOURCE, `${methodName} set an error`, this.props.Context.serviceScope);
    Log.error(LOG_SOURCE, error, this.props.Context.serviceScope);
    this.setState({
      errorHeader: `${methodName} throw an exception. `,
      errorMsg: `Error ${error.message}`,
      isLoading: false,
    });
  }

  private async getData() {
    try {
      let result: any[] = await this.readListsItems();

      if (this.props.ItemLimit) {
        result = result.slice(0, this.props.ItemLimit);
      }

      let groupedItems = [];
      if (this.props.groupByField) {
        groupedItems = this._groupBy(result, this.props.groupByField, this.props.groupByFieldType);
      }

      let filteredItems: IResult[] = result;
      if (this.props.generalFilterText) {
        filteredItems = this.filterListItemsByGeneralFilter(this.props.generalFilterText, false, false, result, filteredItems);
      }

      this.setState({ items: result, filterItems: filteredItems, isLoading: false, groupedItems });
    } catch (error) {
      this.SetError(error, "getData");
    }
  }

  private async readListsItems(): Promise<Array<any>> {
    this.generateKeymap();
    let itemPromise: Array<Promise<Array<any>>> = [];

    Object.keys(this.keymapQuerys).map(site => {
      let listService: ListService = new ListService(site, this.props.UseCache, this.props.minutesToCache, this.props.CacheType);
      let siteProperties = this.props.Sites.filter(siteInformation => siteInformation.url === site);
      Object.keys(this.keymapQuerys[site]).map(listQuery => {
        itemPromise.push(listService.getListItems(
          this.keymapQuerys[site][listQuery],
          this.props.ListNameTitle,
          this.props.SiteNameTitle,
          siteProperties[0][this.props.SiteNamePropertyToShow],
          this.props.ItemLimit,
          this._graphService));
      });
    });

    let items = await Promise.all(itemPromise);
    let result = [];
    items.map(partialResult => {
      result.push(...partialResult);
    });

    return result;
  }

  private AddColumnsToDisplay(): IColumn[] {
    let columns: IColumn[] = [];
    this.props.detailListFieldsCollectionData.sort().map(column => {
      let mappingType = this.props.mappingFieldsCollectionData.find(e => e.TargetField === column.ColumnTitle);
      columns.push({ key: column.ColumnTitle, name: column.ColumnTitle, fieldName: column.ColumnTitle, minWidth: column.MinColumnWidth || 50, maxWidth: column.MaxColumnWidth, isResizable: true, data: mappingType ? mappingType.SPFieldType : (column.IsFileIcon ? SharePointType.FileIcon : SharePointType.Text), onColumnClick: this._onColumnClick, isIconOnly: column.IsFileIcon });
    });

    return columns;
  }

  private setNewFilterState(items: any[], generalFilter: string, collapseAllGroups: boolean, columnFilters: IColumnFilter[]) {
    if (this.props.groupByField) {
      let groupedItems = this._groupBy(items, this.props.groupByField, this.props.groupByFieldType);
      if (collapseAllGroups) {
        this.groups.map(group => group.isCollapsed = true);
      }
      this.setState({ filterItems: items, generalFilter, groupedItems, columnFilters });
    }
    else {
      this.setState({ filterItems: items, generalFilter, columnFilters });
    }
  }

  private _getDetailListGroups(groupedItems: IGroupedItems[]) {
    let groupedElements: number = 0;
    this.groups = this.props.groupByField && groupedItems && groupedItems.map(group => {
      let result = { key: group.GroupName, name: group.GroupName, startIndex: groupedElements, count: group.Items.length, level: 0 };
      groupedElements += group.Items.length;
      return result;
    });
  }

  private generateKeymap() {
    this.keymapQuerys = {};
    this.props.mappingFieldsCollectionData.map(item => {
      if (this.keymapQuerys[item.SiteCollectionSource] != undefined) {
        if (this.keymapQuerys[item.SiteCollectionSource][item.ListSourceField] != undefined) {
          if (this.keymapQuerys[item.SiteCollectionSource][item.ListSourceField].fields.filter(field => field.originalField === item.SourceField).length == 0) {
            this.keymapQuerys[item.SiteCollectionSource][item.ListSourceField].fields.push({ originalField: item.SourceField, newField: item.TargetField, fieldType: item.SPFieldType });
          }
        }
        else {
          let listQueryInfo = find(this.props.listsCollectionData, list => list.SiteCollectionSource == item.SiteCollectionSource && list.ListSourceField == item.ListSourceField);
          let newQueryListItem: IListSearchListQuery = {
            list: { Id: item.ListSourceField, Title: item.ListSourceFieldName },
            audienceEnabled: listQueryInfo.AudienceEnabled,
            fields: [{ originalField: item.SourceField, newField: item.TargetField, fieldType: item.SPFieldType }],
            camlQuery: listQueryInfo && listQueryInfo.Query,
            viewName: listQueryInfo && listQueryInfo.ListView
          };
          this.keymapQuerys[item.SiteCollectionSource][item.ListSourceField] = newQueryListItem;
        }
      }
      else {
        let listQueryInfo = find(this.props.listsCollectionData, list => list.SiteCollectionSource == item.SiteCollectionSource && list.ListSourceField == item.ListSourceField);
        let newQueryListItem: IListSearchListQuery = {
          list: { Id: item.ListSourceField, Title: item.ListSourceFieldName },
          audienceEnabled: listQueryInfo.AudienceEnabled,
          fields: [{ originalField: item.SourceField, newField: item.TargetField, fieldType: item.SPFieldType }],
          camlQuery: listQueryInfo && listQueryInfo.Query,
          viewName: listQueryInfo && listQueryInfo.ListView
        };
        this.keymapQuerys[item.SiteCollectionSource] = [];
        this.keymapQuerys[item.SiteCollectionSource][item.ListSourceField] = newQueryListItem;
      }
    });
  }

  public filterColumnListItems(propertyName: string, propertyValue: string, columnType: SharePointType) {
    try {
      let isNewFilter: boolean = true;
      let clearFilter: boolean = false;
      let isMoreRestricted: boolean = false;
      let newFitlers: IColumnFilter[] = this.state.columnFilters.filter(filter => {
        if (filter.columnName === propertyName) {
          isMoreRestricted = filter.filterToApply.length < propertyValue.length;
          filter.filterToApply = propertyValue;
          isNewFilter = false;

        }
        if (filter.filterToApply && filter.filterToApply.length > 0) { //Remove empty filters
          return filter;
        }
        else {
          clearFilter = true;
        }
      });

      if (isNewFilter) newFitlers.push({ columnName: propertyName, filterToApply: propertyValue, columnType });

      let itemsToRefine = (clearFilter || this.state.generalFilter) ? this.filterListItemsByGeneralFilter(this.state.generalFilter, true, false, this.state.items, this.state.filterItems)
        : (isMoreRestricted ? this.state.filterItems : this.state.items);

      this.filterListItemsByColumnsFilter(itemsToRefine, newFitlers, false);
    }
    catch (error) {
      this.SetError(error, "filterColumnListItems");
    }
  }

  public filterListItemsByColumnsFilter(itemsToRefine: any[], newFilters: IColumnFilter[], isFromClearGeneralFilter: boolean) {
    if (this.props.IndividualColumnFilter) {
      let newItems: Array<any> = [];
      itemsToRefine.map(item => {
        let itemFounded: boolean = true;
        newFilters.map(filter => {
          let value = this.GetItemValueFieldByFieldType(item, filter.columnName, filter.columnType);
          if (value == undefined || value == "" || value.toString().toLowerCase().indexOf(filter.filterToApply.toLowerCase()) < 0) {
            itemFounded = false;
          }
        });
        if (itemFounded) newItems.push(item);
      });

      this.setNewFilterState(newItems, isFromClearGeneralFilter ? "" : this.state.generalFilter, !newFilters || newFilters.length === 0, newFilters);
    }
    else {
      this.setNewFilterState(itemsToRefine, isFromClearGeneralFilter ? "" : this.state.generalFilter, isFromClearGeneralFilter, newFilters);
    }
  }

  public filterListItemsByGeneralFilter(valueToFilter: string, isClearFilter: boolean, reloadComponents: boolean, allItems: IResult[], filteredItems: IResult[]) {
    if (valueToFilter && valueToFilter.length > 0) {
      let filterItems: Array<any> = [];
      let itemsToFilter = (isClearFilter || valueToFilter.length < this.state.generalFilter.length) ? allItems : filteredItems;
      itemsToFilter.map(item => {
        this.props.GeneralSearcheableFields.map(field => {
          if (filterItems.indexOf(item) < 0) {
            if (item[field.ColumnTitle] && item[field.ColumnTitle].toString().toLowerCase().indexOf(valueToFilter.toLowerCase()) > -1) {
              filterItems.push(item);
              return item;
            }
          }
        });

      });
      if (reloadComponents) {
        this.setNewFilterState(filterItems, valueToFilter, isClearFilter, this.state.columnFilters);
      }
      else {
        return filterItems;
      }
    }
    else {
      if (reloadComponents) {
        this.clearGeneralFilter();
      }
      else {
        return allItems;
      }
    }
  }

  public clearGeneralFilter() {
    try {
      this.filterListItemsByColumnsFilter(this.state.items, this.state.columnFilters, true);
    }
    catch (error) {
      this.SetError(error, "clearGeneralFilter");
    }
  }


  private _onRenderDetails(detailsFooterProps: IDetailsFooterProps, showSearchBox: boolean, isHeader: boolean): JSX.Element {
    if (this.props.IndividualColumnFilter) {
      let _renderDetailsFooterItemColumn: IDetailsRowBaseProps['onRenderItemColumn'] = (item, index, column) => {
        let filter: IColumnFilter = this.state.columnFilters.find(colFilter => colFilter.columnName == column.name);
        if (this.props.IndividualColumnFilter && showSearchBox && column.data != SharePointType.FileIcon) {
          return (
            <SearchBox placeholder={column.name} iconProps={filterIcon} value={filter ? filter.filterToApply : ""}
              underlined={true} onChange={(ev, value) => this.filterColumnListItems(column.name, value, column.data)} onClear={(ev) => this.filterColumnListItems(column.name, "", SharePointType.Text)} />
          );
        }
        else {
          return undefined;
        }
      };

      return (
        <DetailsRow
          {...detailsFooterProps}
          item={{}}
          itemIndex={-1}
          onRenderItemColumn={_renderDetailsFooterItemColumn}
        />
      );
    }
    else {
      if (isHeader) {
        return <DetailsHeader {...detailsFooterProps} layoutMode={DetailsListLayoutMode.justified} styles={{ root: { backgroundColor: 'transparent' } }} />;
      }
      else {
        return undefined;
      }
    }
  }

  private handlePageChange(pageNumber) {
    this.setState({ activePage: pageNumber });
  }

  private _clearAllFilters() {
    this.setNewFilterState(this.state.items, "", true, []);
  }

  private _checkIndividualFilter(position: string): boolean {
    return this.props.IndividualColumnFilter && this.props.IndividualFilterPosition && this.props.IndividualFilterPosition.indexOf(position) > -1;
  }

  private _getItems(): Array<any> {
    let result = [];
    if (this.state.filterItems) {
      if (this.props.groupByField) {
        this.state.groupedItems.map(group => { result = [...result, ...group.Items]; });
      }
      else {
        if (this.props.ShowPagination) {
          let start = this.props.ItemsInPage * (this.state.activePage - 1);
          result = this.state.filterItems.slice(start, start + this.props.ItemsInPage);
        }
        else {
          result = this.state.filterItems;
        }
      }
    }

    return result;
  }

  private _onItemInvoked = (item: IResult) => {
    if (this.props.ModalType === IModalType.Complete) {
      this.GetCompleteItemData(item);
    }
    this.setState({ isModalHidden: false, selectedItem: item, isModalLoading: this.props.ModalType === IModalType.Complete });
  }

  private _closeModal = (): void => {
    this.setState({ isModalHidden: true, selectedItem: null });
  }

  private async GetCompleteItemData(item: IResult) {
    let listService: ListService = new ListService(item.SiteUrl, this.props.UseCache, this.props.minutesToCache, this.props.CacheType);

    let completeItemQueryOptions: IListSearchListQuery = {
      list: item.List,
      audienceEnabled: true,
      fields: this.props.completeModalFields && this.props.completeModalFields.filter(field => field.SiteCollectionSource == item.SiteUrl &&
        field.ListSourceField == item.List.Id).map(field => { return { originalField: field.SourceField, newField: field.TargetField, fieldType: field.SPFieldType }; })
    };

    let completeItem = await listService.getListItemById(completeItemQueryOptions, item.Id);
    if (completeItem) {
      completeItem.SiteUrl = item.SiteUrl;
      completeItem.ListName = item.ListName;
    }
    this.setState({ completeModalItemData: completeItem, isModalLoading: false });
  }

  public GetOnClickAction() {
    try {
      switch (this.props.ModalType) {
        case IModalType.Simple:
        case IModalType.Complete:
        case IModalType.DocumentIframePreview:
          {
            return this.GetModal();
            break;
          }
        case IModalType.Redirect:
          {
            let config = this.props.redirectData.filter(f => f.SiteCollectionSource == this.state.selectedItem.SiteUrl && f.ListSourceField == this.state.selectedItem.List.Id);
            if (config && config.length > 0) {
              if (this.props.onRedirectIdQuery) {
                var url = new URL(config[0].Url);
                url.searchParams.append(this.props.onRedirectIdQuery, this.state.selectedItem.Id.toString());
                window.location.replace(url.toString());
              }
              else {
                window.location.replace(`${config[0].Url}`);
              }
            }
            break;
          }
        case IModalType.DynamicData:
          {
            this.props.onSelectedItem({
              webUrl: this.state.selectedItem.SiteUrl,
              listId: this.state.selectedItem.List.Id,
              itemId: this.state.selectedItem.Id
            });
            break;
          }
        case IModalType.DocumentNewTabPreview:
          {
            window.open(this.GetDocumentPreviewUrl(), '_blank');
            break;
          }
      }
    } catch (error) {
      this.SetError(error, "GetOnClickAction");
    }
  }

  public GetModal() {
    const cancelIcon: IIconProps = { iconName: 'Cancel' };
    const theme = getTheme();
    const iconButtonStyles = {
      root: {
        color: theme.palette.neutralPrimary,
        marginLeft: 'auto',
        marginTop: '4px',
        marginRight: '2px',
        float: 'right'
      },
      rootHovered: {
        color: theme.palette.neutralDark,
      },
    };
    const modal: JSX.Element =
      <Modal
        isOpen={!this.state.isModalHidden}
        onDismiss={this._closeModal}
        isBlocking={false}
        containerClassName={styles.containerModal}
      >
        <div className={styles.headerModal}>
          {this.state.selectedItem &&
            <IconButton
              styles={iconButtonStyles}
              iconProps={cancelIcon}
              onClick={this._closeModal}
            />}
        </div>
        <div className={styles.bodyModal}>
          {this.getBodyModal()}
        </div>
      </Modal>;
    return modal;
  }

  private getBodyModal() {
    let body: JSX.Element;
    switch (this.props.ModalType) {
      case IModalType.Simple:
        {
          body = <>
            {
              this.props.mappingFieldsCollectionData.filter(f => f.SiteCollectionSource == this.state.selectedItem.SiteUrl &&
                f.ListSourceField === this.state.selectedItem.List.Id).map(val => {
                  return <>
                    <div className={styles.propertyModal}>
                      {val.TargetField}
                    </div>
                    {this.GetModalBodyRenderByFieldType(this.state.selectedItem, val.TargetField, val.SPFieldType)}
                  </>;
                })
            }
          </>;
          break;
        }
      case IModalType.Complete:
        {
          body = <>
            {this.props.completeModalFields && this.props.completeModalFields.filter(field => field.SiteCollectionSource == this.state.selectedItem.SiteUrl &&
              field.ListSourceField == this.state.selectedItem.List.Id).map(val => {
                return <>
                  <div className={styles.propertyModal}>
                    {val.TargetField}
                  </div>
                  <div>
                    {this.state.isModalLoading ? <Shimmer /> : this.GetModalBodyRenderByFieldType(this.state.completeModalItemData, val.SourceField, val.SPFieldType)}
                  </div>
                </>;
              })
            }
          </>;
          break;
        }
      case IModalType.DocumentIframePreview:
        {
          body = <IFrameDialog
            url={this.GetDocumentPreviewUrl()}
            hidden={this.state.isModalHidden}
            onDismiss={this._closeModal.bind(this)}
            width={`${window.innerWidth * 0.75}px`}
            height={`${window.innerHeight * 0.75}px`}
          />;
          break;
        }
    }

    return body;
  }

  private GetDocumentPreviewUrl(): string {
    let result: string;
    //Pdf is office extension but has to be with serverUrl
    const officeExtensions = ["aspx", "doc", "docm", "docx", "dotx", "odp", "ods", "odt", "pot", "potm", "potx", "pps", "ppsx", "ppt", "pptm", "pptx", "rtf", "xls", "xlsb", "xlsm", "xlsx", "eml", "msg", "vsd", "vsdx"];
    const documentsWithPreview = ["csv"];
    const isOfficeDoc = !isEmpty(this.state.selectedItem.FileExtension) && officeExtensions.indexOf(this.state.selectedItem.FileExtension.toLocaleLowerCase()) !== -1;
    const isDocumentWithPreview = isOfficeDoc || (!isEmpty(this.state.selectedItem.FileExtension) && documentsWithPreview.indexOf(this.state.selectedItem.FileExtension.toLocaleLowerCase()) !== -1);
    if (isDocumentWithPreview) {
      result = `${this.state.selectedItem.SiteUrl}/_layouts/15/WopiFrame.aspx?sourcedoc={${this.state.selectedItem.UniqueId}}&amp;action=interactivepreview`;
    }
    else {
      result = `${this.state.selectedItem.ServerUrl}`;
    }

    return result;
  }

  private getOnRowClickRender(detailrow: any, defaultRender: any): JSX.Element {
    return this.props.clickEnabled ?
      this.props.oneClickOption ?
        <div onClick={() => this._onItemInvoked(detailrow.item)}>
          {defaultRender({ ...detailrow, styles: { root: { cursor: 'pointer', backgroundColor: 'transparent' } } })}
        </div>
        :
        <>
          {defaultRender({ ...detailrow, styles: { root: { cursor: 'pointer', backgroundColor: 'transparent' } } })}
        </>
      :
      <>
        {defaultRender({ ...detailrow, styles: { root: { backgroundColor: 'transparent' } } })}
      </>;
  }

  private _renderItemColumn(item: any, index: number, column: IColumn): JSX.Element {
    return this.GetJSXElementByType(item, column.fieldName, column.data);
  }

  private GetModalBodyRenderByFieldType(item: any, propertyName: string, fieldType: SharePointType): JSX.Element {
    let result = this.GetJSXElementByType(item, propertyName, fieldType, true);

    switch (fieldType) {
      case SharePointType.Boolean:
        result = <Toggle checked={item[propertyName]} />;
        break;
    }

    return result;
  }



  private GetFileIconByFileType(extesion: string): JSX.Element {
    let result;
    let size = ImageSize.small;
    let type = IconType.image;
    switch (extesion) {
      case "doc":
      case "docm":
      case "docx":
      case "dotx":
      case "rtf":
        {
          result = <FileTypeIcon type={type} size={size} application={ApplicationType.Word} />;
          break;
        }
      case "xlsx":
      case "xls":
      case "xlsm":
      case "xlsb":
        {
          result = <FileTypeIcon type={type} size={size} application={ApplicationType.Excel} />;
          break;
        }
      case "pdf":
        {
          result = <FileTypeIcon type={type} size={size} application={ApplicationType.PDF} />;
          break;
        }
      case "csv":
        {
          result = <FileTypeIcon type={type} size={size} application={ApplicationType.CSV} />;
          break;
        }
      case "email":
      case "msg":
      case "oft":
      case "ost":
      case "pst":
      case "eml":
        {
          result = <FileTypeIcon type={type} size={size} application={ApplicationType.Mail} />;
          break;
        }
      case "ppt":
      case "pptx":
      case "potm":
      case "potx":
      case "pps":
      case "ppsx":
      case "pptm":
        {
          result = <FileTypeIcon type={type} size={size} application={ApplicationType.PowerPoint} />;
          break;
        }
      case "gif":
      case "jpeg":
      case "jpg":
      case "png":
        {
          result = <FileTypeIcon type={type} size={size} application={ApplicationType.Image} />;
          break;
        }
      case "vsd":
      case "vsdx":
        {
          result = <FileTypeIcon type={type} size={size} application={ApplicationType.Visio} />;
          break;
        }
      default:
        {
          result = <FileTypeIcon type={type} size={size} application={ApplicationType.ASPX} />;
          break;
        }
    }
    return result;
  }

  private GetJSXElementByType(item: any, fieldName: string, fieldType: SharePointType, ommitCamlQuery: boolean = false): JSX.Element {
    const value: any = this.GetItemValueFieldByFieldType(item, fieldName, fieldType, ommitCamlQuery);
    const { semanticColors }: IReadonlyTheme = this.props.themeVariant;
    let result: JSX.Element = <span></span>;
    switch (fieldType) {
      case SharePointType.FileIcon:
        {
          result = this.GetFileIconByFileType(value);
          break;
        }
      case SharePointType.User:
        {
          if (this.props.AnyCamlQuery && !ommitCamlQuery) {
            result = <span style={{ color: semanticColors.bodyText }}>{value}</span>;
          }
          else {
            if (value && value.Name) {
              result = <Persona
                {...{
                  imageUrl: value.Email ? `/_layouts/15/userphoto.aspx?UserName=${value.Email}` : undefined,
                  imageInitials: StringUtils.GetUserInitials(value.Name),
                  text: value.Name
                }}
                size={PersonaSize.size32}
                hidePersonaDetails={false}
              />;
            }
            else {
              result = <span></span>;
            }
          }
          break;
        }
      case SharePointType.UserMulti:
        {
          if (this.props.AnyCamlQuery && !ommitCamlQuery && value && value.length > 0) {
            result = <span>{value.map((val, index) => {
              if (index + 1 == value.length) {
                return <span style={{ color: semanticColors.bodyText }}>{val}</span>;
              }
              else {
                return <span style={{ color: semanticColors.bodyText }}>{val}<br></br></span>;
              }
            })}
            </span>;
          }
          else {
            if (value) {
              const overflowButtonProps = {
                ariaLabel: 'More users',
              };
              result = <Facepile
                personaSize={PersonaSize.size32}
                personas={value}
                maxDisplayablePersonas={3}
                overflowButtonType={OverflowButtonType.descriptive}
                overflowButtonProps={overflowButtonProps}

              />;
            }
            else {
              result = <span></span>;
            }
          }
          break;
        }
      case SharePointType.TaxonomyMulti:
        {
          if (value) {
            result = <span>{value.map((val, index) => {
              if (index + 1 == value.length) {
                return <span style={{ color: semanticColors.bodyText }}>{val}</span>;
              }
              else {
                return <span style={{ color: semanticColors.bodyText }}>{val}<br></br></span>;
              }
            })}
            </span>;
          }
          else {
            result = <span></span>;
          }
          break;
        }
      case SharePointType.Lookup:
        if (value) {
          result = <Link style={{ color: semanticColors.bodyText }} href="#">{value}</Link>;
        }
        else {
          result = <span></span>;
        }
        break;
      case SharePointType.ChoiceMulti:
        if (value) {
          result = <span>{value.map((val, index) => {
            if (index + 1 == value.length) {
              return <span style={{ color: semanticColors.bodyText }}>{val}</span>;
            }
            else {
              return <span style={{ color: semanticColors.bodyText }}>{val}<br></br></span>;
            }
          })}
          </span>;
        }
        else {
          result = <span></span>;
        }
        break;
      case SharePointType.LookupMulti:
        if (value) {
          result = <span>{value.map((val, index) => {
            if (index + 1 == value.length) {
              return <Link style={{ color: semanticColors.bodyText }} href="#">{val}</Link>;
            }
            else {
              return <span><Link style={{ color: semanticColors.bodyText }} href="#">{val}</Link><br></br></span>;
            }
          })}
          </span>;
        }
        else {
          result = <span></span>;
        }
        break;
      case SharePointType.Url:
        if (value && value.Url) {
          result = <Link href={value.Url} style={{ color: semanticColors.bodyText }}>{value.Description}</Link>;
        }
        else {
          result = <span></span>;
        }
        break;
      case SharePointType.Image:
        {
          if (value && value.Url) {
            const imageProps: IImageProps = {
              src: value.Url,
              imageFit: ImageFit.contain,
              width: 100,
              height: 100,
            };

            result = <Image
              {...imageProps}
              src={value.Url}
              alt={value.Description}
            />;
          }
          else {
            result = <span></span>;
          }
          break;
        }
      case SharePointType.NoteFullHtml:
        {
          if (value) {
            result = <span dangerouslySetInnerHTML={{ __html: value }}></span>;
          }
          else {
            result = <span></span>;
          }
          break;
        }
      default:
        result = <span style={{ color: semanticColors.bodyText }}>{value}</span>;
        break;
    }

    return result;
  }

  private GetItemValueFieldByFieldType(item: any, field: string, type: SharePointType, ommitCamlQuery: boolean = false, setGroupByEmptyValue: boolean = false): any {
    let result: any;
    let value = item[field];
    switch (type) {
      case SharePointType.FileIcon:
        {
          result = item.FileExtension;
          break;
        }
      case SharePointType.Boolean:
        {
          if (value) {
            result = value.toString();
          }
          break;
        }
      case SharePointType.User:
        {
          if (this.props.AnyCamlQuery && !ommitCamlQuery) {
            result = value;
          }
          else {
            if (!isEmpty(value)) {
              let user: IUserField = { Name: value.Title, Email: StringUtils.GetUserEmail(value.Name) };
              result = user;
            }
          }
          break;
        }
      case SharePointType.Url:
      case SharePointType.Image:
        {
          if (!isEmpty(value)) {
            let url: IUrlField = { Url: value.Url, Description: value.Description };
            result = url;
          }
          break;
        }
      case SharePointType.UserName:
        {
          if (this.props.AnyCamlQuery && !ommitCamlQuery) {
            result = value;
          }
          else {
            result = value && value.Title;
          }
          break;
        }
      case SharePointType.UserEmail:
        {
          if (this.props.AnyCamlQuery && !ommitCamlQuery) {
            result = value;
          }
          else {
            result = value && StringUtils.GetUserEmail(value.Name);
          }
          break;
        }
      case SharePointType.UserMulti:
        {
          if (this.props.AnyCamlQuery && !ommitCamlQuery) {
            result = value ? value.split(';') : "";
          }
          else {
            if (value && value.length > 0) {
              let personas: IFacepilePersona[] = value.map(user => {
                let email = StringUtils.GetUserEmail(user.Name);
                return { imageUrl: email ? `/_layouts/15/userphoto.aspx?UserName=${email}` : undefined, personaName: user.Title, imageInitials: StringUtils.GetUserInitials(user.Title), };
              });
              result = personas;
            }
          }
          break;
        }
      case SharePointType.Lookup:
        {
          if (this.props.AnyCamlQuery && !ommitCamlQuery) {
            result = value;
          }
          else {
            result = value && value.Title;
          }
          break;
        }
      case SharePointType.ChoiceMulti:
        {
          if (this.props.AnyCamlQuery && !ommitCamlQuery && value) {
            result = value ? value.split(',') : "";
          }
          else {
            result = value;
          }
          break;
        }
      case SharePointType.LookupMulti:
        {
          if (this.props.AnyCamlQuery && !ommitCamlQuery && value) {
            result = value ? value.split(';') : "";
          }
          else {
            result = value && value.map(val => { return val.Title; });
          }
          break;
        }
      case SharePointType.DateTime:
        {
          result = value && new Date(value).toLocaleDateString(this.props.Context.pageContext.cultureInfo.currentCultureName, {
            year: "numeric",
            month: "numeric",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          });
          break;
        }
      case SharePointType.Date:
        {
          result = value && new Date(value).toLocaleDateString(this.props.Context.pageContext.cultureInfo.currentCultureName);
          break;
        }
      case SharePointType.DateLongMonth:
        {
          result = value && new Date(value).toLocaleDateString(this.props.Context.pageContext.cultureInfo.currentCultureName, {
            year: "numeric",
            month: "long",
            day: "2-digit"
          });
          break;
        }
      case SharePointType.Taxonomy:
        {
          if (this.props.AnyCamlQuery && !ommitCamlQuery) {
            result = value;
          }
          else {
            if (value && value.Term) {
              result = value.Term;
            }
          }
          break;
        }
      case SharePointType.TaxonomyMulti:
        {
          result = value && value.map(tax => { return tax.Label; });
          break;
        }
      default:
        {
          result = value;
          break;
        }
    }

    return result || (setGroupByEmptyValue ? strings.GroupByEmptyValue : result);
  }

  private _groupBy(array, groupByField: string, groupByFieldType: SharePointType): IGroupedItems[] {
    let resArray: IGroupedItems[] = [];
    try {
      let elementsInGroups = groupBy(array, item => this.GetItemValueFieldByFieldType(item, groupByField, groupByFieldType, false, true));
      resArray = Object.keys(elementsInGroups).sort().map(group => {
        return { GroupName: group, Items: elementsInGroups[group] };
      });
      this._getDetailListGroups(resArray);
    }
    catch (error) {
      this.SetError(error, '_groupBy');
    }

    return resArray;
  }


  private _copyAndSort<T>(items: T[], columnKey: string, isSortedDescending?: boolean): T[] {
    const key = columnKey as keyof T;
    return items.slice(0).sort((a: T, b: T) => ((isSortedDescending ? a[key] < b[key] : a[key] > b[key]) ? 1 : -1));
  }

  private _onColumnClick = (ev: React.MouseEvent<HTMLElement>, column: IColumn): void => {
    const newColumns: IColumn[] = this.state.columns.slice();
    const currColumn: IColumn = newColumns.filter(currCol => column.key === currCol.key)[0];
    newColumns.forEach((newCol: IColumn) => {
      if (newCol === currColumn) {
        currColumn.isSortedDescending = !currColumn.isSortedDescending;
        currColumn.isSorted = true;
      } else {
        newCol.isSorted = false;
        newCol.isSortedDescending = true;
      }
    });

    if (this.props.groupByField) {
      const newGroupedElements = this.state.groupedItems.map(group => { return { GroupName: group.GroupName, Items: this._copyAndSort(group.Items, currColumn.fieldName!, currColumn.isSortedDescending) }; });
      this.setState({ columns: newColumns, groupedItems: newGroupedElements });
    }
    else {
      const newItems = this._copyAndSort(this.state.filterItems, currColumn.fieldName!, currColumn.isSortedDescending);
      this.setState({ columns: newColumns, filterItems: newItems });
    }

  }


  public render(): React.ReactElement<IListSearchProps> {
    const { semanticColors }: IReadonlyTheme = this.props.themeVariant;
    let clearAllButton = this.props.ClearAllFiltersBtnColor == "white" ? <DefaultButton text={this.props.ClearAllFiltersBtnText} className={styles.btn} onClick={(ev) => this._clearAllFilters()} /> :
      <PrimaryButton text={this.props.ClearAllFiltersBtnText} className={styles.btn} onClick={(ev) => this._clearAllFilters()} />;
    return (
      <div className={styles.listSearch} style={{ backgroundColor: semanticColors.bodyBackground, color: semanticColors.bodyText }}>
        <div className={styles.row}>
          <div className={styles.column}>
            <WebPartTitle title={this.props.title} updateProperty={(value: string) => this.props.updateTitle(value)} displayMode={this.props.displayMode} placeholder={strings.WebPartTitlePlaceHolder}></WebPartTitle>
            {this.state.errorMsg ?
              <MessageBar
                messageBarType={MessageBarType.error}
                isMultiline={false}
                truncated={true}>
                <b>{this.state.errorHeader}</b>{this.state.errorMsg}
              </MessageBar> :
              <React.Fragment>
                {this.props.clickEnabled && !this.state.isModalHidden && this.state.selectedItem && this.GetOnClickAction()}
                <div className={styles.rowTopInformation}>
                  {this.props.GeneralFilter &&
                    <div className={this.props.ShowClearAllFilters ? styles.ColGeneralFilterWithBtn : styles.ColGeneralFilterOnly}>
                      <Shimmer isDataLoaded={!this.state.isLoading} height={37}>
                        <SearchBox value={this.state.generalFilter} placeholder={this.props.GeneralFilterPlaceHolderText} onClear={() => this.clearGeneralFilter()} onChange={(ev, newValue) => this.filterListItemsByGeneralFilter(newValue, false, true, this.state.items, this.state.filterItems)} />
                      </Shimmer>
                    </div>
                  }
                  <div className={styles.ColClearAll}>
                    <Shimmer isDataLoaded={!this.state.isLoading}>
                      {this.props.ShowClearAllFilters && clearAllButton}
                    </Shimmer>
                  </div>
                </div>
                <div className={styles.rowData}>
                  <div className={styles.colData}>
                    {this.props.ShowItemCount &&
                      <Shimmer isDataLoaded={!this.state.isLoading} width={"25%"}><div className={styles.template_resultCount}>{this.props.ItemCountText.replace("{itemCount}", `${this.state.filterItems ? this.state.filterItems.length : 0}`)}</div></Shimmer>
                    }
                    <ShimmeredDetailsList
                      enableShimmer={this.state.isLoading}
                      items={this._getItems()}
                      columns={this.state.columns}
                      groups={!this.state.isLoading && this.props.groupByField && this.groups}
                      groupProps={{
                        showEmptyGroups: true,
                        isAllGroupsCollapsed: true,
                      }}
                      onRenderDetailsFooter={(detailsFooterProps) => this._onRenderDetails(detailsFooterProps, this._checkIndividualFilter("footer"), false)}
                      onRenderDetailsHeader={(detailsHeaderProps) => this._onRenderDetails(detailsHeaderProps, this._checkIndividualFilter("header"), true)}
                      selectionMode={SelectionMode.none}
                      onItemInvoked={this.props.clickEnabled && !this.props.oneClickOption ? this._onItemInvoked : null}
                      onRenderRow={(props, defaultRender) => this.getOnRowClickRender(props, defaultRender)}
                      onRenderItemColumn={this._renderItemColumn}
                      shimmerLines={this.props.ShowPagination ? this.props.ItemsInPage : 10}
                    />
                    {this.props.ShowPagination &&
                      <div className={styles.paginationContainer}>
                        <div className={styles.paginationContainer__paginationContainer}>
                          <div className={`${styles.paginationContainer__paginationContainer__pagination}`}>
                            <div className={styles.standard}>
                              <Pagination
                                activePage={this.state.activePage}
                                firstPageText={<Icon theme={this.props.themeVariant as ITheme} iconName='DoubleChevronLeft' />}
                                lastPageText={<Icon theme={this.props.themeVariant as ITheme} iconName='DoubleChevronRight' />}
                                prevPageText={<Icon theme={this.props.themeVariant as ITheme} iconName='ChevronLeft' />}
                                nextPageText={<Icon theme={this.props.themeVariant as ITheme} iconName='ChevronRight' />}
                                activeLinkClass={styles.active}
                                itemsCountPerPage={this.props.ItemsInPage}
                                totalItemsCount={this.state.filterItems ? this.state.filterItems.length : 0}
                                pageRangeDisplayed={5}
                                onChange={this.handlePageChange.bind(this)}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    }
                  </div>
                </div>
              </React.Fragment>}
          </div>
        </div>
      </div >);
  }
}
