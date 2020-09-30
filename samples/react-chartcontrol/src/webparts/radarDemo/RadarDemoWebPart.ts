import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart,  } from "@microsoft/sp-webpart-base";
import { IPropertyPaneConfiguration } from "@microsoft/sp-property-pane";
import { PropertyPaneWebPartInformation } from '@pnp/spfx-property-controls/lib/PropertyPaneWebPartInformation';

import * as strings from 'RadarDemoWebPartStrings';
import RadarDemo from './components/RadarDemo';
import { IRadarDemoProps } from './components/IRadarDemo.types';

export interface IRadarDemoWebPartProps {
  description: string;
}

export default class RadarDemoWebPart extends BaseClientSideWebPart<IRadarDemoWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IRadarDemoProps > = React.createElement(
      RadarDemo
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
