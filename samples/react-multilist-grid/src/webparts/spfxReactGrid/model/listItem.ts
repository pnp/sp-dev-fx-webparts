import GridRowStatus from "./GridRowStatus";
import { Guid } from '@microsoft/sp-core-library';
export default class ListItem {
    /** The listDefinition this item came from. Need this to get to columnMappings */
    public __metadata__ListDefinitionId;
    /** The Status of  this . Need this to get to columnMappings */
    public __metadata__GridRowStatus: GridRowStatus;
    /** The Original Values of this item . Need this to revert changes */
    public __metadata__OriginalValues: ListItem;
    /** the internal ID for tthe listitem */
    public GUID: string;
    public ID: number;
    /**
     *  When a new Item is added, its status is set to new and its given a Guid.
     * wjen we save it to sharepoint we need to refresh and get the actual goid assigned by sharepoint.
     */
    public constructor(
    ) {
        this.__metadata__GridRowStatus = GridRowStatus.new;
        this.GUID = Guid.newGuid().toString();
    }
}
