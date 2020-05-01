import * as React from 'react';
import styles from './Documents.module.scss';
import { escape } from '@microsoft/sp-lodash-subset';
import { DisplayMode } from '@microsoft/sp-core-library';
import {
  Link, MarqueeSelection, DetailsList, Selection, Image, ImageFit,
  SelectionMode, Spinner, SpinnerSize, Fabric, ColumnActionsMode, IColumn, CheckboxVisibility,
  Callout, Panel, PanelType, IContextualMenuItem, autobind, ContextualMenu, IContextualMenuProps, DirectionalHint,
  css,
  MessageBarType,
  MessageBar
} from 'office-ui-fabric-react';

import { IDocumentsProps } from './IDocumentsProps';
import IDocumentsState from './IDocumentsState';
import * as _ from "lodash";
import MockupDataProvider from '../../../dataproviders/MockupDataProvider';
import IDataProvider from '../../../dataproviders/IDataProvider';
import { IDocument } from '../../../common/IObjects';
import { Utils } from '../../../common/Utils';



export default class LibraryDocuments extends React.Component<IDocumentsProps, IDocumentsState> {


  private _selection: Selection;
  private _isConfigurationValid: boolean = true;

  constructor(props: IDocumentsProps) {
    super(props);

    this._isConfigurationValid = false;
    if (props.dataProvider) {
      this._isConfigurationValid = props.dataProvider.validateSettings();
    }

    this.state = {
      allDocuments: [],
      displayedDocuments: [],
      isLoading: true,
      contextualMenuProps: null,
      columns: this._setupColumns()
    };

    this._renderItemColumn = this._renderItemColumn.bind(this);
    this._onResetFiltersClicked = this._onResetFiltersClicked.bind(this);
    this._onContextualMenuDismissed = this._onContextualMenuDismissed.bind(this);
    this._getContextualMenuProps = this._getContextualMenuProps.bind(this);

  }

  public render(): React.ReactElement<IDocumentsProps> {

    let { contextualMenuProps } = this.state;

    /* if (!this._isConfigurationValid && this.props.webPartDisplayMode === DisplayMode.Edit) {
       return (
         <div className={styles.notification}>
           <div className={styles.notificationIcon}>
             <i className={css("ms-Icon ms-Icon--ErrorBadge", styles.notificationIcon)} aria-hidden="true"></i>
             <span className={styles.notificationHeader}>
               Edit Mode
                </span>
           </div>
         </div>);
     }
     if (!this._isConfigurationValid && this.props.webPartDisplayMode === DisplayMode.Read) {
       return (
         <div>
           <div className={styles.notification}>
             <div className={styles.notificationIcon}>
               <i className={css("ms-Icon ms-Icon--ErrorBadge", styles.notificationIcon)} aria-hidden="true"></i>
               <span className={styles.notificationHeader}>
                 Preview Mode
                   </span>
             </div>
           </div>
         </div>);
 
 
     }*/
    if (this._isConfigurationValid) {

      if (this.state.isLoading) {
        if (SpinnerSize && SpinnerSize.large) {
          return (<div className={styles.loadingWrapper}>
            <Spinner size={SpinnerSize.large} label='Loading documents...' />
          </div>);
        }
      }
      else {

        if (this.state.isErrorOccured) {
          return (<div>
            <div className={styles.notification}>
              <div className={styles.notificationIcon}>
                <i className={css("ms-Icon ms-Icon--ErrorBadge", styles.notificationIcon)} aria-hidden="true"></i>
                <span className={styles.notificationHeader}>
                  Something went wrong...
                  </span>
              </div>
              <div className={styles.notificationDescription}>
                <span>
                  {this.state.errorMessage}
                </span>
              </div>
            </div>
          </div>);
        }

        return (
          <div>
            <div className={styles.topBar}>
              <span className={styles.topBarText}>{this.props.title}</span>
              <div className={styles.topBarFilters} >
                {this.state.showResetFilters && (
                  <span className={styles.resetFilter}>
                    <i className="ms-Icon ms-Icon--ClearFilter"
                      aria-hidden="false"
                      role="button"
                      onClick={this._onResetFiltersClicked} >
                    </i>
                  </span>
                )}
              </div>
            </div>
            <div>
              <MarqueeSelection selection={this._selection}>
                <DetailsList
                  className={styles.docsWrapper}
                  columns={this.state.columns}
                  items={this.state.displayedDocuments}
                  onItemInvoked={(item) => { this._openDocument(item, this); }}
                  selectionPreservedOnEmptyClick={true}
                  onRenderItemColumn={this._renderItemColumn}
                  checkboxVisibility={CheckboxVisibility.hidden} />
                {contextualMenuProps && (
                  <ContextualMenu {...contextualMenuProps} />
                )}
              </MarqueeSelection>
            </div>
          </div>
        );
      }
    }
    else {
      return (<MessageBar
        messageBarType={MessageBarType.warning}
        isMultiline={false}
        dismissButtonAriaLabel="Close">
        Please enter the Library URL from the PropertyPane.
          </MessageBar>);
    }
  }


