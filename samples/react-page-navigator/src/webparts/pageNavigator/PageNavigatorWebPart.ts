import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'PageNavigatorWebPartStrings';
import PageNavigator from './components/PageNavigator';
import { IPageNavigatorProps } from './components/IPageNavigatorProps';
import { INavLink } from 'office-ui-fabric-react/lib/Nav';
import { SPService } from '../../Service/SPService';

export interface IPageNavigatorWebPartProps {
  description: string;
}

export default class PageNavigatorWebPart extends BaseClientSideWebPart<IPageNavigatorWebPartProps> {
  private anchorLinks: INavLink[] = [];

  public render(): void {
    const element: React.ReactElement<IPageNavigatorProps > = React.createElement(
      PageNavigator,
      {
        description: this.properties.description,
        anchorLinks: this.anchorLinks
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onInit(): Promise<void> {
    return super.onInit().then(async _ => {
      this.anchorLinks = await SPService.GetAnchorLinks(this.context);
    });
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
