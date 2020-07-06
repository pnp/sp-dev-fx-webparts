import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart,  } from "@microsoft/sp-webpart-base";
import { IPropertyPaneConfiguration } from "@microsoft/sp-property-pane";
import { PropertyPaneWebPartInformation } from '@pnp/spfx-property-controls/lib/PropertyPaneWebPartInformation';

import * as strings from 'CustomPluginDemoWebPartStrings';
import CustomPluginDemo from './components/CustomPluginDemo';
import { ICustomPluginDemoProps } from './components/ICustomPluginDemo,types';

export interface ICustomPluginDemoWebPartProps {
  description: string;
}

export default class CustomPluginDemoWebPart extends BaseClientSideWebPart<ICustomPluginDemoWebPartProps> {

  public render(): void {
    const element: React.ReactElement<ICustomPluginDemoProps > = React.createElement(
      CustomPluginDemo,
      {

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

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          groups: [
            {
              groupFields: [
                PropertyPaneWebPartInformation({
                  description: strings.WebPartDescription,
                  moreInfoLink: strings.MoreInfoLinkUrl,
                  key: 'webPartInfoId'
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
