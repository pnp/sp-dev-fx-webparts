import * as React from "react";
import * as utils from "../utils/utils";
import * as strings from "spfxReactGridStrings";
import {connect} from "react-redux";
import * as _ from "lodash";
import { SharePointLookupCellFormatter } from "../components/SharePointFormatters";
import WebSelector from "../components/WebSelector";
import ListEditor from "../components/ListEditor";
import { addList, removeList, saveList, removeAllLists } from "../actions/listActions";
import { getWebsAction, getListsForWebAction, getFieldsForListAction } from "../actions/SiteActions";
import { Button, ButtonType, Dropdown, IDropdownOption, TextField, CommandBar } from "office-ui-fabric-react";
import ListDefinition from "../model/ListDefinition";
import { FieldDefinition } from "../model/ListDefinition";
import { ColumnReference } from "../model/ListDefinition";
import { Site, Web, WebList, WebListField } from "../model/Site";
import ColumnDefinition from "../model/ColumnDefinition";
import Container from "../components/container";
import { Guid, Log } from "@microsoft/sp-core-library";
import {  PageContext } from "@microsoft/sp-page-context";
export class GridColumn {
  constructor(
    public id: string,
    public name: string,
    public title: string,
    public editable: boolean,
    public width: number,
    public type: string,
    public formatter: string = "",
    public editor?: string) { }
}
export interface IListViewPageProps extends React.Props<any> {
  lists: Array<ListDefinition>;
  columnRefs: Array<ColumnDefinition>;
  sites: Array<Site>;
  addList: (siteUrl: string) => void;
  removeList: (List) => void;
  removeAllLists: () => void;
  saveList: (List) => void;
  getWebs: (siteUrl) => Promise<any>;
  getListsForWeb: (webUrl) => Promise<any>;
  getFieldsForList: (webUrl, listId) => Promise<any>;
  save: () => void;
  pageContext: PageContext;
}
function mapStateToProps(state) {
  return {
    lists: state.lists,
    sites: state.sites,
    columnRefs: state.columns,
    pageContext: state.pageContext
  };
}
function mapDispatchToProps(dispatch) {
  return {
    addList: (siteUrl: string): void => {

      const id = Guid.newGuid();
      const list: ListDefinition = new ListDefinition(id.toString(), null, null, siteUrl, null, null);
      dispatch(addList(list));
    },
    removeList: (list: ListDefinition): void => {
      dispatch(removeList(list));
    },
    removeAllLists: (): void => {
      dispatch(removeAllLists());
    },
    getWebs: (siteUrl): Promise<any> => {
      return dispatch(getWebsAction(dispatch, siteUrl));
    },
    getListsForWeb(webUrl): Promise<any> {
      return dispatch(getListsForWebAction(dispatch, webUrl));
    },
    getFieldsForList(webUrl, listId): Promise<any> {
      return dispatch(getFieldsForListAction(dispatch, webUrl, listId));
    },
    saveList: (list): void => {
      const action = saveList(list);
      dispatch(action);
    },
  };
}
export interface IGridProps {
  editing: {
    entityid: string;
    columnid: string;
  };
}
export class ListDefinitionContainerNative extends React.Component<IListViewPageProps, IGridProps> {
  public defaultColumns: Array<GridColumn> = [
    {
      id: "rowGuid",
      name: "guid",
      title: "List Definition ID",
      editable: false,
      width: 250,
      formatter: "",
      type: "Text"
    },
    {
      id: "SiteUrl",
      name: "siteUrl", // the url to the site
      title: "SiteUrl",
      editable: true,
      width: 359,
      formatter: "",
      type: "Text"
    },
    {
      id: "listDefTitle",
      name: "listDefTitle",
      title: "List Definition Title",
      editable: true,
      width: 100,
      formatter: "",
      type: "Text"
    },
    {
      id: "WebLookup",
      name: "webLookup", // the name of the field in the model
      title: "Web Containing List",
      editable: true,
      width: 300,
      editor: "WebEditor",
      formatter: "SharePointLookupCellFormatter",
      type: "Lookup"
    },
    {
      id: "listlookup",
      width: 300,
      name: "listLookup",
      title: "List",
      editable: true,
      editor: "ListEditor",
      formatter: "SharePointLookupCellFormatter",
      type: "Lookup"
    }];
  public extendedColumns: Array<GridColumn> = [];
  public constructor() {
    super();

    this.getWebsForSite = this.getWebsForSite.bind(this);
    this.getListsForWeb = this.getListsForWeb.bind(this);
    this.getFieldsForlist = this.getFieldsForlist.bind(this);
    this.getFieldDefinition = this.getFieldDefinition.bind(this);

    this.CellContentsEditable = this.CellContentsEditable.bind(this);
    this.CellContents = this.CellContents.bind(this);
    this.TableDetail = this.TableDetail.bind(this);
    this.TableRow = this.TableRow.bind(this);
    this.TableRows = this.TableRows.bind(this);
    this.toggleEditing = this.toggleEditing.bind(this);
    this.handleCellUpdated = this.handleCellUpdated.bind(this);
    this.handleCellUpdatedEvent = this.handleCellUpdatedEvent.bind(this);
    this.deleteList = this.deleteList.bind(this);
    this.addList = this.addList.bind(this);

  }
  public componentWillMount(): void {
    if (this.props.sites.length === 0) {
      // prload current site, assuming user wants lists from current site
      //  this.props.getWebs(this.props.pageContext.site.absoluteUrl);
    }
    this.extendedColumns = _.clone(this.defaultColumns);
    for (const columnRef of this.props.columnRefs) {

      const newCol = new GridColumn(columnRef.guid, columnRef.name, columnRef.name, columnRef.editable, columnRef.width, columnRef.type, "FieldFormatter", "FieldEditor");
      this.extendedColumns.push(newCol);
    }
  }
  private isdeafaultColumn(columnid): boolean {
    for (const col of this.defaultColumns) {
      if (col.id === columnid) return true;
    }
    return false;
  }
  private updateExtendedColumn(entity: ListDefinition, columnid: string, value: any) {
    const internalName = utils.ParseSPField(value).id;
    const fieldDefinition: FieldDefinition = this.getFieldDefinition(entity, internalName); // values is the fueld just selected.... get the definition for it
    for (const col of entity.columnReferences) {
      if (col.columnDefinitionId === columnid) {
        col.name = value;
        col.fieldDefinition = fieldDefinition;
        return;
      }
    }
    const x = new ColumnReference(columnid, value, fieldDefinition);
    entity.columnReferences.push(x);
  }
  public getFieldDefinition(listdef: ListDefinition, internalName: string): FieldDefinition {
    const field = this.getFieldInList(listdef, internalName);
    return field.fieldDefinition;
  }
  private handleCellUpdatedEvent(event) { //native react uses a Synthetic event
    this.handleCellUpdated(event.target.value);
  }
  private handleCellUpdated(value) { // Office UI Fabric does not use events. It just calls this method with the new value
    const {entityid, columnid} = this.state.editing;
    const entity: ListDefinition = _.find(this.props.lists,(temp) => temp.guid === entityid);
    const column = _.find(this.extendedColumns,temp => temp.id === columnid);
    // if it is a default column, just set its value , otheriwse update it in the list of extended columns (i.e. sharepoint columns)
    if (this.isdeafaultColumn(columnid)) {
      /** need to save the web url if the web column was updated
       * Sharepoint rest wont let me go from an SPSite to an SPWeb using just the id. Need tis
       * I need the url to the Web.
       * hmmmm... can i construct it (dont store the Id of the we, store the path instead?)
       * need this for lookup columns..  they only stote a weid and list id...ohhhh noooo
      */

      entity[column.name] = value;

    }
    else {
      this.updateExtendedColumn(entity, columnid, value);
    }
  //  this.props.saveList(entity);
  }

