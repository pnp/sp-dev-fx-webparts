import * as React from 'react';
import { IScriptEditorProps } from './IScriptEditorProps';
import { Placeholder } from "@pnp/spfx-controls-react/lib/Placeholder";

export default class ScriptEditor extends React.Component<IScriptEditorProps, any> {
    constructor(props: IScriptEditorProps, state: any) {
        super(props);

        this._showDialog = this._showDialog.bind(this);
        this.state = {};
    }

    public componentDidMount(): void {
        this.setState({ script: this.props.script, loaded: this.props.script });
    }

    private _showDialog() {
        this.props.propPaneHandle.open();
    }

    public render(): React.ReactElement<IScriptEditorProps> {
        const viewMode = <span dangerouslySetInnerHTML={{ __html: this.state.script }}></span>;
        return (
            <div className='ms-Fabric'>
                <Placeholder iconName='JS'
                    iconText={this.props.title}
                    description='Please configure the web part'
                    buttonLabel='Edit markup'
                    onConfigure={this._showDialog} />
                {viewMode}
            </div>);
    }
}
