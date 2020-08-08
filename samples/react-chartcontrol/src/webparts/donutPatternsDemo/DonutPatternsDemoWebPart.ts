import * as React from 'react';
import * as ReactDom from 'react-dom';
import * as strings from 'DonutPatternsDemoWebPartStrings';

import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart,  } from "@microsoft/sp-webpart-base";
import { IPropertyPaneConfiguration } from "@microsoft/sp-property-pane";
import { PropertyPaneWebPartInformation } from '@pnp/spfx-property-controls/lib/PropertyPaneWebPartInformation';

import DonutPatternsDemo from './components/DonutPatternsDemo';
import { IDonutPatternsDemoProps } from './components/IDonutPatternsDemo.types';

export interface IDonutPatternsDemoWebPartProps {
  description: string;
}

export default class DonutPatternsDemoWebPart extends BaseClientSideWebPart<IDonutPatternsDemoWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IDonutPatternsDemoProps > = React.createElement(
      DonutPatternsDemo,
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
