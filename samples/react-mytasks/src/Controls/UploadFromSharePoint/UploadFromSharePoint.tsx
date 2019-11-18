import * as React from 'react';
import * as tsStyles from './UploadStyles';
import InfiniteScroll from 'react-infinite-scroller';
import styles from './UplaodFromSharePoint.module.scss';
import {
  Callout,
  DefaultButton,
  DefaultPalette,
  DetailsList,
  DetailsListLayoutMode,
  Dialog,
  DialogFooter,
  DialogType,
  FontWeights,
  IColumn,
  Icon,
  IconButton,
  IconType,
  IFacepilePersona,
  IPersonaSharedProps,
  Label,
  mergeStyleSets,
  MessageBar,
  MessageBarType,
  Persona,
  PersonaBase,
  PersonaSize,
  PrimaryButton,
  Selection,
  SelectionMode,
  ShimmeredDetailsList,
  Spinner,
  SpinnerSize,
  Stack,
  TextField,
  TooltipHost,
  BaseButton,
  Button
  } from 'office-ui-fabric-react';
import { format, parse, parseISO } from 'date-fns';
import {
  GroupOrder,
  IGrouping,
  IViewField,
  ListView
  } from '@pnp/spfx-controls-react/lib/ListView';
import { IListViewItems } from './IListViewItems';
import { IUploadFromSharePointProps } from './IUploadFromSharePointProps';
import { IUploadFromSharePointState } from './IUploadFromSharePointState';
import { PagedItemCollection } from '@pnp/sp';
import { utilities } from '../../utilities';
import { ITaskExternalReference } from '../../services/ITaskExternalReference';
import  *  as strings from 'MyTasksWebPartStrings';

export class UploadFromSharePoint extends React.Component<IUploadFromSharePointProps, IUploadFromSharePointState> {
  private _listItems: PagedItemCollection<any[]> ;
  private _selection: Selection;
  private util = new utilities();
  private _selectedItem : IListViewItems;
  constructor(props: IUploadFromSharePointProps) {
    super(props);

    const columns: IColumn[] = [
      {
        key: 'column1',
        name: 'File_x0020_Type',
        className: tsStyles.classNames.fileIconCell,
        iconClassName: tsStyles.classNames.fileIconHeaderIcon,
        iconName: 'Page',
        isIconOnly: true,
        fieldName: 'name',
        minWidth: 16,
        maxWidth: 16,
        onColumnClick: this._onColumnClick,
        onRender: (item: IListViewItems) => {
          return <Icon iconType={IconType.Image} imageProps={{src: item.fileTypeImageUrl, height: 22, width: 22}} />;
        }
      },
      {
        name: 'Name',
        key: 'column2',
        fieldName: 'FileLeafRef',
        minWidth: 200,
        maxWidth: 250,
        isResizable: true,
        isSorted: false,
        isSortedDescending: false,
        sortAscendingAriaLabel: 'Sorted A to Z',
        sortDescendingAriaLabel: 'Sorted Z to A',
        onColumnClick: this._onColumnClick,
        data: 'string',
        isPadded: true
      },
      {
        key: 'column3',
        name: 'Date Modified',
        fieldName: 'Modified',
        minWidth: 70,
        maxWidth: 90,
        isResizable: true,
        isSorted: true,
        isSortedDescending: false,
        onColumnClick: this._onColumnClick,
        data: 'string',
        isPadded: true
      }
    ];

    this.state = {
      selectItem: undefined,
      hasError: false,
      messageError: undefined,
      isloading: true,
      hideDialog: !this.props.displayDialog,
      listViewItems: [],
      hasMoreItems: false,
      disableSaveButton: true,
      columns: columns,
      messageInfo:'',
    };

    this._selection = new Selection({
      onSelectionChanged: () => {
        this._getSelectionDetails();
      }
    });
  }

  /**
   * Returns upload from share point
   * @returns did mount
   */
  public async componentDidMount(): Promise<void> {
    this.setState({isloading:true});
    await this._getListItems('Modified', false);
  }


/**
 * Components did update
 * @param prevProps
 * @param prevState
 * @returns did update
 */
public async componentDidUpdate(prevProps: IUploadFromSharePointProps, prevState: IUploadFromSharePointState): Promise<void> {

  if (this.props.groupId !== prevProps.groupId || this.props.displayDialog !== prevProps.displayDialog) {
    this.setState({ hideDialog: !this.props.displayDialog });
    this.setState({isloading:true});
    await this._getListItems('Modified', false);
  }
}


  /**
   * Get list items of upload from share point
   */
  private _getListItems = async (sortField: string , ascending:boolean) => {
    const { spservice, groupId } = this.props;
    const items: IListViewItems[] = [];

    try {
      this._listItems = await spservice.getSharePointFiles(groupId,sortField, ascending);
      for (const item of this._listItems.results) {

        if (item.File === undefined) continue;
        const fileTypeImageUrl =    await this.util.GetFileImageUrl(item.File.Name);
        items.push({ FileLeafRef : item.File.Name, Modified: format(parseISO(item.File.TimeLastModified),'P'), fileTypeImageUrl: fileTypeImageUrl , fileUrl: item.File.ServerRelativeUrl});
      }
      this.setState({ listViewItems: items, hasError: false, messageError: '' , isloading: false, hasMoreItems: this._listItems.hasNext});
    } catch (error) {
      this.setState({ hasError: true, messageError: error.message ,isloading: false});
    }
  }

