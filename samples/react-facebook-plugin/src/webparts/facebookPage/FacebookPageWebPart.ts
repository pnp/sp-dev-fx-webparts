import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneToggle
} from '@microsoft/sp-webpart-base';

import * as strings from 'FacebookPageWebPartStrings';
import FacebookPage from './components/FacebookPage';
import { IFacebookPageProps } from './components/IFacebookPageProps';
import { IFacebookPageWebPartProps } from './IFacebookPageWebPart';

export default class FacebookPageWebPart extends BaseClientSideWebPart<IFacebookPageWebPartProps> {

  public render(): void {
    const props: IFacebookPageProps = {
      href: this.properties.url,
      height: Number(this.properties.height),
      smallHeader: this.properties.smallHeader,
      hideCover: this.properties.hideCover,
      hideFacepile: this.properties.hideFacepile
    };
    const element = React.createElement(FacebookPage, props);
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
      pages: [{
        header: {
          description: strings.PropertyPaneDescription
        },
        groups: [{
          groupName: strings.BasicGroupName,
          groupFields: [
            PropertyPaneTextField('url', {
              label: strings.UrlFieldLabel
            }),
            PropertyPaneTextField('height', {
              label: strings.HeightFieldLabel
            }),
            PropertyPaneToggle('smallHeader', {
              label: strings.SmallHeaderFieldLabel
            }),
            PropertyPaneToggle('hideCover', {
              label: strings.HideCoverFieldLabel
            }),
            PropertyPaneToggle('hideFacepile', {
              label: strings.HideFacepileFieldLabel
            })
          ]
        }]
      }]
    };
  }
}
