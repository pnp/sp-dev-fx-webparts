/*************************************************************************************************
 * Defines the data contract to share the currently selected item with dynamic 
 * data consumer WebParts
 *************************************************************************************************/
export interface IDynamicItem {

    // The URL of the web site where the selected item comes from
    webUrl: string;
    // The ID of the list that contains the selected item
    listId: string;
    // The ID of the selected item
    itemId: number;
}