import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';

import * as strings from 'GitHubBadgeV2WebPartStrings';
import GitHubBadgeV2 from './components/GitHubBadgeV2';
import { IGitHubBadgeV2Props } from './components/IGitHubBadgeV2.types';

export interface IGitHubBadgeV2WebPartProps {
  gitHubUserName: string;
}

export default class GitHubBadgeV2WebPart extends BaseClientSideWebPart<IGitHubBadgeV2WebPartProps> {

  public render(): void {
    const element: React.ReactElement<IGitHubBadgeV2Props > = React.createElement(
      GitHubBadgeV2,
      {
        gitHubUserName: this.properties.gitHubUserName,
        httpClient: this.context.httpClient,
        displayMode: this.displayMode,
        onConfigure: () =>{
          this.context.propertyPane.open();
        }

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

  protected get disableReactivePropertyChanges(): boolean {
    return true;
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
              groupFields: [
                PropertyPaneTextField('gitHubUserName', {
                  label: strings.GitHubUserNameFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
