// import * as utils from "../utils/utils";
// import * as React from "react";
// const connect = require("react-redux").connect;
// import {
//   addListItem, removeListItem, getListItemsAction, saveListItemAction,
//   undoListItemChangesAction, updateListItemAction,
// } from "../actions/listItemActions";
// import { getLookupOptionAction } from "../actions/lookupOptionsActions";
// import { getSiteUsersAction } from "../actions/siteUsersActions";
// import ListItem from "../model/ListItem";
// import ColumnDefinition from "../model/ColumnDefinition";
// import { LookupOptions, LookupOptionStatus } from "../model/LookupOptions";
// import { SiteUsers, SiteUsersStatus } from "../model/SiteUsers";
// import GridRowStatus from "../model/GridRowStatus";
// import ListDefinition from "../model/ListDefinition";
// import { FocusZone,Button, ButtonType, TextField, IDropdownOption, Dropdown, Spinner, SpinnerType, DetailsList, IColumn } from "office-ui-fabric-react";

// import { CommandBar } from "office-ui-fabric-react/lib/CommandBar";
// import { DatePicker, IDatePickerStrings } from "office-ui-fabric-react/lib/DatePicker";

// import Container from "../components/container";
// import { Log } from "@microsoft/sp-client-base";

// interface SPColumn extends IColumn {
//   editable: boolean;
//   type: string;
// }
// interface IListViewPageProps extends React.Props<any> {
//   /** An array of ListItems fetched from sharepoint */
//   siteUsers: Array<SiteUsers>;
//   /** An array of ListItems fetched from sharepoint */
//   listItems: Array<ListItem>;
//   /** An array of LookupOptions. One for each Lookup Column */
//   lookupOptions: Array<LookupOptions>;
//   /** An array of columns to be displayed on the grid */
//   columns: Array<ColumnDefinition>;
//   /** The listDefinitions. Says which lists to pull data from */
//   listDefinitions: Array<ListDefinition>;
//   /** Redux Action to add a new listitem */
//   addListItem: (ListItem) => void;
//   /** Redux Action to add a new remove a list item */
//   removeListItem: (l: ListItem, ListDef: ListDefinition) => void;
//   /** Redux Action to get listitems from a specific list */
//   getListItems: (listDefinitions: Array<ListDefinition>) => void;
//   /** Redux Action to update a listitem in sharepoint */
//   updateListItem: (ListItem: ListItem, ListDef: ListDefinition) => Promise<any>;
//   /** Redux Action to  get the lookup options for a specific field */
//   getLookupOptionAction: (lookupSite, lookupWebId, lookupListId, lookupField) => void;
//   /** Redux Action to  get the lookup options for a specific field */
//   getSiteUsersAction: (site) => Promise<any>;
//   /** Redux Action to undo changes made to the listitem */
//   undoItemChanges: (ListItem) => void;
//   /** Redux Action to save the listitem in the store (NOT to sharepoint*/
//   saveListItem: (ListItem) => void;
// }
// function mapStateToProps(state) {

//   return {
//     listItems: state.items,
//     columns: state.columns,
//     listDefinitions: state.lists,
//     systemStatus: state.systemStatus,
//     lookupOptions: state.lookupOptions,
//     siteUsers: state.siteUsers
//   };
// }
// export class GridColumn {
//   constructor(
//     public id: string,
//     public name: string,
//     public editable: boolean,
//     public width: number,
//     public formatter: string = "",
//     public editor?: string) { }
// }
// function mapDispatchToProps(dispatch) {
//   return {
//     addListItem: (listItem: ListItem): void => {
//       dispatch(addListItem(listItem));
//     },
//     removeListItem: (listItem: ListItem, listDef: ListDefinition): void => {
//       dispatch(removeListItem(dispatch, listItem, listDef));
//     },
//     updateListItem: (listItem: ListItem, listDef: ListDefinition): Promise<any> => {
//       const action = updateListItemAction(dispatch, listDef, listItem);
//       dispatch(action); // need to ewname this one to be digfferent from the omported ome
//       return action.payload.promise;

