import * as React from "react";
import { SharePointLookupCellFormatter } from "../components/SharePointFormatters";
//const connect = require("react-redux").connect;
import { connect } from "react-redux";
import * as _ from "lodash";
import { addColumn, removeColumn, removeAllColumns, moveCulumnUp, moveCulumnDown } from "../actions/columnActions";
import ColumnDefinition from "../model/ColumnDefinition";
import { SortDirection } from "../model/ColumnDefinition";
import { Button, ButtonType, TextField, CommandBar, Dropdown, IDropdownOption, Toggle, Slider } from "office-ui-fabric-react";
import Container from "../components/container";
import { Guid, Log } from "@microsoft/sp-core-library";
/** NOTE:
 * To enable other column types
 * 1. Uncomment it here
 * 2. In Containers\ListItemContainer Add  case in the CellContents method to display the field in a non-editable mode
 * 3. In Containers\ListItemContainer Add  case in the CellContentsEditabe method to display the field in an editable mode
 * 4. In Containers\ListItemContainer Add  case in the handleCellUpdated method to get the data entered by the user and change it back to the format that Sharepoint gave it to us in (See dateTime for an example)
 * 4. If any other data is needed to render the contents in an editable mode (maybe Managed Metadata) Add a case in the Containers\ListItemContaine\toggleEditing
 *      method to get the data. Also will need to add another enitity to the store (actions, reducers, etc.)
 * 5. Special logic may be needed when moving an item between lists (as in the cas of Users ). Add this to Containers\ListItemContaine\mapOldListFieldsToNewListFields
 *
 */
const fieldTypes: Array<IDropdownOption> = [
    { key: null, text: "(Selecte one)" },
    { key: "__LISTDEFINITIONTITLE__", text: "List Title" }, //used to display the ListDefinition Title in the grid, for when users add a new item
    { key: "Text", text: "Text" },
    { key: "Integer", text: "Integer" },
    { key: "Note", text: "Note" },
    { key: "DateTime", text: "DateTime" },
    // { key: "Counter", text: "Counter" },
    { key: "Choice", text: "Choice" },
    { key: "Lookup", text: "Lookup" },
    { key: "Counter", text: "Coumter (Item ID)" },
    // { key: "Boolean", value: "Boolean" },
    { key: "Number", text: "Number" },
    // { key: "Currency", value: "Currency" },
    // { key: "URL", value: "URL" },
    // { key: "Computed", value: "Computed" },
    // { name: "Guid", value: "Guid" },
    // { name: "MultiChoice", value: "MultiChoice" },
    // { name: "Computed", value: "Computed" },
    // { name: "Calculated", value: "Calculated" },
    // { name: "Computed", value: "Computed" },
    // { name: "File", value: "File" },
    // { name: "Attachments", value: "Attachments" },
    { key: "User", text: "User" },
    // { name: "ModStat", value: "ModStat" },
    // { name: "ContentTypeId", value: "ContentTypeId" },
    // { name: "WorkflowStatus", value: "WorkflowStatus" },
    // { name: "WorkflowEventType", value: "WorkflowEventType" },

];
const sortDirectionOptions: Array<IDropdownOption> = [

    { key: SortDirection.None, text: SortDirection[SortDirection.None] },
    { key: SortDirection.Ascending, text: SortDirection[SortDirection.Ascending] },
    { key: SortDirection.Descending, text: SortDirection[SortDirection.Descending] },

];
export interface IColumnsPageProps extends React.Props<any> {
    columns: Array<ColumnDefinition>;
    addColumn: () => void;
    removeAllColumns: () => void;
    removeColumn: (column) => void;

