import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart,  } from "@microsoft/sp-webpart-base";
import { IPropertyPaneConfiguration } from "@microsoft/sp-property-pane";
import { PropertyPaneWebPartInformation } from '@pnp/spfx-property-controls/lib/PropertyPaneWebPartInformation';


import * as strings from 'ScatterChartDemoWebPartStrings';
import { ScatterChartDemo } from './components/ScatterChartDemo';
import { IScatterChartDemoProps } from './components/IScatterChartDemo.types';

export interface IScatterChartDemoWebPartProps {
  description: string;
}

export default class ScatterChartDemoWebPart extends BaseClientSideWebPart<IScatterChartDemoWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IScatterChartDemoProps > = React.createElement(
      ScatterChartDemo,
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
