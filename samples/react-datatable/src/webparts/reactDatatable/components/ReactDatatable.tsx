import * as React from 'react';
import styles from './ReactDatatable.module.scss';
import { IReactDatatableProps } from './IReactDatatableProps';
import { IReactDatatableState } from './IReactDatatableState';
import * as strings from 'ReactDatatableWebPartStrings';
import { SPService } from '../../../shared/service/SPService';
import { Placeholder } from "@pnp/spfx-controls-react/lib/Placeholder";
import { DisplayMode } from '@microsoft/sp-core-library';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import { Alert, AlertTitle } from '@material-ui/lab';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableFooter from '@material-ui/core/TableFooter';
import TableRow from '@material-ui/core/TableRow';
import { Grid, InputAdornment, Link, TextField } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { WebPartTitle } from "@pnp/spfx-controls-react/lib/WebPartTitle";
import { withStyles, Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import { ExportListItemsToCSV } from '../../../shared/common/ExportListItemsToCSV/ExportListItemsToCSV';
import { ExportListItemsToPDF } from '../../../shared/common/ExportListItemsToPDF/ExportListItemsToPDF';
import { Pagination } from '../../../shared/common/Pagination/Pagination';

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: theme.palette.grey[200],
    },
    body: {
      fontSize: 14,
    },
  }),
)(TableCell);

export default class ReactDatatable extends React.Component<IReactDatatableProps, IReactDatatableState> {

  private _services: SPService = null;

  constructor(props: IReactDatatableProps) {
    super(props);
    this.state = {
      listItems: [],
      columns: [],
      page: 0,
      rowsPerPage: 5,
      searchText: '',
      sortingFields: '',
      sortDirection: 'asc',
      contentType: ''
    };
    this._services = new SPService(this.props.context);
    this._onConfigure = this._onConfigure.bind(this);
    this.getSelectedListItems = this.getSelectedListItems.bind(this);
  }

  public componentDidMount() {
    this.getSelectedListItems();
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
        id: item.Id, ...fields.reduce((ob, f) => {
          ob[f.key] = item[f.key] ? this.formatColumnValue(item[f.key], f.fieldType) : '-';
          return ob;
        }, {})
      }));
      let dataGridColumns = [...fields].map(f => ({ field: f.key as string, headerName: f.text }));
      this.setState({ listItems: listItems, columns: dataGridColumns });
    }
  }

  private _onConfigure() {
    this.props.context.propertyPane.open();
  }

  public formatColumnValue(value: any, type: string) {
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
        value = value['Title'];
        break;
      case 'SP.FieldUser':
        value = value['Title'];
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

  private handlePaginationChange(pageNo: number, pageSize: number) {
    this.setState({ page: pageNo, rowsPerPage: pageSize });
  }

  public handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ searchText: event.target.value });
  }

  public filterListItems() {
    let { searchBy, enableSorting } = this.props;
    let { sortingFields, listItems, searchText } = this.state;
    if (searchText) {
      if (searchBy) {
        listItems = listItems.filter(l => searchBy.some(field => {
          return (l[field] && l[field].toLowerCase().includes(searchText.toLowerCase()));
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
      ? filterItem.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      : filterItem
    );
  }

  private handleSorting = (property: string) => (event: React.MouseEvent<unknown>) => {
    let { sortingFields, sortDirection } = this.state;
    const isAsc = sortingFields === property && sortDirection === 'asc';
    this.setState({ sortDirection: (isAsc ? 'desc' : 'asc'), sortingFields: property });
  }

  public render(): React.ReactElement<IReactDatatableProps> {
    let filteredItems = this.filterListItems();
    let { list, fields, enableDownloadAsCsv, enableDownloadAsPdf, enablePagination, displayMode, enableSearching, title, evenRowColor, oddRowColor, sortBy } = this.props;
    let { sortingFields, sortDirection, columns, listItems } = this.state;
    filteredItems = enablePagination ? this.paginateFn(filteredItems) : filteredItems;

    return (
      <div className={styles.reactDatatable}>
        {
          this.props.list == "" || this.props.list == undefined ?
            <Placeholder
              iconName='Edit'
              iconText='Configure your web part'
              description={strings.ConfigureWebpartDescription}
              buttonLabel={strings.ConfigureWebpartButtonLabel}
              hideButton={displayMode === DisplayMode.Read}
              onConfigure={this._onConfigure} /> : <>
              <WebPartTitle
                title={title}
                displayMode={DisplayMode.Read}
                updateProperty={() => { }}>
              </WebPartTitle>
              { list && fields && fields.length ?
                <div>
                  <Grid container className={styles.dataTableUtilities}>
                    <Grid item xs={6} className={styles.downloadButtons}>
                      {
                        enableDownloadAsCsv
                          ? <ExportListItemsToCSV
                            columnHeader={columns.map(c => c.headerName)}
                            listName={list}
                            description={title}
                            listItems={listItems}
                          /> : <></>
                      }
                      {
                        enableDownloadAsPdf
                          ? <ExportListItemsToPDF
                            listName={list}
                            htmlElementForPDF='#dataTable'
                          />
                          : <></>
                      }
                    </Grid>
                    <Grid container justify='flex-end' xs={6}>
                      {
                        enableSearching ?
                          <TextField
                            onChange={this.handleSearch.bind(this)}
                            size="small"
                            label="Search"
                            variant="outlined"
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  <SearchIcon />
                                </InputAdornment>
                              ),
                            }}
                          />
                          : <></>
                      }
                    </Grid>
                  </Grid>
                  <div id="generateTable">
                    <TableContainer component={Paper} >
                      <Table aria-label="customized table" id="dataTable" >
                        <TableHead>
                          <TableRow>
                            {columns.map((c) => (
                              <StyledTableCell key={c.headerName}>
                                {
                                  (sortBy && sortBy.indexOf(c.field) !== -1)
                                    ? <TableSortLabel
                                      active={sortingFields === c.field}
                                      direction={sortingFields === c.field ? sortDirection : 'asc'}
                                      onClick={this.handleSorting(c.field)}
                                    >
                                      {c.headerName}
                                    </TableSortLabel>
                                    : c.headerName
                                }
                              </StyledTableCell>
                            ))}
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {filteredItems.map((row, index) => (
                            <TableRow
                              style={{ backgroundColor: ((index + 1) % 2 === 0) ? evenRowColor : oddRowColor }} >
                              {columns.map((c) => (
                                <StyledTableCell >{row[c.field]}</StyledTableCell >
                              ))}
                            </TableRow>
                          ))}
                        </TableBody>
                        {enablePagination ?
                          <React.Fragment>
                            <TableFooter>
                              <TableRow>
                                <Pagination
                                  colSpan={columns.length}
                                  onPaginationUpdate={this.handlePaginationChange.bind(this)}
                                  totalItems={listItems.length} />
                              </TableRow>
                            </TableFooter>
                          </React.Fragment> : <></>
                        }
                      </Table>
                    </TableContainer>
                  </div>
                </div> : <Alert severity="info">
                  {strings.ListFieldValidation}</Alert>
              }</>
        }
      </div >
    );
  }
}
