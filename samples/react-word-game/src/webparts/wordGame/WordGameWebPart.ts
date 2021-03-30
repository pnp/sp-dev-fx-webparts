import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
	BaseClientSideWebPart
} from '@microsoft/sp-webpart-base';
import {
	IPropertyPaneConfiguration,
	PropertyPaneTextField,
	PropertyPaneCheckbox
} from "@microsoft/sp-property-pane";
import WordGame from './components/WordGame';
import { IWordGameProps } from './components/IWordGameProps';

export interface IWordGameWebPartProps {
	gameTitle: string;
	enableHighScores: boolean;
}

export default class WordGameWebPart extends BaseClientSideWebPart<IWordGameWebPartProps> {

	public render(): void {
		if (!this.properties.gameTitle) {
			this.properties.gameTitle = 'Word Game';
		}

		if (this.properties.enableHighScores === undefined) {
			this.properties.enableHighScores = true;
		}

		const element: React.ReactElement<IWordGameProps> = React.createElement(
			WordGame,
			{
				description: this.properties.gameTitle,
				enableHighScores: this.properties.enableHighScores,
				context: this.context
			}
		);

		ReactDom.render(element, this.domElement);
	}

	protected onDispose(): void {
		ReactDom.unmountComponentAtNode(this.domElement);
	}

	protected get dataVersion(): Version {
		return Version.parse('1.0');
	}

	// only refresh render after applying settings pane
	protected get disableReactivePropertyChanges(): boolean {
		return true;
	}

	protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
		return {
			pages: [
				{
					header: {
						description: 'Configure Word Game Settings'
					},
					groups: [
						{
							groupName: 'Main',
							groupFields: [
								PropertyPaneCheckbox('enableHighScores', {
									text: 'Enable High Scores'
								}),
								PropertyPaneTextField('gameTitle', {
									label: 'Game Title'
								})
							]
						}
					]
				}
			]
		};
	}
}
