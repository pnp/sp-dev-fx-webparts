import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BaseDialog, IDialogConfiguration } from '@microsoft/sp-dialog';

import { find } from "lodash";
import {
    autobind,
    PrimaryButton,
    Button,
    DialogFooter,
    DialogContent
} from 'office-ui-fabric-react';


import {
    DetailsList, DetailsListLayoutMode, IColumn, SelectionMode, Selection,
    ColumnActionsMode
} from "office-ui-fabric-react/lib/DetailsList";

import { parse, format } from "date-fns";




//import { ListView, IViewField, SelectionMode, GroupOrder, IGrouping } from "@pnp/spfx-controls-react/lib/ListView";
import { sp, Fields, Field } from "@pnp/sp";
interface IItemHistoryDialogContentProps {
    versions: Array<any>;
    columns: Array<string>;
    columnDefs: Array<Field>;
    close: () => void;
}
class ItemHistoryDialogContent extends React.Component<IItemHistoryDialogContentProps, {}> {
    constructor(props) {
        super(props);
    }

    @autobind
    public fieldChanged(item?: any, index?: number, column?: IColumn, columnType: string = "Text"): boolean {
        if (index < this.props.versions.length - 1) {
            switch (columnType) {
                case "User":

                    if (this.props.versions[index][column.fieldName]["LookupId"] !== this.props.versions[index + 1][column.fieldName]["LookupId"]) {
                        return true;
                    }
                    break;
                case "LookupMulti":
                    debugger; // if the length is different true; if the values are diffent fales
                    if (this.props.versions[index][column.fieldName].length !== this.props.versions[index + 1][column.fieldName].length) {
                        return true;
                    }
                    // length is the same, compare values
                    for (let i = 0; i < this.props.versions[index][column.fieldName].length; i++) {
                        if (this.props.versions[index][column.fieldName][i]["LookupId"] !== this.props.versions[index + 1][column.fieldName][i]["LookupId"]) {
                            return true;
                        }
                    }
                    return false;

                default:
                    if (this.props.versions[index][column.fieldName] !== this.props.versions[index + 1][column.fieldName]) {
                        return true;
                    }
                    break;



            }
        }
        return false;
    }
    @autobind
    public getStyle(item?: any, index?: number, column?: IColumn, columnType: string = "Text"): React.CSSProperties {
        if (this.fieldChanged(item, index, column, columnType)) {
            return {
                backgroundColor: 'yellow',
            };
        }
        return {};
    }

    @autobind
    public onRenderDateTime(item?: any, index?: number, column?: IColumn): any {
        return (<div style={this.getStyle(item, index, column)}>
            {format(parse(item[column.fieldName]), "DD-MMM-YYYY")}
        </div>);
    }
    @autobind
    public onRenderUser(item?: any, index?: number, column?: IColumn): any {
        debugger;
        return (<div style={this.getStyle(item, index, column, "User")}>
            {item[column.fieldName]["LookupValue"]}
        </div>);


    }
    @autobind
    public onRenderLookupMulti(item?: any, index?: number, column?: IColumn): any {
        debugger;
        let display = "";
        for (let val of item[column.fieldName]) {
            display += val["LookupValue"]+";";
        }
        return (<div style={this.getStyle(item, index, column, "LookupMulti")}>
            {display}
        </div>);


    }

