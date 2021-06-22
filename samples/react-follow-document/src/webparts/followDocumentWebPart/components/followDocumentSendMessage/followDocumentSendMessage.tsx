import * as React from 'react';

import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { DialogContent, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { TeamChannelPicker } from "@pnp/spfx-controls-react/lib/TeamChannelPicker";
import { TeamPicker } from "@pnp/spfx-controls-react/lib/TeamPicker";
import { IfollowDocumentSendMessageProps } from "./IfollowDocumentSendMessageProps";
import { IfollowDocumentSendMessageState } from "./IfollowDocumentSendMessageState";
import { ITag, } from "office-ui-fabric-react/lib/Pickers";
import * as AdaptiveCards from "adaptivecards";
import Graph from "../../Service/GraphService";

export class FollowDocumentSendMessage extends React.Component<IfollowDocumentSendMessageProps, IfollowDocumentSendMessageState> {
    private card: any;
    private _acContainer: HTMLDivElement;
    constructor(props) {
        super(props);
        this.state = {
            selectedTeam: [],
            selectedTeamChannels: [],
        };
        console.log(this.props.fileInfo);
    }
    public componentDidMount(): void {
        this.showAdaptiveCard(this.props.fileInfo);
    }

    private sendMessageChannell = async () => {
        const graphService: Graph = new Graph();
        const initialized = await graphService.initialize(this.props.context.serviceScope);
        if (initialized) {
            const HeadersendMessage = {
                "body": {
                    "contentType": "html",
                    "content": this._acContainer.innerHTML + `<a href="${(this.props.fileInfo.fields.ServerUrlProgid === undefined ? this.props.fileInfo.fields.Url : this.props.fileInfo.fields.ServerUrlProgid.substring(1))}">${this.props.fileInfo.fields.Title}</a>`
                }
            };
            const getresult = await graphService.postGraphContent(`https://graph.microsoft.com/v1.0/teams/${this.state.selectedTeam[0].key}/channels/${this.state.selectedTeamChannels[0].key}/messages`, HeadersendMessage);
            console.log(getresult);
        }
    }

    public showAdaptiveCard(fileInfo: any) {

        this.card = {
            "type": "AdaptiveCard",
            "body": [
                {
                    "type": "TextBlock",
                    "size": "Medium",
                    "weight": "Bolder",
                    "text": "Site: " + fileInfo.WebName
                },
                {
                    "type": "ColumnSet",
                    "columns": [
                        {
                            "type": "Column",
                            "items": [
                                {
                                    "type": "Image",
                                    "url": fileInfo.fields.IconUrl,
                                    "size": "Small",
                                    "spacing": "Medium"
                                }
                            ],
                            "width": "auto"
                        },
                        {
                            "type": "Column",
                            "items": [
                                {
                                    "type": "TextBlock",
                                    "weight": "Bolder",
                                    "text": fileInfo.fields.Title,
                                    "wrap": true
                                }
                            ],
                            "width": "stretch"
                        }
                    ]
                },
                {
                    "type": "TextBlock",
                    "text": "Comments: "+ (fileInfo.Description === undefined? "": fileInfo.Description),
                    "wrap": true
                }
            ],
            "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
            "version": "1.2"
        };

        // Create an AdaptiveCard instance
        var adaptiveCard = new AdaptiveCards.AdaptiveCard();

        adaptiveCard.hostConfig = new AdaptiveCards.HostConfig({
            fontFamily: "Segoe UI, Helvetica Neue, sans-serif"
        });

        // Parse the card
        adaptiveCard.parse(this.card);

        // Empty the div so we can replace it
        while (this._acContainer.firstChild) {
            this._acContainer.removeChild(this._acContainer.lastChild);
        }

        // Render the card to an HTML element
        adaptiveCard.render(this._acContainer);
    }

    public render(): React.ReactElement<IfollowDocumentSendMessageProps> {
        const _onSelectedTeamChannels = (tagList: ITag[]) => {
            this.setState({ selectedTeamChannels: tagList });
        };
        const sendMessageTeam = () => {
            this.sendMessageChannell();
            this.props.close();
        };

        const handleChange = (event) => {
            this.props.fileInfo.Description = (event.target as HTMLInputElement).value;
            this.showAdaptiveCard(this.props.fileInfo);
        };
        return (
            <DialogContent
                title="Send Document Card"
                showCloseButton={true}
                onDismiss={this.props.close}
            >
                <div>
                    <TeamPicker
                        label="Select Team"
                        selectedTeams={this.state.selectedTeam}
                        appcontext={this.props.context}
                        itemLimit={1}
                        onSelectedTeams={(tagList: ITag[]) => {
                            this.setState({ selectedTeamChannels: [] });
                            this.setState({ selectedTeam: tagList });
                        }}
                    />
                    {this.state?.selectedTeam && this.state?.selectedTeam.length > 0 && (
                        <>
                            <TeamChannelPicker label="Select Team channel"
                                teamId={this.state.selectedTeam[0].key}
                                selectedChannels={this.state.selectedTeamChannels}
                                appcontext={this.props.context}
                                itemLimit={1}
                                onSelectedChannels={_onSelectedTeamChannels} />
                        </>
                    )}
                    <TextField onChange={handleChange} label="Comments" multiline rows={3} />
                    <div ref={(elm) => { this._acContainer = elm; }}></div>
                </div>
                <DialogFooter>
                    <PrimaryButton onClick={sendMessageTeam} text="Send" />
                    <DefaultButton onClick={this.props.close} text="Cancel" />
                </DialogFooter>
            </DialogContent>
        );
    }
}
