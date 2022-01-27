import * as React from 'react';
import styles from './followDocumentPreview.module.scss';
import { Panel, PanelType } from "office-ui-fabric-react/lib/Panel";
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';
import { DefaultButton } from "office-ui-fabric-react/lib/Button";
import Graph from "../../Service/GraphService";


import { IfollowDocumentPreviewProps } from './IfollowDocumentPreviewProps';
import { IfollowDocumentPreviewState } from './IfollowDocumentPreviewState';

export class followDocumentPreview extends React.Component<IfollowDocumentPreviewProps, IfollowDocumentPreviewState> {

    constructor(props: IfollowDocumentPreviewProps) {
        super(props);
        this.state = {
            isOpen: true,
            visible: false,
        };
        this.getSearchItemID();
    }

    public async componentWillReceiveProps(nextProps: IfollowDocumentPreviewProps): Promise<void> {
        // open panel
        this.setState({
            isOpen: nextProps.isOpen,
            visible: false,
        });
        this.getSearchItemID();
    }

    private getSearchItemID = async () => {
        const graphService: Graph = new Graph();
        const initialized = await graphService.initialize(this.props.context.serviceScope);
        if (initialized) {
            let graphData: any = await graphService.postGraphContent(`https://graph.microsoft.com/v1.0/drives/${this.props.FollowDocument.DriveId}/items/${this.props.FollowDocument.ItemId}/preview`, {});
            this.setState({
                preview: graphData.getUrl,
                name: this.props.FollowDocument.Title,
                visible: true,
            });
        }
    }

    public render(): React.ReactElement<IfollowDocumentPreviewProps> {


        return (
            <Panel isOpen={this.state.isOpen}
                type={PanelType.large}
                isLightDismiss
                headerText={this.state.name}
                onRenderFooterContent={this._onRenderFooterContent}
                onDismiss={this._closePanel}
            >
                <div>
                    <label>Preview Document</label>
                    {(!this.state.visible) &&
                        <Spinner size={SpinnerSize.large} />
                    }
                    <iframe style={{ width: "100%", height: "800px" }} src={this.state.preview} frameBorder={0}></iframe>
                </div>
            </Panel>
        );
    }

    private _onRenderFooterContent = () => {
        return (
            <div className={styles.footerSection}>
                <DefaultButton text="Cancel" onClick={this._closePanel} />
            </div>
        );
    }

    /**
     * Close extension panel
     */
    private _closePanel = () => {
        this.setState({
            isOpen: false,
            visible: true,
            preview: ""
        });
    }

}