import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart,  } from "@microsoft/sp-webpart-base";
import { IPropertyPaneConfiguration } from "@microsoft/sp-property-pane";
import { PropertyPaneWebPartInformation } from '@pnp/spfx-property-controls/lib/PropertyPaneWebPartInformation';

import * as strings from 'ComboChartDemoWebPartStrings';
import { ComboChartDemo } from './components/ComboChartDemo';
import { IComboChartDemoProps } from './components/IComboChartDemo.types';

export interface IComboChartDemoWebPartProps {
  description: string;
}

export default class ComboChartDemoWebPart extends BaseClientSideWebPart<IComboChartDemoWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IComboChartDemoProps > = React.createElement(
      ComboChartDemo,
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

