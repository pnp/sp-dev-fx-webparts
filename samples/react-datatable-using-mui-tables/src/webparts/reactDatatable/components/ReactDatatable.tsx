import * as React from 'react';
import styles from './ReactDatatable.module.scss';
import { IReactDatatableProps } from './IReactDatatableProps';
import { IReactDatatableState } from './IReactDatatableState';
import { SPService } from '../../../shared/service/SPService';
import { Row } from '../../../shared/common/ExpandableRow/Row';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Box, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, Typography } from '@material-ui/core';
import { Link, SearchBox } from 'office-ui-fabric-react';
import { ExportListItemsToCSV } from '../../../shared/common/ExportListItemsToCSV/ExportListItemsToCSV';
import { ExportListItemsToPDF } from '../../../shared/common/ExportListItemsToPDF/ExportListItemsToPDF';
import { Pagination } from '../../../shared/common/Pagination/Pagination';
import { DetailsRow, IDetailsRowStyles, IDetailsListProps, IColumn } from 'office-ui-fabric-react';
import { pdfCellFormatter } from '../../../shared/common/ExportListItemsToPDF/ExportListItemsToPDFFormatter';
import { csvCellFormatter } from '../../../shared/common/ExportListItemsToCSV/ExportListItemsToCSVFormatter';
import { IPropertyPaneDropdownOption } from '@microsoft/sp-property-pane';
import { RenderProfilePicture } from '../../../shared/common/RenderProfilePicture/RenderProfilePicture';
import { ViewColumnRounded } from '@material-ui/icons';
import { toLower } from 'lodash';

export default class ReactDatatable extends React.Component<IReactDatatableProps, IReactDatatableState> {

  private _services: SPService = null;

  constructor(props: IReactDatatableProps) {
    super(props);
    this.state = {
      listItems: [],
      columns: [],
      page: 0,
      searchText: '',
      rowsPerPage: 5,
      sortingFields: '',
      sortDirection: 'asc',
      contentType: '',
      pageOfItems: []
    };
    this._services = new SPService(this.props.context);
    this._onConfigure = this._onConfigure.bind(this);
    this.getSelectedListItems = this.getSelectedListItems.bind(this);
  }

  public componentDidMount() {
    this.getSelectedListItems();
  }

  private getUserProfileUrl = (loginName: string) => {
    return this._services.getUserProfileUrl(loginName);
  }

  public componentDidUpdate(prevProps: IReactDatatableProps) {
    if (prevProps.list !== this.props.list) {
      this.props.onChangeProperty("list");
    }
    else if (this.props.fields != prevProps.fields) {
      this.getSelectedListItems();
    }
  }

  public async getSelectedListItems() {
    let fields = this.props.fields || [];
    if (fields.length) {
      let listItems = await this._services.getListItems(this.props.list, fields);
      /** Format list items for data grid */
      listItems = listItems && listItems.map(item => ({
        id: item.Id, AttachmentFiles: item.AttachmentFiles, ...fields.reduce((ob, f) => {
          ob[f.key] = item[f.key] ? this.formatColumnValue(item[f.key], f.fieldType, f.allowMultipleValues) : '-';
          return ob;
        }, {})
      }));
      let dataGridColumns: IColumn[] = [...fields].map(f => ({
        key: f.key as string,
        name: f.text,
        fieldName: f.key as string,
        isResizable: true,
        onColumnClick: undefined,
        minWidth: 70,
        maxWidth: 100,
        headerClassName: styles.colHeader
      }));
      this.setState({ listItems: listItems, columns: dataGridColumns });
    }
  }

  private _onConfigure() {
    this.props.context.propertyPane.open();
  }


  public formatColumnValue(value: any, type: string, allowMultipleValues: boolean) {
    if (!value) {
      return value;
    }
    switch (type) {
      case 'SP.FieldDateTime':
        value = value;
        break;
      case 'SP.FieldMultiChoice':
        value = (value instanceof Array) ? value.join() : value;
        break;
      case 'SP.Taxonomy.TaxonomyField':
        value = value['Label'];
        break;
      case 'SP.FieldLookup':
        if (allowMultipleValues) {
          let valueArray = value.map( (obj) =>{
            return obj.Title;
          });
          value = valueArray.join(', ');
        } else {
          value = value['Title'];
        }
        break;
      case 'SP.FieldUser':
        let loginName = value['Name'];
        let userName = value['Title'];
        value = <RenderProfilePicture loginName={loginName} displayName={userName} getUserProfileUrl={() => this.getUserProfileUrl(loginName)}  ></RenderProfilePicture>;
        break;
      case 'SP.FieldMultiLineText':
        value = <div dangerouslySetInnerHTML={{ __html: value }}></div>;
        break;
      case 'SP.FieldText':
        value = value;
        break;
      case 'SP.FieldComputed':
        value = value;
        break;
      case 'SP.FieldUrl':
        value = <Link href={value['Url']} target="_blank">{value['Description']}</Link>;
        break;
      case 'SP.FieldLocation':
        value = JSON.parse(value).DisplayName;
        break;
      default:
        break;
    }
    return value;
  }

  public formatValueForExportingData(value: any, type?: string) {
    if (!value) {
      return value;
    }
    switch (type) {
      case 'SP.FieldUser':
        let userName = value['Title'];
        value = userName;
        break;
      case 'SP.FieldUrl':
        let url = value['Url'];
        let description = value['Description'];
        value = <a href={url}>{description}</a>;
        break;
      default:
        break;
    }
    return value;
  }