//     },
//     saveListItem: (listItem: ListItem): void => {
//       dispatch(saveListItemAction(listItem));
//     },
//     undoItemChanges: (listItem: ListItem): void => {
//       dispatch(undoListItemChangesAction(listItem));
//     },

//     getListItems: (listDefinitions: Array<ListDefinition>): void => {
//       dispatch(getListItemsAction(dispatch, listDefinitions));
//     },
//     getLookupOptionAction: (lookupSite, lookupWebId, lookupListId, lookupField): void => {
//       dispatch(getLookupOptionAction(dispatch, lookupSite, lookupWebId, lookupListId, lookupField));
//     },
//     getSiteUsersAction: (site): void => {

//       const action = getSiteUsersAction(dispatch, site);
//       dispatch(action);
//       return action.payload.promise;
//     },
//   };
// }
// /**
//  *
//  */
// interface IGridState {
//   editing: {
//     /**The Sharepoint GUID of the listitem being edited */
//     entityid: string;
//     /**The id  of the column being edited */
//     columnid: string;
//   };
// }
// /**
//  * This component is the Grid for editing listitems.
//  */
// class ListItemContainerUIF extends React.Component<IListViewPageProps, IGridState> {
//   public constructor() {
//     super();
//     this.CellContentsEditable = this.CellContentsEditable.bind(this);
//     this.CellContents = this.CellContents.bind(this);
//     this.TableDetail = this.TableDetail.bind(this);
//     this.toggleEditing = this.toggleEditing.bind(this);
//     this.addListItem = this.addListItem.bind(this);
//     this.removeListItem = this.removeListItem.bind(this);
//     this.handleCellUpdated = this.handleCellUpdated.bind(this);
//     this.handleCellUpdatedEvent = this.handleCellUpdatedEvent.bind(this);
//     this.undoItemChanges = this.undoItemChanges.bind(this);
//     this.updateListItem = this.updateListItem.bind(this);
//     this.getLookupOptions = this.getLookupOptions.bind(this);
//     this.onRenderItemColumn = this.onRenderItemColumn.bind(this);


//   }
//   private addListItem(): void {

//     let listItem = new ListItem();
//     for (const column of this.props.columns) {
//       listItem[column.name] === null;
//     }
//     if (this.props.listDefinitions.length === 1) {
//       listItem.__metadata__ListDefinitionId = this.props.listDefinitions[0].guid;
//     } else {
//       listItem.__metadata__ListDefinitionId = null;
//     }

//     this.props.addListItem(listItem);
//   }
//   private removeListItem(event): void {

//     const parentTD = this.getParent(event.target, "DIV", "spCell");
//     const attributes: NamedNodeMap = parentTD.attributes;
//     const entityid = attributes.getNamedItem("data-entityid").value; // theid of the SPListItem
//     const listItem: ListItem = this.props.listItems.find((temp) => temp.GUID === entityid); // the listItemItself
//     const listDef = this.getListDefinition(listItem.__metadata__ListDefinitionId);// The list Definition this item is associated with.
//     this.props.removeListItem(listItem, listDef);
//   }
//   /**
//    * When the component Mounts, call an action to get the listitems for all the listdefinitions
//    */
//   public componentWillMount() {

//     this.props.getListItems(this.props.listDefinitions);
//   }
//   /**
//  * Method to get the parent span  of any cell whose classnAME IS spcell
//  * The listItemId and columnID are stored as attributes of THAT SPAN
//  */
//   public getParent(node: Node, type: string, className: string): Node {

