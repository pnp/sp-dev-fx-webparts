import * as React from "react";
import {ISelectedPermission} from "../ISpSecurityWebPartProps";

import * as _ from "lodash";

import {  ButtonType,DefaultButton } from "office-ui-fabric-react/lib/Button";


import { TextField, CommandBar, Dropdown, IDropdownOption, Toggle, Slider } from "office-ui-fabric-react";

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
export interface IColumnsPageProps extends React.Props<any> {
    columns: Array<ISelectedPermission>;
    addColumn: () => void;
    removeAllColumns: () => void;
    removeColumn: (column) => void;

    moveColumnUp: (Column: ISelectedPermission) => void;
    moveColumnDown: (Column: ISelectedPermission) => void;
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
// function mapDispatchToProps(dispatch) {
//     return {
//         addColumn: (): void => {
//             const id = Guid.newGuid();
//             const col: ISelectedPermission = new ISelectedPermission(id.toString(), "", 80, true, );
//             dispatch(addColumn(col));
//         },

//         removeColumn: (column): void => {

//             dispatch(removeColumn(column));
//         },
//         removeAllColumns: (column): void => {

//             dispatch(removeAllColumns());
//         },
//         moveColumnUp: (column): void => {
//             dispatch(moveCulumnUp(column));
//         },
//         moveColumnDown: (column): void => {
//             dispatch(moveCulumnDown(column));
//         },
//         save: (column): void => {
//             //      // dispatch(moveCulumnDown(column));
//         },
//     };
// }

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
export class SelectedPermissionsContainerNative extends React.Component<IColumnsPageProps, IGridProps> {
    public constructor(props) {
        super(props);

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
        const entity: ISelectedPermission = _.find(this.props.columns, (temp) => temp.permission === entityid);
        const column = _.find(this.gridColulumns, (temp) => temp.id === columnid);
        entity[column.name] = value;
        //  this.props.saveColumn(entity);

    }

    private moveColumnUp(event) {

        Log.verbose("list-Page", "Row changed-fired when row changed or leaving cell ");
        const target = this.getParent(event.target, "TD");
        const attributes: NamedNodeMap = target["attributes"];
        const entityId = attributes.getNamedItem("data-entityid").value;
        const column: ISelectedPermission = _.find(this.props.columns, cd => cd.permission === entityId);
        this.props.moveColumnUp(column);
        return;
    }
    private moveColumnDown(event) {

        Log.verbose("list-Page", "Row changed-fired when row changed or leaving cell ");
        const target = this.getParent(event.target, "TD");
        const attributes: NamedNodeMap = target["attributes"];
        const entityId = attributes.getNamedItem("data-entityid").value;
        const column: ISelectedPermission = _.find(this.props.columns, cd => cd.permission === entityId);
        this.props.moveColumnDown(column);
        return;
    }
    private handleRowdeleted(event) {

        Log.verbose("list-Page", "Row changed-fired when row changed or leaving cell ");
        const target = this.getParent(event.target, "TD");
        const attributes: NamedNodeMap = target["attributes"];
        const entityId = attributes.getNamedItem("data-entityid").value;
        const column: ISelectedPermission = _.find(this.props.columns, cd => cd.permission === entityId);
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
        const attributes: NamedNodeMap = target["attributes"];
        const entityid = attributes.getNamedItem("data-entityid").value;
        const columnid = attributes.getNamedItem("data-columnid").value;
        this.setState({ "editing": { entityid: entityid, columnid: columnid } });
    }
   
   
    public render() {
        const {  addColumn } = this.props;
        return (
            <div >
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
                            <td>
                                Permission
                            </td>
                            <td>
                                color
                            </td>

                        </tr>
                    </thead>
                    {
                      <tr>
                            <td>
                                Permission
                            </td>
                            <td>
                                color
                            </td>

                      </tr>
                    })}
        </table>
            </div>
        );
    };
}
