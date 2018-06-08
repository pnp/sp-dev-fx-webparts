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
import { sp } from "@pnp/sp";
interface IItemHistoryDialogContentProps {
    versions: Array<any>;
    columns: Array<string>;
    close: () => void;
}
class ItemHistoryDialogContent extends React.Component<IItemHistoryDialogContentProps, {}> {
    private _pickedColor: string;

    constructor(props) {
        super(props);
    }

    public render(): JSX.Element {
        let viewFields: Array<IColumn> = this.props.columns.map(f => { return { name: f ,key:name, fieldName:name, minWidth:100}; });
        debugger;
        return (<DialogContent
            title='Item History'
            subText={"SS"}
            onDismiss={this.props.close}
            showCloseButton={true}
        >
            <DetailsList 
                items={this.props.versions}
         columns       ={viewFields}
                compact={false}
                selectionMode={SelectionMode.none}
          
                onShouldVirtualize = { () => false}

            />
            <DialogFooter>
                <Button text='Cancel' title='Cancel' onClick={this.props.close} />

            </DialogFooter>
        </DialogContent>);
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
    public versionHistory: Array<any>;
    public onBeforeOpen(): Promise<void> {
        // set up pnp here
        
        // let viewId = this.context.pageContext.legacyPageContext.viewId //get the view id and then used pnp to query view columns/fields as follows,
        return sp.web.lists.getById(this.listId).
            views.getById(this.viewId).fields.get()
            .then((results: any) => {
                this.fieldInterntalNames = results.Items;
                return sp.web.lists.getById(this.listId).items.getById(this.itemId).versions.select(this.fieldInterntalNames.join(",")).get()
                    .then((versions) => {
                        this.versionHistory = versions;
                        debugger;
                        return;

                    })
                    .catch((err: any) => {
                        debugger;
                    });
            })
            .catch((err: any) => {
                debugger;
            });



    }
    public render(): void {

        ReactDOM.render(<ItemHistoryDialogContent
            versions={this.versionHistory}
            columns={this.fieldInterntalNames}
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