//     while (node.nodeName !== type && node["className"] !== className) {
//       node = node.parentNode;
//     }
//     return node;
//   }
//   /**
//    * This event gets fired whenever a cell on the grid recieves focus.
//    * The "editing" propery of this component determines which cell is being edited.
//    * This method gets the clicked on  (the entityid-- the id of the SPLIstItem) and the columnId (the id of the ColumnDefinition)
//    * and sets them in the "editing"property of state.
//    * When Component then redraws, it draws that cell as an editable (See the TableDetail method).
//    *
//    * If the rendering of that column in edit mode requires additional Info, dispatch a redux action to get the data.
//    * (Dispatching the action from within the render mehod itself cused infinite loop)
//    *
//    */
//   public toggleEditing(event) {
//     Log.verbose("list-Page", "focus event fired editing  when entering cell");
//     const target = this.getParent(event.target, "DIV", "spCell"); // walk up the Dom to the TD, thats where the IDs are stored
//     const attributes: NamedNodeMap = target.attributes;
//     const entityid = attributes.getNamedItem("data-entityid").value;
//     const columnid = attributes.getNamedItem("data-columnid").value;
//     if (columnid != "") { //user clicked on a column, not a button( Buttons are in a td with am column id of ""
//       /**
//        * Need to fire events here to get data needed for the rerender
//        */
//       const listitem = this.props.listItems.find(li => li.GUID === entityid);
//       const listDef = this.getListDefinition(listitem.__metadata__ListDefinitionId);
//       if (listDef) {// if user just added an item we may not hava a lisdef yest
//         const colref = listDef.columnReferences.find(cr => cr.columnDefinitionId === columnid);
//         if (colref) {// Listname does not have a columnReference

//           switch (colref.fieldDefinition.TypeAsString) {
//             case "Lookup":
//               let lookupField = colref.fieldDefinition.LookupField;
//               let lookupListId = colref.fieldDefinition.LookupList;
//               let lookupWebId = colref.fieldDefinition.LookupWebId;
//               /**
//                * We are assuming here that the lookup listy is in the same web.
//                *
//                */
//               lookupWebId = utils.ParseSPField(listDef.webLookup).id; // temp fix. Need to use graph to get the web by id in the site
//               let lookupSite = listDef.siteUrl;
//               this.ensureLookupOptions(lookupSite, lookupWebId, lookupListId, lookupField);
//               break;
//             case "User":

//               lookupWebId = utils.ParseSPField(listDef.webLookup).id; // temp fix. Need to use graph to get the web by id in the site
//               let site = listDef.siteUrl;
//               this.ensureSiteUsers(site);
//               break;
//             default:
//               break;
//           }
//         }
//       }
//     }
//     this.setState({ "editing": { entityid: entityid, columnid: columnid } });
//   }
//   /**
//    * This event gets fired to revert any changes made to the ListItem.
//    */
//   public undoItemChanges(event): void {
//     const parentTD = this.getParent(event.target, "DIV", "spCell"); // the listitemId and the column ID are always stored as attributes of the parent TD.
//     const attributes: NamedNodeMap = parentTD.attributes;
//     const entityitem = attributes.getNamedItem("data-entityid");
//     const entityid = entityitem.value;
//     const entity: ListItem = this.props.listItems.find((temp) => temp.GUID === entityid);
//     this.props.undoItemChanges(entity);
//   }
//   /**
//    * This event gets fired, to save the item back to SharePoint.
//    */
//   public updateListItem(event): void {

//     const parentTD = this.getParent(event.target, "DIV", "spCell");
//     const attributes: NamedNodeMap = parentTD.attributes;
//     const entityid = attributes.getNamedItem("data-entityid").value; // theid of the SPListItem
//     const entity: ListItem = this.props.listItems.find((temp) => temp.GUID === entityid);
//     const listDef: ListDefinition = this.getListDefinition(entity.__metadata__ListDefinitionId);
//     if (entity.__metadata__ListDefinitionId === entity.__metadata__OriginalValues.__metadata__ListDefinitionId
//       || entity.__metadata__GridRowStatus === GridRowStatus.new) {// List not changed

//       this.props.updateListItem(entity, listDef);
//     }
//     else {// list changed, add to new, delete from old (will need to do some fiorld mapping in here
//       entity.__metadata__GridRowStatus = GridRowStatus.new;
//       this.props.updateListItem(entity, listDef).then(response => {
//         const oldListDef: ListDefinition = this.getListDefinition(entity.__metadata__OriginalValues.__metadata__ListDefinitionId);
//         this.props.removeListItem(entity.__metadata__OriginalValues, oldListDef);
//       });
//     }

