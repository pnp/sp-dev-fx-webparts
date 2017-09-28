import * as React from 'react';
import { css } from 'office-ui-fabric-react';
import styles from './OfficeUiFabricPeoplePicker.module.scss';
import { IOfficeUiFabricPeoplePickerProps } from './IOfficeUiFabricPeoplePickerProps';

import {
  CompactPeoplePicker,
  IBasePickerSuggestionsProps,
  ListPeoplePicker,
  NormalPeoplePicker
} from 'office-ui-fabric-react/lib/Pickers';
import { IPersonaProps } from 'office-ui-fabric-react/lib/Persona';
const suggestionProps: IBasePickerSuggestionsProps = {
  suggestionsHeaderText: 'Suggested People',
  noResultsFoundText: 'No results found',
  loadingText: 'Loading'
};
import {
  BaseComponent,
  assign,
  autobind
} from 'office-ui-fabric-react/lib//Utilities';
import { people } from './PeoplePickerExampleData';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { IPersonaWithMenu } from 'office-ui-fabric-react/lib/components/pickers/PeoplePicker/PeoplePickerItems/PeoplePickerItem.Props';
import { IContextualMenuItem } from 'office-ui-fabric-react/lib/ContextualMenu';
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';

export interface IOfficeUiFabricPeoplePickerState {
  currentPicker?: number | string;
  delayResults?: boolean;
}
export interface IPeopleSearchProps {
  JobTitle: string;
  PictureURL: string;
  PreferredName: string;
}
export default class OfficeUiFabricPeoplePicker extends React.Component<IOfficeUiFabricPeoplePickerProps, IOfficeUiFabricPeoplePickerState> {
  private _peopleList;
  private contextualMenuItems: IContextualMenuItem[] = [
    {
      key: 'newItem',
      icon: 'circlePlus',
      name: 'New'
    },
    {
      key: 'upload',
      icon: 'upload',
      name: 'Upload'
    },
    {
      key: 'divider_1',
      name: '-',
    },
    {
      key: 'rename',
      name: 'Rename'
    },
    {
      key: 'properties',
      name: 'Properties'
    },
    {
      key: 'disabled',
      name: 'Disabled item',
      disabled: true
    }
  ];
  constructor() {
    super();
    this._peopleList = [];
    people.forEach((persona: IPersonaProps) => {
      let target: IPersonaWithMenu = {};

      assign(target, persona, { menuItems: this.contextualMenuItems });
      this._peopleList.push(target);
    });

    this.state = {
      currentPicker: 1,
      delayResults: false
    };
    
  }

  public render(): React.ReactElement<IOfficeUiFabricPeoplePickerProps> {
    if (this.props.typePicker == "Normal") {
      return (
        <NormalPeoplePicker
          onResolveSuggestions={this._onFilterChanged}
          getTextFromItem={(persona: IPersonaProps) => persona.primaryText}
          pickerSuggestionsProps={suggestionProps}
          className={'ms-PeoplePicker'}
          key={'normal'}
        />
      );
    } else {
      return (
        <CompactPeoplePicker
          onResolveSuggestions={this._onFilterChanged}
          getTextFromItem={(persona: IPersonaProps) => persona.primaryText}
          pickerSuggestionsProps={suggestionProps}
          className={'ms-PeoplePicker'}
          key={'normal'}
        />
      );
    }
  }

  @autobind
  private _onFilterChanged(filterText: string, currentPersonas: IPersonaProps[], limitResults?: number) {
    if (filterText) {
      if (filterText.length > 2) {
        return this._searchPeople(filterText, this._peopleList);        
      }
    } else {
      return [];
    }
  }

  /**
   * @function
   * Returns fake people results for the Mock mode
   */
  private searchPeopleFromMock(): IPersonaProps[] {
    return this._peopleList = [
      {
        imageUrl: './images/persona-female.png',
        imageInitials: 'PV',
        primaryText: 'Annie Lindqvist',
        secondaryText: 'Designer',
        tertiaryText: 'In a meeting',
        optionalText: 'Available at 4:00pm'
      },
      {
        imageUrl: './images/persona-male.png',
        imageInitials: 'AR',
        primaryText: 'Aaron Reid',
        secondaryText: 'Designer',
        tertiaryText: 'In a meeting',
        optionalText: 'Available at 4:00pm'
      },
      {
        imageUrl: './images/persona-male.png',
        imageInitials: 'AL',
        primaryText: 'Alex Lundberg',
        secondaryText: 'Software Developer',
        tertiaryText: 'In a meeting',
        optionalText: 'Available at 4:00pm'
      },
      {
        imageUrl: './images/persona-male.png',
        imageInitials: 'RK',
        primaryText: 'Roko Kolar',
        secondaryText: 'Financial Analyst',
        tertiaryText: 'In a meeting',
        optionalText: 'Available at 4:00pm'
      },
    ];
  }

