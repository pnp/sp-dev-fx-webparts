import * as React from 'react';

import { DialogContent } from 'office-ui-fabric-react/lib/Dialog';

import { IfollowDocumentPropertiesProps } from "./IfollowDocumentPropertiesProps";

export class FollowDocumentProperties extends React.Component<IfollowDocumentPropertiesProps> {
    private _iframe: any;
    constructor(props) {
        super(props);
    }

    public render(): React.ReactElement<IfollowDocumentPropertiesProps> {
       
        return (
            <DialogContent
                title="Follow Status"
                showCloseButton={true}
                onDismiss={this.props.close}
            >
                <div>
                <iframe ref={(iframe) => { this._iframe = iframe; }} onLoad={this._iframeOnLoad.bind(this)}
                style={{ width: "600px", height: "800px" }} src={this.props.url} frameBorder={0}></iframe>
                </div>
            </DialogContent>
        );
    }
    private _iframeOnLoad(): void {
        try { 
            this._iframe.contentWindow.frameElement.cancelPopUp = this.props.close;
        } catch (err) {
            if (err.name !== "SecurityError") {
                throw err;
            }
        }
        if (this.props.iframeOnLoad) {
            this.props.iframeOnLoad(this._iframe);
        }
    }
}