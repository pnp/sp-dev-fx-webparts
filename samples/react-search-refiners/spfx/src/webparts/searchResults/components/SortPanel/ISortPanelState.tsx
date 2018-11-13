import { SortDirection } from "@pnp/sp";

interface IFilterPanelState {
    sortField?: string;
    sortDirection: SortDirection;
}

export default IFilterPanelState;