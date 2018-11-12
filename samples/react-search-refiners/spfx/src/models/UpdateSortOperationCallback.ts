import { SortDirection } from "@pnp/sp";

type UpdateSortOperationCallback = (sortDirection: SortDirection, sortField?: string) => void;

export default UpdateSortOperationCallback;