//   }
//   /**
//    * This method gets called when react events are used to update a cell in the grid.
//    * It just gets the value and passes it to handleCellUpdated.
//    */
//   private handleCellUpdatedEvent(event) { //native react uses a Synthetic event
//     this.handleCellUpdated(event.target.value);

//   }
//   /**
//   * This method gets called when user changes the listdefinition for an item.
//   * the old fields are moved to the corresponing new fields and translated as needed
//   */
//   private mapOldListFieldsToNewListFields(listItem: ListItem) {

//     const newListDef = this.getListDefinition(listItem.__metadata__ListDefinitionId);
//     const oldListDef = this.getListDefinition(listItem.__metadata__OriginalValues.__metadata__ListDefinitionId);
//     for (const newColRef of newListDef.columnReferences) {
//       // find the old columnReference
//       const oldColRef = oldListDef.columnReferences.find(cr => cr.columnDefinitionId === newColRef.columnDefinitionId);
//       const newFieldName = utils.ParseSPField(newColRef.name).id;
//       const oldFieldName = utils.ParseSPField(oldColRef.name).id;
//       switch (newColRef.fieldDefinition.TypeAsString) {
//         case "User":
//           // should male a local copy befor i start messing with these.// fieldd names may overlap on old and new
//           //   const name = listItem.__metadata__OriginalValues[oldFieldName].Name;// the user login name
//           const name = listItem[oldFieldName].Name;// the user login name
//           const siteUsersOnNewSite = this.props.siteUsers.find(su => su.siteUrl === newListDef.siteUrl);
//           const newUser = siteUsersOnNewSite.siteUser.find(user => user.loginName === name);
//           listItem[newFieldName].Id = newUser.id;
//           listItem[newFieldName].Name = newUser.loginName;
//           listItem[newFieldName].Title = newUser.value;
//           break;

//         default:
//           listItem[newFieldName] = listItem[oldFieldName];
//       }

//     }
//   }
//   /**
//    * This method gets called when react cells in the gid get updated.
//    * Office UI Fabric does not use events. It just calls this method with the new value.
//    * It reformats the data to fit the format we recievbed from SP in the first place ,
//    * and dispatches an action to save the data in the store.
//    *
//    * Also, it saves the original version of the record, so we can undo later.
//    */
//   private handleCellUpdated(value) {

//     const {entityid, columnid} = this.state.editing;
//     const entity: ListItem = this.props.listItems.find((temp) => temp.GUID === entityid);
//     const listDef = this.getListDefinition(entity.__metadata__ListDefinitionId);
//     const titlecolumnid = this.props.columns.find(c => { return c.type === "__LISTDEFINITIONTITLE__" }).guid
//     if (columnid === titlecolumnid) { // user just changed the listDef,

//       if (entity.__metadata__GridRowStatus === GridRowStatus.pristine) {
//         if (!entity.__metadata__OriginalValues) { //SAVE  orgininal values so we can undo;
//           entity.__metadata__OriginalValues = _.cloneDeep(entity); // need deep if we have lookup values
//         }
//       }
//       entity.__metadata__ListDefinitionId = value.key; // value is a DropDDownOptions
//       if (entity.__metadata__GridRowStatus !== GridRowStatus.new) {
//         const listDef = this.getListDefinition(value.key);
//         this.props.getSiteUsersAction(listDef.siteUrl).then(r => {
//           this.mapOldListFieldsToNewListFields(entity);
//           this.props.saveListItem(entity);
//         });
//       } else {
//         this.props.saveListItem(entity);
//       }
//       return;
//     }
//     const columnReference = listDef.columnReferences.find(cr => cr.columnDefinitionId === columnid);
//     const internalName = utils.ParseSPField(columnReference.name).id;
//     if (!entity.__metadata__OriginalValues) { //SAVE  orgininal values so we can undo;
//       entity.__metadata__OriginalValues = _.cloneDeep(entity); // need deep if we have lookup values
//     }
//     if (entity.__metadata__GridRowStatus === GridRowStatus.pristine) {
//       entity.__metadata__GridRowStatus = GridRowStatus.modified;
//     }
//     switch (columnReference.fieldDefinition.TypeAsString) {
//       case "User":
//         if (!entity[internalName]) {// if  value was not previously set , then this is undefined//
//           entity[internalName] = {};// set new value to an empty objecte
//         }
//         entity[internalName].Id = value.key;//and then fill in the values
//         entity[internalName].Title = value.text;
//         break;
//       case "DateTime":
//         const year = value.getFullYear().toString();

