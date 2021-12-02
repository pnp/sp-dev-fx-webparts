import * as React from 'react';

import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { DialogContent, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { IfollowDocumentSendMessageProps } from "./IfollowDocumentSendMessageProps";
import { IfollowDocumentSendMessageState } from "./IfollowDocumentSendMessageState";
import { ITag, } from "office-ui-fabric-react/lib/Pickers";
import * as AdaptiveCards from "adaptivecards";
import Graph from "../../Service/GraphService";
import { Dropdown, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { FollowDocument } from '../../models/followDocument';

export class FollowDocumentSendMessage extends React.Component<IfollowDocumentSendMessageProps, IfollowDocumentSendMessageState> {
    private card: any;
    private _acContainer: HTMLDivElement;
    constructor(props) {
        super(props);
        this.state = {
            selectedTeamChannelsOption: [],
            selectedTeamOption: [],
            selectedTeamId: "",
            selectedTeamChannelId: "",
        };
        this.loadTeams();
    }
    public componentDidMount(): void {
        this.showAdaptiveCard(this.props.fileInfo);
    }
    public loadTeams = async () => {
        const Teams = await this.getjoinedTeams();
        let Teamsoptions: Array<IDropdownOption> = new Array<IDropdownOption>();
        Teams.value.forEach(element => {
            Teamsoptions.push({
                key: element.id,
                text: element.displayName,
            });
        });
        this.setState({
            selectedTeamOption: Teamsoptions,
        });
    }

    private sendMessageChannell = async () => {
        const graphService: Graph = new Graph();
        const initialized = await graphService.initialize(this.props.context.serviceScope);
        if (initialized) {
            const HeadersendMessage = {
                "body": {
                    "contentType": "html",
                    "content": this._acContainer.innerHTML + `<a href="${this.props.fileInfo.WebFileUrl}">${this.props.fileInfo.Title}</a>`
                }
            };
            const getresult = await graphService.postGraphContent(`https://graph.microsoft.com/v1.0/teams/${this.state.selectedTeamId}/channels/${this.state.selectedTeamChannelId}/messages`, HeadersendMessage);
        }
    }


    private getjoinedTeams = async () => {
        const graphService: Graph = new Graph();
        const getresult = await graphService.getGraphContent(`https://graph.microsoft.com/v1.0/me/joinedTeams?$select=id,displayName`, this.props.context);
        return getresult;
    }

    private getTeamsChannels = async (TeamID) => {
        const graphService: Graph = new Graph();
        const getresult = await graphService.getGraphContent(`https://graph.microsoft.com/v1.0/teams/${TeamID}/channels?$select=id,displayName`, this.props.context);
        return getresult;
    }

    public showAdaptiveCard(fileInfo: FollowDocument) {

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
                                    "url": fileInfo.IconUrl,
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
                                    "text": fileInfo.Title,
                                    "wrap": true
                                }
                            ],
                            "width": "stretch"
                        }
                    ]
                },
                {
                    "type": "TextBlock",
                    "text": "Comments: " + (fileInfo.Description === undefined ? "" : fileInfo.Description),
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
        const sendMessageTeam = () => {
            this.sendMessageChannell();
            this.props.close();
        };

        const handleChange = (event) => {
            this.props.fileInfo.Description = (event.target as HTMLInputElement).value;
            this.showAdaptiveCard(this.props.fileInfo);
        };
        const handleSelectTeam = async (event: React.FormEvent<HTMLDivElement>, selectedOption: IDropdownOption) => {
            this.setState({
                selectedTeamId: "",
                selectedTeamChannelsOption: null,
            });
            const TeamsChannels = await this.getTeamsChannels(selectedOption.key.toString());
            let Teamsoptions: Array<IDropdownOption> = new Array<IDropdownOption>();
            TeamsChannels.value.forEach(element => {
                Teamsoptions.push({
                    key: element.id,
                    text: element.displayName,
                });
            });
            this.setState({
                selectedTeamId: selectedOption.key.toString(),
                selectedTeamChannelsOption: Teamsoptions,
            });
        };
        const handleSelectChannel = async (event: React.FormEvent<HTMLDivElement>, selectedOption: IDropdownOption) => {
            this.setState({
                selectedTeamChannelId: selectedOption.key.toString(),
            });
        };
        return (
            <DialogContent
                title="Send Document Card"
                showCloseButton={true}
                onDismiss={this.props.close}
            >
                <div>
                    <Dropdown
                        label="My Teams"
                        options={this.state.selectedTeamOption}
                        styles={{ dropdown: { width: 300 } }}
                        onChange={handleSelectTeam}
                    />
                    {this.state?.selectedTeamId !== "" && (
                        <>
                            <Dropdown
                                label="Teams Channels"
                                options={this.state.selectedTeamChannelsOption}
                                styles={{ dropdown: { width: 300 } }}
                                onChange={handleSelectChannel}
                                notifyOnReselect={true}
                            />
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
