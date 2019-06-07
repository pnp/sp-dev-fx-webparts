import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';

import * as strings from 'GitHubBadgeWebPartStrings';
import GitHubBadge from './components/GitHubBadge';
import { IGitHubBadgeProps } from './components/GitHubBadge.types';

export interface IGitHubBadgeWebPartProps {
  gitHubUserName: string;
}

export default class GitHubBadgeWebPart extends BaseClientSideWebPart<IGitHubBadgeWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IGitHubBadgeProps> = React.createElement(
      GitHubBadge,
      {
        gitHubUserName: this.properties.gitHubUserName,
        httpClient: this.context.httpClient
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
              groupName: strings.BasicGroupName,
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