  /**
   * Get list items next page of upload from share point
   */
  private _getListItemsNextPage = async () => {
  this._listItems = await this._listItems.getNext();
   let  items: IListViewItems[]=[];
    let {listViewItems} = this.state;
  for (const item of this._listItems.results) {
    console.log(item.File);
    if (item.File === undefined) continue;
    const fileTypeImageUrl =    await this.util.GetFileImageUrl(item.File.Name);
    items.push({ FileLeafRef : item.File.Name, Modified: format(parseISO(item.File.TimeLastModified),'P'), fileTypeImageUrl: fileTypeImageUrl , fileUrl: item.File.ServerRelativeUrl});
  }
  this.setState({ listViewItems: listViewItems.concat(items), hasError: false, messageError: '' , isloading: false, hasMoreItems: this._listItems.hasNext});
  }
  /**
   * Close dialog of upload from share point
   */
  private _closeDialog = (ev?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    this.setState({ hideDialog: true });
    this.props.onDismiss();
  }

  /**
   * Determines whether column click on
   */
  private _onColumnClick =  async (ev: React.MouseEvent<HTMLElement>, column: IColumn): Promise<void> => {
    // tslint:disable-next-line: no-shadowed-variable
    const { columns , hasMoreItems} = this.state;

    const newColumns: IColumn[] = columns.slice();
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
    if ( hasMoreItems) { // has more  items to load get items sorted by clicked columns and direction
     await this._getListItems(currColumn.fieldName, currColumn.isSortedDescending);
    }
    let {listViewItems} = this.state;
    // Sort Items
    const newItems = this._copyAndSort(listViewItems , currColumn.fieldName!, currColumn.isSortedDescending);
    this.setState({
      columns: newColumns,
      listViewItems : newItems
    });
  }

  /**
   * Copys and sort
   * @template T
   * @param items
   * @param columnKey
   * @param [isSortedDescending]
   * @returns and sort
   */
  private _copyAndSort<T>(items: T[], columnKey: string, isSortedDescending?: boolean): T[] {
    const key = columnKey as keyof T;
    return items.slice(0).sort((a: T, b: T) => ((isSortedDescending ? a[key] < b[key] : a[key] > b[key]) ? 1 : -1));
  }




  /**
   * Gets selection details
   */
  private _getSelectionDetails() {
    const selectionCount = this._selection.getSelectedCount();

    switch (selectionCount) {
      case 0:
        this.setState({
          selectItem: null,
          disableSaveButton: true,
        });
       break;
      case 1:
        const  currentReferences = this.props.currentReferences;
          const fileServerRelativeUrl = (this._selection.getSelection()[0] as IListViewItems).fileUrl;
          const fileFullUrl: string =
          (`${location.origin}${fileServerRelativeUrl}`).replace(/\./g, '%2E').replace(/\:/g, '%3A') + `?web=1`;
          if ( currentReferences[fileFullUrl] ==  null) {
            this.setState({
              selectItem: this._selection.getSelection()[0] as IListViewItems,
              disableSaveButton: false,
              messageInfo: '',
            });
          }else{
            this.setState({messageInfo: strings.FileAlreadyAddedToTaskLabel});
          }
        break;
      default:
    }
  }


 /**
  * Determines whether select file on
  */
 private _onSelectFile = async (event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement | HTMLDivElement | BaseButton | Button, MouseEvent>) => {
   try {
      this.props.onSelectedFile({fileUrl: this.state.selectItem.fileUrl,FileLeafRef: this.state.selectItem.FileLeafRef});
      this.setState({ hideDialog: true });
   } catch (error) {

   }
 }

 private _onActiveItemChanged = (item:IListViewItems,index:number, ev:React.FocusEvent<HTMLElement>) => {

  ev.preventDefault();
  this._selectedItem = item;
  }

  /**
   * Renders upload from sharepoint
   * @returns render
   */
  public render(): React.ReactElement<IUploadFromSharePointProps> {
    return (
      <div>
        <Dialog
          hidden={this.state.hideDialog}
          onDismiss={this._closeDialog}
          minWidth={650}
          maxWidth={650}
          dialogContentProps={{
            type: DialogType.normal,
            title: strings.DocumentsLabel
          }}
          modalProps={{
            isBlocking: true,
            styles: tsStyles.modalStyles
            //  topOffsetFixed: true
          }}>
          {this.state.isloading ? (
            <div  style={{ height:  300, overflow: 'auto' }}>
            <Spinner size={SpinnerSize.medium} label={strings.LoadingLabel}></Spinner>
            </div>
          ) : (
            <>
              {this.state.hasError && <MessageBar messageBarType={MessageBarType.error}>{this.state.messageError}</MessageBar>}
              <div  style={{ height:  300, overflow: 'auto' }}>
              <Label>{this.state.messageInfo}</Label>
              <InfiniteScroll
              pageStart={0}
              loadMore={this._getListItemsNextPage}
              hasMore={this.state.hasMoreItems}
              threshold={20}
              useWindow={false}>
              <DetailsList
              items={this.state.listViewItems}
              compact={false}
              columns={this.state.columns}
              selectionMode={SelectionMode.single}
              setKey="none"
              layoutMode={DetailsListLayoutMode.justified}
              isHeaderVisible={true}
              selection={this._selection}
            />
            </InfiniteScroll>
              </div>
            </>
          )}
          <DialogFooter>
          <PrimaryButton onClick={this._onSelectFile} text={strings.SaveLabel} disabled={this.state.disableSaveButton}/>
          <DefaultButton onClick={this._closeDialog} text={strings.CancelLabel} />
        </DialogFooter>
        </Dialog>
      </div>
    );
  }
}