//         entity[internalName] = (value.getFullYear().toString()) + "-" + (value.getMonth() + 1).toString() + "-" + value.getDate().toString() + "T00:00:00Z";
//         break;
//       case "Lookup":
//         if (!entity[internalName]) {// if  value was not previously set , then this is undefined//
//           entity[internalName] = {};// set new value to an empty objecte
//         }
//         entity[internalName]["Id"] = value.key;//and then fill in the values
//         entity[internalName][columnReference.fieldDefinition.LookupField] = value.text;
//         break;
//       default:
//         entity[internalName] = value;
//     }
//     this.props.saveListItem(entity);
//   }
//   /**
//   * If the the options for a lookup list are not in the cache, fire an event to get them
//   *  This method is called when  a lookup column receives focus.
//   */
//   public ensureSiteUsers(siteUrl: string): SiteUsers {
//     // see if the options are in the store, if so, return them, otherwoise dispatch an action to get them
//     const siteUsers = this.props.siteUsers.find(x => {
//       return (x.siteUrl === siteUrl);
//     });
//     if (siteUsers === undefined) {
//       this.props.getSiteUsersAction(siteUrl);
//     }
//     return siteUsers;
//   }
//   /**
//    * Gets the options to display for a lookupField
//    * This method is called when  a lookup column gets rendered... we fire the event to get the data when its focused,
//    * then we use the data when it gets renderd
//   */
//   public getSiteUsers(siteUrl: string): SiteUsers {
//     // see if the options are in the store, if so, return them, otherwoise dispatch an action to get them
//     const siteUsers = this.props.siteUsers.find(x => {
//       return (x.siteUrl === siteUrl);
//     });
//     return siteUsers;
//   }
//   /**
//    * If the the options for a lookup list are not in the cache, fire an event to get them
//    *  This method is called when  a lookup column receives focus.
//    */
//   public ensureLookupOptions(lookupSite: string, lookupWebId: string, lookupListId: string, lookupField: string): LookupOptions {
//     // see if the options are in the store, if so, return them, otherwoise dispatch an action to get them
//     const lookupoptions = this.props.lookupOptions.find(x => {
//       return (x.lookupField === lookupField) &&
//         (x.lookupListId === lookupListId) &&
//         (x.lookupSite === lookupSite) &&
//         (x.lookupWebId === lookupWebId);
//     });
//     if (lookupoptions === undefined) {
//       this.props.getLookupOptionAction(lookupSite, lookupWebId, lookupListId, lookupField);
//     }
//     return lookupoptions;
//   }
//   /**
//    * Gets the options to display for a lookupField
//    * This method is called when  a lookup column gets rendered... we fire the event to get the data when its focused,
//    * then we use the data when it gets renderd
//   */
//   public getLookupOptions(lookupSite: string, lookupWebId: string, lookupListId: string, lookupField: string): LookupOptions {
//     // see if the options are in the store, if so, return them, otherwoise dispatch an action to get them
//     let lookupoptions = this.props.lookupOptions.find(x => {
//       return (x.lookupField === lookupField) &&
//         (x.lookupListId === lookupListId) &&
//         (x.lookupSite === lookupSite) &&
//         (x.lookupWebId === lookupWebId);
//     });
//     return lookupoptions;
//   }
//   /**
//    *  Returns the ListDefinition for the given ListDefinionId
//    *
//    */
//   public getListDefinition(
//     /** The id of the list definition to be retrieved */
//     listdefid: string
//   ): ListDefinition {
//     return this.props.listDefinitions.find(ld => ld.guid === listdefid);
//   }
//   /**
//    * This method renders the contents of an individual cell in an editable format.
//    */
//   public CellContentsEditable(props: { entity: ListItem, column: SPColumn, cellUpdated: (newValue) => void, cellUpdatedEvent: (event: React.SyntheticEvent) => void; }): JSX.Element {

