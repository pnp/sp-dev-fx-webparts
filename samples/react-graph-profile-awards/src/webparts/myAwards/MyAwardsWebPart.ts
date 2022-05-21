import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';

import * as strings from 'MyAwardsWebPartStrings';
import MyAwards from './components/MyAwards';
import { IMyAwardsProps } from './components/IMyAwardsProps';
import { AwardsServiceKey, IAwardsService } from '../../services/AwardsService';

export interface IMyAwardsWebPartProps {
  description: string;
}

export default class MyAwardsWebPart extends BaseClientSideWebPart<IMyAwardsWebPartProps> {

  private _isDarkTheme: boolean = false;
  private _awardsService: IAwardsService;

  public render(): void {
    const element: React.ReactElement<IMyAwardsProps> = React.createElement(
      MyAwards,
      {
        isDarkTheme: this._isDarkTheme,
        hasTeamsContext: !!this.context.sdks.microsoftTeams,
        awardsService: this._awardsService
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onInit(): Promise<void> {
    return super.onInit()
      .then(_ => {
        let webpartScope = this.context.serviceScope.startNewChild();
        webpartScope.finish();
        return webpartScope;
      })
      .then(serviceScope => {
        this._awardsService = serviceScope.consume(AwardsServiceKey);
      });
  }

  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (!currentTheme) {
      return;
    }

    this._isDarkTheme = !!currentTheme.isInverted;
    const {
      semanticColors
    } = currentTheme;
    this.domElement.style.setProperty('--bodyText', semanticColors.bodyText);
    this.domElement.style.setProperty('--link', semanticColors.link);
    this.domElement.style.setProperty('--linkHovered', semanticColors.linkHovered);

  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
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
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