  private exportDataFormatter(fields: Array<IPropertyPaneDropdownOption & { fieldType: string }>, listItems: any[], cellFormatterFn: (value: any, type: string) => any) {
    return listItems && listItems.map(item => ({
      ...fields.reduce((ob, f) => {
        ob[f.text] = item[f.key] ? cellFormatterFn(item[f.key], f.fieldType).split(',').join(';') : '-';
        return ob;
      }, {})
    }));
  }

  private handlePaginationChange(pageNo: number, rowsPerPage: number) {
    this.setState({ page: pageNo, rowsPerPage: rowsPerPage });
  }

  public handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ searchText: event.target.value });
  }

  public filterListItems() {
    let { searchBy, enableSorting } = this.props;
    let { sortingFields, listItems, searchText } = this.state;
    if (searchText) {
      if (searchBy) {
        listItems = listItems && listItems.length && listItems.filter(l => searchBy.some(field => {
          return (l[field] && l[field].toString().toLowerCase().includes(searchText.toLowerCase()));
        }));
      }
    }
    if (enableSorting && sortingFields) {
      listItems = this.sortListItems(listItems);
    }
    return listItems;
  }

  private sortListItems(listItems: any[]) {
    const { sortingFields, sortDirection } = this.state;
    const isAsc = sortDirection === 'asc' ? 1 : -1;
    let sortFieldDetails = this.props.fields.filter(f => f.key === sortingFields)[0];
    let sortFn: (a, b) => number;
    switch (sortFieldDetails.fieldType) {
      case 'SP.FieldDateTime':
        sortFn = (a, b) => ((new Date(a[sortingFields]).getTime() > new Date(b[sortingFields]).getTime()) ? 1 : -1) * isAsc;
        break;
      case 'SP.FieldText':
        sortFn = (a, b) => ((a[sortingFields].toLowerCase() > b[sortingFields].toLowerCase()) ? 1 : -1) * isAsc;
        break;
      default:
        sortFn = (a, b) => ((a[sortingFields] > b[sortingFields]) ? 1 : -1) * isAsc;
        break;
    }
    listItems.sort(sortFn);
    return listItems;
  }

  private paginateFn = (filterItem: any[]) => {
    let { rowsPerPage, page } = this.state;
    return (rowsPerPage > 0
      ? filterItem.slice((page) * rowsPerPage, (page) * rowsPerPage + rowsPerPage)
      : filterItem
    );
  }

  private handleSorting = (property: string) => {
    let { sortingFields, sortDirection } = this.state;
    const isAsc = sortingFields && sortingFields === property && sortDirection === 'asc';
    let updateColumns = this.state.columns.map(c => {
      return c.key === property ? { ...c, isSorted: true, isSortedDescending: (isAsc ? false : true) } : { ...c, isSorted: false, isSortedDescending: true };
    });
    this.setState({ sortDirection: (isAsc ? 'desc' : 'asc'), sortingFields: property, columns: updateColumns });
  }

  public alert() {
    alert("jj");
  }

  public render(): React.ReactElement<IReactDatatableProps> {
    let filteredItems = this.filterListItems();
    let { list, fields, enableDownloadAsCsv, enableDownloadAsPdf, enablePagination, displayMode, enableSearching, title, evenRowColor, oddRowColor } = this.props;
    let { columns, sortingFields, sortDirection } = this.state;
    let currentThis = this;
    columns = columns.filter(column => { return column.name != "Attachments"; });

    let filteredPageItems = enablePagination ? this.paginateFn(filteredItems) : filteredItems;
    return (
      <div className={styles.reactDatatable}>
        <Grid container className={styles.dataTableUtilities}>
          <Grid item xs={6} className={styles.downloadButtons}>
            {enableDownloadAsCsv
              ? <ExportListItemsToCSV
                columnHeader={columns.map(c => c.name)}
                listName={list}
                description={'Talent Pool'}
                dataSource={() => this.exportDataFormatter(fields, filteredItems, csvCellFormatter)}
              /> : <></>}
            {enableDownloadAsPdf
              ? <ExportListItemsToPDF
                listName={list}
                title={'Talent Pool'}
                columns={columns.map(c => c.name)}
                oddRowColor={oddRowColor}
                evenRowColor={evenRowColor}
                dataSource={() => this.exportDataFormatter(fields, filteredItems, pdfCellFormatter)} />
              : <></>}
          </Grid>
          <Grid container justify='flex-end' xs={6}>
            {enableSearching ?
              <TextField
                onChange={this.handleSearch.bind(this)}
                placeholder="Search"
                className={styles.txtSearchBox} />
              : <></>}

          </Grid>
        </Grid>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow style={{ background: "#dadada" }}>
                {columns.map(column => {
                  return <TableCell
                    style={{ fontWeight: "bold" }}
                    sortDirection={sortingFields === column.key ? sortDirection : false}
                  >
                    <TableSortLabel
                      active={sortingFields === column.key}
                      direction={sortingFields === column.key ? sortDirection : 'asc'}
                      onClick={() => { this.handleSorting(column.key as string); }}
                    >
                      {column.name}
                    </TableSortLabel>
                  </TableCell>;
                })}
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredPageItems.map(row => {
                return <Row columns={columns} row={row}></Row>;
              })}
            </TableBody>
            {this.props.enablePagination ?
              <Pagination
                currentPage={this.state.page}
                totalItems={filteredItems.length}
                onChange={this.handlePaginationChange.bind(this)} />
              : <></>}
          </Table>
        </TableContainer></div>);
  }
}
