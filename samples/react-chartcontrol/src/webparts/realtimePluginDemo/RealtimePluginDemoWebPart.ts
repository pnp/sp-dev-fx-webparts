import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart,  } from "@microsoft/sp-webpart-base";
import { IPropertyPaneConfiguration } from "@microsoft/sp-property-pane";
import { PropertyPaneWebPartInformation } from '@pnp/spfx-property-controls/lib/PropertyPaneWebPartInformation';

import * as strings from 'RealtimePluginDemoWebPartStrings';
import { RealtimePluginDemo } from './components/RealtimePluginDemo';
import { IRealtimePluginDemoProps } from './components/IRealtimePluginDemo.types';

export interface IRealtimePluginDemoWebPartProps {
  description: string;
}

export default class RealtimePluginDemoWebPart extends BaseClientSideWebPart<IRealtimePluginDemoWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IRealtimePluginDemoProps > = React.createElement(
      RealtimePluginDemo,
      {
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
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
