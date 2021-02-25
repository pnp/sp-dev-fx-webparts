import * as React from 'react';
import * as ReactDom from 'react-dom';
import * as strings from 'BarChartDemoWebPartStrings';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart,  } from "@microsoft/sp-webpart-base";
import { IPropertyPaneConfiguration } from "@microsoft/sp-property-pane";
import { PropertyPaneWebPartInformation } from '@pnp/spfx-property-controls/lib/PropertyPaneWebPartInformation';
import { BarChartDemo } from './components/BarChartDemo';
import { IBarChartDemoProps } from './components/IBarChartDemo.types';

export interface IBarChartDemoWebPartProps {
  description: string;
}
/**
 * This web part retrieves data asynchronously and renders a bar chart once loaded
 * It mimics a "real-life" scenario by loading (random) data asynchronously
 * and rendering the chart once the data has been retrieved.
 * To keep the demo simple, we don't specify custom colors.
 */
export default class BarChartDemoWebPart extends BaseClientSideWebPart<IBarChartDemoWebPartProps> {

  public render(): void {

    const element: React.ReactElement<IBarChartDemoProps > = React.createElement(
      BarChartDemo,
      {
        // there are no properties to pass for this demo
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
