import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import { IPropertyPaneConfiguration, PropertyPaneTextField, PropertyPaneToggle } from "@microsoft/sp-property-pane";

import * as strings from 'FacebookPageWebPartStrings';
import FacebookPage from './components/FacebookPage';
import { IFacebookPageProps } from './components/IFacebookPageProps';
import { IFacebookPageWebPartProps } from './IFacebookPageWebPart';

export default class FacebookPageWebPart extends BaseClientSideWebPart<IFacebookPageWebPartProps> {

  public render(): void {
    const props: IFacebookPageProps = {
      company: this.properties.company,
      height: Number(this.properties.height),
      smallHeader: this.properties.smallHeader,
      hideCover: this.properties.hideCover,
      showFacepile: this.properties.showFacepile
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
            PropertyPaneTextField('company', {
              label: strings.CompanyFieldLabel
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
            PropertyPaneToggle('showFacepile', {
              label: strings.ShowFacepileFieldLabel
            })
          ]
        }]
      }]
    };
  }
}
