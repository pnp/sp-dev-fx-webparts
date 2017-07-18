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
import { IPeopleDataResult } from './IPeopleDataResult';
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
      if (filterText.length > 4) {
        return this.searchPeople(filterText, this._peopleList);        
      }
    } else {
      return [];
    }
  }

  private searchPeople(terms: string, results: IPersonaProps[]): IPersonaProps[] | Promise<IPersonaProps[]> {
    //return new Promise<IPersonaProps[]>((resolve, reject) => setTimeout(() => resolve(results), 2000));
    return new Promise<IPersonaProps[]>((resolve, reject) =>
      this.props.spHttpClient.get(`${this.props.siteUrl}/_api/search/query?querytext='*${terms}*'&rowlimit=10&sourceid='b09a7990-05ea-4af9-81ef-edfab16c4e31'`,
        SPHttpClient.configurations.v1,
        {
          headers: {
            'Accept': 'application/json;odata=nometadata',
            'odata-version': ''
          }
        })
        .then((response: SPHttpClientResponse): Promise<{ PrimaryQueryResult: IPeopleDataResult }> => {
          return response.json();
        })
        .then((response: { PrimaryQueryResult: IPeopleDataResult }): void => {
          let relevantResults: any = response.PrimaryQueryResult.RelevantResults;
          let resultCount: number = relevantResults.TotalRows;
          let people = [];
          let persona: IPersonaProps = {};
          if (resultCount > 0) {
            relevantResults.Table.Rows.forEach(function (row) {
              row.Cells.forEach(function (cell) {
                //person[cell.Key] = cell.Value;
                if (cell.Key === 'JobTitle')
                  persona.secondaryText = cell.Value;
                if (cell.Key === 'PictureURL')
                  persona.imageUrl = cell.Value;
                if (cell.Key === 'PreferredName')
                  persona.primaryText = cell.Value;
              });
              people.push(persona);
            });
          }
          resolve(people);
        }, (error: any): void => {
          reject(this._peopleList = []);
        }));
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
