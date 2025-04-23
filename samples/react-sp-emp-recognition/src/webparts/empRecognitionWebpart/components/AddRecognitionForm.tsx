import * as React from 'react';
import styles from './EmpRecognitionWebpart.module.scss';

import { spfi, SPFx } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/fields";
import "@pnp/sp/items";

import { PeoplePicker, PrincipalType } from "@pnp/spfx-controls-react/lib/PeoplePicker";

interface IAddRecognitionFormProps {
    context: any;
    listName: string;
    onItemAdded: () => void;
}

interface IPeoplePickerUser {
    id: number;
    fullName: string;
    loginName: string;
    email: string;
}

interface IAddRecognitionFormState {
    From: IPeoplePickerUser | null;
    To: IPeoplePickerUser | null;
    Message: string;
    AwardType: string;
    awardTypeChoices: string[];
}

export default class AddRecognitionForm extends React.Component<IAddRecognitionFormProps, IAddRecognitionFormState> {
    private sp: any;
    private defaultWebUrl = "https://sudeepghatakdemos.sharepoint.com/sites/AshishGhatak"; // Your actual site URL

    constructor(props: IAddRecognitionFormProps) {
        super(props);
        console.log("Context in constructor:", this.props.context);
        console.log("Context type:", typeof this.props.context);
        console.log("PageContext available:", !!this.props.context?.pageContext);
        console.log("Web property available:", !!this.props.context?.pageContext?.web);
        console.log("AbsoluteURL available:", !!this.props.context?.pageContext?.web?.absoluteUrl);

        this.state = {
            From: null,
            To: null,
            Message: '',
            AwardType: '',
            awardTypeChoices: []
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    public async componentDidMount(): Promise<void> {
        console.log("Context in componentDidMount:", this.props.context);
        console.log("Web URL:", this.getWebUrl());

        try {
            // Initialize sp here with better error handling
            if (this.props.context) {
                console.log("Initializing SP with context", this.props.context);
                this.sp = spfi().using(SPFx(this.props.context));

                // Test if the sp object works
                const web = await this.sp.web();
                console.log("SP Web info retrieved:", web);

                await this.fetchAwardTypeChoices();
            } else {
                console.error("Context is undefined in componentDidMount");
            }
        } catch (error) {
            console.error("Error initializing SP:", error);
        }
    }

    private getWebUrl(): string {
        // Log the values to debug
        console.log("Web URL check:", {
            webAbsoluteUrl: this.props.context?.pageContext?.web?.absoluteUrl,
            siteAbsoluteUrl: this.props.context?.pageContext?.site?.absoluteUrl,
            defaultUrl: this.defaultWebUrl
        });

        // Check each potential source and use the first available one
        if (this.props.context?.pageContext?.web?.absoluteUrl) {
            return this.props.context.pageContext.web.absoluteUrl;
        }

        if (this.props.context?.pageContext?.site?.absoluteUrl) {
            return this.props.context.pageContext.site.absoluteUrl;
        }

        return this.defaultWebUrl;
    }



    private async fetchAwardTypeChoices(): Promise<void> {
        try {
            if (!this.sp) {
                console.error("SP is not initialized");
                return;
            }

            const field = await this.sp.web.lists.getByTitle(this.props.listName).fields.getByTitle("AwardType")();
            if (field?.Choices) {
                this.setState({ awardTypeChoices: field.Choices });
            } else {
                console.warn("AwardType field found, but no choices available.");
            }
        } catch (error) {
            console.error("Error fetching Award Type choices:", error);
        }
    }

    private async handleSubmit(e: React.FormEvent): Promise<void> {
        e.preventDefault();
        const { From, To, Message, AwardType } = this.state;
        if (!From || !To) {
            alert("Please select both a sender and recipient.");
            return;
        }
        try {
            if (!this.sp) {
                console.error("SP is not initialized");
                return;
            }
            await this.sp.web.lists.getByTitle(this.props.listName).items.add({
                FromId: From.id,
                ToId: To.id,
                Message,
                AwardType,
                Reactions_Medal: 0,
                Reactions_Heart: 0,
                Reactions_Clap: 0,
                DateRecognized: new Date().toISOString()
            });

            this.setState({
                From: null,
                To: null,
                Message: '',
                AwardType: ''
            });

            this.props.onItemAdded();
        } catch (error) {
            console.error("Error adding recognition item:", error);
        }
    }

    private _getPeoplePickerItems(items: any[]) {
        console.log('Items:', items);
    }

    public render(): React.ReactElement<IAddRecognitionFormProps> {
        const { Message, AwardType, awardTypeChoices } = this.state;
        return (
            <div className={styles.formContainer}>
                <h2>Add New Recognition</h2>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label htmlFor="fromInput">From:</label>
                        <PeoplePicker
                            context={this.props.context}
                            titleText="People Picker"
                            personSelectionLimit={1}
                            showtooltip={true}
                            required={true}
                            searchTextLimit={5}
                            onChange={this._getPeoplePickerItems}
                            webAbsoluteUrl={this.getWebUrl()}
                            principalTypes={[PrincipalType.User]}
                            resolveDelay={1000} />

                    </div>
                    <div>
                        <label htmlFor="toInput">To:</label>
                        <PeoplePicker
                            context={this.props.context}
                            titleText="Select recipient"
                            personSelectionLimit={1}
                            showtooltip={true}
                            required={true}
                            onChange={(items: any[]) => {
                                console.log("To picker items:", items);
                                this.setState({ To: items[0] || null });
                            }}
                            principalTypes={[
                                PrincipalType.User
                            ]}
                            resolveDelay={2000}
                            webAbsoluteUrl={this.getWebUrl()}
                            peoplePickerWPclassName={styles.peoplePickerWrapper}
                            peoplePickerCntrlclassName={styles.peoplePickerControl}
                        />
                    </div>
                    <div>
                        <label htmlFor="messageInput">Message:</label>
                        <textarea
                            id="messageInput"
                            placeholder="Write your recognition message here"
                            value={Message}
                            onChange={(e) => this.setState({ Message: e.target.value })}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="awardTypeInput">Award Type:</label>
                        <select
                            id="awardTypeInput"
                            className={styles.awardTypeDropdown}
                            value={AwardType}
                            onChange={(e) => this.setState({ AwardType: e.target.value })}
                            required
                        >
                            <option value="" disabled>Select an award type</option>
                            {awardTypeChoices.map((choice, index) => (
                                <option key={index} value={choice}>
                                    {choice}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className={styles.formActions}>
                        <button type="submit">Add Recognition</button>
                    </div>
                </form>
            </div>
        );
    }
}
