import * as strings from 'GraphConsumerWebPartStrings';
import {
    BaseButton, Button, CheckboxVisibility, DetailsList, DetailsListLayoutMode, PrimaryButton,
    SelectionMode, TextField
} from 'office-ui-fabric-react';
import * as React from 'react';

import { AadHttpClient, MSGraphClient } from '@microsoft/sp-http';
import { escape } from '@microsoft/sp-lodash-subset';

import { ClientMode } from './ClientMode';
import styles from './GraphConsumer.module.scss';
import { IGraphConsumerProps } from './IGraphConsumerProps';
import { IGraphConsumerState } from './IGraphConsumerState';
import { IUserItem } from './IUserItem';

// Configure the columns for the DetailsList component
let _usersListColumns = [
  {
    key: 'displayName',
    name: 'Display name',
    fieldName: 'displayName',
    minWidth: 50,
    maxWidth: 100,
    isResizable: true
  },
  {
    key: 'mail',
    name: 'Mail',
    fieldName: 'mail',
    minWidth: 50,
    maxWidth: 100,
    isResizable: true
  },
  {
    key: 'userPrincipalName',
    name: 'User Principal Name',
    fieldName: 'userPrincipalName',
    minWidth: 100,
    maxWidth: 200,
    isResizable: true
  },
];

let _fakeUsers : Array<IUserItem> = [
  { displayName: "User 1", mail: 'mail-user1@domain.com', userPrincipalName: "mail-user1@domain.com" },
  { displayName: "User 2", mail: 'mail-user2@domain.com', userPrincipalName: "mail-user2@domain.com" },
  { displayName: "User 3", mail: 'mail-user3@domain.com', userPrincipalName: "mail-user3@domain.com" },
  { displayName: "User 4", mail: 'mail-user4@domain.com', userPrincipalName: "mail-user4@domain.com" },
];

export default class GraphConsumer extends React.Component<IGraphConsumerProps, IGraphConsumerState> {

  constructor(props: IGraphConsumerProps, state: IGraphConsumerState) {
    super(props);
    
    // Initialize the state of the component
    this.state = {
      // users: _fakeUsers,
      users: [],
      searchFor: ""
    };
  }

  public render(): React.ReactElement<IGraphConsumerProps> {
    return (
      <div className={ styles.graphConsumer }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <span className={ styles.title }>Search for a user!</span>
              <p className={ styles.form }>
                <TextField 
                    label={ strings.SearchFor } 
                    required={ true } 
                    onChange={ this._onSearchForChanged }
                    onGetErrorMessage={ this._getSearchForErrorMessage }
                    value={ this.state.searchFor }
                  />
              </p>
              <p className={ styles.form }>
                <PrimaryButton 
                    text='Search' 
                    title='Search' 
                    onClick={ this._search } 
                  />
              </p>
              {
                (this.state.users != null && this.state.users.length > 0) ?
                  <p className={ styles.form }>
                  <DetailsList
                      items={ this.state.users }
                      columns={ _usersListColumns }
                      setKey='set'
                      checkboxVisibility={ CheckboxVisibility.hidden }
                      selectionMode={ SelectionMode.none }
                      layoutMode={ DetailsListLayoutMode.fixedColumns }
                      compact={ true }
                  />
                </p>
                : null
              }
            </div>
          </div>
        </div>
      </div>
    );
  }

  private _onSearchForChanged = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string): void => {
 
    // Update the component state accordingly to the current user's input
    this.setState({
      searchFor: newValue,
    });
  }

  private _getSearchForErrorMessage = (value: string): string => {
    // The search for text cannot contain spaces
    return (value == null || value.length == 0 || value.indexOf(" ") < 0)
      ? ''
      : `${strings.SearchForValidationErrorMessage}`;
  }

  private _search = (event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement | HTMLDivElement | BaseButton | Button, MouseEvent>) : void => {
    console.log(this.props.clientMode);

    // Based on the clientMode value search users
    switch (this.props.clientMode)
    {
      case ClientMode.aad:
        this._searchWithAad();
        break;
      case ClientMode.graph:
        this._searchWithGraph();
        break;
    }
  }

  private _searchWithAad = (): void => {

    // Log the current operation
    console.log("Using _searchWithAad() method");

    // Using Graph here, but any 1st or 3rd party REST API that requires Azure AD auth can be used here.
    this.props.context.aadHttpClientFactory
      .getClient("https://graph.microsoft.com")
      .then((client: AadHttpClient) => {
        // Search for the users with givenName, surname, or displayName equal to the searchFor value
        return client
          .get(
            `https://graph.microsoft.com/v1.0/users?$select=displayName,mail,userPrincipalName&$filter=(givenName%20eq%20'${escape(this.state.searchFor)}')%20or%20(surname%20eq%20'${escape(this.state.searchFor)}')%20or%20(displayName%20eq%20'${escape(this.state.searchFor)}')`,
            AadHttpClient.configurations.v1
          );
      })
      .then(response => {
        return response.json();
      })
      .then(json => {

        // Prepare the output array
        var users: Array<IUserItem> = new Array<IUserItem>();

        // Log the result in the console for testing purposes
        console.log(json);

        // Map the JSON response to the output array
        json.value.map((item: any) => {
          users.push( { 
            displayName: item.displayName,
            mail: item.mail,
            userPrincipalName: item.userPrincipalName,
          });
        });

        // Update the component state accordingly to the result
        this.setState(
          {
            users: users,
          }
        );
      })
      .catch(error => {
        console.error(error);
      });
  }

  private _searchWithGraph = () : void => {

    // Log the current operation
    console.log("Using _searchWithGraph() method");

    this.props.context.msGraphClientFactory
      .getClient()
      .then((client: MSGraphClient) => {
        // From https://github.com/microsoftgraph/msgraph-sdk-javascript sample
        client
          .api("users")
          .version("v1.0")
          .select("displayName,mail,userPrincipalName")
          .filter(`(givenName eq '${escape(this.state.searchFor)}') or (surname eq '${escape(this.state.searchFor)}') or (displayName eq '${escape(this.state.searchFor)}')`)
          .get((err, res) => {  

            if (err) {
              console.error(err);
              return;
            }

            // Prepare the output array
            var users: Array<IUserItem> = new Array<IUserItem>();

            // Map the JSON response to the output array
            res.value.map((item: any) => {
              users.push( { 
                displayName: item.displayName,
                mail: item.mail,
                userPrincipalName: item.userPrincipalName,
              });
            });

            // Update the component state accordingly to the result
            this.setState(
              {
                users: users,
              }
            );
          });
      });
  }
}
