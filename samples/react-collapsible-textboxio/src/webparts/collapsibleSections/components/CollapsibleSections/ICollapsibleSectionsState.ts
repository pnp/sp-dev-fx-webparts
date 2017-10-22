import ISection from "../../../../models/ISection";

interface ICollapsibleSectionState {
    lastInsertedIndex?: number;
    isDialogOpen?: boolean;
    selectedGroupIndex?: number;
    selectedSection?: ISection; 
}

export default ICollapsibleSectionState;