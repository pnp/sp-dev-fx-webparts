import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BaseDialog, IDialogConfiguration } from '@microsoft/sp-dialog';
import {
    autobind,
    ColorPicker,
    PrimaryButton,
    Button,
    DialogFooter,
    DialogContent
} from 'office-ui-fabric-react';
import {
    DetailsList, DetailsListLayoutMode, IColumn, SelectionMode, Selection,
    ColumnActionsMode
} from "office-ui-fabric-react/lib/DetailsList";




//import { ListView, IViewField, SelectionMode, GroupOrder, IGrouping } from "@pnp/spfx-controls-react/lib/ListView";
import { sp, Fields } from "@pnp/sp";
interface IItemHistoryDialogContentProps {
    versions: Array<any>;
    columns: Array<string>;
    columnDefs:Fields;
    close: () => void;
}
class ItemHistoryDialogContent extends React.Component<IItemHistoryDialogContentProps, {}> {
    private _pickedColor: string;

    constructor(props) {
        super(props);
    }

    public render(): JSX.Element {
        debugger;
        try {
            let testviewFields: Array<IColumn> = this.props.columns.map(
                f => {
                    return {
                        name: f,
                        key: f,
                        fieldName: f,
                        minWidth: 100
                    };
                });
          
            let viewFields: Array<IColumn> = [
                { name: "VendorNumber", key: "VendorNumber", fieldName: "VendorNumber", minWidth: 100 },
                { name: "Region", key: "Region", fieldName: "Region", minWidth: 100 },
                { name: "Title", key: "Title", fieldName: "Title", minWidth: 100 },
          //  {name: "Editor", key: "Editor", fieldName: "Editor", minWidth: 100},
                //     {name: "Created", key: "Created", fieldName: "Created", minWidth: 100}
            ];
            debugger;
            return (<DialogContent
                title='Item History'
                subText={"SS"}
                onDismiss={this.props.close}
                showCloseButton={true}
            >
                <DetailsList
                    items={this.props.versions}
                    columns={viewFields}
                    compact={false}
                    selectionMode={SelectionMode.none}
                    key={"ID"}
                    onShouldVirtualize={() => { return false }}

                    skipViewportMeasures={true}

                />
                <DialogFooter>
                    <Button text='Cancel' title='Cancel' onClick={this.props.close} />

                </DialogFooter>
            </DialogContent>);
        }
        catch (e) {
            debugger;
        };

    }

    @autobind
    private _onColorChange(color: string): void {
        this._pickedColor = color;
    }
}
export default class ItemHistoryDialog extends BaseDialog {
    public itemId: number;
    public listId: string;
    public viewId: string;
    public fieldInterntalNames: Array<string>;
    public fieldDefinitions: Fields;
    public versionHistory: Array<any>;
    public onBeforeOpen(): Promise<void> {
        // set up pnp here
        // let viewId = this.context.pageContext.legacyPageContext.viewId //get the view id and then used pnp to query view columns/fields as follows,
        let batch = sp.createBatch()
        // get the fields in the view
        sp.web.lists.getById(this.listId).views.getById(this.viewId).fields.inBatch(batch).get().then((results: any) => {
     
            this.fieldInterntalNames = results.Items.map(f => {
                switch (f) {
                    case "LinkTitle":
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
            debugger;
            this.fieldDefinitions = results;
        }).catch((err: any) => {
            debugger;
        });
        // get the field versionHostory
        sp.web.lists.getById(this.listId).items.getById(this.itemId).versions.inBatch(batch).get().then((versions) => {
            this.versionHistory = versions;
            debugger;
            return;
        }).catch((err: any) => {
            debugger;
        });
        return batch.execute().then(e=>{
            debugger;
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

    @autobind
    private _submit(color: string): void {
       
        this.close();
    }
}