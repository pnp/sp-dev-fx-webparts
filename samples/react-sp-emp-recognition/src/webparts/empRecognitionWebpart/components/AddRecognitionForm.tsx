import * as React from 'react';
import styles from './EmpRecognitionWebpart.module.scss';
import { spfi, SPFx } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/fields";
import "@pnp/sp/site-users";

import { IPeoplePickerContext, PeoplePicker, PrincipalType } from "@pnp/spfx-controls-react/lib/PeoplePicker";

interface IAddRecognitionFormProps {
    context: any;
    listName: string;
    onItemAdded: () => void;
}

interface IAddRecognitionFormState {
    From: any[];
    To: any[];
    Message: string;
    AwardType: string;
    awardTypeChoices: string[];
}

export default class AddRecognitionForm extends React.Component<IAddRecognitionFormProps, IAddRecognitionFormState> {
    private sp: any;

    constructor(props: IAddRecognitionFormProps) {
        super(props);
        this.state = {
            From: [],
            To: [],
            Message: '',
            AwardType: '',
            awardTypeChoices: []
        };

        this.sp = spfi().using(SPFx(this.props.context));
    }

    public async componentDidMount(): Promise<void> {
        try {
            const field = await this.sp.web.lists
                .getByTitle(this.props.listName)
                .fields.getByTitle("AwardType")();

            if (field && field.FieldTypeKind === 6) {
                this.setState({ awardTypeChoices: field["Choices"] });
            } else {
                console.error('AwardType field is not a Choice field or has no choices.');
            }
        } catch (error) {
            console.error("Error fetching AwardType field choices:", error);
        }
    }

    private async handleSubmit(e: React.FormEvent): Promise<void> {
        e.preventDefault();
        const { From, To, Message, AwardType } = this.state;

        if (!From.length || !To.length || !Message || !AwardType) {
            alert("All fields are required.");
            return;
        }

        try {
            const fromUser = await this.sp.web.ensureUser(From[0].loginName);
            const toUser = await this.sp.web.ensureUser(To[0].loginName);

            const fromName = From[0].text || From[0].fullName || "Employee";
            const toName = To[0].text || To[0].fullName || "Colleague";
            const title = `Recognition from ${fromName} to ${toName}`;

            await this.sp.web.lists.getByTitle(this.props.listName).items.add({
                Title: title,
                FromId: fromUser.Id,
                ToId: toUser.Id,
                Message: Message,
                AwardType: AwardType,
                Reactions_Medal: 0,
                Reactions_Heart: 0,
                Reactions_Clap: 0,
                DateRecognized: new Date().toISOString()
            });

            this.setState({
                From: [],
                To: [],
                Message: '',
                AwardType: ''
            });

            this.props.onItemAdded();
        } catch (err) {
            console.error("Failed to submit recognition item:", err);
            alert("Error saving recognition. Please try again or contact support.");
        }
    }

    public render(): React.ReactElement<IAddRecognitionFormProps> {
        const peoplePickerContext: IPeoplePickerContext = {
            absoluteUrl: this.props.context.pageContext.web.absoluteUrl,
            msGraphClientFactory: this.props.context.msGraphClientFactory,
            spHttpClient: this.props.context.spHttpClient
        };

        return (
            <div className={styles.formContainer}>
                <h2>Add Recognition</h2>
                <form onSubmit={(e) => this.handleSubmit(e)}>

                    <label>From:</label>
                    <PeoplePicker
                        context={peoplePickerContext}
                        personSelectionLimit={1}
                        showtooltip={true}
                        required={true}
                        principalTypes={[PrincipalType.User]}
                        onChange={(items: any[]) => this.setState({ From: items })}
                        resolveDelay={500}
                        webAbsoluteUrl={this.props.context.pageContext.web.absoluteUrl}
                    />

                    <label>To:</label>
                    <PeoplePicker
                        context={peoplePickerContext}
                        personSelectionLimit={1}
                        showtooltip={true}
                        required={true}
                        principalTypes={[PrincipalType.User]}
                        onChange={(items: any[]) => this.setState({ To: items })}
                        resolveDelay={500}
                        webAbsoluteUrl={this.props.context.pageContext.web.absoluteUrl}
                    />

                    <label>Message:</label>
                    <textarea
                        placeholder="Enter your message"
                        value={this.state.Message}
                        onChange={(e) => this.setState({ Message: e.target.value })}
                        required
                    />

                    <label htmlFor="awardType">Award Type:</label>
                    <select
                        id="awardType"
                        value={this.state.AwardType}
                        onChange={(e) => this.setState({ AwardType: e.target.value })}
                        required
                    >
                        <option value="" disabled>Select an award type</option>
                        {this.state.awardTypeChoices.map((choice, index) => (
                            <option key={index} value={choice}>
                                {choice}
                            </option>
                        ))}
                    </select>

                    <button type="submit">Submit</button>
                </form>
            </div>
        );
    }
}
