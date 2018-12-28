import * as React from 'react';
import { IPerson } from './ISuggestedTeamMembersProps';
import styles from './SuggestedTeamMembers.module.scss';

import { IPersonaProps, Persona, PersonaSize } from 'office-ui-fabric-react/lib/Persona';
import { IPersonaWithMenu } from 'office-ui-fabric-react/lib/components/pickers/PeoplePicker/PeoplePickerItems/PeoplePickerItem.types';
import { DefaultButton, PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';

import {
  CompactPeoplePicker,
  IBasePickerSuggestionsProps,
  IBasePicker,
  ListPeoplePicker,
  NormalPeoplePicker,
  ValidationState
} from 'office-ui-fabric-react/lib/Pickers';
import { GraphHttpClient, GraphHttpClientResponse, IGraphHttpClientOptions } from '@microsoft/sp-http';
import { Label } from 'office-ui-fabric-react/lib/Label';

export interface IMembersPickerProps {
  people: IPerson[];
  groupId: string;
  graphHttpClient: GraphHttpClient;
}

export interface IMembersPickerState {
  peopleList: IPersonaProps[];
  currentSelectedItems?: IPersonaProps[];
  resultAddMembers: string[];
}

const suggestionProps: IBasePickerSuggestionsProps = {
  suggestionsHeaderText: 'Suggested People',
  mostRecentlyUsedHeaderText: 'Suggested Contacts',
  noResultsFoundText: 'No results found',
  loadingText: 'Loading',
  showRemoveButtons: true,
  suggestionsAvailableAlertText: 'People Picker Suggestions available',
  suggestionsContainerAriaLabel: 'Suggested contacts'
};

export default class MembersPicker extends React.Component<IMembersPickerProps, IMembersPickerState> {

  constructor(props: IMembersPickerProps) {
    super(props);

    const peopleList: IPersonaWithMenu[] = [];

    this.props.people.forEach((persona: IPerson) => {
      const target: IPersonaWithMenu = {};

      target.size = PersonaSize.small;
      target.text = persona.displayName;
      target.optionalText = persona.id.toString();
      target.secondaryText = persona.jobTitle;

      peopleList.push(target);
    });

    this.state = {
      peopleList: peopleList,
      currentSelectedItems: [],
      resultAddMembers: []
    };
  }

  private _onItemsChange = (items: any[]): void => {
    this.setState({
      currentSelectedItems: items
    });
  }

  private _filterPromise(personasToReturn: IPersonaProps[]): IPersonaProps[] | Promise<IPersonaProps[]> {
      return personasToReturn;
  }

  private _doesTextStartWith(text: string, filterText: string): boolean {
    return text.toLowerCase().indexOf(filterText.toLowerCase()) === 0;
  }

  private _listContainsPersona(persona: IPersonaProps, personas: IPersonaProps[]) {
    if (!personas || !personas.length || personas.length === 0) {
      return false;
    }
    return personas.filter(item => item.text === persona.text).length > 0;
  }

  private _removeDuplicates(personas: IPersonaProps[], possibleDupes: IPersonaProps[]) {
    return personas.filter(persona => !this._listContainsPersona(persona, possibleDupes));
  }

  private _filterPersonasByText(filterText: string): IPersonaProps[] {
    return this.state.peopleList.filter(item => this._doesTextStartWith(item.text as string, filterText));
  }

  private _onFilterChanged = (
    filterText: string,
    currentPersonas: IPersonaProps[],
    limitResults?: number
  ): IPersonaProps[] | Promise<IPersonaProps[]> => {
    if (filterText) {
      let filteredPersonas: IPersonaProps[] = this._filterPersonasByText(filterText);

      filteredPersonas = this._removeDuplicates(filteredPersonas, currentPersonas);
      filteredPersonas = limitResults ? filteredPersonas.splice(0, limitResults) : filteredPersonas;
      return this._filterPromise(filteredPersonas);
    } else {
      return [];
    }
  }

  private _getTextFromItem(persona: IPersonaProps): string {
    return persona.text as string;
  }

  public render(): React.ReactElement<IMembersPickerProps> {

    const controlledItems = [];

    const peopleLength = this.state.peopleList.length;
    for (let i = 0; i < peopleLength; i++) {
      const item = this.state.peopleList[i];
      if (this.state.currentSelectedItems!.indexOf(item) === -1) {
        controlledItems.push(this.state.peopleList[i]);
      }
    }
    return (
      <div>
        <NormalPeoplePicker
          onResolveSuggestions={this._onFilterChanged}
          getTextFromItem={this._getTextFromItem}
          pickerSuggestionsProps={suggestionProps}
          className={'ms-PeoplePicker'}
          key={'controlled'}
          selectedItems={this.state.currentSelectedItems}
          onChange={this._onItemsChange}
          resolveDelay={300}
        />

        <p><label> Click to Add a person </label></p>

        {controlledItems.map((item, index) => (
          <div key={index}>
            <DefaultButton
              className={styles.controlledPickerButton}
              // tslint:disable-next-line:jsx-no-lambda
              onClick={() => {
                this.setState({
                  currentSelectedItems: this.state.currentSelectedItems!.concat([item])
                });
              }}
            >
              <Persona {...item} />
            </DefaultButton>
          </div>
        ))}

        <PrimaryButton
          text="Add selected members"
          onClick={() => { this._addGroupMembers(); }}
         />

        {
          this.state.resultAddMembers.map(s => {
            let type: MessageBarType = MessageBarType.info;
            if (s.indexOf("Error") >= 0) {
              type = MessageBarType.error;
            }
            return <MessageBar messageBarType={type} isMultiline={false}>{s}</MessageBar>;
          })
        }
      </div>
    );
  }

  private async _addGroupMembers() : Promise<void> {
    const requests = [];
    this.state.currentSelectedItems.map(p => {
      requests.push({
        id: p.optionalText,
        url: `groups/${this.props.groupId}/members/$ref`,
        method: "POST",
        body: {
          "@odata.id": `https://graph.microsoft.com/beta/directoryObjects/${p.optionalText}`
        },
        headers: {
          "Content-Type": "application/json"
        }
      });
    });

    const body: any = {
      requests: requests
    };

    var options: IGraphHttpClientOptions = {
      body: JSON.stringify(body)
    };

    var response: GraphHttpClientResponse = await this.props.graphHttpClient.post('v1.0/$batch', GraphHttpClient.configurations.v1, options);
    var responseJson: any = await response.json();

    console.log(responseJson);

    let responsesInfo: string[] = [];
    responseJson.responses.forEach((r: any) => {
      if (r.status === 204) {
        responsesInfo.push(`User ${r.id} added succesfuly`);
      } else {
        responsesInfo.push(`Error adding User ${r.id}. Maybe the user is already a member`);
      }
    });

    this.setState({
      resultAddMembers: responsesInfo
    });
  }

}