  public addList(event): any {
    this.props.addList(this.props.pageContext.site.absoluteUrl);
    return;
  }
  public deleteList(event) {
    Log.verbose("list-Page", "Row changed-fired when row changed or leaving cell ");
    const target = this.getParent(event.target, "TD");
    const attributes: NamedNodeMap = target.attributes;
    const entity = attributes.getNamedItem("data-entityid").value;
    const list: ListDefinition = _.find(this.props.lists,temp => temp.guid === entity);
    this.props.removeList(list);
    return;
  }
  public getParent(node: Node, type: string): Node {
    while (node.nodeName !== "TD") {
      node = node.parentNode;
    }
    return node;
  }
  public getWebsForSite(listDef: ListDefinition): Array<Web> {

    for (const site of this.props.sites) {
      if (site.url === listDef.siteUrl) {
        return site.webs;
      }
    }
    // not in our cache/ go get it

    this.props.getWebs(listDef.siteUrl);
    return [];
  }
  public getListsForWeb(listDef: ListDefinition): Array<WebList> {
    const webs = this.getWebsForSite(listDef);
    for (const web of webs) {
      if (web.url === utils.ParseSPField(listDef.webLookup).id) {
        if (web.listsFetched) {
          return web.lists;
        }
        else {
          this.props.getListsForWeb(utils.ParseSPField(listDef.webLookup).id);
          return [];
        }
      }
    }
     this.props.getListsForWeb(utils.ParseSPField(listDef.webLookup).id);
    return []; // havent fetched parent yet,
  }
  public getFieldsForlist(listDef: ListDefinition, colType?: string): Array<WebListField> {
    const lists = this.getListsForWeb(listDef);

    for (const list of lists) {
      if (list.id === utils.ParseSPField(listDef.listLookup).id) {
        if (list.fieldsFetched) {
          if (colType === undefined || colType === null) {
            return list.fields;
          } else {
            return _.filter(list.fields, (f) => f.fieldDefinition.TypeAsString === colType);
          }
        }
        else {
          this.props.getFieldsForList(utils.ParseSPField(listDef.webLookup).id, utils.ParseSPField(listDef.listLookup).id);
          return [];
        }
      }
    }
    return [];// havent fetched parent yet,

  }
  /** This method is called just before we ara going to save a field in our listdef. It gets the Field Deefinition from sharepoint. */
  public getFieldInList(listDef: ListDefinition, internalName): WebListField {

    const fields = this.getFieldsForlist(listDef);
    for (const field of fields) {
      if (utils.ParseSPField(field.name).id === internalName) {
        return field;
      }
    }
  }
  public GetColumnReferenence(listDefinition: ListDefinition, columnDefinitionId: string): ColumnReference {
    for (const columnref of listDefinition.columnReferences) {
      if (columnref.columnDefinitionId === columnDefinitionId) {
        return columnref;
      }
    }

  }
  public toggleEditing(event) {
    Log.verbose("list-Page", "focus event fired editing  when entering cell");

    const target = this.getParent(event.target, "TD"); // walk up the Dom to the TD, thats where the IDs are stored
    const attributes: NamedNodeMap = target.attributes;
    const entityid = attributes.getNamedItem("data-entityid").value;
    const columnid = attributes.getNamedItem("data-columnid").value;
    this.setState({ "editing": { entityid: entityid, columnid: columnid } });
  }
  public CellContentsEditable(props: { entity: ListDefinition, column: GridColumn, cellUpdated: (newValue) => void, cellUpdatedEvent: (event: React.SyntheticEvent<any>) => void; }): JSX.Element {
    const {entity, column, cellUpdated, cellUpdatedEvent} = props;
    let columnValue;
    if (this.isdeafaultColumn(column.id)) {
      columnValue = entity[column.name];
    }
    else {

      const colRef: ColumnReference = this.GetColumnReferenence(entity, column.id);
      if (colRef) {
        columnValue = this.GetColumnReferenence(entity, column.id).name;
      }
    }

    switch (column.editor) {

      case "WebEditor":
        return (
        <WebSelector
         selectedWeb={columnValue}
         onChange={cellUpdated}
          PageContext={this.props.pageContext}
          siteUrl={entity.siteUrl}
          headerText={strings.WebSelectorHeaderText}
           />
        );
      case "ListEditor":
        let lists = this.getListsForWeb(entity);// the Id portion of the WebLookup is the URL
        return (<ListEditor selectedValue={columnValue} onChange={cellUpdated} lists={lists} />);
      case "FieldEditor":
        const colType = column.type;
        let fields: Array<IDropdownOption> = this.getFieldsForlist(entity, colType).map(fld => {

          return { key: fld.name, text: utils.ParseSPField(fld.name).value };
        });
        fields.unshift({ key: null, text: "(Select one)" });
        return (<Dropdown options={fields} label="" selectedKey={columnValue} onChanged={(selection: IDropdownOption) => cellUpdated(selection.key)} />);
      default:

        return (
          <TextField autoFocus width={column.width}
            value={entity[column.name]}
            onChanged={cellUpdated} />);
    }
  }
  public CellContents(props: { entity: ListDefinition, column: GridColumn }): JSX.Element {
    const {entity, column} = props;
    switch (column.formatter) {
      case "SharePointLookupCellFormatter":
        return (<SharePointLookupCellFormatter value={entity[column.name]} onFocus={this.toggleEditing} />);
      default:

        if (this.isdeafaultColumn(column.id)) {
          return (<a href="#" onFocus={this.toggleEditing} style={{ textDecoration: "none" }}>
            {entity[column.name]}
          </a>
          );
        }
        else {
          const colref = _.find(entity.columnReferences,cr => cr.columnDefinitionId === column.id);
          let displaytext = "";
          if (colref != null) {
            displaytext = utils.ParseSPField(colref.name).value;
          }
          return (<a href="#" onFocus={this.toggleEditing} style={{ textDecoration: "none" }}>
            {displaytext}
          </a>
          );
        }
    }
  }