//     const {entity, column, cellUpdated, cellUpdatedEvent} = props;

//     if (column.type === "__LISTDEFINITIONTITLE__") {
//       entity.__metadata__ListDefinitionId
//       const opts: Array<IDropdownOption> = this.props.listDefinitions.map(ld => {
//         return { key: ld.guid, text: ld.title };
//       });
//       // if (!entity.__metadata__ListDefinitionId) {
//       //   opts.unshift({ key: null, text: "Select one" });
//       // }
//       // should I have a different handler for this?
//       return (
//         <Dropdown options={opts} selectedKey={entity.__metadata__ListDefinitionId} label=""
//           onChanged={(selection: IDropdownOption) => { cellUpdated(selection); } } />
//       );
//     }
//     const listDef = this.getListDefinition(entity.__metadata__ListDefinitionId);
//     const colref = listDef.columnReferences.find(cr => cr.columnDefinitionId === column.key);
//     const internalName = utils.ParseSPField(colref.name).id;
//     const columnValue = entity[internalName];
//     switch (colref.fieldDefinition.TypeAsString) {
//       case "User":
//         let siteUrl = listDef.siteUrl;
//         let siteUsers = this.getSiteUsers(siteUrl);
//         if (siteUsers) {
//           switch (siteUsers.status) {
//             case SiteUsersStatus.fetched:
//               let options: IDropdownOption[] = siteUsers.siteUser.map((opt, index, options) => {
//                 return { key: opt.id, text: opt.value };
//               });
//               const selectedKey = columnValue ? columnValue.Id : null;
//               return (
//                 <Dropdown label="" options={options} selectedKey={selectedKey} onChanged={(selection: IDropdownOption) => { cellUpdated(selection); } } >
//                 </Dropdown >
//               );
//             case SiteUsersStatus.fetching:
//               return (
//                 <Spinner type={SpinnerType.normal} />
//               );
//             case SiteUsersStatus.error:
//               return (
//                 <Spinner label="Error" type={SpinnerType.normal} />
//               );
//             default:
//               return (
//                 <Spinner type={SpinnerType.normal} />
//               );
//           }
//         } else {
//           return (
//             <Spinner type={SpinnerType.normal} />
//           );
//         }
//       case "Lookup":

//         let lookupField = colref.fieldDefinition.LookupField;
//         let lookupListId = colref.fieldDefinition.LookupList;
//         let lookupWebId = colref.fieldDefinition.LookupWebId;
//         /**
//          * We are assuming here that the lookup listy is in the same web.
//          *
//          */
//         lookupWebId = utils.ParseSPField(listDef.webLookup).id; // temp fix. Need to use graph to get the web by id in the site
//         let lookupSite = listDef.siteUrl;
//         let lookupOptions = this.getLookupOptions(lookupSite, lookupWebId, lookupListId, lookupField);


//         if (lookupOptions) {
//           switch (lookupOptions.status) {
//             case LookupOptionStatus.fetched:
//               let options: IDropdownOption[] = lookupOptions.lookupOption.map((opt, index, options) => {
//                 return { key: opt.id, text: opt.value };
//               });
//               return (
//                 <Dropdown label="" options={options} selectedKey={(columnValue ? columnValue.Id : null)} onChanged={(selection: IDropdownOption) => { cellUpdated(selection); } } >
//                 </Dropdown >
//               );
//             case LookupOptionStatus.fetching:
//               return (
//                 <Spinner type={SpinnerType.normal} />
//               );
//             case LookupOptionStatus.error:
//               return (
//                 <Spinner label="Error" type={SpinnerType.normal} />
//               );
//             default:
//               return (
//                 <Spinner type={SpinnerType.normal} />
//               );
//           }
//         } else {
//           return (
//             <Spinner type={SpinnerType.normal} />
//           );
//         }
//       case "Choice":
//         const choices = colref.fieldDefinition.Choices.map((c, i) => {

