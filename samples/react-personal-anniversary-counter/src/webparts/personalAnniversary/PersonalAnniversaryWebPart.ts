import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { type IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import * as strings from 'PersonalAnniversaryWebPartStrings';
import { IPersonalAnniversaryProps, PersonalAnniversary } from './components/PersonalAnniversary';

export interface IPersonalAnniversaryWebPartProps {
}

export default class PersonalAnniversaryWebPart extends BaseClientSideWebPart<IPersonalAnniversaryWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IPersonalAnniversaryProps> = React.createElement(
      PersonalAnniversary, {}
    );

    ReactDom.render(element, this.domElement);
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
          groups: []
        }
      ]
    };
  }
}
