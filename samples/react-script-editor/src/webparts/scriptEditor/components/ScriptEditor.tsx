import * as React from 'react';
import styles from './ScriptEditor.module.scss';
import { IScriptEditorProps } from './IScriptEditorProps';
import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import { DefaultButton, PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { loadStyles } from '@microsoft/load-themed-styles';
require('./overrides.css');

export default class ScriptEditor extends React.Component<IScriptEditorProps, any> {
    constructor() {
        super();

        this._showDialog = this._showDialog.bind(this);
        this._closeDialog = this._closeDialog.bind(this);
        this._cancelDialog = this._cancelDialog.bind(this);
        this._onScriptEditorTextChanged = this._onScriptEditorTextChanged.bind(this);

        const uiFabricCSS: string = `
    .pzl-bgColor-themeDark, .pzl-bgColor-themeDark--hover:hover {
      background-color: "[theme:themeDark, default:#005a9e]";
    }
    `;
        loadStyles(uiFabricCSS);
        this.state = {
            showDialog: false
        };
    }

    public componentDidMount(): void {
        this.setState({ script: this.props.script, loaded: this.props.script });
    }
    private _showDialog() {
        this.setState({ showDialog: true });
    }

    private _closeDialog() {
        this.setState({ showDialog: false });
        this.props.save(this.state.script);
    }

    private _cancelDialog() {
        this.props.save(this.state.loaded);
        this.setState({ showDialog: false, script: this.state.loaded });
    }

    private _onScriptEditorTextChanged(text: string) {
        this.setState({ script: text });
    }

    public render(): React.ReactElement<IScriptEditorProps> {
        const viewMode = <span dangerouslySetInnerHTML={{ __html: this.state.script }}></span>;

        return (
            <div >
                <div className={styles.scriptEditor}>
                    <div className={styles.container}>
                        <div className={`ms-Grid-row pzl-bgColor-themeDark ms-fontColor-white ${styles.row}`}>
                            <div className="ms-Grid-col ms-lg10 ms-xl8 ms-xlPush2 ms-lgPush1">
                                <span className="ms-font-xl ms-fontColor-white">{this.props.title}</span>
                                <p className="ms-font-l ms-fontColor-white"></p>
                                <DefaultButton description='Opens the snippet dialog' onClick={this._showDialog}>Edit snippet</DefaultButton>
                            </div>
                        </div>
                    </div>
                </div>
                <Dialog
                    isOpen={this.state.showDialog}
                    type={DialogType.normal}
                    onDismiss={this._closeDialog}
                    title='Embed'
                    subText='Paste your script, markup or embed code below. Note that scripts will only run in view mode.'
                    isBlocking={true}
                    className={'ScriptPart'}
                >
                    <TextField multiline rows={15} onChanged={this._onScriptEditorTextChanged} value={this.state.script} />
                    <DialogFooter>
                        <PrimaryButton onClick={this._closeDialog}>Save</PrimaryButton>
                        <DefaultButton onClick={this._cancelDialog}>Cancel</DefaultButton>
                    </DialogFooter>
                    {viewMode}
                </Dialog>
            </div >);
    }
}