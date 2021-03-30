import TablePagination from '@material-ui/core/TablePagination';
import * as React from 'react';

interface IPagination {
    colSpan: number;    
    totalItems: number;
    onPaginationUpdate: (pageNo: number, pageSize: number) => void;
}

export function Pagination(props: IPagination) {

    let { colSpan, totalItems, onPaginationUpdate } = props;
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    React.useEffect(() => {
        onPaginationUpdate(page, rowsPerPage);
    }, [page, rowsPerPage]);

    const handlePageChange = (event, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <TablePagination
            rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
            colSpan={colSpan}
            count={totalItems}
            rowsPerPage={rowsPerPage}
            page={page}
            SelectProps={{
                inputProps: { 'aria-label': 'rows per page' },
                native: true,
            }}
            onChangePage={handlePageChange}
            onChangeRowsPerPage={handleChangeRowsPerPage}
        />
    );
}