  /**
   * @function
   * Returns people results after a REST API call
   */
  private _searchPeople(terms: string, results: IPersonaProps[]): IPersonaProps[] | Promise<IPersonaProps[]> {
    //return new Promise<IPersonaProps[]>((resolve, reject) => setTimeout(() => resolve(results), 2000));
    if (this.props.siteUrl.toLowerCase().indexOf("wwww.contoso.com") >= 0) {
      // If the running environment is local, load the data from the mock
      return this.searchPeopleFromMock();
    } else {
      const userRequestUrl: string = `${this.props.siteUrl}/_api/SP.UI.ApplicationPages.ClientPeoplePickerWebServiceInterface.clientPeoplePickerSearchUser`;
      let principalType: number = 0;
      if (this.props.principalTypeUser === true) {
        principalType += 1;
      }
      if (this.props.principalTypeSharePointGroup === true) {
        principalType += 8;
      }
      if (this.props.principalTypeSecurityGroup === true) {
        principalType += 4;
      }
      if (this.props.principalTypeDistributionList === true) {
        principalType += 2;
      }
      const data = {
        'queryParams': {
          'AllowEmailAddresses': true,
          'AllowMultipleEntities': false,
          'AllUrlZones': false,
          'MaximumEntitySuggestions': this.props.numberOfItems,
          'PrincipalSource': 15,
          // PrincipalType controls the type of entities that are returned in the results.
          // Choices are All - 15, Distribution List - 2 , Security Groups - 4, SharePoint Groups - 8, User - 1.
          // These values can be combined (example: 13 is security + SP groups + users)
          'PrincipalType': principalType,
          'QueryString': terms
        }
      };

      return new Promise<IPersonaProps[]>((resolve, reject) =>
        this.props.spHttpClient.post(userRequestUrl,
          SPHttpClient.configurations.v1,
          {
            headers: {
              'Accept': 'application/json',
              "content-type": "application/json"
            },
            body: JSON.stringify(data)
          })
          .then((response: SPHttpClientResponse) => {
            return response.json();
          })
          .then((response: any): void => {
            let relevantResults: any = JSON.parse(response.value);
            let resultCount: number = relevantResults.length;
            let people = [];
            let persona: IPersonaProps = {};
            if (resultCount > 0) {
              for (var index = 0; index < resultCount; index++) {
                var p = relevantResults[index];
                let account = p.Key.substr(p.Key.lastIndexOf('|') + 1);

                persona.primaryText = p.DisplayText;
                persona.imageUrl = `/_layouts/15/userphoto.aspx?size=S&accountname=${account}`;
                persona.imageShouldFadeIn = true;
                persona.secondaryText = p.EntityData.Title;
                people.push(persona);
              }
            }
            resolve(people);
          }, (error: any): void => {
            reject(this._peopleList = []);
          })
        );
      };
  }

  private _filterPersonasByText(filterText: string): IPersonaProps[] {
    return this._peopleList.filter(item => this._doesTextStartWith(item.primaryText, filterText));
  }

  private _removeDuplicates(personas: IPersonaProps[], possibleDupes: IPersonaProps[]) {
    return personas.filter(persona => !this._listContainsPersona(persona, possibleDupes));
  }
  private _listContainsPersona(persona: IPersonaProps, personas: IPersonaProps[]) {
    if (!personas || !personas.length || personas.length === 0) {
      return false;
    }
    return personas.filter(item => item.primaryText === persona.primaryText).length > 0;
  }
  private _filterPromise(personasToReturn: IPersonaProps[]): IPersonaProps[] | Promise<IPersonaProps[]> {
    if (this.state.delayResults) {
      return this._convertResultsToPromise(personasToReturn);
    } else {
      return personasToReturn;
    }
  }
  private _convertResultsToPromise(results: IPersonaProps[]): Promise<IPersonaProps[]> {
    return new Promise<IPersonaProps[]>((resolve, reject) => setTimeout(() => resolve(results), 2000));
  }
  private _doesTextStartWith(text: string, filterText: string): boolean {
    return text.toLowerCase().indexOf(filterText.toLowerCase()) === 0;
  }
}