  public componentDidMount() {
    debugger;
    if (this._isConfigurationValid) {

      if (this.props.useSearchData) {
        this.props.dataProvider.readDocumentsFromSearch().then(
          (documents: IDocument[]) => {
            debugger;
            this.setState({
              allDocuments: documents,
              displayedDocuments: documents,
              isLoading: false,
              columns: this.state.columns
            });

          },
          (data: any) => {

            this.setState({
              allDocuments: [],
              displayedDocuments: [],
              isLoading: false,
              isErrorOccured: true,
              errorMessage: data
            });

          }).catch((ex) => {

            this.setState({
              allDocuments: [],
              displayedDocuments: [],
              isLoading: false,
              isErrorOccured: true,
              errorMessage: ex.errorMessage
            });
          });
      }
      else {
        this.props.dataProvider.readDocumentsFromLibrary().then(
          //resolve
          (documents: IDocument[]) => {
            debugger;
            this.setState({
              allDocuments: documents,
              displayedDocuments: documents,
              isLoading: false,
              columns: this.state.columns
            });

          },
          //reject
          (data: any) => {

            this.setState({
              allDocuments: [],
              displayedDocuments: [],

              isLoading: false,
              isErrorOccured: true,
              errorMessage: data
            });
          }
        ).catch((ex) => {
          debugger;
          this.setState({
            allDocuments: [],
            displayedDocuments: [],
            isLoading: false,
            isErrorOccured: true,
            errorMessage: ex.errorMessage
          });

        });
      }

    }
  }
  /**
   *  Specify the columns and their properties
   */
  private _setupColumns(): IColumn[] {

    const columnsSingleClient: IColumn[] =
      [{
        key: 'FileIcon',
        name: '',
        fieldName: 'FileIcon',
        minWidth: 20,
        maxWidth: 20,
        isResizable: true,
        data: String
      },
      {
        key: 'Name',
        name: 'Name',
        fieldName: 'Name',
        minWidth: 100,
        isResizable: true,
        isSorted: false,
        isSortedDescending: false,
        columnActionsMode: ColumnActionsMode.hasDropdown,
        onColumnClick: this._onColumnClick,
        onColumnContextMenu: this._onColumnContextMenu,
        data: String
      },
      {
        key: 'ContentType',
        name: 'Content Type',
        fieldName: 'ContentType',
        minWidth: 80,
        isResizable: true,
        isSorted: false,
        isSortedDescending: false,
        columnActionsMode: ColumnActionsMode.hasDropdown,
        onColumnClick: this._onColumnClick,
        onColumnContextMenu: this._onColumnContextMenu,
        data: String
      },
      {
        key: 'Id',
        name: 'ID',
        fieldName: 'Id',
        minWidth: 60,
        isResizable: true,
        isSorted: false,
        isSortedDescending: false,
        columnActionsMode: ColumnActionsMode.hasDropdown,
        onColumnClick: this._onColumnClick,
        onColumnContextMenu: this._onColumnContextMenu,
        data: Number
      },
      {
        key: 'VersionString',
        name: 'Version',
        fieldName: 'VersionString',
        minWidth: 60,
        isResizable: true,
        isSorted: false,
        isSortedDescending: false,
        data: String
      },
      {
        key: 'Modified',
        name: 'Modified',
        fieldName: 'Modified',
        minWidth: 80,
        isResizable: true,
        isSorted: false,
        isSortedDescending: false,
        columnActionsMode: ColumnActionsMode.hasDropdown,
        onColumnClick: this._onColumnClick,
        onColumnContextMenu: this._onColumnContextMenu,
        data: Date
      },
      {
        key: 'ModifiedBy',
        name: 'Modified By',
        fieldName: 'ModifiedBy',
        minWidth: 80,
        isResizable: true,
        isSorted: false,
        isSortedDescending: false,
        columnActionsMode: ColumnActionsMode.hasDropdown,
        onColumnClick: this._onColumnClick,
        onColumnContextMenu: this._onColumnContextMenu,
        data: String
      },
      ];

    return columnsSingleClient;
  }

  private _onResetFiltersClicked() {

    let columns = this.state.columns;
    //reset the columns
    _.map(columns, (c: IColumn) => {

      c.isSorted = false;
      c.isSortedDescending = false;
      c.isFiltered = false;

    });
    //update the state, this will force the control to refresh
    this.setState({
      displayedDocuments: this.state.allDocuments,
      showResetFilters: false,
      columns: columns
    });

  }

