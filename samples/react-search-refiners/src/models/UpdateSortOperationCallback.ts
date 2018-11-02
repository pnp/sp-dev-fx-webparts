import SortDirection from "./SortDirection";

type UpdateSortOperationCallback = (sortDirection:SortDirection,sortField?:string) => void;

export default UpdateSortOperationCallback;