    moveColumnUp: (Column: ColumnDefinition) => void;
    moveColumnDown: (Column: ColumnDefinition) => void;
    save: () => void;
}
interface IContextMenu extends React.Props<any> {
    //   onRowDelete: AdazzleReactDataGrid.ColumnEventCallback;
}
function mapStateToProps(state) {
    return {
        columns: state.columns,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        addColumn: (): void => {
            const id = Guid.newGuid();
            const col: ColumnDefinition = new ColumnDefinition(id.toString(), "", 80, true, );
            dispatch(addColumn(col));
        },

        removeColumn: (column): void => {

            dispatch(removeColumn(column));
        },
        removeAllColumns: (column): void => {

            dispatch(removeAllColumns());
        },
        moveColumnUp: (column): void => {
            dispatch(moveCulumnUp(column));
        },
        moveColumnDown: (column): void => {
            dispatch(moveCulumnDown(column));
        },
        save: (column): void => {
            //      // dispatch(moveCulumnDown(column));
        },
    };
}

export interface GridColumn {
    id: string;
    name: string;
    editable: boolean;
    width: number;
    formatter?: string;
    editor?: string;
}
export interface IGridProps {
    editing: {
        entityid: string;
        columnid: string;
    };
}
export class ColumnDefinitionContainerNative extends React.Component<IColumnsPageProps, IGridProps> {
    public constructor() {
        super();
        this.CellContents = this.CellContents.bind(this);
        this.TableDetail = this.TableDetail.bind(this);
        this.TableRow = this.TableRow.bind(this);
        this.TableRows = this.TableRows.bind(this);
        this.toggleEditing = this.toggleEditing.bind(this);
        this.handleCellUpdated = this.handleCellUpdated.bind(this);
        this.handleCellUpdatedEvent = this.handleCellUpdatedEvent.bind(this);
        this.handleRowdeleted = this.handleRowdeleted.bind(this);
        this.moveColumnUp = this.moveColumnUp.bind(this);
        this.moveColumnDown = this.moveColumnDown.bind(this);


    }
    public gridColulumns: Array<GridColumn> = [{
        id: "guid",
        name: "guid",
        editable: true,
        width: 250
    },
    {
        id: "name",
        name: "name",
        editable: true,
        width: 100
    },
    {
        id: "type",
        name: "type",
        editable: true,
        editor: "FieldTypesEditor",
        formatter: "FieldTypesFormatter",
        width: 80
    },
    {
        id: "editable",
        name: "editable",
        editable: true,
        editor: "BooleanEditor",
        formatter: "BooleanFormatter",
        width: 99
    },
    {
        id: "sortSequence",
        name: "sortSequence",
        editable: true,
        width: 99,
        editor: "SortSequenceEditor",


    },
    {
        id: "sortDirection",
        name: "sortDirection",
        editable: true,
        width: 99,
        editor: "SortDirectionEditor",
        formatter: "SortDirectionFormatter",

    }];

    private handleCellUpdatedEvent(event) { //native react uses a Synthetic event
        this.handleCellUpdated(event.target.value);
    }
    private handleCellUpdated(value) { // Office UI Fabric does not use events. It just calls this method with the new value
        let {entityid, columnid} = this.state.editing;
        const entity: ColumnDefinition = _.find(this.props.columns, (temp) => temp.guid === entityid);
        const column = _.find(this.gridColulumns, (temp) => temp.id === columnid);
        entity[column.name] = value;
        //  this.props.saveColumn(entity);

    }

