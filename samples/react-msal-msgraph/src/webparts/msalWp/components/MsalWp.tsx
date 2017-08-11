/// <reference path="../../../../node_modules/msal/out/msal.d.ts" />

import * as React from 'react';
import styles from './MsalWp.module.scss';
import { IMsalWpProps, IMsalWpState, IPerson, IMails, IMail } from './IMsalWpProps';
import { HttpClient } from "@microsoft/sp-http";
import { PrimaryButton, Persona, PersonaSize, PersonaInitialsColor, List, Spinner, SpinnerType } from 'office-ui-fabric-react';

/**
 * Load the MSAL library
 */
require('Msal');
declare const Msal;

/**
 * MSAL Config
 * Register your app here: https://apps.dev.microsoft.com/
 */
const msalconfig = {
    clientID: "00000000-0000-0000-0000-000000000000", // Azure AD Application
    redirectUri: location.origin
};

const scopes = ["User.Read", "Mail.Read"];

export default class MsalWp extends React.Component<IMsalWpProps, IMsalWpState> {
    private clientApplication: Msal.UserAgentApplication;

    constructor(props: IMsalWpProps) {
        super(props);

        // Set the initial state of the component
        this.state = {
            loading: false,
            loggedIn: false,
            person: null,
            mails: []
        };

        // Initialize the user agent application for MSAL
        if (!this.clientApplication) {
            this.clientApplication = new Msal.UserAgentApplication(msalconfig.clientID, null, (errorDesc, token, error, tokenType) => {
                // Called after loginRedirect or acquireTokenPopup
            });
        }

        // Check if the user can be retrieved and automatically get your data
        if (this.clientApplication.getUser()) {
            this._getAccessToken();
        }

        this._login = this._login.bind(this);
        this._getAccessToken = this._getAccessToken.bind(this);
        this._getCrntUser = this._getCrntUser.bind(this);
        this._getMessages = this._getMessages.bind(this);
    }

    /**
     * Function that will login the user and call the Microsoft Graph
     */
    private _login(): void {
        // Login the user
        if (this.clientApplication.getUser()) {
            this._getAccessToken();
        } else {
            this.clientApplication.loginPopup(scopes).then((idToken: string) => {
                this._getAccessToken();
            });
        }
    }

    /**
     * Retrieve an accessToken for the Microsoft Graph
     */
    private _getAccessToken(): void {
        this.state = {
            loading: true
        };
        // Retrieve a accessToken to call the Microsoft Graph
        this.clientApplication.acquireTokenSilent(scopes).then((token: string) => {
            this._getCrntUser(token);
            this._getMessages(token);
        }, (error) => {
            // Interaction required
            if (error) {
                this.clientApplication.acquireTokenPopup(scopes).then((token: string) => {
                    this._getCrntUser(token);
                    this._getMessages(token);
                }, (err: string) => {
                    // Something went wrong
                    console.log('Error:', err);
                    this.setState({
                        loading: false
                    });
                });
            }
        });
    }

    /**
     * Call the current user via the Microsoft Graph
     */
    private _getCrntUser(token: string): void {
        // Call the Microsoft Graph
        this.props.context.httpClient.get('https://graph.microsoft.com/v1.0/me', HttpClient.configurations.v1, {
            headers: {
                "authorization": `Bearer ${token}`
            }
        }).then(response => {
            return response.json();
        }).then((data: IPerson) => {
            this.setState({
                loggedIn: true,
                person: data,
                loading: false
            });
        });
    }

    /**
     * Get the mails of the current user
     */
    private _getMessages(token: string): void {
        // Call the Microsoft Graph
        this.props.context.httpClient.get('https://graph.microsoft.com/v1.0/me/messages', HttpClient.configurations.v1, {
            headers: {
                "authorization": `Bearer ${token}`
            }
        }).then(response => {
            return response.json();
        }).then((data: IMails) => {
            this.setState({
                mails: data.value,
                loading: false
            });
        });
    }

    /**
     * Component render
     */
    public render(): React.ReactElement<IMsalWpProps> {
        if (this.state.loading) {
			return <Spinner type={ SpinnerType.large } label="Retrieving your data" />;
		}

        const loginBtn: JSX.Element = this.state.loggedIn ? <div /> : <PrimaryButton text='Login' onClick={this._login} />;

        let userInfo: JSX.Element = <div />;
        if (this.state.loggedIn && this.state.person) {
            userInfo = <Persona
                primaryText={this.state.person.displayName}
                imageInitials={`${this.state.person.givenName.slice(0, 1)}${this.state.person.surname.slice(0, 1)}`}
                secondaryText={this.state.person.jobTitle}
                optionalText="w00t"
                tertiaryText={this.state.person.mail}
                size={PersonaSize.extraLarge}
                hidePersonaDetails={false}
                initialsColor={PersonaInitialsColor.red}
            />;
        }

        let mails: JSX.Element = <div />;
        if (this.state.mails.length > 0) {
            mails = <p className="ms-font-l ms-fontColor-neutralPrimary">Your mails</p>;
        }

        return (
            <div className={styles.msalWp}>
                <div className={styles.container}>
                    <div className={`ms-Grid-row ms-bgColor-neutralLight ms-fontColor-neutralPrimary ${styles.row}`}>
                        <div className="ms-Grid-col ms-u-lg10 ms-u-xl8 ms-u-xlPush2 ms-u-lgPush1">
                            <p className="ms-font-xl ms-fontColor-neutralPrimary">SPFx WP sample with the MSAL library</p>

                            {loginBtn}

                            {userInfo}

                            {mails}

                            <List items={this.state.mails} onRenderCell={(item: IMail, index: number) => (
                                <div>{index++}: {item.subject}</div>
                            )} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
