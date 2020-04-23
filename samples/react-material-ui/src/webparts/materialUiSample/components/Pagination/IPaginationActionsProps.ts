export interface IPaginationActionsProps {
    description: string;
    onChangePage: (event,page)=>void;
    page:number;
    count:number;
    rowsPerPage:number;
}
