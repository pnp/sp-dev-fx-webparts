import * as React from "react";
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';
import styles from "./Pagination.module.scss";
import { isEqual } from "lodash";
import { Dropdown, DropdownMenuItemType, IDropdownOption, IDropdownProps } from 'office-ui-fabric-react/lib/Dropdown';
import { Box, IconButton, TableFooter, TablePagination, TableRow, useTheme } from "@material-ui/core";
import LastPageIcon from '@material-ui/icons/LastPage';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
export interface IPaginationProps {
  /**
   * The page initial selected
   */
  currentPage: number;
  /**
   * The total items for which you want to generate pagination
   */
  totalItems: number;
  /**
   * When the page number change send the page number selected
   */
  onChange: (pageNo: number, rowsPerPage: number) => void;
  /**
   * The number of pages showing before the icon
   */
  limiter?: number;
  /**
   * Hide the quick jump to the first page
   */
  hideFirstPageJump?: boolean;
  /**
   * Hide the quick jump to the last page
   */
  hideLastPageJump?: boolean;
  /**
   * Limitir icon, by default is More icon
   */
  limiterIcon?: string;

}

export interface IPaginationState {
  totalPages: number;
  currentPage: number;
  paginationElements: number[];
  limiter: number;
  rowsPerPage?: number;
}

export class Pagination extends React.Component<IPaginationProps, IPaginationState> {
  constructor(props: Readonly<IPaginationProps>) {
    super(props);
    this.state = {
      currentPage: props.currentPage,
      paginationElements: [],
      limiter: props.limiter ? props.limiter : 3,
      totalPages: 0,
      rowsPerPage: 5
    };
  }


  public render(): React.ReactElement<IPaginationProps> {
    return (
      <TableFooter>
        <TableRow>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 50, 100]}
            colSpan={99}
            count={this.props.totalItems}
            rowsPerPage={this.state.rowsPerPage}
            page={this.state.currentPage}
            SelectProps={{
              inputProps: {
                'aria-label': 'rows per page',
              },
              native: true,
            }}
            onPageChange={(event, page) => { this.onClick(page); }}
            onRowsPerPageChange={(event) => { this.onRowChange(event); }}
            ActionsComponent={TablePaginationActions}
          />
        </TableRow>
      </TableFooter>);
  }


  private onClick = (page: number) => {
    this.setState({ currentPage: page });
    this.props.onChange(page, this.state.rowsPerPage);
  }

  private onRowChange = (event: any) => {
    let row = parseInt(event.target.value, 10);
    this.setState({ rowsPerPage: row, currentPage: 0 });
    this.props.onChange(0, row);
  }

}

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}
