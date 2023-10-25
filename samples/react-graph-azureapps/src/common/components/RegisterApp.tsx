import { ChoiceGroup, IChoiceGroupOption, Label, PrimaryButton, TextField } from 'office-ui-fabric-react';
import * as React from 'react';
import styles from './RegisterApp.module.scss';
import { IRegisterAppProps } from './IRegisterAppProps';
import { IRegisterAppState } from './IRegisterAppState';
import { cloneDeep } from '@microsoft/sp-lodash-subset';
import { IAppModel } from '../models/IAppModel';
import * as moment from 'moment';

export default class RegisterApp extends React.Component<IRegisterAppProps, IRegisterAppState>{

    constructor(props: IRegisterAppProps, state: IRegisterAppState) {
        super(props);

        this.state = {
            appName: "",
            signInAudience: "AzureADMyOrg",
        };
    }

    private onNameChanged = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string): void => {
        this.setState((prevState: IRegisterAppState, nextState: IRegisterAppState): IRegisterAppState => {
            nextState = cloneDeep(prevState);
            nextState.appName = newValue;
            return nextState;
        });
    }

    private onSupportedAccountChanged(ev: React.FormEvent<HTMLInputElement>, option: IChoiceGroupOption): void {

        this.setState((prevState: IRegisterAppState, nextState: IRegisterAppState): IRegisterAppState => {
            nextState = cloneDeep(prevState);
            nextState.signInAudience = option.key;
            return nextState;
        });
    }

    private onRegisterApp = (): Promise<void> => {
        // eslint-disable-next-line no-async-promise-executor
        return new Promise(async (resolve, reject) => {
            try {

                const newAppDetails = {
                    "displayName": this.state.appName,
                    "signInAudience": this.state.signInAudience
                }
                const result = await this.props.graphClient
                    .api("/applications")
                    .post(newAppDetails);

                if (result.id) {
                    const app: IAppModel = {
                        Id: "",
                        appId: "",
                        displayName: "",
                        createdDateTime: null,
                        users: []
                    };

                    app.Id = result.id;
                    app.appId = result.appId;
                    app.displayName = result.displayName;
                    app.createdDateTime = moment(new Date(result.createdDateTime)).format("llll");

                    this.props.callBack(app);

                    resolve();
                } else {
                    reject();
                }
                console.log(result);
            }
            catch (exception) {
                // do nothing
            }
        })
    }

    private handlerRegisterClick = (): void => {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        this.onRegisterApp().then(
            this.props.modal()
        )
    }

    public render(): React.ReactElement<IRegisterAppProps> {

        const options: IChoiceGroupOption[] = [
            { key: 'AzureADMyOrg', text: 'Accounts in this organizational directory only (MSFT only - Single tenant)' },
            { key: 'AzureADMultipleOrgs', text: 'Accounts in any organizational directory (Any Azure AD directory - Multitenant)' },
            { key: 'AzureADandPersonalMicrosoftAccount', text: 'Accounts in any organizational directory (Any Azure AD directory - Multitenant) and personal Microsoft accounts (e.g. Skype, Xbox)' },
            { key: 'PersonalMicrosoftAccount', text: 'Personal Microsoft accounts only' },
        ];

        return (
            <div className={styles.container}>
                <h2 className={styles.label}>Registering an application</h2>
                <Label required>Name</Label>
                <Label className={styles.subLabel}>The user-facing display name for this application (this can be changed later).</Label>
                <TextField required onChange={(event, value) => this.onNameChanged(event, value)} />
                <br />
                <br />
                <Label>Supported account types</Label>
                <Label className={styles.subLabel}>Who can use this application or access this API?</Label>
                <ChoiceGroup defaultSelectedKey="AzureADMyOrg" options={options} onChange={this.onSupportedAccountChanged.bind(this)} />

                <br />
                <PrimaryButton text='Register' disabled={this.state.appName !== "" ? false : true} onClick={this.handlerRegisterClick.bind(this)} />
            </div>
        );
    }
}