  private _renderItemColumn(item, index, column) {
    //here we can add column specific logic
    // - image control for the FileIcon column
    // - render link for the Name column
    let fieldContent = item[column.fieldName];

    switch (column.key) {
      case 'FileIcon':
        return <Image src={fieldContent} width={16} height={16} imageFit={ImageFit.center} />;
      case 'Name':
        return <Link data-selection-invoke={true} >{item[column.key]}</Link>;
      default:
        return <span>{fieldContent}</span>;
    }

  }

  private _openDocument(docItem: IDocument, thisContext: any): void {
    debugger;
    let utility = new Utils();
    utility.OpenDocument(docItem, thisContext, true);
  }

  @autobind
  private _onSortColumn(column: IColumn, isSortedDescending: boolean) {

    column = _.find(this.state.columns, c => c.fieldName === column.fieldName);
    column.isSortedDescending = isSortedDescending;
    column.isSorted = true;

    //reset the other columns
    let modifeidColumns: IColumn[] = this.state.columns;
    _.map(modifeidColumns, (c: IColumn) => {
      if (c.fieldName != column.fieldName) {
        c.isSorted = false;
        c.isSortedDescending = false;
      }
    });

    let modifiedDocs: any = this.state.displayedDocuments;

    modifiedDocs = _.orderBy(
      modifiedDocs,
      [(document) => {
        console.log(document[column.fieldName]);
        console.log(typeof (document[column.fieldName]));

        if (column.data == Number) {
          if (document[column.fieldName]) {
            return parseInt(document[column.fieldName]);
          }
          return 0;
        }
        if (column.data == Date) {
          if (document[column.fieldName]) {

            return new Date(document[column.fieldName]);
          }
          return new Date(0);
        }

        return document[column.fieldName];
      }],
      [column.isSortedDescending ? "desc" : "asc"]);

    this.setState({
      displayedDocuments: modifiedDocs,
      showResetFilters: true,
      columns: modifeidColumns
    });
  }

  @autobind
  public ClickFilter(ev?: React.MouseEvent<HTMLElement>, item?: IContextualMenuItem): void {
    debugger;
    if (item) {
      let columns = this.state.columns;

      columns.filter(matchColumn => matchColumn.key === item.data)
        .forEach((filteredColumn: IColumn) => {
          filteredColumn.isFiltered = true;
        });

      let documents = this.state.displayedDocuments;
      let newDocs = [];
      if (item.data != "Tags") {
        newDocs = documents.filter(matchDoc => matchDoc[item.data] === item.key);
      }
      else {
        for (let i = 0; i < documents.length; i++) {
          let itemValue: string = documents[i][item.data];
          if (itemValue.indexOf(item.key) > -1) {
            newDocs.push(documents[i]);
          }
        }

      }
      this.setState({ displayedDocuments: newDocs, showResetFilters: true });
    }
  }

  @autobind
  private _onColumnClick(ev: React.MouseEvent<HTMLElement>, column: IColumn) {
    debugger;
    if (column.columnActionsMode !== ColumnActionsMode.disabled) {
      this.setState({
        contextualMenuProps: this._getContextualMenuProps(ev, column)
      });
    }
  }

  @autobind
  private _onColumnContextMenu(column: IColumn, ev: React.MouseEvent<HTMLElement>) {
    debugger;
    if (column.columnActionsMode !== ColumnActionsMode.disabled) {
      this.setState({
        contextualMenuProps: this._getContextualMenuProps(ev, column)
      });
    }
  }

  private _getContextualMenuProps(ev: React.MouseEvent<HTMLElement>, column: IColumn): IContextualMenuProps {
    debugger;
    let utility = new Utils();
    let items: IContextualMenuItem[] = utility.GetSortingMenuItems(column, this._onSortColumn);
    if (this.isFilterable(column.key)) {
      items.push({
        key: 'filterBy',
        name: 'Filter by ',// + column.name,
        canCheck: true,
        checked: column.isFiltered,
        subMenuProps: {
          items: this._GetFilterValues(column)
        }
      });
    }

    return {
      items: items,
      target: ev.currentTarget as HTMLElement,
      directionalHint: DirectionalHint.bottomLeftEdge,
      gapSpace: 10,
      isBeakVisible: true,
      onDismiss: this._onContextualMenuDismissed
    };
  }

  private _onContextualMenuDismissed() {
    this.setState({
      contextualMenuProps: null
    });
  }

  private _GetFilterValues(column: IColumn): IContextualMenuItem[] {

    debugger;
    let utility = new Utils();
    let filters = utility.GetFilterValues(column, this.state.displayedDocuments, this.ClickFilter);
    return filters;
  }

  // one approach of how to control where to have filter menu 
  private isFilterable(columnKey: string): boolean {
    return columnKey != "Name";
  }
}
