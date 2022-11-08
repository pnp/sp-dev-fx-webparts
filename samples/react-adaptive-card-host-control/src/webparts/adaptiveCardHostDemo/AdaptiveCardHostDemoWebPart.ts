import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneDropdown,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';

import * as strings from 'AdaptiveCardHostDemoWebPartStrings';
import AdaptiveCardHostDemo from './components/AdaptiveCardHostDemo';
import { IAdaptiveCardHostDemoProps } from './components/IAdaptiveCardHostDemoProps';
import { AllSamples } from '../../samples';

export interface IAdaptiveCardHostDemoWebPartProps {
  sample: string;
  themeName: string;
}

export default class AdaptiveCardHostDemoWebPart extends BaseClientSideWebPart<IAdaptiveCardHostDemoWebPartProps> {

  private _themeVariant: IReadonlyTheme | undefined;
  private _isInTeams: boolean;
  private _themeName: string;

  protected onInit(): Promise<void> {
    this._isInTeams = (this.context.sdks.microsoftTeams) ? true : false;
    this._themeName = (this.context.sdks.microsoftTeams) ? this.context.sdks.microsoftTeams.context.theme : "sp";

    if (this._isInTeams) {
      this.context.sdks.microsoftTeams.teamsJs.registerOnThemeChangeHandler((theme: string) => {
        this._themeName = theme;
        this.render();
      });
    }

    return super.onInit();
  }

  public render(): void {
    const element: React.ReactElement<IAdaptiveCardHostDemoProps> = React.createElement(
      AdaptiveCardHostDemo,
      {
        theme: this._themeVariant,
        sample: this.properties.sample,
        themeName: this._isInTeams ? this._themeName : this.properties.themeName,
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    this._themeVariant = currentTheme;
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    let allSamples = AllSamples().map(x => { return { key: x.title, text: x.title }; });

    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneDropdown('sample', {
                  label: "Sample to render",
                  options: allSamples
                }),
                PropertyPaneDropdown('themeName', {
                  label: "Theme",
                  options: [
                    { key: "sp", text: "SharePoint" },
                    { key: "default", text: "Teams" },
                    { key: "dark", text: "Teams Dark" },
                    { key: "contrast", text: "Teams Contrast" },
                  ],
                  disabled: (this.context.sdks.microsoftTeams) ? true : false
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