//           let opt: IDropdownOption = {
//             index: i,
//             key: i,
//             text: c,
//             isSelected: (c === columnValue)
//           };
//           return opt;
//         });
//         return (
//           <Dropdown label="" selectedKey={entity[columnValue]} options={choices} onChanged={(selection: IDropdownOption) => cellUpdated(selection)} >
//           </Dropdown >
//         );
//       case "Text":
//         return (
//           <input autoFocus type="text"
//             value={columnValue}
//             onChange={cellUpdatedEvent} />);
//       case "Note":
//         return (
//           <TextField autoFocus
//             value={columnValue}
//             onChanged={cellUpdated} />);

//       case "DateTime":
//         const datpickerStrings: IDatePickerStrings = {
//           "months": [""],
//           "shortMonths": [""],
//           "days": [""],
//           "shortDays": [""],
//           goToToday: "yes"
//         };

//         const year = parseInt(columnValue.substring(0, 34));
//         const month = parseInt(columnValue.substring(5, 7)) - 1;
//         const day = parseInt(columnValue.substring(8, 10));
//         const date = new Date(year, month, day);

//         return (
//           <DatePicker strings={datpickerStrings} onSelectDate={cellUpdated} value={date}
//             allowTextInput={true} isRequired={colref.fieldDefinition.Required}
//             />);
//       default:
//         return (
//           <input autoFocus type="text"
//             value={columnValue}
//             onChange={cellUpdatedEvent} />);
//     }
//   }

//   /**
//    *  This method renders the contents of an individual cell in a non-editable format.
//    */
//   public CellContents(props: { entity: ListItem, column: SPColumn }): JSX.Element {
//     const {entity, column} = props;
//     if (!entity.__metadata__ListDefinitionId) { // item is new and list not yet selected
//     }
//     const listDef = this.getListDefinition(entity.__metadata__ListDefinitionId);
//     if (column.type === "__LISTDEFINITIONTITLE__") {// this type is sued to show the listdefinition name
//       if (listDef != null) {//listdef has been selected
//         return (<a href="#" onFocus={this.toggleEditing} style={{ textDecoration: "none" }} >
//           {listDef.title}
//         </a>);
//       }
//       else {//listdef not yet selected
//         return (<a href="#" onFocus={this.toggleEditing} style={{ textDecoration: "none" }} >
//           Select a list
//       </a>);
//       }
//     }
//     if (!listDef) { // cant edit columns til we select a listdef, not NO onFocus={this.toggleEditing}
//       return (<a href="#" style={{ textDecoration: "none" }} >
//         select a list first
//         </a>
//       );
//     }
//     const colref = listDef.columnReferences.find(cr => cr.columnDefinitionId === column.key);
//     if (colref === undefined) { //Column has not been configured for this list
//       return (<a href="#" onFocus={this.toggleEditing} style={{ textDecoration: "none" }} >
//         'Column Not Defined'
//         </a>
//       );
//     }
//     const internalName = utils.ParseSPField(colref.name).id;

//     switch (colref.fieldDefinition.TypeAsString) {
//       case "User":

//         if (entity[internalName] === undefined) { // value not set
//           return (<a href="#" onFocus={this.toggleEditing} style={{ textDecoration: "none" }} >

//           </a>
//           );
//         } else {
//           return (<a href="#" onFocus={this.toggleEditing} style={{ textDecoration: "none" }} >
//             {entity[internalName]["Title"]}
//           </a>
//           );
//         }
//       case "Lookup":

//         if (entity[internalName] === undefined) { // value not set
//           return (<a href="#" onFocus={this.toggleEditing} style={{ textDecoration: "none" }} >

