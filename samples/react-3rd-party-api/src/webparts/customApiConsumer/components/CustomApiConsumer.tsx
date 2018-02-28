import * as React from 'react';
import styles from './CustomApiConsumer.module.scss';
import { ICustomApiConsumerProps } from './ICustomApiConsumerProps';
import { ICustomApiConsumerState } from './ICustomApiConsumerState';
import { escape } from '@microsoft/sp-lodash-subset';
import * as strings from 'CustomApiConsumerWebPartStrings';

import {
  autobind,
  PrimaryButton,
  TextField,
  Label,
  CheckboxVisibility,
  SelectionMode
} from 'office-ui-fabric-react';

import { AadHttpClient, IHttpClientOptions } from "@microsoft/sp-http";

export default class CustomApiConsumer extends React.Component<ICustomApiConsumerProps, ICustomApiConsumerState> {

  constructor(props: ICustomApiConsumerProps, state: ICustomApiConsumerState) {
    super(props);
    
    // Initialize the state of the component
    this.state = {
      textToEcho: "",
      apiResponse: null,
    };
  }

  public render(): React.ReactElement<ICustomApiConsumerProps> {
    return (
      <div className={ styles.customApiConsumer }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <span className={ styles.title }>Let's invoke a 3rd party API!</span>
              <p className={ styles.form }>
                <TextField 
                    label={ strings.TextToEcho } 
                    required={ true } 
                    value={ this.state.textToEcho }
                    onChanged={ this._onTextToEchoChanged }
                  />
              </p>
              <p className={ styles.form }>
                <PrimaryButton 
                    text='Invoke API' 
                    title='Invoke API' 
                    onClick={ this._invokeAPI } 
                  />
              </p>
              {
                (this.state.apiResponse != null) ?
                  <p className={ styles.form }>
                    <div><Label>Echo: { this.state.apiResponse.echo }</Label></div>
                    <div><Label>Username: { this.state.apiResponse.username }</Label></div>
                    <div><Label>Request DateTime: { this.state.apiResponse.requestDate }</Label></div>
                  </p>
                : null
              }
            </div>
          </div>
        </div>
      </div>
    );
  }

  @autobind
  private _onTextToEchoChanged(newValue: string): void {

    // Update the component state accordingly to the current user's input
    this.setState({
      textToEcho: newValue,
    });
  }

  @autobind
  private _invokeAPI(): void {

    // Create an AadHttpClient object to consume a 3rd party API
    const aadClient: AadHttpClient = new AadHttpClient(
      this.props.context.serviceScope,
      "https://PiaSysDev.onmicrosoft.com/SharePoint.PnP.SampleRESTAPI"
    );

    console.log("Created aadClient");

    const requestHeaders: Headers = new Headers();
    requestHeaders.append('Content-type', 'application/json');
  
    const requestOptions: IHttpClientOptions = {
      headers: requestHeaders,
      body: JSON.stringify({
        TextToEcho: this.state.textToEcho,
      })
    };

    // Search for the users with givenName, surname, or displayName equal to the searchFor value
    aadClient
      .post(
        `https://sppnp-sample-rest-api.azurewebsites.net/api/BusinessAction`,
        AadHttpClient.configurations.v1,
        requestOptions
      )
      .then(response => {
        return response.json();
      })
      .then(json => {

        // Log the result in the console for testing purposes
        console.log(json);

        // Update the component state accordingly to the result
        this.setState(
          {
            apiResponse: {
              username: json.Username,
              requestDate: json.RequestDate,
              echo: json.Echo
            }
          }
        );
      })
      .catch(error => {
        console.error(error);
      });
  }
}
