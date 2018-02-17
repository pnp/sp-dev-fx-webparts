import { IDocument } from '../../../common/IObjects';
import { IColumn, IContextualMenuProps } from 'office-ui-fabric-react';

interface IDocumentsState {
    allDocuments?: IDocument[];
    displayedDocuments?: IDocument[];
    showResetFilters?: boolean;
    isLoading?: boolean;
    columns?: IColumn[];
    showPanel?: boolean;
    panelDocUrl?: string;
    panelTitle?: string;
    contextualMenuProps?: IContextualMenuProps;

    //???
    isErrorOccured?: boolean;
    errorMessage?: string;
}

export default IDocumentsState;