    private moveColumnUp(event) {

        Log.verbose("list-Page", "Row changed-fired when row changed or leaving cell ");
        const target = this.getParent(event.target, "TD");
        const attributes: NamedNodeMap = target.attributes;
        const entityId = attributes.getNamedItem("data-entityid").value;
        const column: ColumnDefinition = _.find(this.props.columns, cd => cd.guid === entityId);
        this.props.moveColumnUp(column);
        return;
    }
    private moveColumnDown(event) {

        Log.verbose("list-Page", "Row changed-fired when row changed or leaving cell ");
        const target = this.getParent(event.target, "TD");
        const attributes: NamedNodeMap = target.attributes;
        const entityId = attributes.getNamedItem("data-entityid").value;
        const column: ColumnDefinition = _.find(this.props.columns, cd => cd.guid === entityId);
        this.props.moveColumnDown(column);
        return;
    }
    private handleRowdeleted(event) {

        Log.verbose("list-Page", "Row changed-fired when row changed or leaving cell ");
        const target = this.getParent(event.target, "TD");
        const attributes: NamedNodeMap = target.attributes;
        const entityId = attributes.getNamedItem("data-entityid").value;
        const column: ColumnDefinition = _.find(this.props.columns, cd => cd.guid === entityId);
        this.props.removeColumn(column);
        return;
    }
    public getParent(node: Node, type: string): Node {
        while (node.nodeName !== "TD") {
            node = node.parentNode;
        }
        return node;
    }
    public toggleEditing(event) {
        Log.verbose("list-Page", "focus event fired editing  when entering cell");
        const target = this.getParent(event.target, "TD"); // walk up the Dom to the TD, thats where the IDs are stored
        const attributes: NamedNodeMap = target.attributes;
        const entityid = attributes.getNamedItem("data-entityid").value;
        const columnid = attributes.getNamedItem("data-columnid").value;
        this.setState({ "editing": { entityid: entityid, columnid: columnid } });
    }
    public CellContentsEditable(props: { entity: ColumnDefinition, gridColumn: GridColumn, cellUpdated: (newValue) => void, cellUpdatedEvent: (event: React.SyntheticEvent<any>) => void; }): JSX.Element {
        const {entity, gridColumn, cellUpdated, cellUpdatedEvent} = props;
        if (!gridColumn.editable) {
            return (<span>
                {entity[gridColumn.name]}
            </span>);
        }
        switch (gridColumn.editor) {
            case "BooleanEditor":
                return (
                    <Toggle label="" checked={entity[gridColumn.name]} onChanged={(val: boolean) => cellUpdated(val)} >
                    </Toggle >
                );
            case "FieldTypesEditor":
                return (
                    <Dropdown label="" selectedKey={entity[gridColumn.name]} options={fieldTypes} onChanged={(selection: IDropdownOption) => cellUpdated(selection.key)} >
                    </Dropdown >
                );
            case "SortSequenceEditor":
                return (
                    <Slider
                        onChange={selection => cellUpdated(selection)}
                        min={1}
                        max={10}
                        value={entity[gridColumn.name]}
                    >
                    </Slider >
                );
            case "SortDirectionEditor":
                return (
                    <Dropdown label="" selectedKey={entity[gridColumn.name]}
                        options={sortDirectionOptions}
                        onChanged={(selection: IDropdownOption) => cellUpdated(selection.key)}
                    >
                    </Dropdown >
                );
            default:
                return (
                    <TextField autoFocus width={gridColumn.width}
                        value={entity[gridColumn.name]}
                        onChanged={cellUpdated} // this does not use eventing. It just calls the method. onChanged NOT onChange
                    />);
        }
    }
    public CellContents(props: { entity: ColumnDefinition, gridColumn: GridColumn }): JSX.Element {
        const {entity, gridColumn} = props;
        if (!gridColumn.editable) {
            return (<span>
                {entity[gridColumn.name]}
            </span>);
        }

        switch (gridColumn.formatter) {

            case "BooleanFormatter":
                // Does not worlk. Does not does not have onFocus
                //   return (
                //         <Toggle label="" checked={entity[gridColumn.name]} disabled={true} >
                //         </Toggle >
                //     );
                let result = (entity[gridColumn.name]) ? (<div>Yes</div>) : (<div>No</div>);
                return result;
            case "SortDirectionFormatter":
                return (
                    <a href="#" onFocus={this.toggleEditing} style={{ textDecoration: "none" }}>
                        {SortDirection[entity[gridColumn.name]]}
                    </a>
                );

            case "SharePointLookupCellFormatter":
                return (<SharePointLookupCellFormatter value={entity[gridColumn.name]} onFocus={this.toggleEditing} />);
            case "FieldTypesFormatter":
            debugger;
            const displayName=_.find(fieldTypes,ft=>{return ft.key===entity[gridColumn.name]}).text;
                return (<a href="#" onFocus={this.toggleEditing} style={{ textDecoration: "none" }}>
                    {displayName}
                </a>
                );
            default:
                return (<a href="#" onFocus={this.toggleEditing} style={{ textDecoration: "none" }}>
                    {entity[gridColumn.name]}
                </a>
                );
        }
    }
    public TableDetail(props): JSX.Element {
        const {entity, column} = props;
        if (this.state && this.state.editing && this.state.editing.entityid === entity.guid && this.state.editing.columnid === column.id && column.editable) {
            return (<td data-entityid={entity.guid} data-columnid={column.id} style={{ width: column.width, border: "1px solid red", padding: "0px" }}>
                <this.CellContentsEditable entity={entity} gridColumn={column} cellUpdated={this.handleCellUpdated} cellUpdatedEvent={this.handleCellUpdatedEvent} />
            </td>
            );
        } else {
            return (<td onClick={this.toggleEditing} data-entityid={entity.guid} data-columnid={column.id} style={{ width: column.width, border: "1px solid black", padding: "0px" }} >
                <this.CellContents key={entity.id + column.id} entity={entity} gridColumn={column} />
            </td>
            );
        }
    }
    public TableRow(props: { isFirst: boolean, isLast: boolean, entity: ColumnDefinition, columns: Array<GridColumn>, cellUpdated: (newValue) => void, cellUpdatedEvent: (event: React.SyntheticEvent<any>) => void; }): JSX.Element {
        const {entity, columns, cellUpdated, cellUpdatedEvent, isLast, isFirst} = props;
        return (
            <tr>
                {
                    columns.map(function (column) {
                        return (
                            <this.TableDetail key={column.id} entity={entity} column={column} cellUpdated={this.handleCellUpdated} cellUpdatedEvent={this.handleCellUpdatedEvent} />
                        );
                    }, this)
                }
                <td data-entityid={entity.guid} data-columnid={""} onClick={this.toggleEditing}>
                    <Button
                        onClick={this.handleRowdeleted}
                        buttonType={ButtonType.icon}
                        icon="Delete" />
                    <Button
                        buttonType={ButtonType.icon}
                        icon="Up" disabled={isFirst}
                        onClick={this.moveColumnUp} />
                    <Button
                        buttonType={ButtonType.icon}
                        icon="Down" disabled={isLast}
                        onClick={this.moveColumnDown} />


                </td>
            </tr>);
    };
    public TableRows(props: { entities: Array<ColumnDefinition>, columns: Array<GridColumn>, cellUpdated: (newValue) => void, cellUpdatedEvent: (event: React.SyntheticEvent<any>) => void; }): JSX.Element {
        const {entities, columns, cellUpdated, cellUpdatedEvent} = props;
        return (
            <tbody>
                {
                    entities.map(function (entity, index, all) {
                        return (
                            <this.TableRow isFirst={index === 0} isLast={index === all.length - 1} key={entity.guid} columns={columns} entity={entity} cellUpdated={this.handleCellUpdated} cellUpdatedEvent={this.handleCellUpdatedEvent} />
                        );
                    }, this)
                }
            </tbody>
        );
    }
    public render() {
        const {  addColumn } = this.props;
        return (
            <Container testid="columns" size={2} center>
                <CommandBar items={[{
                    key: "AddColumns",
                    name: "Add a Column",
                    icon: "Add",
                    onClick: addColumn
                },
                {
                    key: "ClearAllColums",
                    name: "Remove All Columns",
                    canCheck: true,
                    icon: "Delete",
                    onClick: this.props.removeAllColumns
                },
                {
                    key: "save",
                    name: "save",
                    canCheck: true,
                    icon: "Save",
                    onClick: this.props.save
                }

                ]} />
                <table style={{ borderColor: "#600", borderWidth: "0 0 0 0", borderStyle: "solid" }}>
                    <thead>
                        <tr>
                            {this.gridColulumns.map((column) => {
                                return <th key={column.name}>{column.name}</th>;
                            })}
                        </tr>
                    </thead>
                    {
                        <this.TableRows entities={this.props.columns} columns={this.gridColulumns} cellUpdated={this.handleCellUpdated} cellUpdatedEvent={this.handleCellUpdatedEvent} />
                    })}
        </table>
            </Container>
        );
    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ColumnDefinitionContainerNative);