    @autobind
    public onRenderChoice(item?: any, index?: number, column?: IColumn): any {

        return (<div style={this.getStyle(item, index, column)}>
            {item[column.fieldName]}
        </div>);
    }
    @autobind
    public onRenderText(item?: any, index?: number, column?: IColumn): any {
        debugger;
        return (<div style={this.getStyle(item, index, column)}>
            {item[column.fieldName]}
        </div>);
    }
    @autobind
    public onRenderAttachments(item?: any, index?: number, column?: IColumn): any {
        debugger;
        let value=item[column.fieldName]?"Yes":"No";
        return (<div style={this.getStyle(item, index, column)}>
            {value}
        </div>);
    }
    @autobind
    public render(): JSX.Element {

        debugger;
        try {
            let testviewFields: Array<IColumn> = this.props.columns.map(cname => {
                let columnDef: Field = find(this.props.columnDefs, (colunmDef) => { return colunmDef["InternalName"] === cname; });
                switch (columnDef["TypeAsString"]) {
                    case "Attachments":
                    return {
                        name: columnDef["Title"],
                        isResizable: true,
                        key: cname,
                        fieldName: cname,
                        minWidth: 100,
                        onRender: this.onRenderAttachments,
                    };
                    case "LookupMulti":
                        return {
                            name: columnDef["Title"],
                            isResizable: true,
                            key: cname,
                            fieldName: cname,
                            minWidth: 100,
                            onRender: this.onRenderLookupMulti,
                        };

                    case "DateTime":
                        return {
                            name: columnDef["Title"],
                            isResizable: true,
                            key: cname,
                            fieldName: cname,
                            minWidth: 100,
                            onRender: this.onRenderDateTime,
                        };
                    case "Choice":
                        return {
                            name: columnDef["Title"],
                            isResizable: true,
                            key: cname,
                            fieldName: cname,
                            minWidth: 100,
                            onRender: this.onRenderChoice
                        };
                    case "Lookup":
                    case "User":
                        return {
                            name: columnDef["Title"],
                            isResizable: true,
                            key: cname,
                            fieldName: cname,
                            minWidth: 100,
                            onRender: this.onRenderUser
                        };

                    case "Text":
                    case "Note":
                        return {
                            name: columnDef["Title"],
                            isResizable: true,
                            key: cname,
                            fieldName: cname,
                            minWidth: 100,
                            onRender: this.onRenderText
                        };


                    default:
                        console.log("the colum type " + columnDef["TypeAsString"] + "HAS NOT BEENTESTED, default to text")
                        return {
                            name: columnDef["Title"],
                            isResizable: true,
                            key: cname,
                            fieldName: cname,
                            minWidth: 100,
                            onRender: this.onRenderText
                        };

                }

            });
            testviewFields.unshift({
                name: "Version",
                isResizable: true,
                key: "Version",
                fieldName: "VersionLabel",
                minWidth: 50
            }
            );



            return (<DialogContent
                title='Version History(Grid)'
                onDismiss={this.props.close}
                showCloseButton={true}

            >
                <DetailsList
                    items={this.props.versions}
                    columns={testviewFields}
                    compact={false}
                    selectionMode={SelectionMode.none}
                    key={"ID"}
                    onShouldVirtualize={() => { return false; }}
                    layoutMode={DetailsListLayoutMode.justified}
                    skipViewportMeasures={true}

                />
                <DialogFooter>
                    <Button text='Cancel' title='Cancel' onClick={this.props.close} />

                </DialogFooter>
            </DialogContent>);
        }
        catch (e) {
            debugger;
        }

    }

}
export default class ItemHistoryDialog extends BaseDialog {
    public itemId: number;
    public listId: string;
    public viewId: string;
    public fieldInterntalNames: Array<string>;
    public fieldDefinitions: Array<Field>;
    public versionHistory: Array<any>;
    public onBeforeOpen(): Promise<void> {
        // set up pnp here
        // let viewId = this.context.pageContext.legacyPageContext.viewId //get the view id and then used pnp to query view columns/fields as follows,
        let batch = sp.createBatch();
        // get the fields in the view
        sp.web.lists.getById(this.listId).views.getById(this.viewId).fields.inBatch(batch).get().then((results: any) => {

            this.fieldInterntalNames = results.Items.map(f => {
                switch (f) {
                    case "LinkTitle":
                    case "LinkTitleNoMenu":
                        return "Title";
                    //break;
                    default:
                        return f;
                }
            });

        }).catch((err: any) => {
            debugger;
        });
        // get the field definitions for the list
        sp.web.lists.getById(this.listId).fields.inBatch(batch).get().then((results: any) => {

            this.fieldDefinitions = results;
        }).catch((err: any) => {
            debugger;
        });
        // get the field versionHostory
        sp.web.lists.getById(this.listId).items.getById(this.itemId).versions.inBatch(batch).get().then((versions) => {
            this.versionHistory = versions;

            return;
        }).catch((err: any) => {
            debugger;
        });
        return batch.execute().then(e => {

        });

    }
    public render(): void {

        ReactDOM.render(<ItemHistoryDialogContent
            versions={this.versionHistory}
            columns={this.fieldInterntalNames}
            columnDefs={this.fieldDefinitions}
            close={this.close}


        />, this.domElement);
    }

    public getConfig(): IDialogConfiguration {
        return {
            isBlocking: false
        };
    }

}