//           </a>
//           );
//         } else {
//           return (<a href="#" onFocus={this.toggleEditing} style={{ textDecoration: "none" }} >
//             {entity[internalName][colref.fieldDefinition.LookupField]}
//           </a>
//           );
//         }
//       case "Text":
//         return (<a href="#" onFocus={this.toggleEditing} style={{ textDecoration: "none" }} >
//           {entity[internalName]}
//         </a>
//         );
//       case "Note":
//         return (<a href="#" onFocus={this.toggleEditing} style={{ textDecoration: "none" }} dangerouslySetInnerHTML={{ __html: entity[internalName] }} >
//         </a>
//         );

//       case "DateTime":
//         let value: string;
//         if (entity[internalName] === null) {
//           return (<a href="#" onFocus={this.toggleEditing} style={{ textDecoration: "none" }} >

//           </a>);
//         }
//         if (colref.fieldDefinition.EntityPropertyName === "DateOnly") {
//           value = entity[internalName].split("T")[0];
//         }
//         else {
//           value = entity[internalName];
//         }
//         return (<a href="#" onFocus={this.toggleEditing} style={{ textDecoration: "none" }} >
//           {value}
//         </a>
//         );
//       default:
//         return (<a href="#" onFocus={this.toggleEditing} style={{ textDecoration: "none" }} >
//           {entity[internalName]}
//         </a>
//         );
//     }
//   }
//   /**
//    *  This method renders the A TD for an individual Cell. The TD contains the listItemID and the ColumnID as attributes.
//    *  It calls CellContentsEditable or CellContents based on whether the cell is being edited.
//    * It determines if the cell is being edited by looking at this,props.editing(which got set by ToggleEditing).
//    */
//   public TableDetail(props: { entity: ListItem, column: SPColumn, cellUpdated: (newValue) => void, cellUpdatedEvent: (event: React.SyntheticEvent) => void; }): JSX.Element {

//     const {entity, column, cellUpdated, cellUpdatedEvent} = props;
//     if (this.state && this.state.editing && this.state.editing.entityid === entity.GUID && this.state.editing.columnid === column.key) {
//       return (<div width={column.minWidth} className="spCell" key={entity.GUID + column.key} data-entityid={entity.GUID} data-columnid={column.key} style={{ border: "2px solid black", padding: "0px" }}>
//         <this.CellContentsEditable entity={entity} column={column} cellUpdated={this.handleCellUpdated} cellUpdatedEvent={this.handleCellUpdatedEvent} />
//       </div>
//       );
//     } else {
//       return (<div width={column.minWidth} className="spCell" key={entity.GUID + column.key} data-entityid={entity.GUID} data-columnid={column.key} style={{ border: "1px solid black", padding: "0px" }} onClick={this.toggleEditing} >
//         <this.CellContents entity={entity} column={column} />
//       </div>
//       );
//     }
//   }
//   public onRenderItemColumn(item: any, index: number, column: SPColumn): any {

//     const listDef = this.getListDefinition(item.__metadata__ListDefinitionId);
//     const colRef = listDef.columnReferences.find(cr => cr.columnDefinitionId === column.key);
//     const internalName = utils.ParseSPField(colRef.name).id;
//     return (
//       <FocusZone>
//       <this.TableDetail entity={item} column={column} cellUpdated={this.handleCellUpdated} cellUpdatedEvent={this.handleCellUpdatedEvent} />
//       </FocusZone>
//     );


//   }

//   public render() {
//     const { listItems } = this.props;
//     Log.info("ListItemContainer", "In Render");

//     const uColumns: SPColumn[] = this.props.columns.map((c, i, a) => {
//       return {
//         key: c.guid,
//         name: c.name,
//         fieldName: c.name,
//         minWidth: 80,
//         maxWidth: 80,

//         width: 80,

//         type: c.type,
//         editable: c.editable,

//       };
//     });

//     return (

//       <Container testid="columns" size={2} center>
//         <DetailsList columns={uColumns} items={listItems} onRenderItemColumn={this.onRenderItemColumn}>
//         </DetailsList>

//       </Container>
//     );
//   }
// }
// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(ListItemContainerUIF);
