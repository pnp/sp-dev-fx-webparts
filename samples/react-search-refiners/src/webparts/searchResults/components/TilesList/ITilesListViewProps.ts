import { ISearchResult } from "../../../models/ISearchResult";

interface ITilesListViewProps {
    items?: ISearchResult[];
    showFileIcon: boolean;
    showCreatedDate: boolean;
}

export default ITilesListViewProps;