  public TableDetail(props: { entity: ListDefinition, column: GridColumn, cellUpdated: (newValue) => void, cellUpdatedEvent: (event: React.SyntheticEvent<any>) => void; }): JSX.Element {
    const {entity, column, cellUpdated, cellUpdatedEvent} = props;

    if (this.state && this.state.editing && this.state.editing.entityid === entity.guid && this.state.editing.columnid === column.id) {
      return (<td data-entityid={entity.guid} data-columnid={column.id} style={{ width: column.width, border: "1px solid red", padding: "0px" }}>
        <this.CellContentsEditable entity={entity} column={column} cellUpdated={this.handleCellUpdated} cellUpdatedEvent={this.handleCellUpdatedEvent} />
      </td>
      );
    } else {
      return (<td data-entityid={entity.guid} data-columnid={column.id} style={{ width: column.width, border: "1px solid black", padding: "0px" }} onClick={this.toggleEditing} >
        <this.CellContents entity={entity} column={column} />
      </td>
      );
    }
  }
  public TableRow(props: { entity: ListDefinition, columns: Array<GridColumn>, cellUpdated: (newValue) => void, cellUpdatedEvent: (event: React.SyntheticEvent<any>) => void; }): JSX.Element {
    const {entity, columns, cellUpdated, cellUpdatedEvent} = props;

    return (
      <tr>
        {
          columns.filter(c => c.type !== "__LISTDEFINITIONTITLE__").map(function (column) {
            return (
              <this.TableDetail key={column.id} entity={entity} column={column} cellUpdated={this.handleCellUpdated} cellUpdatedEvent={this.handleCellUpdatedEvent} />
            );
          }, this)
        }
        <td data-entityid={entity.guid} data-columnid={""}>
          <Button
            onClick={this.deleteList}
            buttonType={ButtonType.icon}
            icon="Delete" />

        </td>
      </tr>);
  };
  public TableRows(props: { entities: Array<ListDefinition>, columns: Array<GridColumn>, cellUpdated: (newValue) => void, cellUpdatedEvent: (event: React.SyntheticEvent<any>) => void; }): JSX.Element {
    const {entities, columns, cellUpdated, cellUpdatedEvent} = props;
    return (
      <tbody>
        {
          entities.map(function (list) {
            return (
              <this.TableRow key={list.guid} entity={list} columns={columns} cellUpdated={this.handleCellUpdated} cellUpdatedEvent={this.handleCellUpdatedEvent} />
            );
          }, this)
        }
      </tbody>
    );
  }

  public render() {

    return (
      <Container testid="columns" size={2} center>
         <CommandBar items={[{
          key: "Add LIST",
          name: "Add a List",
          icon: "Add",
          onClick: this.addList
        },
        {
          key: "Clear All Lists",
          name: "Remove All Lists",
          icon: "Delete",
          onClick: this.props.removeAllLists
        },
        {
          key: "Allow All Types ",
          name: "Allow All Types ",
          canCheck: true,
          isChecked: true,
          icon: "ClearFilter"

        },
        {
          key: "save",
          name: "save",
          canCheck: true,
          icon: "Save",
          onClick: this.props.save
        }]} />

        <table >
          <thead>
            <tr>

              {this.extendedColumns.filter(c => c.type !== "__LISTDEFINITIONTITLE__").map((column) => {
                return <th key={column.name}>{column.title}</th>;
              })}
            </tr>
          </thead>
          {
            <this.TableRows entities={this.props.lists} columns={this.extendedColumns} cellUpdated={this.handleCellUpdated} cellUpdatedEvent={this.handleCellUpdatedEvent} />

          })}
        </table>
      </Container>
    );
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListDefinitionContainerNative);
