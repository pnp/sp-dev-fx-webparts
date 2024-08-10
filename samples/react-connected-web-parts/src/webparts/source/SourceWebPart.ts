import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'SourceWebPartStrings';
import Source from './components/Source';
import { ISourceProps } from './components/ISourceProps';

import {
	IDynamicDataPropertyDefinition,
	IDynamicDataCallables,
} from "@microsoft/sp-dynamic-data";

import Constants from '../../common/Constants';
import { IPreferences } from '../../common/Preferences';

export interface ISourceWebPartProps {
}

export default class SourceWebPart
	extends BaseClientSideWebPart<ISourceWebPartProps>
	implements IDynamicDataCallables
{
	private _firstName: string;
	private _lastName: string;
	private _preferences: IPreferences;

	protected async onInit(): Promise<void> {
		this.context.dynamicDataSourceManager.initializeSource(this);
	}

	public render(): void {
		const element: React.ReactElement<ISourceProps> = React.createElement(
			Source,
			{
				onFirstNameChanged: this._firstNameChanged,
				onLastNameChanged: this._lastNameChanged,
				onPreferencesChanged: this._preferencesChanged,
			}
		);

		ReactDom.render(element, this.domElement);
	}

	private _firstNameChanged = (firstName: string): void => {
		this._firstName = firstName;
		// notify subscribers that the first name has changed
		this.context.dynamicDataSourceManager.notifyPropertyChanged(
			Constants.FirstNamePropertyId
		);
	};

	private _lastNameChanged = (lastName: string): void => {
		this._lastName = lastName;
		// notify subscribers that the last name has changed
		this.context.dynamicDataSourceManager.notifyPropertyChanged(
			Constants.LastNamePropertyId
		);
	};

	private _preferencesChanged = (preferences: IPreferences): void => {
		this._preferences = preferences;
		// notify subscribers that the last name has changed
		this.context.dynamicDataSourceManager.notifyPropertyChanged(
			Constants.PreferencesPropertyId
		);
	};

	protected onDispose(): void {
		ReactDom.unmountComponentAtNode(this.domElement);
	}

	protected get dataVersion(): Version {
		return Version.parse("1.0");
	}

	/*
  IDynamicDataCallables implementation
  */
	public getPropertyDefinitions(): ReadonlyArray<IDynamicDataPropertyDefinition> {
		return [
			{
				id: Constants.FirstNamePropertyId,
				title: strings.FirstName,
			},
			{
				id: Constants.LastNamePropertyId,
				title: strings.LastName,
			},
			{
				id: Constants.PreferencesPropertyId,
				title: strings.Preferences,
			},
		];
	}

	public getPropertyValue(propertyId: string): string | IPreferences {
		switch (propertyId) {
			case Constants.FirstNamePropertyId:
				return this._firstName;
			case Constants.LastNamePropertyId:
				return this._lastName;
			case Constants.PreferencesPropertyId:
				return this._preferences;
		}

		throw new Error(strings.BadPropertyId);
	}

	/*
  End of IDynamicDataCallables implementation
  */
}
